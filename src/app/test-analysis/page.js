'use client';

import { useState } from 'react';

export default function TestAnalysisPage() {
  const [idea, setIdea] = useState('AI fitness coaching app for busy professionals');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate report');
      }

      setResult(data);
      
      // Poll for status
      pollStatus(data.reportId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pollStatus = async (reportId) => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/reports/${reportId}/status`);
        const data = await response.json();
        
        console.log('Status:', data.status);
        
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(interval);
          setResult(prev => ({ ...prev, finalStatus: data.status }));
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test AI Analysis Pipeline</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <label className="block text-sm font-medium mb-2">Business Idea:</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
            rows={3}
          />
          
          <button
            onClick={handleTest}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Starting Analysis...' : 'Test Analysis'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h2 className="font-bold mb-2">Analysis Started!</h2>
            <p>Report ID: {result.reportId}</p>
            <p>Status: {result.finalStatus || 'Processing...'}</p>
            <p className="text-sm text-gray-600 mt-2">
              Check your terminal for progress logs. This takes 30-60 seconds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}