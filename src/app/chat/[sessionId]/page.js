'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import ChatInterface from '@/components/chat/ChatInterface';

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const response = await fetch(`/api/chat/${params.sessionId}`);
      
      if (!response.ok) {
        throw new Error('Session not found');
      }

      const data = await response.json();
      setSession(data.session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading chat session...</p>
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
            <h2 className="text-red-800 font-bold text-xl mb-2">Chat Session Not Found</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/reports')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Chat Session</h1>
          <p className="text-gray-600">
            Discussing report from {new Date(session.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Chat Interface */}
        <ChatInterface 
          reportId={session.reportId} 
          sessionId={params.sessionId}
        />

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <span className="font-semibold">Tip:</span> Ask specific questions about your competitors, market size, or implementation strategy for best results.
          </p>
        </div>
      </div>
    </div>
  );
}