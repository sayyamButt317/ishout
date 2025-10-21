"use client";
import { useState } from "react";
import CustomButton from "./component/button";
import { ChooseCampaign } from "@/src/app/component/choosecampaign";
import Link from "next/link";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-foreground bg-background">
      <ChooseCampaign open={isOpen} onOpenChange={setIsOpen} />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 items-center justify-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center">
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-white hover:text-pink-400 transition-colors"
            >
              About US
            </Link>
            <Link
              href="#how-it-works"
              className="text-white hover:text-pink-400 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#case-studies"
              className="text-white hover:text-pink-400 transition-colors"
            >
              Case Studies
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 gap-10 items-center">
          <div className="flex flex-col items-center md:items-center justify-center py-14 sm:py-16 md:py-20">
            <h1 className="italic text-Primary-text text-3xl sm:text-4xl md:text-5xl font-thin text-center drop-shadow-sm">
              Activate at Scale,1000 collaborations
            </h1>
            <h1 className="italic text-Pink-text text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 text-center">
              One AI-Powered platform.
            </h1>
            <p className="italic mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-Secondary-text max-w-2xl text-center">
              where brands build influence with data, spread and precision
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center">
              <CustomButton
                className="w-full sm:w-auto bg-primaryButton hover:bg-primaryHover"
                onClick={() => setIsOpen(true)}
              >
                Book a Demo
              </CustomButton>
              <CustomButton
                className="w-full sm:w-auto bg-secondaryButton hover:bg-secondaryHover"
                onClick={() => setIsOpen(true)}
              >
                Watch How it Works
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
