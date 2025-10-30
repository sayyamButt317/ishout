"use client";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import Spinner from "@/src/app/component/spinner";
import CampaignByIdHook from "@/src/routes/Admin/Hooks/campaignById-hook";
import { useParams } from "next/navigation";

export default function CampaignByIdPage() {
  const { Id } = useParams<{ Id: string }>();
  console.log("Campaign ID ", Id);
  const { data, isLoading, isError } = CampaignByIdHook(Id ?? "");
  console.log("Campaign By ID Response Data ", data);
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">
        Approved Influencers Details
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size="lg" />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            Error loading approved influencers
          </div>
        </div>
      )}

      {data?.generated_influencers?.length > 0 ? (
        data?.generated_influencers?.map((generated: any) => (
          <div
            key={`${generated._id}-generated-influencer`}
            className="w-full mx-auto mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
          >
            <InfluencerCard
              key={generated._id}
              influencer={generated}
              showAccept={true}
              showReject={true}
              showDelete={true}
            />
          </div>
        ))
      ) : (
        <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
          No generated influencers found. Go back and select some influencers.
        </div>
      )}

      {data?.approved_influencers?.length > 0 ? (
        data?.approved_influencers?.map((approved: any) => (
          <InfluencerCard
            key={approved._id}
            influencer={approved}
            showAccept={false}
            showReject={false}
            showDelete={false}
          />
        ))
      ) : (
        <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
          No approved influencers found
        </div>
      )}
    </div>
  );
}
