"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import {
  SignUpFormSchema,
  SignUpFormValidator,
} from "@/src/validators/Auth-Validator/signUp-Validators";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import CustomButton from "../../component/button";
import RegisterMutation from "@/src/routes/Auth-Routes/Api/Auth-Hook/regeister-hook";
import dynamic from "next/dynamic";
const DomeGallery = dynamic(() => import("@/src/constant/Influencers-data"), {
  ssr: false,
});
import Image from "next/image";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerMutation, isPending } = RegisterMutation();

  const form = useForm<SignUpFormValidator>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      company_name: "",
      contact_person: "",
      phone: "",
      // industry: "",
      // company_size: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: SignUpFormValidator) => {
    registerMutation({
      company_name: data.company_name,
      contact_person: data.contact_person,
      phone: data.phone,
      // industry: data.industry,
      // company_size: data.company_size,
      email: data.email,
      password: data.password,
    });
    form.reset();
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      <div className="h-full">
        <DomeGallery />
      </div>
      <div className="bg-slate-50 flex items-center justify-center p-6 lg:p-12">
        <Card className="bg-white w-full max-w-md text-card-foreground border border-border shadow-xl">
          <CardContent className="p-8">
            <div className="mb-2 flex flex-row items-center justify-center gap-0">
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
            <p className="text-slate-600 text-sm text-center">
              Create your account to get started
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_person"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Contact Person
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="971 9876543210"
                            className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Name Fields */}
                {/* <div className="grid grid-cols-2 gap-4"> */}
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company Name"
                          className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* <FormField
                    control={form.control}
                    name="company_size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          company_size
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="10-50"
                            className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  /> */}
                {/* </div> */}
                {/* <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Industry
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Your Industry"
                          className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                /> */}

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="text-black h-11 border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                {/* <div className="flex items-start space-x-3 pt-2">
                    <CustomCheckbox
                      checked={termsAccepted}
                      onChange={setTermsAccepted}
                      className="mt-1"
                    />
                    <label
                      className="text-sm text-slate-600 leading-relaxed cursor-pointer"
                      onClick={() => setTermsAccepted(!termsAccepted)}
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div> */}

                {/* Submit Button */}
                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover hover:secondarytext text-white shadow-green-500/2 font-semibold rounded-lg  hover:opacity-90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </CustomButton>
              </form>
            </Form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
