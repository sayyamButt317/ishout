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
  Phone,
  RefreshCcw,
  User,
} from "lucide-react";
import {
  CompanyProfileFormSchema,
  CompanyProfileFormValidator,
} from "@/src/validators/Company/profileschema-validation";
import CompanyProfileDetailsHook from "@/src/routes/Company/api/Hooks/get-profile.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import CompanyUpdateProfileHook from "@/src/routes/Company/api/Hooks/update-profile.hook";

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
    updateProfile(values, {
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-300">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                          <Input
                            {...field}
                            type="tel"
                            placeholder="971 9876543210"
                            disabled={!isEditing}
                            className="pl-10 h-11 bg-neutral-950 border-white/10 text-white focus:ring-2 focus:ring-secondaryButton"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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
