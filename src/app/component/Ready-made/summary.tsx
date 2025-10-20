import React from "react";
import CustomButton from "../button";
import Spinner from "../spinner";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import FindInfluencerResponsehook from "@/src/hooks/readymadeinfluencer.hook";

const Summary = () => {
  const { platform, category, limit, followers, country, clearTemplate } =
    useReadyMadeTemplateStore();
  const { mutateAsync: findInfluencer, isPending } =
    FindInfluencerResponsehook();
  const handleLaunchCampaign = async () => {
    await findInfluencer({
      platform: platform,
      category: category,
      limit: limit,
      followers: followers,
      country: country,
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
                {platform?.length ? (
                  platform.map((platform, i) => (
                    <span
                      key={`${platform}-${i}`}
                      className="inline-flex items-center rounded-full border border-section-overlays px-2.5 py-1 text-Primary-text"
                    >
                      {platform}
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
                {category?.length ? (
                  category.map((category, i) => (
                    <span
                      key={`${category}-${i}`}
                      className="inline-flex items-center rounded-full border border-section-overlays px-2.5 py-1 text-Primary-text"
                    >
                      {category}
                    </span>
                  ))
                ) : (
                  <span className="text-Secondary-text">Not selected</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-Secondary-text mb-1">Followers</p>
                <span className="inline-block rounded-md border border-section-overlays px-2.5 py-1 text-Primary-text min-h-8">
                  {followers?.length ? followers.join(", ") : "-"}
                </span>
              </div>
              <div>
                <p className="text-Secondary-text mb-1">Limit</p>
                <span className="inline-block rounded-md border border-section-overlays px-2.5 py-1 text-Primary-text min-h-8">
                  {limit || "-"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-Secondary-text mb-2">Country</p>
              <div className="flex flex-wrap gap-2">
                {country?.length ? (
                  country.map((country, i) => (
                    <span
                      key={`${country}-${i}`}
                      className="inline-flex items-center rounded-full border border-section-overlays px-2.5 py-1 text-Primary-text"
                    >
                      {country}
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
