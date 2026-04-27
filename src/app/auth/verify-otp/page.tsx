'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, KeyRound } from 'lucide-react';
import VerifyOtpHook from '@/src/routes/Company/api/Hooks/VerifyOtp.hook';
import { useForgotPasswordStore } from '@/src/store/User/forgot-password.store';
import Image from 'next/image';

const VerifyOtp = () => {
  const {
    otp, email, setOtp
  } = useForgotPasswordStore();

  const verifyOtpMutation = VerifyOtpHook();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOtpMutation.mutate({ otp, email });
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
        <div className="mb-2 flex flex-row items-center justify-center gap-0">
          <Image
            src="/assets/favicon.png"
            alt="ishout"
            width={40}
            height={40}
          />
          <h2 className="text-2xl font-bold text-white">iShout</h2>
          <span className="text-primarytext font-extrabold text-2xl">
            .
          </span>
        </div>
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white italic">
            Verify OTP
          </h1>
          <p className="text-sm text-slate-400">
            Enter the OTP sent to your email and reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <KeyRound
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="pl-10 py-2 w-full border rounded-xl text-sm"
              disabled={verifyOtpMutation.isPending}
            />
          </div>
          <Button type="submit" className="w-full bg-primaryButton hover:bg-primaryHover italic cursor-pointer text-white" disabled={verifyOtpMutation.isPending}>
            {verifyOtpMutation.isPending ? <Loader2 className="animate-spin" /> : 'Verify OTP'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
