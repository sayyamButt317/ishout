"use client";
import CustomButton from "./component/button";
import { ChooseCampaign } from "@/src/app/component/choosecampaign";
import Header from "./component/header";
import CaseStudies from "./(landingPage/casestudies";
import HowItWorks from "./(landingPage/howitswork";
import { useRouter } from "next/navigation";
export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="relative min-h-screen text-foreground bg-background">
      {/* <ChooseCampaign open={isOpen} onOpenChange={setIsOpen} /> */}

      <Header />
      <div className="flex flex-row gap-2 justify-end items-center p-4">
        <CustomButton
          onClick={() => router.push("/auth/login")}
          className="w-full sm:w-auto bg-secondaryButton hover:bg-secondaryHover"
        >
          Login
        </CustomButton>
        <CustomButton
          onClick={() => router.push("/auth/register")}
          className="w-full sm:w-auto bg-primaryButton hover:bg-primaryHover"
        >
          Register
        </CustomButton>
      </div>
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
              <CustomButton className="w-full sm:w-auto bg-primaryButton hover:bg-primaryHover">
                Book a Demo
              </CustomButton>
              <CustomButton
                className="w-full sm:w-auto bg-secondaryButton hover:bg-secondaryHover"
                // onClick={() => setIsOpen(true)}
              >
                Watch How it Works
              </CustomButton>
            </div>
            {/* <HowItWorks />
            <CaseStudies /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
