"use client";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import CustomButton from "@/src/app/component/button";
import { useParams, useRouter } from "next/navigation";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import CampaignByIdHook from "@/src/routes/Admin/Hooks/campaignById-hook";
import UpdateInfluencerStatusHook from "@/src/routes/Admin/Hooks/updateinfluencerstatus-hook";
import { UpdateInfluencerStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";
import { Download } from "lucide-react";
import ExportToExcel from "@/src/app/component/custom-component/exportToExcel";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/approved-influencers.store";

export default function PendingCampaignByIdPage() {
  const { results, clearTemplate } = useReadyMadeTemplateStore();
  const { clearApprovedInfluencers } = ApprovedInfluencersStore.getState();
  const { Id } = useParams<{ Id: string }>();
  const { data } = CampaignByIdHook(Id ?? "");
  const updateInfluencerStatus = UpdateInfluencerStatusHook();
  const router = useRouter();

  const handleUpdateInfluencerStatus = async (
    payload: UpdateInfluencerStatusRequestProps
  ) => {
    await updateInfluencerStatus.mutateAsync(payload);
  };

  return (
    <div className="min-h-screen ">
      <div className="relative rounded-xl border border-white/20 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hidden sm:block absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="hidden sm:block absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="text-center">
            <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
              Generated Influencers for {data?.name}
            </h1>
            <p className="mt-2 text-slate-200 text-sm max-w-2xl mx-auto px-2">
              (with all the possible combination according to the user&apos;s
              request)
            </p>
            <div className="text-white flex flex-col gap-2 mt-4 items-start">
              <p className="text-sm">
                User has requested{" "}
                <span className="font-bold"> {data?.limit} </span> influencers
                in the category of{" "}
                <span className="font-bold">{data?.category.join(", ")}</span>{" "}
                and platform of{" "}
                <span className="font-bold">{data?.platform}</span> with the
                followers Range of{" "}
                <span className="font-bold">{data?.followers.join(", ")}</span>{" "}
                and country in{" "}
                <span className="font-bold">{data?.country.join(", ")}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        {ApprovedInfluencersStore.getState().approvedInfluencers.length > 0 && (
          <CustomButton
            className=" bg-secondarytext text-white"
            onClick={() => {
              ExportToExcel();
            }}
          >
            <Download className="h-4 w-4" />
            Export Approved Influencers
          </CustomButton>
        )}
      </div>

      <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {Array.isArray(results) && results.length > 0 ? (
          <div className="space-y-8">
            <section className="bg-black/10 backdrop-blur rounded-2xl border border-white/20 p-4 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {results.map((influencer, i) => (
                  <InfluencerCard
                    key={`${influencer?.username}-${i}`}
                    influencer={influencer}
                    showAccept
                    showReject
                    showDelete
                    onAccept={(payload) =>
                      handleUpdateInfluencerStatus(payload)
                    }
                    onReject={(payload) =>
                      handleUpdateInfluencerStatus(payload)
                    }
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            No influencers generated yet. Go back and generate some influencers.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 px-4 sm:px-0 gap-3">
        <CustomButton
          className="sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white"
          onClick={() => {
            router.push("/Admin/pending-campaign");
            clearTemplate();
            clearApprovedInfluencers();
          }}
        >
          Back to Dashboard
        </CustomButton>
      </div>
    </div>
  );
}
