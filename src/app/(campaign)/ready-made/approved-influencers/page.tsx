"use client";
import { AddedInfluencersStore } from "@/src/store/Campaign/added-influencers.store";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import CustomButton from "@/src/app/component/button";
import { useRouter } from "next/navigation";

export default function ApprovedInfluencers() {
  const { influencers } = AddedInfluencersStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0c0c22] via-[#3c69bb] to-[#1a1a3f]">
      <div className="relative border-b border-slate-200 bg-white/10 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hidden sm:block absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="hidden sm:block absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
              Approved Influencers
            </h1>
            <p className="mt-2 text-slate-200 max-w-2xl mx-auto px-2">
              Your selected influencers for this campaign
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {influencers?.length ? (
          <div className="space-y-8">
            <section className="bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-4 sm:p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Selected Influencers ({influencers.length})
                  </h2>
                  <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-white">
                      Total Selected: {influencers.length}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {influencers.map((influencer, i) => (
                  <InfluencerCard
                    key={`${influencer?.influencer_username}-${i}`}
                    influencer={influencer}
                    showAccept={false}
                    showReject={false}
                    showDelete={false}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            No approved influencers yet. Go back and select some influencers.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 px-4 sm:px-0 gap-3">
        <CustomButton
          className="sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white"
          onClick={() => {
            router.push("/ready-made/influencers");
          }}
        >
          Back to Recommendations
        </CustomButton>
        <CustomButton
          className="sm:w-auto bg-primaryButton hover:bg-primaryHover text-white"
          onClick={() => {
            // Handle campaign creation or next step
            console.log("Proceed with campaign");
          }}
        >
          Create Campaign
        </CustomButton>
      </div>
    </div>
  );
}
