import { Platforms } from "@/src/constant/platform";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { CheckIcon } from "lucide-react";

export function ChoosePlatform() {
  const { addToArray, getField, removeFromArray } = useReadyMadeTemplateStore();
  const selectedPlatform = getField("platform");

  return (
    <div className="group relative overflow-hidden rounded-3xl border p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-orange-500/10 opacity-50" />
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-rose-400/20 to-pink-400/20 blur-xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-orange-400/20 to-yellow-400/20 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-sm opacity-75" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full text-black text-lg font-bold shadow-lg">
                1
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                Choose Platform
              </h2>
              <p className="text-rose-100/80 text-sm leading-relaxed max-w-md">
                Select the social media platforms where you want to find
                influencers. Each platform has its own unique audience.
              </p>
            </div>
          </div>

          {/* Selection Counter */}
          <div className="flex items-center gap-2 text-sm text-rose-200/70">
            <div className="h-1 w-1 rounded-full bg-rose-400" />
            <span>{selectedPlatform?.length || 0} platforms selected</span>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Platforms?.map((platform, index) => {
            const isSelected = selectedPlatform?.includes(platform?.name);
            return (
              <button
                key={platform?.name}
                onClick={() => {
                  if (isSelected) {
                    removeFromArray("platform", platform?.name);
                  } else {
                    addToArray("platform", platform?.name);
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
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg">
                      <CheckIcon className="h-3 w-3 text-black" />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative p-6 text-center">
                  <div className="text-4xl mb-3">{platform?.icon}</div>
                  <div className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors duration-200">
                    {platform?.name}
                  </div>
                  <div className="text-xs text-white/70 group-hover:text-white/90 transition-colors duration-200 mt-1">
                    {platform?.name === "Instagram"}
                    {platform?.name === "TikTok"}
                    {platform?.name === "YouTube"}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex items-center justify-between text-xs text-rose-200/60">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Multi-platform campaigns reach broader audiences</span>
          </div>
          <div className="text-right">
            <span className="font-medium">
              {Platforms?.length || 0} platforms available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
