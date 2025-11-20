"use client";
import { Button } from "@/components/ui/button";
import Spinner from "@/src/app/component/custom-component/spinner";
import { getPhoneCodeByCountry } from "@/src/helper/phoneCodes";
import { AdminCompanyDetailsByIdApi } from "@/src/routes/Admin/API/admin.routes";
import { useMutation } from "@tanstack/react-query";
import { SiWhatsapp } from "react-icons/si";
import { toast } from "sonner";

type BaseButtonProps = React.ComponentProps<typeof Button>;

interface Props extends Omit<BaseButtonProps, "onClick"> {
  userId: string;
  fallbackMessage?: string;
}

export const WhatsAppShareButton = ({
  userId,
  fallbackMessage = "this is from Ishout.",
  variant = "ghost",
  size = "icon",
  className,
  disabled,
  ...buttonProps
}: Props) => {
  const shareMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("Missing user id");
      }
      return AdminCompanyDetailsByIdApi(userId);
    },
  });

  const handleShare = async () => {
    try {
      const data = await shareMutation.mutateAsync();
      if (!data?.phone) {
        throw new Error("Phone number not available");
      }

      const rawPhone = String(data.phone).trim();
      const digitsOnly = rawPhone.replace(/\D/g, "");

      if (!digitsOnly) {
        throw new Error("Invalid phone number format");
      }

      const firstCountryValue =
        (Array.isArray(data?.country) ? data.country[0] : data?.country) ??
        data?.country_name ??
        data?.country_code ??
        data?.countryCode;

      const normalizedCountry =
        typeof firstCountryValue === "string" ? firstCountryValue : undefined;

      const dialCode = normalizedCountry
        ? getPhoneCodeByCountry(normalizedCountry)
        : undefined;

      let formattedPhone: string | null = null;

      if (rawPhone.startsWith("+")) {
        formattedPhone = digitsOnly;
      } else if (rawPhone.startsWith("00")) {
        formattedPhone = digitsOnly.substring(2);
      } else if (!rawPhone.startsWith("0")) {
        formattedPhone = digitsOnly;
      } else {
        if (!dialCode) {
          throw new Error(
            "Missing country dialing code. Please save number with country code."
          );
        }
        const stripped = digitsOnly.replace(/^0+/, "");
        if (!stripped) {
          throw new Error("Invalid phone number format");
        }
        formattedPhone = `${dialCode}${stripped}`;
      }

      if (!formattedPhone || formattedPhone.length < 8) {
        throw new Error("Phone number is not in a valid WhatsApp format");
      }

      const message = encodeURIComponent(
        `Hello ${data?.contact_person ?? ""}, ${fallbackMessage}`
      );
      const whatsappWebURL = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${message}`;

      const targetName = "ishout_whatsapp_chat";
      const windowFeatures = "width=1024,height=768";

      let targetWindow = window.open("", targetName);

      if (!targetWindow || targetWindow.closed) {
        targetWindow = window.open(whatsappWebURL, targetName, windowFeatures);
      } else {
        targetWindow.location.href = whatsappWebURL;
      }

      targetWindow?.focus();
    } catch (error) {
      toast.error("Unable to open WhatsApp", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleShare}
      disabled={disabled || !userId || shareMutation.isPending}
      {...buttonProps}
    >
      {shareMutation.isPending ? (
        <Spinner size={14} />
      ) : (
        <SiWhatsapp className="h-4 w-4 text-green-500" />
      )}
    </Button>
  );
};
