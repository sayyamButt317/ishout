import { INSTAGRAM_INFLUENCERS_COUNTRIES } from "@/src/constant/country";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import React from "react";
import SeletedItem from "../seleteditem";

export function InfluencerCountry() {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedCountry = getField("country");
  return (
    <section className=" rounded-2xl border p-6 shadow-sm bg-background bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
              4
            </span>
            <h2 className="text-lg font-semibold text-Primary-text">Country</h2>
          </div>
          <p className="text-sm text-Secondary-text">
            Pick the country of the influencers you want to target.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {INSTAGRAM_INFLUENCERS_COUNTRIES?.map((influencer_country) => (
          <SeletedItem
            key={influencer_country}
            item={influencer_country}
            color="bg-white hover:bg-gray-50 border border-slate-200 hover:border-primaryButton focus:ring-2 focus:ring-primaryButton focus:ring-offset-2"
            icon={
              <span className=" text-sm font-medium text-slate-700 group-hover:text-slate-900">
                {influencer_country}
              </span>
            }
            onClick={() => {
              if (selectedCountry?.includes(influencer_country)) {
                removeFromArray("country", influencer_country);
              } else {
                addToArray("country", influencer_country);
              }
            }}
            isSelected={selectedCountry?.includes(influencer_country)}
          />
        ))}
      </div>
    </section>
  );
}
