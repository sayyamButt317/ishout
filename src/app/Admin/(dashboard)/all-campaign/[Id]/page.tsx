"use client";
import { Button } from "@/components/ui/button";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import ExportToExcel from "@/src/app/component/custom-component/exportToExcel";
import Spinner from "@/src/app/component/custom-component/spinner";
import CampaignByIdHook from "@/src/routes/Admin/Hooks/campaignById-hook";
import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { Download } from "lucide-react";
import { useParams } from "next/navigation";

export default function CampaignByIdPage() {
  const { Id } = useParams<{ Id: string }>();

  const { data, isLoading, isError } = CampaignByIdHook(Id ?? "");
  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size={20} />
        </div>
      )}
      {isError && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            Error loading influencers
          </div>
        </div>
      )}

      {/* Approved section */}
      <div className="flex flex-row gap-2">
        <h2 className="text-2xl font-bold text-white mb-4">
          Approved Influencers
        </h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            ExportToExcel();
          }}
        >
          <Download className="w-4 h-4 text-primary--text cursor-pointer" />
        </Button>
      </div>
      {/* <CustomButton
        className="bg-primaryButton hover:bg-primaryHover text-white"
        onClick={() => {
          exportToExcel(data?.approved_influencers);
        }}
      >
        Export to Excel
      </CustomButton> */}

      {/* <Download
        className="w-4 h-4 text-primary--text cursor-pointer"
        onClick={() => {
          exportToExcel(data?.approved_influencers);
        }}
      /> */}

      {data?.approved_influencers?.length ? (
        <div className="w-full mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {data.approved_influencers.map(
            (approved: ReadyMadeInfluencerResponse) => (
              <InfluencerCard
                key={approved._id}
                influencer={approved}
                showAccept={false}
                showReject={false}
                showDelete={false}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10 mb-8">
          No approved influencers found
        </div>
      )}

      {/* Rejected section */}
      <h2 className="text-2xl font-bold text-white mb-4">
        Rejected Influencers
      </h2>
      {data?.rejected_influencers?.length ? (
        <div className="w-full mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {data.rejected_influencers.map(
            (rejected: ReadyMadeInfluencerResponse) => (
              <InfluencerCard
                key={rejected._id}
                influencer={rejected}
                showAccept={false}
                showReject={false}
                showDelete={false}
              />
            )
          )}
        </div>
      ) : (
        <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10 mb-8">
          No rejected influencers found
        </div>
      )}
    </div>
  );
}
