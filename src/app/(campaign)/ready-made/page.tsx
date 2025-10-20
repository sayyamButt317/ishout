"use client";
import React from "react";
import CampaignName from "@/src/app/component/Ready-made/campaignCategory";
import { InfluencersFollowersRange } from "@/src/app/component/Ready-made/InfluencersFollowersRange";
import { NumberofInfluencers } from "@/src/app/component/Ready-made/NumberofInfluencers";
import { ChoosePlatform } from "@/src/app/component/Ready-made/platform";
import { InfluencerCountry } from "../../component/Ready-made/country";
import Summary from "../../component/Ready-made/summary";

export default function CampaignPage() {
  return (
    <div className="min-h-screen ">
      <header className="border-b border-section-overlays bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-Primary-text">
            Create Your Campaign
          </h1>
          <p className="text-Secondary-text mt-2">
            Build a targeted influencer campaign in just a few simple steps
          </p>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 ">
        <section className="lg:col-span-8 space-y-6">
          <ChoosePlatform />
          <CampaignName />
          <InfluencersFollowersRange />
          <InfluencerCountry />
          <NumberofInfluencers />
        </section>
        <Summary />
      </main>
    </div>
  );
}
