import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <section className="relative w-full flex flex-col items-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl w-full px-4 sm:px-6 md:px-10 py-16 md:py-24 gap-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold italic text-gray-200 leading-tight">
          Ready to activate at scale?
        </h1>

        <p className="text-xs sm:text-sm font-thin italic text-slate-100 max-w-md">
          Join the brands transforming the influencer marketing with AI
        </p>

        <div className="border border-white/10 rounded-2xl p-1 shadow-lg">
          <Button className="bg-primaryButton hover:bg-primaryHover italic text-white w-52 sm:w-60 rounded-lg">
            Book Your Demo
          </Button>
        </div>

        <p className="text-xs sm:text-sm font-thin italic text-slate-100">
          Let&apos;s Talk
        </p>
      </div>

      {/* Left Vector */}
      <Image
        src="https://ik.imagekit.io/dtdxnyskk/leftVector.svg"
        alt="leftVector"
        unoptimized
        width={800}
        height={800}
        className="
          absolute left-0 top-20
          h-[60%] sm:h-[70%] md:h-full
          w-auto
          opacity-30 sm:opacity-40 md:opacity-70
          pointer-events-none
        "
      />

      {/* Right Vector */}
      <Image
        src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
        alt="rightVector"
        unoptimized
        width={800}
        height={800}
        className="
          absolute right-0 top-24
          h-[55%] sm:h-[70%] md:h-full
          w-auto
          opacity-30 sm:opacity-40 md:opacity-70
          pointer-events-none
        "
      />
    </section>
  );
}
