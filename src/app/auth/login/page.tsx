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
    SignInMutation.mutate({
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
      <div className="bg-black lg:bg-slate-100 flex items-center justify-center p-6 lg:p-12">
        {/* Mobile - Login Card */}
        <Card className="lg:hidden bg-black rounded-3xl w-full max-w-md text-card-foreground border-2 shadow-2xl">
          <div className="p-8">
            <div className=" flex items-center justify-center mb-8  rounded-3xl p-4">
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
                          className="text-slate-100 h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
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
                            className="textslate-100 h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent pr-10"
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
                  {/* <Link
                    href="/forgot-password"
                    className="text-primary text-xs hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>

                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover text-white shadow-green-500/2 font-semibold rounded-lg  hover:opacity-90"
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

        {/* Desktop - Login Card */}
        <Card className="hidden lg:block bg-slate-100 rounded-3xl w-full max-w-md text-card-foreground border border-border shadow-xl">
          <div className="p-8 ">
            <div className="mb-8 flex flex-row items-center justify-center gap-0">
              <Image
                src="/assets/favicon.png"
                alt="ishout"
                width={40}
                height={40}
              />
              <h2 className="text-2xl font-bold text-slate-900">iShout</h2>
              <span className="text-primarytext font-extrabold text-2xl">
                .
              </span>
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
                  {/* <Link
                    href="/forgot-password"
                    className="text-primary text-xs hover:underline"
                  >
                    Forgot password?
                  </Link> */}
                </div>

                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover hover:secondarytext text-white shadow-green-500/2 font-semibold rounded-lg  hover:opacity-90"
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
