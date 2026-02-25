import React from "react";
import CustomButton from "../button";
import Spinner from "../custom-component/spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/campaign.store";
import { X } from "lucide-react";
import { toast } from "sonner";
import CreateCampaignHook from "@/src/routes/Company/api/Hooks/create-campaign.hook";
import useAuthStore from "@/src/store/AuthStore/authStore";

interface SummaryPopupProps {
  onClose: () => void;
}

const SummaryPopup = ({ onClose }: SummaryPopupProps) => {
  const {
    platform,
    category,
    limit,
    followers,
    country,
    clearTemplate,
    removeFromArray,
  } = useReadyMadeTemplateStore();

  const { company_name } = useAuthStore();
  const { mutateAsync: findInfluencer, isPending } = CreateCampaignHook();

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
      company_name: company_name,
    });
    clearTemplate();
    onClose();
  };

  const isFormComplete =
    platform?.length > 0 &&
    category?.length > 0 &&
    followers?.length > 0 &&
    country?.length > 0 &&
    limit;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 md:pt-12 p-4 md:p-6 lg:p-8 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl lg:max-w-3xl max-h-[80vh]">
        <div className="group rounded-3xl border border-white/20 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 shadow-2xl backdrop-blur-sm p-5 md:p-6 max-h-[80vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 via-transparent to-gray-500/10 opacity-50 rounded-3xl" />
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-slate-400/20 to-gray-400/20 blur-xl" />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-zinc-400/20 to-slate-400/20 blur-xl" />

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start justify-between mb-4 md:mb-5 gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-500 to-gray-600 rounded-full blur-sm opacity-75" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-slate-500 to-gray-600 text-white text-base font-bold shadow-lg">
                    📋
                  </div>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 tracking-tight">
                    Campaign Summary
                  </h3>
                  <p className="text-slate-100/80 text-xs leading-relaxed">
                    Review your campaign settings before launching
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all duration-200 self-end sm:self-start"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs mb-3 md:mb-4">
              <div
                className={`h-2 w-2 rounded-full ${isFormComplete ? "bg-green-400 animate-pulse" : "bg-amber-400"
                  }`}
              />
              <span
                className={`${isFormComplete ? "text-green-200" : "text-amber-200"
                  }`}
              >
                {isFormComplete ? "Ready to launch" : "Complete all fields"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-blue-400" />
                  <h4 className="text-xs font-semibold text-white">Platform</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {platform && Array.isArray(platform) && platform.length ? (
                    platform.map((platform, i) => (
                      <span
                      key={`${platform}-${i}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 px-2.5 py-1 text-blue-100 text-xs font-medium"
                    >
                      {platform}
                      <button
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                        onClick={() => removeFromArray("platform", platform)}
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs">Not selected</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  <h4 className="text-xs font-semibold text-white">Category</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category && Array.isArray(category) && category.length ? (
                    category.map((category, i) => (
                      <span
                        key={`${category}-${i}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 px-2.5 py-1 text-purple-100 text-xs font-medium"
                      >
                        {category}
                        <button
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                          onClick={() => removeFromArray("category", category)}
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs">Not selected</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400" />
                  <h4 className="text-xs font-semibold text-white">
                    Follower Range
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {followers && Array.isArray(followers) && followers.length ? (
                    followers?.map((follower, i) => (
                      <span
                        key={`${follower}-${i}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 px-2.5 py-1 text-amber-100 text-xs font-medium"
                      >
                        {follower}
                        <button
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                          onClick={() => removeFromArray("followers", follower)}
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs">Not selected</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400" />
                  <h4 className="text-xs font-semibold text-white">
                    Influencer Count
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {limit ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-400/30 px-2.5 py-1 text-emerald-100 text-xs font-medium">
                      {limit} influencers
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">Not selected</span>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 rounded-full bg-rose-400" />
                  <h4 className="text-xs font-semibold text-white">Countries</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {country && Array.isArray(country) && country.length ? (
                    country.map((country, i) => (
                      <span
                        key={`${country}-${i}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/30 px-2.5 py-1 text-rose-100 text-xs font-medium"
                      >
                        {country}
                        <button
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-200"
                          onClick={() => removeFromArray("country", country)}
                        >
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 text-xs">Not selected</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <CustomButton
                  onClick={() => clearTemplate()}
                  className="flex-1 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  Clear
                </CustomButton>
                <CustomButton
                  onClick={() => handleLaunchCampaign()}
                  disabled={!isFormComplete || isPending}
                  className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${isFormComplete
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25"
                      : "bg-slate-600 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size={16} />
                      Creating...
                    </div>
                  ) : (
                    "Create Campaign"
                  )}
                </CustomButton>
              </div>
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
      </div>
    </div>
  );
};

export default SummaryPopup;

