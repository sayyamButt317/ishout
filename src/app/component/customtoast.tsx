import { Toaster } from "@/components/ui/sonner";

export default function CustomToast() {
  return (
    <Toaster
      position="bottom-right"
      closeButton
      expand
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "!relative !rounded-2xl !px-5 !py-4 !text-white !shadow-2xl !border-0 backdrop-blur-xl",

          success:
            "!bg-gradient-to-br !from-emerald-500/90 !to-emerald-700/90 !shadow-[0_8px_30px_rgba(16,185,129,0.35)]",

          error:
            "!bg-gradient-to-br !from-red-500/90 !to-rose-700/90 !shadow-[0_8px_30px_rgba(239,68,68,0.35)]",

          warning:
            "!bg-gradient-to-br !from-amber-400/90 !to-orange-600/90 !shadow-[0_8px_30px_rgba(245,158,11,0.35)]",

          info:
            "!bg-gradient-to-br !from-sky-500/90 !to-indigo-600/90 !shadow-[0_8px_30px_rgba(59,130,246,0.35)]",

          title:
            "!text-sm !font-semibold !tracking-wide !text-white",

          description:
            "!text-xs !text-white/80",

          actionButton:
            "!bg-white/20 !text-white !hover:bg-white/30 !rounded-md !px-3 !py-1.5",

          cancelButton:
            "!bg-black/20 !text-white !hover:bg-black/30 !rounded-md",

          // 👇 FLOATING CLOSE BUTTON
          closeButton:
            "!absolute !-top-3 !-right-3 !bg-white !text-[#170f49] !rounded-full !w-7 !h-7 !flex !items-center !justify-center !shadow-lg hover:!scale-110 transition-transform z-50",
        },
      }}
    />
  );
}