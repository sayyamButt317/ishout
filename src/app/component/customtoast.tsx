import { Toaster } from "@/components/ui/sonner";

export default function CustomToast() {
  return (
    <Toaster
      richColors
      closeButton
      toastOptions={{
        unstyled: false,
        classNames: {
          toast: "!bg-background !text-foreground !border",
          title: "!font-medium",
          description: "!text-muted-foreground",
        },
      }}
    />
  );
}
