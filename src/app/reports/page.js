'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';

export default function ReportsListPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
      setReports(data.reports || []);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Reports</h1>
          <p className="text-gray-600">View all your business analysis reports</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No reports yet</h2>
            <p className="text-gray-600 mb-6">Start analyzing your first business idea!</p>
            <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Analyze New Idea
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Link 
                key={report.id}
                href={`/reports/${report.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border border-gray-200 hover:border-blue-300"
              >
                <div className="mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${
                    report.status === 'completed' ? 'bg-green-100 text-green-800' :
                    report.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    report.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </div>
                  
                  {report.reportData?.verdict && (
                    <div className={`inline-block ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      report.reportData.verdict.decision === 'go' ? 'bg-green-500 text-white' :
                      report.reportData.verdict.decision === 'nogo' ? 'bg-red-500 text-white' :
                      'bg-yellow-500 text-white'
                    }`}>
                      {report.reportData.verdict.decision === 'go' ? '✓ GO' :
                       report.reportData.verdict.decision === 'nogo' ? '✗ NO-GO' :
                       '↻ PIVOT'}
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {report.ideaInput}
                </h3>
                
                <p className="text-sm text-gray-500">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}