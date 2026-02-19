"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import { useCallback, useState } from "react";
import OnboardingHook from "@/src/routes/Admin/Hooks/onboarding-hook";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { useParams } from "next/navigation";
import CustomButton from "@/src/app/component/button";
import { useRouter } from "next/navigation";
import ChooseOptionDialog from "@/src/app/component/custom-component/choseoptionDialogue";
import OnboardingCard from "@/src/app/component/Ready-made/onboarding-card";


export default function OnboardingInfluencerByCampaignId() {
  const { Id } = useParams<{ Id: string }>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingHook(
    Id,
    currentPage
  );


  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<{
    username: string;
    platform: string;
    picture: string;
    influencer_id: string;
    phone_number: string;
    min_price: number;
    max_price: number;
  } | null>(null);


  const handleMessage = useCallback(
    (platform: PlatformType, username: string) => {
      if (platform === "instagram") {
        window.open(`https://ig.me/m/${username}`, "_blank");
      } else if (platform === "tiktok") {
        window.open(`https://www.tiktok.com/@${username}`, "_blank");
      }
    },
    []
  );

  const handleEdit = useCallback((influencer: ReviewInfluencerResponse) => {
    setSelectedInfluencer({
      username: influencer.username,
      platform: influencer.platform,
      picture: influencer.picture,
      influencer_id: influencer.influencer_id,
      phone_number: influencer.phone_number || "",
      min_price: influencer.min_price || 0,
      max_price: influencer.max_price || 0,
    });
    setDialogOpen(true);
  }, []);

  // const handleSendOnboardingMessage = async (psid: number) => {
  //   try {
  //     const messageTemplate = {
  //       title: "Hey 👋",
  //       subtitle:
  //         "We're reaching out from iShout regarding an upcoming campaign.\n\n" +
  //         "We'd love to move forward and would like to confirm a few details:\n\n" +
  //         "1. Are you available?\n" +
  //         "2. Please share your pricing.\n" +
  //         "3. Kindly provide your WhatsApp / phone number.\n\n" +
  //         "Looking forward to your response!\n— iShout Team",
  //     };

  //     await SendOnboardingMessage(psid, messageTemplate);
  //     toast.success("Message sent successfully!");
  //   } catch (error) {
  //     const errorMessage =
  //       error instanceof Error && error.message
  //         ? error.message
  //         : "Failed to send message. Please try again.";
  //     toast.error(errorMessage);
  //   }
  // };

  return (
    <>
      <div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-2xl font-bold text-white">
              Onboarded Influencers
            </h1>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => {
                refetch();
              }}
              disabled={isRefetching}
            >
              <RefreshCcw
                className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
                  }`}
              />
            </Button>
          </div>
          <CustomButton
            className="sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white cursor-pointer max-w-[160px]"
            onClick={() => {
              router.replace(`/Admin/onboarding`);
            }}
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            Back to Onboarding
          </CustomButton>
        </div>
        <p className="italic text-xs text-slate-200 mt-2 mb-2">
          Showing {data?.influencers.length} of {data?.total} influencers
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            Loading onboarded influencers...
          </div>
        </div>
      )}

      {data?.influencers?.length ? (
        <div className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
          {data?.influencers?.map((influencer: ReviewInfluencerResponse) => (
            <OnboardingCard
              key={influencer._id}
              influencer={influencer}
              onEdit={handleEdit}
              onMessage={handleMessage}
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
              No onboarded influencers found
            </div>
          </div>
        )
      )}
      <ChooseOptionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        influencer={selectedInfluencer}
      />
    </>
  );
}
