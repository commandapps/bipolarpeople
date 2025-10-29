'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerificationSuccessContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Verified! 🎉</h1>
        
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            Your email has been successfully verified. You can now access all features of our community.
          </p>
          
          {email && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                <strong>{email}</strong> is now verified and ready to use.
              </p>
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            <p>Welcome to the Bipolar People community! We're here to support you.</p>
          </div>
        </div>

        <div className="space-y-3">
          <Link 
            href="/login" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full text-center"
          >
            Login to Your Account
          </Link>
          
          <Link 
            href="/" 
            className="inline-block text-gray-600 hover:text-gray-800 text-sm transition-colors"
          >
            Return to Home
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>New here?</strong> Check out our{' '}
              <Link href="/community" className="underline">community guidelines</Link> and{' '}
              <Link href="/resources" className="underline">helpful resources</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerificationSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationSuccessContent />
    </Suspense>
  );
}
