'use client';
import CustomButton from './component/button';
import Header from './component/header';
import HowItWorks from '@/src/app/component/landingPage/howitswork';
import Image from 'next/image';
import Video from './component/video';
import VideoCarousel from './component/custom-component/video-carousel';
import { CaseStudiesVideos, ReachGCCVideos } from '../constant/videoUrls';
import Footer from './component/landingPage/footer';
import LogoFooter from './component/logo-footer';
import CalendlyDemo from './component/calendly-demo';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden bg-linear-to-b from-black to-black text-white font-family-poppins">
      <Header />
      <section className="relative w-full flex flex-col items-center pt-35 pb-40 md:pt-20 md:pb-30 overflow-hidden">
        <Image
          src="https://ik.imagekit.io/dtdxnyskk/leftVector.svg"
          alt="leftVector"
          unoptimized={true}
          loading="lazy"
          width={800}
          height={800}
          className="absolute left-0 top-20 h-full w-auto object-contain pointer-events-none opacity-70"
        />
        <Image
          src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
          alt="rightVector"
          unoptimized={true}
          loading="lazy"
          width={800}
          height={800}
          className="absolute right-0 top-20 h-full w-auto object-contain pointer-events-none opacity-70"
        />
        {/* heading section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 md:px-10 pt-10 pb-20 md:pb-28 gap-12 mt-12 md:mt-0">
          <div className="flex-1 flex flex-col justify-center items-start text-left space-y-4">
            <h1 className="text-6xl font-extralight text-transparent bg-clip-text bg-linear-to-r from-gray-500  to-white italic" >
              Activate at Scale, 1,000 <br/> collaborations
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-4xl italic font-extrabold tracking-[2] text-transparent bg-clip-text bg-linear-to-r from-gray-300 via-white to-slate-300">
              One AI-powered platform.
            </h2>
            <p className="text-xs font-thin sm:text-lg text-slate-100 md:text-sm italic ">
              Where brands build influence with data, speed, and precision.
            </p>
            <CalendlyDemo>
                <div className="p-1.5 border border-white/30 rounded-[20px] inline-block">
                  <CustomButton
                    className="bg-[#ff3b8d] hover:bg-[#ff5a9e] cursor-pointer rounded-[14px] h-12 px-20 text-xl font-extrabold italic text-white
    shadow-none hover:shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_30px_rgba(255,59,141,0.6),0_0_50px_rgba(255,59,141,0.3)] transition-all duration-300 ease-out"
                  >
                    Book a Demo
                  </CustomButton>
              </div>
            </CalendlyDemo>
          </div>
          <div className="flex-1 flex justify-center md:justify-end items-center relative">
            <Video />
          </div>
        </div>
      </section>
      <HowItWorks id="how-it-works" />
      <div id="case-studies" className="w-full h-full py-20">
        <h2 className="italic text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Case Studies
        </h2>
        <p className="italic mt-4 text-center justify-center items-center text-neutral-600 dark:text-neutral-400 text-base md:text-md font-sans max-w-2xl mx-auto">
          <span className="font-bold">Proven Results at Scale, </span>
          <span className="font-thin justify-center items-center">
            We &apos;ve helped over 600 brands amplify their reach and performance with{' '}
            <span className="font-bold">AI-powered </span>
            influencers. marketing
          </span>
        </p>
      </div>
      <VideoCarousel
        id="case-studies"
        heading="3x engagement in 2 weeks"
        videos={CaseStudiesVideos}
      />
      <VideoCarousel heading="10M+ reach across GCC" videos={ReachGCCVideos} />
      <Footer />
      <LogoFooter />
    </div>
  );
}
