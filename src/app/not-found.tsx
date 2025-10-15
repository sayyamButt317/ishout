'use client'
import Link from 'next/link'
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function NotFound() {
    const router = useRouter();
    
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
 

        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f7941D] via-[#ffbfbf] to-[#1e4b8e] rounded-full shadow-lg">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Don&apos;t worry, let&apos;s get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            asChild
            className="w-full text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-[#f7941D] via-[#ffbfbf] to-[#1e4b8e]"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5 " />
              Return to Home
            </Link>
          </Button>

          <Button 
            variant="outline"
            asChild
            className="w-full border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            <Link href="/" className="flex items-center justify-center gap-2" onClick={handleGoBack}>
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Link>
          </Button>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute top-1/3 right-8 w-12 h-12 bg-purple-300 rounded-full opacity-10 animate-bounce delay-500"></div>
      </div>
    </div>
  )
}