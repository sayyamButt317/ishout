import React from "react";
import { campaignNames, getCategoryIcon } from "@/src/constant/campaignname";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { CheckIcon } from "lucide-react";

const CampaignCategoryComponent = () => {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedCategory = getField("category");

  return (
    <section className="group relative overflow-hidden rounded-3xl border p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10 opacity-50" />
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400/20 to-violet-400/20 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full  text-black text-lg font-bold shadow-lg">
                2
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Campaign Category
              </h2>
              <p className="text-purple-100/80 text-sm leading-relaxed max-w-md">
                Choose the category that best represents your campaign. This
                helps us find the most relevant influencers.
              </p>
            </div>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center gap-2 text-sm text-purple-200/70">
            <div className="h-1 w-1 rounded-full bg-purple-400" />
            <span>{selectedCategory?.length || 0} categories selected</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {campaignNames?.map((category, index) => {
            const isSelected = selectedCategory?.includes(category);
            return (
              <button
                key={category}
                onClick={() => {
                  if (isSelected) {
                    removeFromArray("category", category);
                  } else {
                    addToArray("category", category);
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
                  animationDelay: `${index * 50}ms`,
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
                  <div className="text-3xl mb-2">
                    {getCategoryIcon(category)}
                  </div>
                  <div className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-200 leading-tight">
                    {category}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex items-center justify-between text-xs text-purple-200/60">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>
              Categories help match your brand with relevant influencers
            </span>
          </div>
          <div className="text-right">
            <span className="font-medium">
              {campaignNames?.length || 0} categories available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignCategoryComponent;
