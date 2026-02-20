'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import VerifyEmailMutation from '@/src/routes/Auth-Routes/Api/Auth-Hook/verify-email-hook';
import { Loader2 } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifyMutation = VerifyEmailMutation();
  const hasVerified = useRef(false);

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verifyMutation.mutate(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // verifyMutation intentionally left out


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow rounded-lg max-w-md text-center">
        {verifyMutation.isPending && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
            <p className="text-gray-500">Verifying your email...</p>
          </div>
        )}

        {verifyMutation.isSuccess && (
          <p className="text-green-600">
            Email verified successfully! Redirecting...
          </p>
        )}

        {verifyMutation.isError && (
          <p className="text-red-600">
            Verification failed. Link may be expired.
          </p>
        )}
      </div>
    </div>
  );
}