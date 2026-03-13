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
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${o.value === value ? 'bg-white/10 font-semibold text-white' : 'text-white/80'
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
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[4fr_2fr]">
      {/* Left - Gallery */}
      <div className="hidden lg:block h-full">
        <DomeGallery />
      </div>

      {/* Right - Signup Form */}
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-black to-slate-900 p-6">

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
                  <span className="text-white font-extrabold">S</span>
                  hout
                  <span className="text-primarytext font-extrabold">.</span>
                </h2>
              </div>
            </Link>

            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-semibold text-white">
                Create your account
              </h1>
              <p className="italic text-sm text-slate-400">
                Start managing campaigns in minutes
              </p>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Contact Person */}
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Input
                          placeholder="Contact person"
                          {...field}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-primarytext focus:border-transparent"
                        />
                      </FormLabel>
                      <FormMessage className="text-xs text-red-400" />
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
                        <FormControl>
                          <PhoneInput
                            international
                            defaultCountry="AE"
                            countryCallingCodeEditable={false}
                            placeholder="Phone number"
                            value={displayValue}
                            onChange={(value) => {
                              const valueWithoutPlus = removePlusPrefix(value);
                              field.onChange(valueWithoutPlus);
                            }}
                            countrySelectComponent={MobileCountrySelect}
                            className="h-12 rounded-xl border border-white/10 bg-white/5 px-3 text-white focus-within:ring-2 focus-within:ring-primarytext w-full"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    );
                  }}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Company name"
                          {...field}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-primarytext focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400" />
                    </FormItem>
                  )}
                />

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
                          {...field}
                          className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-2 focus:ring-primarytext focus:border-transparent"
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
                            placeholder="Create a strong password"
                            {...field}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl pr-10 focus:ring-2 focus:ring-primarytext focus:border-transparent"
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

                {/* CTA */}
                <CustomButton
                  className="w-full h-12 rounded-xl bg-primarytext text-white font-semibold shadow-lg hover:bg-primaryHover hover:opacity-90 transition-all"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    "Create Account"
                  )}
                </CustomButton>

              </form>
            </Form>

            {/* Footer */}
            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-white font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>

          </div>
        </Card>
      </div>
    </div>
  );
}
