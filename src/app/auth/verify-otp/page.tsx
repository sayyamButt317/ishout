'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, KeyRound } from 'lucide-react';
import VerifyOtpHook from '@/src/routes/Company/api/Hooks/VerifyOtp.hook';
import { toast } from 'sonner';
import { useForgotPasswordStore } from '@/src/store/User/forgot-password.store';
import { useRouter } from 'next/navigation';

const VerifyOtp = () => {
  const {
    otp, setOtp,
  } = useForgotPasswordStore();
  const router = useRouter();

  const verifyOtpMutation = VerifyOtpHook();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error('OTP is required');
      return;
    }
    verifyOtpMutation.mutate(otp);
    router.replace('/auth/change-password');
    setOtp('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
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
