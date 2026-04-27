import { toast } from "sonner";

const openWhatsApp = () => {
  try {
    const phoneNumber = "971503054372";

    const message = encodeURIComponent("Hello ishout create campaign for me.");
    const whatsappURL =
      typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)
        ? `https://wa.me/${phoneNumber}?text=${message}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappURL, "ishout_whatsapp", "width=1024,height=768");
  } catch (error) {
    toast.error("Error opening WhatsApp", {
      description: error as string,
    });
  }
};

export default openWhatsApp;
