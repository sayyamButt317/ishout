"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function ForgetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white italic">
            Forgot Password?
          </h1>
          <p className="text-sm text-slate-400">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-slate-300">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="bg-black/60 border-white/10 text-white placeholder:text-slate-500"
            />
          </div>

          <Button className="w-full bg-primaryButton hover:bg-primaryHover italic cursor-pointer text-white">
            Send Reset Link
          </Button>
        </form>

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
