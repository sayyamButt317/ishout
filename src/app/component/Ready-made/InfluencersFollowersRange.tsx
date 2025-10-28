import {
  microInfluencers,
  midTierInfluencers,
  macroInfluencers,
} from "@/src/constant/rangeoffollowers";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import { influencerCategories } from "@/src/constant/rangeoffollowers";
import React from "react";
import { CheckIcon } from "lucide-react";

export function InfluencersFollowersRange() {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedFollowers = getField("followers");

  return (
    <section className="group relative overflow-hidden rounded-3xl border  p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10 opacity-50" />
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-amber-400/20 to-orange-400/20 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-red-400/20 to-pink-400/20 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full text-black text-lg font-bold shadow-lg">
                3
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Follower Range
              </h2>
              <p className="text-amber-100/80 text-sm leading-relaxed max-w-md">
                Choose the follower count range for your target influencers.
                Different tiers offer unique advantages.
              </p>
            </div>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center gap-2 text-sm text-amber-200/70">
            <div className="h-1 w-1 rounded-full bg-amber-400" />
            <span>{selectedFollowers?.length || 0} ranges selected</span>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {influencerCategories?.map((category, categoryIndex) => (
            <div key={category?.title} className="relative">
              {/* Category Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`h-3 w-3 rounded-full bg-gradient-to-r ${category.color}`}
                  />
                  <h3 className="text-lg font-bold text-white">
                    {category?.title}
                  </h3>
                </div>
                <p className="text-amber-100/70 text-sm ml-6">
                  {category?.description}
                </p>
              </div>

              {/* Ranges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
                {category?.ranges?.map((followersRange, index) => {
                  const isSelected =
                    selectedFollowers?.includes(followersRange);
                  return (
                    <button
                      key={followersRange}
                      onClick={() => {
                        if (isSelected) {
                          removeFromArray("followers", followersRange);
                        } else {
                          addToArray("followers", followersRange);
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
                        animationDelay: `${categoryIndex * 100 + index * 30}ms`,
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
                      <div className="relative p-4 text-center">
                        <div className="text-sm font-bold text-white/90 group-hover:text-white transition-colors duration-200">
                          {followersRange}
                        </div>
                        <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-200 mt-1">
                          {category?.title === "Micro Influencers" &&
                            "High engagement"}
                          {category?.title === "Mid-tier Influencers" &&
                            "Balanced reach"}
                          {category?.title === "Macro Influencers" &&
                            "Massive reach"}
                        </div>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex items-center justify-between text-xs text-amber-200/60">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Mix different tiers for optimal campaign performance</span>
          </div>
          <div className="text-right">
            <span className="font-medium">
              {microInfluencers?.length +
                midTierInfluencers?.length +
                macroInfluencers?.length || 0}{" "}
              ranges available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
