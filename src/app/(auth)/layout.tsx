import Link from 'next/link'
import { HeartIcon } from '@heroicons/react/24/outline'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <HeartIcon className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">
                  Bipolar People
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </main>

      {/* Crisis Resources Footer */}
      <div className="bg-red-50 border-l-4 border-red-400 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-red-800 mb-1">In Crisis? Get Immediate Help</h3>
              <p className="text-red-700 text-sm">Our community is for peer support. If you're in crisis, please contact professional services.</p>
            </div>
            <div className="mt-2 md:mt-0 space-y-1 md:space-y-0 md:space-x-3 md:flex">
              <a 
                href="tel:988" 
                className="block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center text-sm"
              >
                Call 988
              </a>
              <a 
                href="tel:911" 
                className="block bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-center text-sm"
              >
                Emergency: 911
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
