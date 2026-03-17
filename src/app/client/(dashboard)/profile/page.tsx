"use client";
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
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import PageHeader from "@/src/app/component/PageHeader";
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
import {
  ChangePasswordFormSchema,
  ChangePasswordFormValidator,
} from "@/src/validators/Company/change-password-validation";
import ProfileChangePasswordHook from "@/src/routes/Company/api/Hooks/profile-change-password.hook";
import { MobileCountrySelect } from "@/src/app/component/custom-component/selectcountry";


export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { user_id } = useAuthStore();

  const { data, refetch, isRefetching } = CompanyProfileDetailsHook(user_id);
  const { mutate: updateProfile, isPending } = CompanyUpdateProfileHook(user_id);
  const { mutate: changePassword, isPending: isChangingPassword } = ProfileChangePasswordHook(user_id);


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

  const passwordForm = useForm<ChangePasswordFormValidator>({
    resolver: zodResolver(ChangePasswordFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: false,
    criteriaMode: "all",
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

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

  const onPasswordSubmit = (values: ChangePasswordFormValidator) => {
    changePassword(
      {
        old_password: values.old_password,
        new_password: values.new_password,
      },
      {
        onSuccess: () => {
          setIsEditingPassword(false);
          passwordForm.reset();
        },
        onError: (error) => {
          const axiosError = error as { response?: { data?: { detail?: string } } };
          const errorMessage = axiosError.response?.data?.detail || 'Failed to change password';
          const lowerMessage = errorMessage.toLowerCase();
          
          if (lowerMessage.includes('current password') || 
              lowerMessage.includes('old password') ||
              lowerMessage.includes('incorrect password') ||
              lowerMessage.includes('wrong password') ||
              lowerMessage.includes('invalid password')) {
            const errorMsg = errorMessage.toLowerCase().includes('current password') 
              ? errorMessage.replace(/current password/gi, 'old password')
              : errorMessage;
            passwordForm.setError('old_password', {
              type: 'manual',
              message: errorMsg,
            });
          }
        },
      }
    );
  };

  const inputBase =
    "h-11 rounded-xl border border-white/10 bg-white/[0.04] pl-10 text-white placeholder:text-white/40 transition-colors focus:border-[var(--color-primaryButton)] focus:ring-2 focus:ring-[var(--color-primaryButton)]/20 focus:bg-white/[0.06] disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans">
      <PageHeader
        title="Profile"
        description="Update your profile information and contact details"
        icon={<User className="size-5" />}
        actions={
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer text-white/60 hover:bg-white/10 hover:text-[var(--color-primaryButton)] transition-colors"
              onClick={() => refetch()}
              disabled={isRefetching}
              aria-label="Refresh profile"
            >
              <RefreshCcw className={`size-4 ${isRefetching ? "animate-spin" : ""}`} />
            </Button>
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
                className="h-10 rounded-xl cursor-pointer border border-white/15 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
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
              className="h-10 rounded-xl cursor-pointer bg-[var(--color-primaryButton)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primaryHover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-primaryButton)]"
            >
              {isEditing ? (
                isPending ? <Loader2 className="size-4 animate-spin" /> : "Save Profile"
              ) : (
                "Edit Profile"
              )}
            </Button>
          </>
        }
      />
      <Card className="w-full rounded-2xl border border-white/[0.08] bg-[var(--color-section-overlays)] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Profile Information</h2>
            <p className="mt-1 text-sm text-white/50">Your company and contact details</p>
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
                      <FormLabel className="text-white/70">
                        Contact Person
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                          <Input
                            {...field}
                            type="text"
                            placeholder={data?.user?.contact_person || ""}
                            disabled={!isEditing}
                            className={inputBase}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400 text-xs" />
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
                        <FormLabel className="text-white/70">
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
                        <FormMessage className="text-red-400 text-xs" />
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
                    <FormLabel className="text-white/70">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Your Company Name"
                          disabled={!isEditing}
                          className={inputBase}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/70">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="name@company.com"
                          disabled={!isEditing}
                          className={inputBase}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="mt-10 pt-8 border-t border-white/10">
            <div className="mb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Change Password
                  </h2>
                  <p className="mt-1 text-sm text-white/50">
                    Update your account password
                  </p>
                </div>
                <div className="flex gap-2">
                  {isEditingPassword && (
                    <Button
                      type="button"
                      onClick={() => {
                        passwordForm.reset({
                          old_password: "",
                          new_password: "",
                        });
                        passwordForm.clearErrors();
                        setIsEditingPassword(false);
                      }}
                      className="h-10 cursor-pointer rounded-xl border border-white/15 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type={isEditingPassword ? "submit" : "button"}
                    form="change-password-form"
                    disabled={isEditingPassword && isChangingPassword}
                    onClick={() => {
                      if (!isEditingPassword) {
                        passwordForm.reset({
                          old_password: "",
                          new_password: "",
                        }, {
                          keepErrors: false,
                          keepDirty: false,
                          keepIsSubmitted: false,
                          keepTouched: false,
                          keepIsValid: false,
                          keepSubmitCount: false,
                        });
                        passwordForm.clearErrors();
                        setIsEditingPassword(true);
                      }
                    }}
                    className="h-10 cursor-pointer rounded-xl bg-[var(--color-primaryButton)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primaryHover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[var(--color-primaryButton)]"
                  >
                    {isEditingPassword ? (
                      isChangingPassword ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        "Save Password"
                      )
                    ) : (
                      "Change Password"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <Form {...passwordForm}>
              <form
                id="change-password-form"
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={passwordForm.control}
                    name="old_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">
                          Old Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter old password"
                              {...field}
                              value={field.value || ""}
                              disabled={!isEditingPassword}
                              className={`${inputBase} pr-10`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[var(--color-primaryButton)] transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5 cursor-pointer" />
                              ) : (
                                <Eye className="h-5 w-5 cursor-pointer" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <div className="min-h-[20px]">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name="new_password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/70">
                          New Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                            <Input
                              type={showNewPassword ? "text" : "password"}
                              placeholder="Enter new password"
                              {...field}
                              value={field.value || ""}
                              disabled={!isEditingPassword}
                              className={`${inputBase} pr-10`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword((v) => !v)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[var(--color-primaryButton)] transition-colors"
                            >
                              {showNewPassword ? (
                                <EyeOff className="h-5 w-5 cursor-pointer" />
                              ) : (
                                <Eye className="h-5 w-5 cursor-pointer" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <div className="min-h-[20px]">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
