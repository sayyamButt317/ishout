import { NumberofFollowers } from "@/src/constant/numberofInfluencers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import React from "react";

export function NumberofInfluencers() {
  const { setField } = useReadyMadeTemplateStore();
  return (
    <section className=" rounded-2xl border p-6 shadow-sm bg-background bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primaryButton text-white text-xs font-semibold">
              5
            </span>
            <h2 className="text-lg font-semibold text-Primary-text">
              Number of Influencers
            </h2>
          </div>
          <p className="text-sm text-Secondary-text">Pick a number.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {NumberofFollowers?.map((influencer) => (
          <button
            key={influencer}
            onClick={() => setField("limit", influencer)}
            className="group rounded-xl border border-slate-200 bg-white p-3 sm:p-4 transition-all hover:shadow-md hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <span className="block w-full text-left text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">
              {influencer}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
