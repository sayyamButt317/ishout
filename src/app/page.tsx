"use client";
import { useState } from "react";
import CustomButton from "./component/button";
import { ChooseCampaign } from "@/src/app/component/choosecampaign";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-foreground bg-background">
      <ChooseCampaign open={isOpen} onOpenChange={setIsOpen} />

      {/* Hero Section */}
      <section className=" w-full bg-background ">
        <div className="max-w-6xl mx-auto gap-10 items-center">
          <div className="flex flex-col items-center md:items-center justify-center py-20">
            <h1 className="italic text-Primary-text text-5xl font-thin text-center md:text-left drop-shadow-sm">
              Activate at Scale,1000 collaborations
            </h1>
            <h1 className="italic text-Pink-text text-4xl font-bold mt-3">
              One AI-Powered platform.
            </h1>
            <p className="italic mt-5 text-sm text-Secondary-text md:text-lg max-w-2xl text-center md:text-left">
              where brands build influence with data, spread and precision
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center md:items-stretch">
              <CustomButton
                className="bg-primaryButton hover:bg-primaryHover"
                onClick={() => setIsOpen(true)}
              >
                Book a Demo
              </CustomButton>
              <CustomButton
                className="bg-secondaryButton hover:bg-secondaryHover"
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
