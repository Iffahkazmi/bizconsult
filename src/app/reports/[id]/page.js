'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ExecutiveSummary from '@/components/report/ExecutiveSummary';
import IdeaOverview from '@/components/report/IdeaOverview';
import MarketExistence from '@/components/report/MarketExistence';
import MarketDemand from '@/components/report/MarketDemand';
import MarketSize from '@/components/report/MarketSize';
import CustomerPainPoints from '@/components/report/CustomerPainPoints';
import ProsConsImprovements from '@/components/report/ProsConsImprovements';
import Verdict from '@/components/report/Verdict';
import Sources from '@/components/report/Sources';
import { generateReportPDF } from '@/lib/pdf/generatePDF';

export default function ReportPage() {
  const params = useParams();
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startingChat, setStartingChat] = useState(false);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await fetch(`/api/reports/${params.id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch report');
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    generateReportPDF(report);
  };

  const handleStartChat = async () => {
    setStartingChat(true);
    try {
      const response = await fetch('/api/chat/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId: params.id }),
      });

      const data = await response.json();
      
      if (data.sessionId) {
        router.push(`/chat/${data.sessionId}`);
      }
    } catch (error) {
      console.error('Failed to create chat session:', error);
      alert('Failed to start chat. Please try again.');
    } finally {
      setStartingChat(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your report...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-red-800 font-bold text-xl mb-2">Error Loading Report</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!report || !report.reportData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-yellow-800 font-bold text-xl mb-2">Report Not Ready</h2>
            <p className="text-yellow-600">
              Your report is still being generated. Please check back in a minute.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const data = report.reportData;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Business Analysis Report
              </h1>
              <p className="text-gray-600">
                For: <span className="font-semibold">{report.ideaInput}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Generated on {new Date(report.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button 
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>

          {/* Verdict Badge */}
          <div className={`inline-block px-6 py-3 rounded-full text-white font-semibold text-lg ${
            data.verdict.decision === 'go' ? 'bg-green-500' :
            data.verdict.decision === 'nogo' ? 'bg-red-500' :
            'bg-yellow-500'
          }`}>
            {data.verdict.decision === 'go' ? '✓ GO' :
             data.verdict.decision === 'nogo' ? '✗ NO-GO' :
             '↻ PIVOT'}
          </div>
        </div>

        {/* Report Sections */}
        <ExecutiveSummary data={data} />
        <IdeaOverview data={data} />
        <MarketExistence data={data} />
        <MarketDemand data={data} />
        <MarketSize data={data} />
        <CustomerPainPoints data={data} />
        <ProsConsImprovements data={data} />
        <Verdict data={data} />
        <Sources data={data} />

        {/* CTA for Chat */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Have Questions About This Report?</h2>
          <p className="text-blue-100 mb-6">
            Get personalized insights with our AI chat - ask follow-up questions and dive deeper into your analysis
          </p>
          <button 
            onClick={handleStartChat}
            disabled={startingChat}
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50"
          >
            {startingChat ? 'Starting Chat...' : 'Start AI Chat Session'}
          </button>
        </div>
      </div>
    </div>
  );
}