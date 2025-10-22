import {
  microInfluencers,
  midTierInfluencers,
  macroInfluencers,
} from "@/src/constant/rangeoffollowers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import React from "react";
import SeletedItem from "../seleteditem";

export function InfluencersFollowersRange() {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedFollowers = getField("followers");

  const influencerCategories = [
    { title: "Micro Influencers", ranges: microInfluencers },
    { title: "Mid-tier Influencers", ranges: midTierInfluencers },
    { title: "Macro Influencers", ranges: macroInfluencers },
  ];

  return (
    <section className=" rounded-2xl bordershadow-sm bg-background p-6 bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
              3
            </span>
            <h2 className="text-lg font-semibold text-Primary-text">
              Followers Range
            </h2>
          </div>
          <p className="text-sm text-Secondary-text">
            Select from different influencer tiers based on their follower
            count.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {influencerCategories?.map((category) => (
          <div key={category?.title} className="space-y-3 ">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-sm font-semibold text-Primary-text">
                {category?.title}
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
              {category?.ranges?.map((followersRange) => (
                <SeletedItem
                  key={followersRange}
                  item={followersRange}
                  color="bg-white hover:bg-gray-50 border border-slate-200 hover:border-primaryButton focus:ring-2 focus:ring-primaryButton focus:ring-offset-2"
                  icon={
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                      {followersRange}
                    </span>
                  }
                  isSelected={selectedFollowers?.includes(followersRange)}
                  onClick={() => {
                    if (selectedFollowers?.includes(followersRange)) {
                      removeFromArray("followers", followersRange);
                    } else {
                      addToArray("followers", followersRange);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
