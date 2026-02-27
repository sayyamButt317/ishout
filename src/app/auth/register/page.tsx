'use client';
import { useState, type ComponentType } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import PhoneInput from 'react-phone-number-input';
import {
  SignUpFormSchema,
  SignUpFormValidator,
} from '@/src/validators/Auth-Validator/signUp-Validators';
import { normalizePhoneNumberForDisplay, removePlusPrefix } from '@/src/utils/phone.utils';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import CustomButton from '../../component/button';
import RegisterMutation from '@/src/routes/Auth-Routes/Api/Auth-Hook/regeister-hook';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const DomeGallery = dynamic(() => import('@/src/constant/Influencers-data'), {
  ssr: false,
});

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{ country: string; title: string; className?: string }>;

function MobileCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 rounded px-1 py-0.5 hover:bg-white/10 transition-colors"
      >
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60" onClick={() => setOpen(false)} />
          <div className="fixed inset-x-6 top-1/4 bottom-[15%] z-50 flex flex-col rounded-2xl border border-white/10 bg-[#0d0d1e] shadow-2xl overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-semibold text-white">Select Country</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-base leading-none text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {options.filter((o) => o.value).map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                    o.value === value ? 'bg-white/10 font-semibold text-white' : 'text-white/80'
                  }`}
                >
                  <FlagIcon country={o.value!} title={o.label} />
                  <span>{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerMutation, isPending } = RegisterMutation();

  const form = useForm<SignUpFormValidator>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      company_name: '',
      contact_person: '',
      phone: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignUpFormValidator) => {
    registerMutation({
      company_name: data.company_name,
      contact_person: data.contact_person,
      phone: removePlusPrefix(data.phone),
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[3fr_2fr]">
      {/* Left - Gallery */}
      <div className="hidden lg:block h-full">
        <DomeGallery />
      </div>

      {/* Right - Signup Form */}
      <div className="bg-black lg:bg-slate-100 flex items-center justify-center p-6 lg:p-12">
        {/* Mobile - Signup Card */}
        <Card className="lg:hidden bg-black rounded-3xl w-full max-w-md text-card-foreground border-2 shadow-2xl">
          <div className="p-8">
            <Link href="/" className="cursor-pointer">
              <div className="mb-4 flex flex-row items-center justify-center gap-0">
                <Image src="/assets/favicon.png" alt="ishout" width={50} height={50} />
                <h2 className="text-3xl font-bold text-slate-100">iShout</h2>
                <span className="text-primarytext font-extrabold text-3xl">.</span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm text-center mb-6">
              Create your account to get started now
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Contact Person */}
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-100">
                        Contact Person
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="text-white placeholder-white h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => {
                    const displayValue = normalizePhoneNumberForDisplay(field.value);
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-100">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            international
                            defaultCountry="AE"
                            countryCallingCodeEditable={false}
                            placeholder="Enter phone number"
                            value={displayValue}
                            onChange={(value) => {
                              const valueWithoutPlus = removePlusPrefix(value);
                              field.onChange(valueWithoutPlus);
                            }}
                            countrySelectComponent={MobileCountrySelect}
                            className="signup-phone-input h-12 rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent w-full"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500" />
                      </FormItem>
                    );
                  }}
                />

                {/* Company Name */}
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-100">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company Name"
                          {...field}
                          className="text-white placeholder-white h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-100">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          {...field}
                          className="text-slate-100 placeholder-white h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-slate-100">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            {...field}
                            className="text-slate-100 placeholder-white h-12 bg-background border-input focus:ring-2 focus:ring-ring focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover text-white shadow-green-500/2 font-semibold rounded-lg hover:opacity-90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    'Create Account'
                  )}
                </CustomButton>
              </form>
            </Form>

            <p className="text-sm text-slate-400 text-center mt-6">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </Card>

        {/* Desktop - Signup Card */}
        <Card className="hidden lg:block bg-slate-100 rounded-3xl w-full max-w-md text-card-foreground border border-border shadow-xl">
          <div className="p-8">
            <Link href="/" className="cursor-pointer">
              <div className="mb-2 flex flex-row items-center justify-center gap-0">
                {/* <Image src="/assets/favicon.png" alt="ishout" width={50} height={50} /> */}

                <Image
                  src="/assets/iShout-gif-black-background.gif"
                  alt="ishout"
                  width={50}
                  height={50}
                  unoptimized={true}
                />
                <h2 className="text-3xl font-bold text-slate-900">iShout</h2>
                <span className="text-primarytext font-extrabold text-3xl">.</span>
              </div>
            </Link>

            <p className="text-slate-600 text-sm text-center mb-6">
              Create your account to get started now
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact Person */}
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
                  render={({ field }) => {
                    const displayValue = normalizePhoneNumberForDisplay(field.value);
                    return (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            international
                            defaultCountry="AE"
                            countryCallingCodeEditable={false}
                            placeholder="Enter phone number"
                            value={displayValue}
                            onChange={(value) => {
                              const valueWithoutPlus = removePlusPrefix(value);
                              field.onChange(valueWithoutPlus);
                            }}
                            className="flex items-center w-full h-11 px-3 rounded-md border border-slate-200 bg-transparent text-black focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-none [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-black [&_.PhoneInputInput]:placeholder:text-slate-400 [&_.PhoneInputInput]:focus:bg-transparent [&_.PhoneInputCountry]:bg-transparent [&_.PhoneInputCountry]:border-none [&_.PhoneInputCountry]:hover:bg-transparent"
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    );
                  }}
                />

                {/* Company Name */}
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
                            type={showPassword ? 'text' : 'password'}
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

                {/* Submit */}
                <CustomButton
                  onClick={() => form.handleSubmit(onSubmit)}
                  className="w-full h-12 bg-gradient-to-r from-secondaryButton to-secondaryHover hover:secondarytext text-white shadow-green-500/2 font-semibold rounded-lg hover:opacity-90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    'Create Account'
                  )}
                </CustomButton>
              </form>
            </Form>

            <p className="text-sm text-slate-600 text-center mt-6">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
