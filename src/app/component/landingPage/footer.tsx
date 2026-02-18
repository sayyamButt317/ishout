import { Button } from '@/components/ui/button';
import Image from 'next/image';
import CustomButton from '../button';
import CalendlyDemo from '../calendly-demo';

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

        <CalendlyDemo>
          {/* Layer 1: The New Outer-most Border */}
          <div className="mt-6 p-[6px] border border-white/15 rounded-[22px] inline-block">
            {/* Layer 2: Middle Border */}
            <div className="p-[8px] border border-white/30 rounded-[20px] inline-block">
              <CustomButton
                className="
          bg-[#ff3b8d]
          hover:bg-[#ff5a9e]
          cursor-pointer
          rounded-[14px]
          h-14
          px-20
          text-xl
          font-extrabold
          italic
          text-white

          /* Base glow - subtle */
          shadow-[0_0_12px_rgba(255,255,255,0.25),0_0_25px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.08)]

          /* Hover glow - soft but visible */
          hover:shadow-[0_0_20px_rgba(255,255,255,0.45),0_0_40px_rgba(255,255,255,0.25),0_0_60px_rgba(255,255,255,0.12)]

          transition-all
          duration-150
        "
              >
                Book a Demo
              </CustomButton>
            </div>
          </div>
        </CalendlyDemo>
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
