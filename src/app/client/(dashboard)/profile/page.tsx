"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Building2, Loader2, Mail, RefreshCcw, User, Eye, EyeOff, Lock } from "lucide-react";
import PageHeader from "@/src/app/component/PageHeader";
import PhoneInput from "react-phone-number-input";
import { CompanyProfileFormSchema, CompanyProfileFormValidator } from "@/src/validators/Company/profileschema-validation";
import CompanyProfileDetailsHook from "@/src/routes/Company/api/Hooks/get-profile.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CompanyUpdateProfileHook from "@/src/routes/Company/api/Hooks/update-profile.hook";
import { normalizePhoneNumberForDisplay, removePlusPrefix } from "@/src/utils/phone.utils";
import { ChangePasswordFormSchema, ChangePasswordFormValidator } from "@/src/validators/Company/change-password-validation";
import ProfileChangePasswordHook from "@/src/routes/Company/api/Hooks/profile-change-password.hook";
import MobileCountrySelect from "@/src/app/component/custom-component/MobileCountrySelect";
import { ProfileAvatar } from "@/src/app/component/custom-component/ProfileAvatar";
import { ConfirmationDialogue } from "@/src/app/component/ConfirmationDialogue";
import UpdateProfilePictureHook from "@/src/routes/Company/api/Hooks/userProfile/update-profile-picture-hook";


const glassCard    = "backdrop-blur-xl bg-[#1c1b1b]/60 border border-white/5 rounded-xl px-8 py-6 w-full";
const inputBase    = "h-11 rounded-xl border-0 border-b border-white/10 bg-[#0e0e0e] pl-10 text-white placeholder:text-white/30 transition-all focus-visible:ring-0 focus-visible:border-b-2 focus-visible:border-[#e8184d]/40 focus-visible:bg-white/[0.06] disabled:opacity-50 disabled:cursor-not-allowed";
const phoneWrapper = "h-11 rounded-xl border-0 border-b border-white/10 bg-[#0e0e0e] text-white transition-all focus-within:border-b-2 focus-within:border-[#e8184d]/40 focus-within:bg-white/[0.06] disabled:opacity-50 flex items-center ";
const labelBase    = "block text-[10px] uppercase tracking-widest text-white/50 mb-1";
const sectionTitle = "text-[10px] uppercase tracking-widest font-bold text-white/60 flex items-center gap-2";
const primaryBtn   = "h-9 rounded-xl bg-primaryButton hover:bg-primaryHover px-4 text-xs font-bold text-white uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-[0_0_16px_rgba(232,24,77,0.2)]";

const FieldIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
  <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
);


export default function CompanyProfilePage() {
  const [isEditing, setIsEditing]                 = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showOldPw, setShowOldPw]                 = useState(false);
  const [showNewPw, setShowNewPw]                 = useState(false);

  const [pendingAvatarFile, setPendingAvatarFile] = useState<File | null>(null);
  const [avatarRemoved, setAvatarRemoved]         = useState(false);
  const hasAvatarChange                           = pendingAvatarFile !== null || avatarRemoved;

  const { user_id }                               = useAuthStore();
  const { data, refetch, isRefetching }           = CompanyProfileDetailsHook(user_id);
  const { mutate: updateProfile, isPending }      = CompanyUpdateProfileHook(user_id);
  const { mutate: changePassword, isPending: isChangingPassword } = ProfileChangePasswordHook(user_id);
const { mutate: uploadProfileImage, isPending: imageuploading } = UpdateProfilePictureHook(user_id);

  const form = useForm<CompanyProfileFormValidator>({
    resolver: zodResolver(CompanyProfileFormSchema),
    defaultValues: { company_name: "", contact_person: "", phone: "", email: "" },
  });

  const passwordForm = useForm<ChangePasswordFormValidator>({
    resolver: zodResolver(ChangePasswordFormSchema),
    mode: "onBlur",
    defaultValues: { old_password: "", new_password: "" },
  });

  useEffect(() => {
    if (data?.user) form.reset({
      company_name:   data.user.company_name   ?? "",
      contact_person: data.user.contact_person ?? "",
      phone:          data.user.phone          ?? "",
      email:          data.user.email          ?? "",
    });
  }, [data, form]);

  const onSubmit = (values: CompanyProfileFormValidator) =>
    updateProfile({ ...values, phone: removePlusPrefix(values.phone) }, {
      onSuccess: () => setIsEditing(false),
    });

  const onPasswordSubmit = (values: ChangePasswordFormValidator) =>
    changePassword(values, {
      onSuccess: () => { setIsEditingPassword(false); passwordForm.reset(); },
      onError: (error) => {
        const msg = (error as { response?: { data?: { detail?: string } } }).response?.data?.detail ?? "Failed to change password";
        if (/current|old|incorrect|wrong|invalid/i.test(msg))
          passwordForm.setError("old_password", { type: "manual", message: msg.replace(/current password/gi, "old password") });
      },
    });

  const handleSaveAvatar = () => {
    const formData = new FormData();
    if (pendingAvatarFile)
       formData.append("logo", pendingAvatarFile);
    else if (avatarRemoved)
      formData.append("remove_logo", "true");
    uploadProfileImage({ 
      user_id, 
      file: pendingAvatarFile! },
      {
      onSuccess: () => { 
        setPendingAvatarFile(null); 
        setAvatarRemoved(false);
         refetch(); },
    });
  };

  const handleCancelProfile = () => {
    if (form.formState.isDirty) { setShowConfirmDialog(true); return; }
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#131313]">
      <PageHeader
        title="Profile Settings"
        description="Manage your brand identity and security"
        icon={<User className="size-5" />}
        actions={
          <Button variant="ghost" size="icon" className="size-8 text-white/50 hover:bg-white/10 hover:text-white"
            onClick={() => refetch()} disabled={isRefetching}>
            <RefreshCcw className={`size-4 ${isRefetching ? "animate-spin" : ""}`} />
          </Button>
        }
      />

      <div className="mx-auto px-4 py-2 gap-2 flex flex-col">
        <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-primary rounded-full blur-[120px] -z-10" />

        {/* ── Avatar ── */}
        <section className={glassCard}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className={sectionTitle}><User className="w-3.5 h-3.5" /> Profile Picture</p>
              <p className="text-white/40 text-xs mt-1">Recommended 512×512px · JPG or PNG</p>
            </div>
            {hasAvatarChange && (
              <div className="flex gap-2">
                <Button type="button" className={primaryBtn} variant="outline"
                  onClick={() => { setPendingAvatarFile(null); setAvatarRemoved(false); }}>
                  Cancel
                </Button>
                <Button
                 type="button"
                 className={primaryBtn}
                 onClick={handleSaveAvatar}>
                {imageuploading ? <Loader2 className="size-4 animate-spin" /> : "Save Picture"}
                </Button>
              </div>
            )}
          </div>
          <ProfileAvatar
            isediting
            name={data?.user?.contact_person ?? ""}
            userId={user_id ?? ""}
            logoUrl={data?.user?.profile_url ?? ""}
            pendingFile={pendingAvatarFile}
            onFileChange={(file) => { 
              setPendingAvatarFile(file); 
              setAvatarRemoved(false);
             }}
            onRemove={() => { setAvatarRemoved(true); setPendingAvatarFile(null); }}
          />
        </section>

        {/* ── Profile Info ── */}
        <section className={glassCard}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className={sectionTitle}><User className="w-3.5 h-3.5" /> Personal Info</p>
              <p className="text-white/40 text-xs mt-1">Your company and contact details</p>
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button type="button" onClick={handleCancelProfile} className={primaryBtn} variant="outline">Cancel</Button>
                <Button type="submit" form="company-profile-form"
                  disabled={isPending || !form.formState.isDirty} className={primaryBtn}>
                  {isPending ? <Loader2 className="size-4 animate-spin" /> : "Save Profile"}
                </Button>
              </div>
            ) : (
              <Button className={primaryBtn} onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </div>

          <Form {...form}>
            <form id="company-profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField control={form.control} name="contact_person" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelBase}>Contact Person</FormLabel>
                    <FormControl>
                      <div className="relative"><FieldIcon icon={User} />
                        <Input {...field} type="text" placeholder="Full name" disabled={!isEditing} className={inputBase} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )} />

                {/* ✅ Phone field now uses phoneWrapper — matches other fields exactly */}
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelBase}>Phone Number</FormLabel>
                    <FormControl>
                      <div className={`${phoneWrapper} ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <PhoneInput
                          international
                          defaultCountry="AE"
                          countryCallingCodeEditable={false}
                          placeholder="Phone number"
                          value={normalizePhoneNumberForDisplay(field.value)}
                          disabled={!isEditing}
                          onChange={(v) => field.onChange(removePlusPrefix(v))}
                          countrySelectComponent={MobileCountrySelect}
                          className="profile-phone-input flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/30 [&_input]:bg-transparent [&_input]:text-white [&_input]:outline-none [&_input]:border-none [&_input]:w-full"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField control={form.control} name="company_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelBase}>Company Name</FormLabel>
                    <FormControl>
                      <div className="relative"><FieldIcon icon={Building2} />
                        <Input {...field} type="text" placeholder="Your company" disabled={!isEditing} className={inputBase} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )} />

                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelBase}>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative"><FieldIcon icon={Mail} />
                        <Input {...field} type="email" placeholder="name@company.com" disabled={!isEditing} className={inputBase} />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-xs" />
                  </FormItem>
                )} />
              </div>
            </form>
          </Form>
        </section>

        {/* ── Security ── */}
        <section className={glassCard}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className={sectionTitle}><Lock className="w-3.5 h-3.5" /> Security Settings</p>
              <p className="text-white/40 text-xs mt-1">Update your account password</p>
            </div>
            {isEditingPassword ? (
              <div className="flex gap-2">
                <Button type="button" className={primaryBtn}
                  onClick={() => { passwordForm.reset(); passwordForm.clearErrors(); setIsEditingPassword(false); }}>
                  Cancel
                </Button>
                <Button type="submit" form="change-password-form"
                  disabled={isChangingPassword || !passwordForm.formState.isDirty} className={primaryBtn}>
                  {isChangingPassword ? <Loader2 className="size-4 animate-spin" /> : "Save Password"}
                </Button>
              </div>
            ) : (
              <Button className={primaryBtn}
                onClick={() => { passwordForm.reset(); passwordForm.clearErrors(); setIsEditingPassword(true); }}>
                Change Password
              </Button>
            )}
          </div>

          <Form {...passwordForm}>
            <form id="change-password-form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {([
                  { name: "old_password" as const, label: "Old Password", show: showOldPw, toggle: () => setShowOldPw(v => !v) },
                  { name: "new_password" as const, label: "New Password", show: showNewPw, toggle: () => setShowNewPw(v => !v) },
                ]).map(({ name, label, show, toggle }) => (
                  <FormField key={name} control={passwordForm.control} name={name} render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelBase}>{label}</FormLabel>
                      <FormControl>
                        <div className="relative"><FieldIcon icon={Lock} />
                          <Input type={show ? "text" : "password"} placeholder="••••••••••••"
                            {...field} value={field.value || ""} disabled={!isEditingPassword}
                            className={`${inputBase} pr-10`} />
                          <button type="button" onClick={toggle}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-primaryButton transition-colors">
                            {show ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
                          </button>
                        </div>
                      </FormControl>
                      <div className="min-h-5"><FormMessage className="text-red-400 text-xs" /></div>
                    </FormItem>
                  )} />
                ))}
              </div>
            </form>
          </Form>
        </section>
      </div>

      <ConfirmationDialogue
        open={showConfirmDialog}
        heading="Discard changes?"
        subheading="You have unsaved changes. Are you sure you want to discard them?"
        onConfirm={() => { form.reset(); setIsEditing(false); setShowConfirmDialog(false); }}
        onClose={() => setShowConfirmDialog(false)}
      />
    </div>
  );
}