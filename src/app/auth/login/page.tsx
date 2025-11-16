"use client";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { Eye, EyeOff, FlipHorizontal } from "lucide-react";
import Image from "next/image";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
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
    SignInMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* Left - Brand/Marketing - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block h-full">
        <DomeGallery />
      </div>
      {/* Right - Login Form with Flip Card on Mobile */}
      <div className="bg-slate-50 flex items-center justify-center p-6 lg:p-12">
        {/* Mobile Flip Card Container */}
        <div
          className="lg:hidden relative w-full max-w-md h-[600px]"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Side - Login Form */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <Card className="bg-white w-full h-full text-card-foreground border border-border shadow-xl flex flex-col">
                <div className="p-8 flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <Image
                      src="/assets/logo.svg"
                      alt="iShout"
                      width={150}
                      height={150}
                      className="mx-auto"
                    />
                  </div>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      ref={ref}
                      className="space-y-5 flex-1"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="name@company.com"
                                className="text-black h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Your password"
                                  className="text-black h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent pr-10"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword((v) => !v)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                  aria-label={
                                    showPassword
                                      ? "Hide password"
                                      : "Show password"
                                  }
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <Link
                          href="/forgot-password"
                          className="text-primary text-xs hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>

                      <CustomButton
                        onClick={() => form.handleSubmit(onSubmit)}
                        className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/2 font-semibold rounded-lg  hover:opacity-90"
                        disabled={SignInMutation.isPending}
                      >
                        {SignInMutation.isPending ? (
                          <Loader2 className="animate-spin text-white" />
                        ) : (
                          "Login"
                        )}
                      </CustomButton>
                    </form>
                  </Form>

                  <p className="text-sm text-slate-600 text-center mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/register"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Create one
                    </Link>
                  </p>

                  {/* Flip Button */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="mt-4 mx-auto flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FlipHorizontal className="h-4 w-4" />
                    <span>View Gallery</span>
                  </button>
                </div>
              </Card>
            </div>

            {/* Back Side - Gallery */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Card className="bg-white w-full h-full text-card-foreground border border-border shadow-xl overflow-hidden">
                <div className="h-full relative">
                  <DomeGallery />
                  {/* Flip Back Button */}
                  <button
                    type="button"
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm text-slate-900 hover:bg-white transition-colors shadow-md"
                  >
                    <FlipHorizontal className="h-4 w-4" />
                    <span>Back to Login</span>
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Desktop - Regular Card (No Flip) */}
        <Card className="hidden lg:block bg-white w-full max-w-md text-card-foreground border border-border shadow-xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">iShout</h2>
              <p className="text-slate-600 text-sm">
                Login to manage your campaigns
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                ref={ref}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@company.com"
                          className="text-black h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Your password"
                            className="text-black h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <label className="text-xs text-muted-foreground">
                    Use your company email to sign in
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-primary text-xs hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover hover:from-green-600 hover:to-emerald-700 text-white shadow-green-500/2 font-semibold rounded-lg  hover:opacity-90"
                  disabled={SignInMutation.isPending}
                >
                  {SignInMutation.isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    "Login"
                  )}
                </CustomButton>
              </form>
            </Form>

            <p className="text-sm text-slate-600 text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Create one
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
