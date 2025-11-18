"use client";
import React from "react";
import CampaignName from "@/src/app/component/Ready-made/campaignCategory";
import { InfluencersFollowersRange } from "@/src/app/component/Ready-made/InfluencersFollowersRange";
import { NumberofInfluencers } from "@/src/app/component/Ready-made/NumberofInfluencers";
import { ChoosePlatform } from "@/src/app/component/Ready-made/platform";
import { InfluencerCountry } from "@/src/app/component/Ready-made/country";
import Summary from "@/src/app/component/Ready-made/summary";

export default function ClientCampaign() {
  return (
    <div className="min-h-screen ">
      <main className=" mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 ">
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
