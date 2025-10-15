"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./component/button";
import { ChooseCampaign } from "@/src/app/component/choosecampaign";

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative min-h-screen text-slate-900 bg-highlight-gradient">
      <ChooseCampaign open={isOpen} onOpenChange={setIsOpen} />

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 w-full bg-background-gradient">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center md:text-left text-colored bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-teal-600 to-sky-600 drop-shadow-sm">
              <span className="text-black">Activate on</span> on Instagram{" "}
              <span className="text-black">TikTok</span> and YouTube
            </h1>
            <p className="mt-5 text-slate-600 md:text-lg max-w-2xl text-center md:text-left">
              Launch data-driven campaigns, discover creators by followers,
              engagement and niche, and manage everything in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center md:items-stretch">
              <CustomButton onClick={() => setIsOpen(true)}>
                Start Campaign
              </CustomButton>
            </div>
          </div>

          <div className="relative">
            <Image
              src="/assets/landing.png"
              alt="campaign workflow preview"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-slate-200 bg-white/60 backdrop-blur">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} iShout. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <Link href="/docs">Docs</Link>
            <Link href="/video">Video</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
