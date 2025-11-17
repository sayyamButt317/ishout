"use client";
import Spinner from "@/src/app/component/custom-component/spinner";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import ApprovedCampaignByIdHook from "@/src/routes/Admin/Hooks/approvedCampaignById-hook";
import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { useMemo } from "react";
import { useParams } from "next/navigation";

interface ApprovedCampaignResponse {
  approved_influencers?: ReadyMadeInfluencerResponse[];
  data?: {
    approved_influencers?: ReadyMadeInfluencerResponse[];
    influencers?: ReadyMadeInfluencerResponse[];
  };
  total?: number;
}

export default function ApprovedInfluencerById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isLoading, isError } = ApprovedCampaignByIdHook(Id ?? "");
  const safeData = data as ApprovedCampaignResponse | undefined;

  const approvedInfluencers = useMemo(() => {
    const influencers =
      safeData?.approved_influencers ??
      safeData?.data?.approved_influencers ??
      safeData?.data?.influencers ??
      [];
    return (influencers as ReadyMadeInfluencerResponse[]) ?? [];
  }, [safeData]);

  const totalApproved = safeData?.total ?? approvedInfluencers.length ?? 0;

  return (
    <section className="min-h-screen space-y-6">
      <div className="text-center flex flex-col gap-1 text-white relative rounded-xl border border-white/20 backdrop-blur px-4 sm:px-6 py-8 sm:py-10">
        <div className="hidden sm:block absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
        <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
          Approved Influencers
        </h1>
        <p className="italic text-xs text-slate-200 mt-2">
          (Showing {totalApproved} approved influencer&apos;s request for this
          campaign)
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" />
        </div>
      )}

      {isError && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            Error loading approved influencers.
          </div>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {approvedInfluencers.length ? (
            <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {approvedInfluencers.map((influencer) => (
                <InfluencerCard
                  key={influencer._id ?? influencer.id ?? influencer.username}
                  influencer={influencer}
                  showAccept={false}
                  showReject={false}
                  showDelete={false}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
              No approved influencers found for this campaign.
            </div>
          )}
        </>
      )}
    </section>
  );
}
