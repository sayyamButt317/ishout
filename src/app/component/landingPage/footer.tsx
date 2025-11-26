import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col items-center">
        {/* heading section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 md:px-10 pt-20 pb-20 md:pt-24 md:pb-28 gap-12 mt-12 md:mt-0">
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
            <h1 className="text-4xl sm:text-4xl italic md:text-5xl font-bold text-gray-200 leading-tight text-center ">
              Ready to activate at scale?
            </h1>
            <p className="text-sm font-thin text-slate-100 max-w-xl italic mt-2 text-center">
              Join the brands transforming the influencer marketing with AI
            </p>
            <div className="border border-white/10 rounded-2xl p-1 shadow-lg">
              <Button className="bg-primaryButton hover:bg-primaryHover text-extrabold italic cursor-pointer rounded-lg text-white w-60">
                Book Your Demo
              </Button>
            </div>
            <p className="text-sm font-thin text-slate-100 max-w-xl italic mt-2 text-center">
              Let&apos;s Talk
            </p>
          </div>
        </div>
        <div className="z-10">
          <Image
            src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
            alt="leftVector"
            unoptimized={true}
            width={800}
            height={800}
            className="absolute left-0 top-0 h-full w-auto object-contain pointer-events-none opacity-70 mt-20"
            priority
          />
          <Image
            src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
            alt="rightVector"
            unoptimized={true}
            width={800}
            height={800}
            className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none opacity- mt-2"
            priority
          />
        </div>
      </section>
    </>
  );
}
