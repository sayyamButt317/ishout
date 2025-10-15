import { NumberofFollowers } from "@/src/constant/numberofInfluencers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import React from "react";

export function NumberofInfluencers() {
  const { setField } = useReadyMadeTemplateStore();
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Choose Number of Influencers</h3>
          <p className="text-sm text-slate-600">Pick 1, 2, 5, 10 or a custom number.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {NumberofFollowers.map((influencer) => (
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
