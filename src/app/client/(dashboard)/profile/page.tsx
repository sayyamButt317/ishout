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
import CustomButton from "@/src/app/component/button";
import CompanyProfileDetailsHook from "@/src/routes/Company/api/Hooks/get-profile.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CompanyUpdateProfileHook from "@/src/routes/Company/api/Hooks/update-profile.hook";

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { user_id } = useAuthStore();
  const { data, refetch, isRefetching } = CompanyProfileDetailsHook(user_id);
  const { mutate: updateProfile, isPending } =
    CompanyUpdateProfileHook(user_id);

  const form = useForm<CompanyProfileFormValidator>({
    resolver: zodResolver(CompanyProfileFormSchema),
    defaultValues: {
      company_name: data?.user?.company_name || "",
      contact_person: data?.user?.contact_person || "",
      phone: data?.user?.phone || "",
      email: data?.user?.email || "",
    },
  });

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
                    className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
                      isRefetching ? "animate-spin" : ""
                    }`}
                  />
                </Button>
              </div>
              <CustomButton
                className="bg-secondaryButton hover:bg-secondaryHover italic text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-1 sm:gap-2 rounded-md px-3 sm:px-4 md:px-6 h-8 sm:h-9 transition-all cursor-pointer"
                onClick={() => {
                  setIsEditing(!isEditing);
                  if (isEditing) {
                    updateProfile(form.getValues());
                    setIsEditing(false);
                  }
                }}
              >
                {isEditing ? (
                  isPending ? (
                    <Loader2 className="animate-spin text-white" />
                  ) : (
                    "Save Profile"
                  )
                ) : (
                  "Edit Profile"
                )}
              </CustomButton>
            </div>
            <p className="italic text-xs text-slate-200 mt-2">
              Update your profile information and contact details
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-6">
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
                            placeholder={data?.user?.contact_person || ""}
                            disabled={isEditing ? false : true}
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
                            placeholder={data?.user?.phone || ""}
                            disabled={isEditing ? false : true}
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
                          placeholder={data?.user?.company_name || ""}
                          disabled={isEditing ? false : true}
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
                          placeholder={data?.user?.email || ""}
                          disabled={isEditing ? false : true}
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
