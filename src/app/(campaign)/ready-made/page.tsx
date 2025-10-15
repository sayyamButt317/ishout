"use client";
import React from "react";
import CampaignName from "@/src/app/component/Ready-made/campaignCategory";
import { InfluencersFollowersRange } from "@/src/app/component/Ready-made/InfluencersFollowersRange";
import { NumberofInfluencers } from "@/src/app/component/Ready-made/NumberofInfluencers";
import { ChoosePlatform } from "@/src/app/component/Ready-made/platform";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import FindInfluencerResponsehook from "@/src/hooks/readymadeinfluencer.hook";
import Spinner from "../../component/spinner";
import { InfluencerCountry } from "../../component/Ready-made/country";

export default function CampaignPage() {
  const { platform, category, limit, followers, country } =
    useReadyMadeTemplateStore();
  const { mutateAsync: findInfluencer, isPending } =
    FindInfluencerResponsehook();
  const handleLaunchCampaign = async () => {
    await findInfluencer({ platform, category, limit, followers, country });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Create Your Campaign
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Build a targeted influencer campaign in just a few simple steps
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <ChoosePlatform />
          </div>
         
          <CampaignName />
          <InfluencersFollowersRange />
          <InfluencerCountry />
     
          <NumberofInfluencers />
        </div>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <button className="px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors">
            ← Back to Home
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => handleLaunchCampaign()}
              disabled={isPending}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-all font-semibold cursor-pointer"
            >
              {isPending ? <Spinner /> : "Launch Campaign"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
