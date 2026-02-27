"use client";

import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  Loader2,
  Mail,
  RefreshCcw,
  User,
} from "lucide-react";
import PhoneInput from 'react-phone-number-input';
import {
  CompanyProfileFormSchema,
  CompanyProfileFormValidator,
} from "@/src/validators/Company/profileschema-validation";
import CompanyProfileDetailsHook from "@/src/routes/Company/api/Hooks/get-profile.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, type ComponentType } from "react";
import CompanyUpdateProfileHook from "@/src/routes/Company/api/Hooks/update-profile.hook";
import { normalizePhoneNumberForDisplay, removePlusPrefix } from "@/src/utils/phone.utils";

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{ country: string; title: string; className?: string }>;

function MobileCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
  disabled,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => { if (!disabled) setOpen(true); }}
        className={`flex items-center gap-1 rounded px-1 py-0.5 transition-colors ${
          disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 cursor-pointer'
        }`}
      >
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {open && !disabled && typeof document !== 'undefined' && createPortal(
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: '15%',
              bottom: 80,
              left: 40,
              right: 40,
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              borderRadius: '16px',
              background: 'rgb(23,23,23)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>Select Country</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <ul style={{ flex: 1, overflowY: 'auto', margin: 0, padding: 0, listStyle: 'none' }}>
              {options.filter((o) => o.value).map((o) => (
                <li key={o.value}>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 16px',
                      fontSize: '14px',
                      background: o.value === value ? 'rgba(255,255,255,0.1)' : 'transparent',
                      color: o.value === value ? 'white' : 'rgb(212,212,212)',
                      fontWeight: o.value === value ? 600 : 400,
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onClick={() => { onChange(o.value); setOpen(false); }}
                  >
                    <FlagIcon country={o.value!} title={o.label} />
                    <span>{o.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user_id } = useAuthStore();


  const { data, refetch, isRefetching } = CompanyProfileDetailsHook(user_id);
  const { mutate: updateProfile, isPending } = CompanyUpdateProfileHook(user_id);


  const form = useForm<CompanyProfileFormValidator>({
    resolver: zodResolver(CompanyProfileFormSchema),
    defaultValues: {
      company_name: data?.user?.company_name,
      contact_person: data?.user?.contact_person,
      phone: data?.user?.phone,
      email: data?.user?.email,
    },
  });

  const {
    formState: { isDirty },
  } = form;

  const onSubmit = (values: CompanyProfileFormValidator) => {
    const valuesToSend = {
      ...values,
      phone: removePlusPrefix(values.phone),
    };
    updateProfile(valuesToSend, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (data?.user) {
      form.reset({
        company_name: data.user.company_name ?? "",
        contact_person: data.user.contact_person ?? "",
        phone: data.user.phone ?? "",
        email: data.user.email ?? "",
      });
    }
  }, [data, form]);

  return (
    <div className=" bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
      <Card className="w-full rounded-2xl shadow-xl border border-white/10 bg-neutral-900/80 backdrop-blur">
        <CardContent>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-row items-center gap-2 justify-between">
              <div className="flex flex-row items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold text-white">
                  Profile Information
                </h1>
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    refetch();
                  }}
                  disabled={isRefetching}
                >
                  <RefreshCcw
                    className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
                      }`}
                  />
                </Button>
              </div>
              <div className="flex gap-2">
                {isEditing && (
                  <Button
                    type="button"
                    onClick={() => {
                      if (isDirty) {
                        const confirmLeave = confirm(
                          "You have unsaved changes. Do you want to discard them?"
                        );
                        if (!confirmLeave) return;
                      }
                      form.reset();
                      setIsEditing(false);
                    }}
                    className="bg-gray-700 text-white h-9 px-4"
                  >
                    Cancel
                  </Button>

                )}

                <Button
                  type={isEditing ? "submit" : "button"}
                  form="company-profile-form"
                  disabled={isEditing && (!isDirty || isPending)}
                  onClick={() => {
                    if (!isEditing) setIsEditing(true);
                  }}
                  className="bg-secondaryButton text-white h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? (
                    isPending ? <Loader2 className="animate-spin" /> : "Save Profile"
                  ) : (
                    "Edit Profile"
                  )}
                </Button>

              </div>

            </div>
            <p className="italic text-xs text-slate-200 mt-2">
              Update your profile information and contact details
            </p>
          </div>

          <Form {...form}>
            <form
              id="company-profile-form"
              ref={ref}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="contact_person"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">
                        Contact Person
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder={data?.user?.contact_person || ""}
                            disabled={!isEditing}
                            className="pl-10 h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
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
                        <FormLabel className="text-neutral-300">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <div>
                            <div className="md:hidden">
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
                                disabled={!isEditing}
                                countrySelectComponent={MobileCountrySelect}
                                className="profile-phone-input"
                              />
                            </div>
                            <div className="hidden md:block">
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
                                disabled={!isEditing}
                                className="profile-phone-input"
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Company Name */}
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-300">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Company Name"
                          disabled={!isEditing}
                          className="pl-10 h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-300">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="name@company.com"
                          disabled={!isEditing}
                          className="pl-10 h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
