"use client";
import Spinner from "@/src/app/component/custom-component/spinner";
import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
import ApprovedCampaignByIdHook from "@/src/routes/Admin/Hooks/approvedCampaignById-hook";
import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import { useParams } from "next/navigation";
import CustomButton from "@/src/app/component/button";
import { useRouter } from "next/navigation";
import CampaignByIdHook from "@/src/routes/Admin/Hooks/campaignById-hook";

export default function ApprovedInfluencerById() {
  const { Id } = useParams<{ Id: string }>();
  const { data, isLoading, isError } = ApprovedCampaignByIdHook(Id ?? "");

  const { data: campaignData } = CampaignByIdHook(Id ?? "");
  const router = useRouter();

  return (
    <section className="min-h-screen space-y-4">
      <div className="relative rounded-xl border border-white/20 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="hidden sm:block absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
          <div className="hidden sm:block absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/20 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="text-center">
            <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
              Approved Influencers for {campaignData?.name}
            </h1>
            <div className="text-white flex flex-col gap-2 mt-4 items-start">
              <p className="text-sm">
                <span className="font-bold">{campaignData?.company_name}</span>{" "}
                has requested{" "}
                <span className="font-bold"> {campaignData?.limit} </span>{" "}
                influencers in the category of{" "}
                <span className="font-bold">
                  {campaignData?.category.join(", ")}
                </span>{" "}
                and platform of{" "}
                <span className="font-bold">{campaignData?.platform}</span> with
                the followers Range of{" "}
                <span className="font-bold">
                  {campaignData?.followers.join(", ")}
                </span>{" "}
                and country in{" "}
                <span className="font-bold">
                  {campaignData?.country.join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner size={20} />
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
          {data?.approved_influencers?.length ? (
            <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
              {data?.approved_influencers?.map(
                (influencer: ReadyMadeInfluencerResponse) => (
                  <InfluencerCard
                    key={
                      influencer._id ??
                      influencer.influencer_id ??
                      influencer.username
                    }
                    influencer={influencer}
                    showAccept={false}
                    showReject={false}
                    showDelete={false}
                  />
                )
              )}
            </div>
          ) : (
            <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
              No approved influencers found for this campaign.
            </div>
          )}
        </>
      )}
      {data?.approved_influencers?.length > 0 && (
        <div className="flex flex-row items-center justify-center mt-4 px-4 sm:px-0 gap-3">
          <CustomButton
            className="sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white cursor-pointer"
            onClick={() => {
              router.replace("/Admin/approved-campaign");
            }}
          >
            Back to Approved Campaigns
          </CustomButton>
        </div>
      )}
    </section>
  );
}
