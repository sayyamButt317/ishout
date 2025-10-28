"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Loader2 } from "lucide-react";
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
      {/* Left - Brand/Marketing */}
      {/* <SideComponent /> */}
      <div className="h-full">
        <DomeGallery />
      </div>
      {/* Right - Login Form */}
      <div className="bg-slate-50 flex items-center justify-center p-6 lg:p-12">
        <Card className="bg-white w-full max-w-md text-card-foreground border border-border shadow-xl">
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
