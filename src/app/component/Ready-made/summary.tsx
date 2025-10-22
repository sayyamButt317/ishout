import React from "react";
import CustomButton from "../button";
import Spinner from "../spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import FindInfluencerResponsehook from "@/src/hooks/readymadeinfluencer.hook";
import { X } from "lucide-react";

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
    await findInfluencer({
      platform: platform,
      category: category,
      limit: limit,
      followers: followers,
      country: country,
      is_campaign_create: true,
    });
  };
  return (
    <>
      {/* Summary */}
      <aside className="lg:col-span-4 ">
        <div className="sticky top-24 rounded-xl border border-section-overlays bg-background p-6 bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
          <h3 className="text-lg font-semibold text-Primary-text">Summary</h3>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-Secondary-text mb-2">Platform</p>
              <div className="flex flex-wrap gap-2">
                {platform && Array.isArray(platform) && platform.length ? (
                  platform.map((platform, i) => (
                    <span
                      key={`${platform}-${i}`}
                      className="inline-flex items-center rounded-full border border-white px-2.5 py-1 text-Primary-text "
                    >
                      {platform}
                      <button
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => removeFromArray("platform", platform)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-Secondary-text">Not selected</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-Secondary-text mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {category && Array.isArray(category) && category.length ? (
                  category.map((category, i) => (
                    <span
                      key={`${category}-${i}`}
                      className="inline-flex items-center rounded-full border border-white px-2.5 py-1 text-Primary-text"
                    >
                      {category}
                      <button
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => removeFromArray("category", category)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-Secondary-text">Not selected</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-Secondary-text mb-2">Followers</p>
              <div className="flex flex-wrap gap-2">
                {followers && Array.isArray(followers) && followers.length ? (
                  followers?.map((follower, i) => (
                    <span
                      key={`${follower}-${i}`}
                      className="inline-flex items-center rounded-full border border-white px-2.5 py-1 text-Primary-text"
                    >
                      {follower}
                      <button
                        className="w-4 h-4 cursor-pointer ml-1"
                        onClick={() => removeFromArray("followers", follower)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-Secondary-text">Not selected</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-Secondary-text mb-2">Limit</p>
              <span className="inline-block rounded-md border border-section-overlays px-2.5 py-1 text-Primary-text min-h-8">
                {limit || "Not selected"}
              </span>
            </div>

            <div>
              <p className="text-Secondary-text mb-2">Country</p>
              <div className="flex flex-wrap gap-2">
                {country && Array.isArray(country) && country.length ? (
                  country.map((country, i) => (
                    <span
                      key={`${country}-${i}`}
                      className="inline-flex items-center rounded-full border border-white px-2.5 py-1 text-Primary-text"
                    >
                      {country}
                      <button
                        className="w-4 h-4 cursor-pointer"
                        onClick={() => removeFromArray("country", country)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-Secondary-text">Not selected</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <CustomButton
              onClick={() => clearTemplate()}
              className="bg-primaryButton hover:bg-primaryHover"
            >
              Clear
            </CustomButton>
            <CustomButton
              onClick={() => handleLaunchCampaign()}
              disabled={isPending}
              className="bg-secondaryButton hover:bg-secondaryHover"
            >
              {isPending ? <Spinner size="sm" /> : "Launch Campaign"}
            </CustomButton>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Summary;
