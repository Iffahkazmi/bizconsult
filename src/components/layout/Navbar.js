'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">BizConsult</span>
            <span className="ml-2 text-sm text-gray-500">AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/#how-it-works" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              How It Works
            </Link>
            <Link 
              href="/#pricing" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isAuthPage && (
              <>
                <Link 
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Sign in
                </Link>
                <Link 
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}