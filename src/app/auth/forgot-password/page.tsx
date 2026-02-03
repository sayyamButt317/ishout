"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SendEmailForgotPasswordHook from "@/src/routes/Company/api/Hooks/CompanyForgotPassword.hook";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useForgotPasswordStore } from "@/src/store/User/forgot-password.store";
import Image from "next/image";

export default function ForgetPassword() {
  const sendEmailForgotPasswordHook = SendEmailForgotPasswordHook();
  const { email, setEmail } = useForgotPasswordStore();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail(email);
    sendEmailForgotPasswordHook.mutate(email);
  };
  ;
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
        <div className="mb-2 flex flex-row items-center justify-center gap-1">
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
            Forgot Password?
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 pr-4 py-2 w-full border rounded-xl text-sm"
              disabled={sendEmailForgotPasswordHook.isPending}
            />
          </div>

          <Button className="w-full bg-primaryButton hover:bg-primaryHover italic cursor-pointer text-white"
            type="submit"
            disabled={sendEmailForgotPasswordHook.isPending}>
            {sendEmailForgotPasswordHook.isPending ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
          </Button>
        </form>
        <p className="text-sm text-center text-gray-500 mt-4">
          Enter your registered email address and we’ll send you a password reset link.
        </p>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-slate-400 hover:text-white transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
