'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProcessingPage() {
  const params = useParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Analyzing your business idea...',
    'Searching the web for competitors...',
    'Gathering market demand data...',
    'Analyzing customer pain points...',
    'Calculating market size...',
    'Generating your report...',
  ];

  useEffect(() => {
    // Simulate progress through steps
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    // Poll for report status (we'll implement the actual API in Phase 4)
    // For now, just simulate completion after 20 seconds
    const timeout = setTimeout(() => {
      router.push(`/reports/${params.id}`);
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [params.id, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-blue-600 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analyzing Your Idea
          </h1>
          <p className="text-gray-600">
            Our AI is working hard to give you the best insights
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                index <= currentStep
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg
                  className="w-6 h-6 text-green-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : index === currentStep ? (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin flex-shrink-0" />
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex-shrink-0" />
              )}
              <span className="font-medium">{step}</span>
            </div>
          ))}
        </div>

        {/* Fun Fact */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            💡 <span className="font-semibold">Did you know?</span> 42% of startups fail due to lack of market need. 
            That's why market research is crucial!
          </p>
        </div>
      </div>
    </div>
  );
}