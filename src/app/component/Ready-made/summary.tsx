import React from "react";
import CustomButton from "../button";
import Spinner from "../spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import FindInfluencerResponsehook from "@/src/routes/Admin/Hooks/readymadeinfluencer.hook";
import { X } from "lucide-react";
import { toast } from "sonner";

const Summary = () => {
  const {
    platform,
    category,
    limit,
    followers,
    country,
    clearTemplate,
    removeFromArray,
  } = useReadyMadeTemplateStore();
  const { mutateAsync: findInfluencer, isPending } =
    FindInfluencerResponsehook();

  const handleLaunchCampaign = async () => {
    if (!platform || !category || !followers || !country || !limit) {
      toast.error(`Please select all fields to launch campaign`);
      return;
    }
    await findInfluencer({
      platform: platform,
      category: category,
      limit: limit,
      followers: followers,
      country: country,
      is_campaign_create: true,
    });
  };

  const isFormComplete =
    platform?.length > 0 &&
    category?.length > 0 &&
    followers?.length > 0 &&
    country?.length > 0 &&
    limit;

  return (
    <aside className="lg:col-span-4">
      <div className="sticky top-8 group overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-gray-500/10 opacity-50" />
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-slate-400/20 to-gray-400/20 blur-xl" />
        <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-zinc-400/20 to-slate-400/20 blur-xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full blur-sm opacity-75" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-slate-500 to-gray-600 text-white text-lg font-bold shadow-lg">
                  📋
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  Campaign Summary
                </h3>
                <p className="text-slate-100/80 text-sm leading-relaxed">
                  Review your campaign settings before launching
                </p>
              </div>
            </div>

            {/* Completion Status */}
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`h-2 w-2 rounded-full ${
                  isFormComplete ? "bg-green-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span
                className={`${
                  isFormComplete ? "text-green-200" : "text-amber-200"
                }`}
              >
                {isFormComplete ? "Ready to launch" : "Complete all fields"}
              </span>
            </div>
          </div>

          {/* Summary Sections */}
          <div className="space-y-6">
            {/* Platform */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <h4 className="text-sm font-semibold text-white">Platform</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {platform && Array.isArray(platform) && platform.length ? (
                  platform.map((platform, i) => (
                    <span
                      key={`${platform}-${i}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 px-3 py-1.5 text-blue-100 text-sm font-medium"
                    >
                      {platform}
                      <button
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                        onClick={() => removeFromArray("platform", platform)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">Not selected</span>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-purple-400" />
                <h4 className="text-sm font-semibold text-white">Category</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category && Array.isArray(category) && category.length ? (
                  category.map((category, i) => (
                    <span
                      key={`${category}-${i}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-3 py-1.5 text-purple-100 text-sm font-medium"
                    >
                      {category}
                      <button
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                        onClick={() => removeFromArray("category", category)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">Not selected</span>
                )}
              </div>
            </div>

            {/* Followers */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <h4 className="text-sm font-semibold text-white">
                  Follower Range
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {followers && Array.isArray(followers) && followers.length ? (
                  followers?.map((follower, i) => (
                    <span
                      key={`${follower}-${i}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 px-3 py-1.5 text-amber-100 text-sm font-medium"
                    >
                      {follower}
                      <button
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                        onClick={() => removeFromArray("followers", follower)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">Not selected</span>
                )}
              </div>
            </div>

            {/* Limit */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <h4 className="text-sm font-semibold text-white">
                  Influencer Count
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {limit ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-3 py-1.5 text-emerald-100 text-sm font-medium">
                    {limit} influencers
                  </span>
                ) : (
                  <span className="text-slate-400 text-sm">Not selected</span>
                )}
              </div>
            </div>

            {/* Country */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-rose-400" />
                <h4 className="text-sm font-semibold text-white">Countries</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {country && Array.isArray(country) && country.length ? (
                  country.map((country, i) => (
                    <span
                      key={`${country}-${i}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/30 px-3 py-1.5 text-rose-100 text-sm font-medium"
                    >
                      {country}
                      <button
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                        onClick={() => removeFromArray("country", country)}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-sm">Not selected</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <div className="flex gap-3">
              <CustomButton
                onClick={() => clearTemplate()}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                Clear All
              </CustomButton>
              <CustomButton
                onClick={() => handleLaunchCampaign()}
                disabled={!isFormComplete || isPending}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                  isFormComplete
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25"
                    : "bg-slate-600 text-slate-400 cursor-not-allowed"
                }`}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    Launching...
                  </div>
                ) : (
                  "Launch Campaign"
                )}
              </CustomButton>
            </div>

            {/* Status Message */}
            <div className="text-center">
              <p className="text-xs text-slate-400">
                {isFormComplete
                  ? "🎉 Your campaign is ready to launch!"
                  : "Complete all fields above to launch your campaign"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Summary;
