import { NumberofFollowers } from "@/src/constant/numberofInfluencers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { CheckIcon } from "lucide-react";
import React from "react";

export function NumberofInfluencers() {
  const { setField, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedLimit = getField("limit");

  return (
    <section className="group relative overflow-hidden rounded-3xl border  to-white p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-50" />
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full text-black text-lg font-bold shadow-lg">
                5
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Influencer Count
              </h2>
              <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md">
                Choose how many influencers you want to find for your campaign.
                More influencers mean broader reach.
              </p>
            </div>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center gap-2 text-sm text-emerald-200/70">
            <div className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>
              {selectedLimit
                ? `${selectedLimit} influencers selected`
                : "No count selected"}
            </span>
          </div>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {NumberofFollowers?.map((number, index) => {
            const isSelected = selectedLimit === number;
            return (
              <button
                key={number}
                onClick={() => {
                  if (isSelected) {
                    removeFromArray("limit", number);
                  } else {
                    setField("limit", number);
                  }
                }}
                className={`
                  group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ease-out
                  ${
                    isSelected
                      ? "border-emerald-400 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 shadow-lg shadow-emerald-500/25"
                      : "border-white/20 bg-white/5 hover:border-emerald-300/50 hover:bg-white/10"
                  }
                  hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20
                  focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-slate-900
                  active:scale-95
                `}
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg">
                      <CheckIcon className="h-3 w-3 text-black" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative p-2 text-center">
                  <div className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-200">
                    {number}
                  </div>
                  <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-200 mt-1">
                    {number === "1" ? "influencer" : "influencers"}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex items-center justify-between text-xs text-emerald-200/60">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Recommended: 5-15 influencers for optimal results</span>
          </div>
          <div className="text-right">
            <span className="font-medium">
              {NumberofFollowers?.length || 0} options available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
