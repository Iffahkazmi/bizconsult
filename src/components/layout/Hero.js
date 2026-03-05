'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();
  const [idea, setIdea] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea.trim()) {
      // Store idea in URL and redirect to login
      // User will be asked to login, then analysis will start
      router.push(`/login?idea=${encodeURIComponent(idea.trim())}`);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Turn Your Business Idea Into
          <span className="text-blue-600"> Reality</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Get AI-powered market research, competitor analysis, and feasibility reports 
          in minutes — not weeks.
        </p>

        {/* Idea Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Enter your business idea... (e.g., AI-powered fitness coaching app)"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Analyze Now
            </button>
          </div>
        </form>

        {/* Example Ideas */}
        <div className="text-sm text-gray-500">
          <span className="font-medium">Popular searches:</span>
          {' '}
          <button 
            onClick={() => setIdea('Sustainable fashion marketplace for Gen Z')}
            className="text-blue-600 hover:underline mx-2"
          >
            Fashion marketplace
          </button>
          •
          <button 
            onClick={() => setIdea('AI resume builder for college students')}
            className="text-blue-600 hover:underline mx-2"
          >
            Resume builder
          </button>
          •
          <button 
            onClick={() => setIdea('Local food delivery service in small towns')}
            className="text-blue-600 hover:underline mx-2"
          >
            Food delivery
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free first report</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>AI-powered analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Results in 5 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
}