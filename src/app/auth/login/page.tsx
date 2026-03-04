"use client";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
const DomeGallery = dynamic(() => import("@/src/constant/Influencers-data"), {
  ssr: false,
});
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import LoginMutation from "@/src/routes/Auth-Routes/Api/Auth-Hook/login-hook";
import {
  LoginFormSchema,
  LoginFormValidator,
} from "@/src/validators/Auth-Validator/login-validator";
import CustomButton from "../../component/button";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValidator>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const SignInMutation = LoginMutation();
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: LoginFormValidator) => {
    await SignInMutation.mutateAsync({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      <div className="hidden lg:block h-full">
        <DomeGallery />
      </div>
      {/* Right - Login Form */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 p-6">

        {/* Card */}
        <Card className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
          <div className="p-10 space-y-8">

            {/* Logo */}
            <Link href="/" className="flex justify-center">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/iShout-gif-black-background.gif"
                  alt="ishout"
                  width={80}
                  height={80}
                  unoptimized
                />
                <h2 className="text-4xl font-bold text-white tracking-tight">
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
                Welcome back
              </h1>
              <p className="italic text-sm text-slate-400">
                Sign in to continue to your dashboard
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                ref={ref}
                className="space-y-5"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primarytext focus:border-transparent rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-primarytext focus:border-transparent rounded-xl pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

                {/* Forgot */}
                <div className="flex justify-end">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Button */}
                <CustomButton
                  className="w-full h-12 rounded-xl bg-primarytext text-white font-semibold shadow-lg hover:opacity-90 hover:bg-primaryHover transition-all"
                  disabled={SignInMutation.isPending}
                >
                  {SignInMutation.isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    "Sign In"
                  )}
                </CustomButton>
              </form>
            </Form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-400">
              Don’t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-white font-medium hover:underline"
              >
                Create account
              </Link>
            </p>

          </div>
        </Card>
      </div>
    </div>
  );
}
