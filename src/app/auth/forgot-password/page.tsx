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
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-950 via-black to-slate-900 p-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-10 space-y-8">

        {/* Logo */}
        <Link href="/" className="flex justify-center">
          <div className="flex items-center gap-4">
            <Image
              src="/assets/iShout-gif-black-background.gif"
              alt="ishout"
              width={60}
              height={60}
              unoptimized
            />
            <h2 className="text-3xl font-bold text-white tracking-tight">
              i
              <span className="text-primarytext font-extrabold">S</span>
              hout
              <span className="text-primarytext font-extrabold">.</span>
            </h2>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-white">
            Reset your password
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={sendEmailForgotPasswordHook.isPending}
              className="h-12 w-full rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 pl-11 pr-4 focus:ring-2 focus:ring-primarytext focus:border-transparent"
            />
          </div>

          <Button
            type="submit"
            disabled={sendEmailForgotPasswordHook.isPending}
            className="w-full h-12 rounded-xl bg-primarytext text-white font-semibold shadow-lg hover:opacity-90 transition-all cursor-pointer hover:bg-primarytext/90"
          >
            {sendEmailForgotPasswordHook.isPending ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center">
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
