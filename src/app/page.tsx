"use client";
import CustomButton from "./component/button";
import Header from "./component/header";
import HowItWorks from "@/src/app/component/landingPage/howitswork";
import Image from "next/image";
import Video from "./component/video";
import VideoCarousel from "./component/custom-component/video-carousel";
import { CaseStudiesVideos, ReachGCCVideos } from "../helper/videoUrls";
import Footer from "./component/landingPage/footer";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden text-white">
      <Header />
      <section className="relative w-full min-h-screen flex flex-col items-center">
        <Image
          src="/assets/leftVector.svg"
          alt="leftVector"
          loading="lazy"
          width={800}
          height={800}
          className="absolute left-0 top-0 h-full w-auto object-contain pointer-events-none opacity-70"
        />
        <Image
          src="/assets/rightVector.svg"
          alt="rightVector"
          loading="lazy"
          width={800}
          height={800}
          className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none opacity-70"
        />
        {/* heading section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl w-full px-6 md:px-10 pt-20 pb-20 md:pt-24 md:pb-28 gap-12 mt-12 md:mt-0">
          <div className="flex-1 flex flex-col justify-center items-start text-left space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl italic font-thin text-gray-200 leading-tight">
              Activate at Scale, 1,000 collaborations
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl italic font-bold mt-4">
              One AI-powered platform.
            </h2>
            <p className="text-base font-thin sm:text-lg text-slate-100 max-w-xl italic mt-4">
              Where brands build influence with data, speed, and precision.
            </p>
            <CustomButton className="mt-6 bg-primaryButton hover:bg-primaryHover cursor-pointer rounded-full">
              Book a Demo
            </CustomButton>
          </div>
          <div className="flex-1 flex justify-center md:justify-end items-center relative">
            <Video />
          </div>
        </div>
      </section>
      <HowItWorks />
      <div className="w-full h-full py-20">
        <h2 className="italic text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
          Case Studies
        </h2>
        <p className="italic mt-4 text-center justify-center items-center text-neutral-600 dark:text-neutral-400 text-base md:text-md font-sans max-w-2xl mx-auto">
          <span className="font-bold">Proven Results at Scale,</span>
          <span className="font-thin justify-center items-center">
            We &apos;ve helped over 600 brands amplify their reach and
            performance with <span className="font-bold">AI-powered </span>
            influencers. marketing
          </span>
        </p>
      </div>
      <VideoCarousel
        heading="3x engagement in 2 weeks"
        videos={CaseStudiesVideos}
      />
      <VideoCarousel heading="10M+ reach across GCC" videos={ReachGCCVideos} />
      <Footer />
    </div>
  );
}
