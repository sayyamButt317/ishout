"use client";
import PlatformBadge from "@/src/app/component/custom-component/platformbadge";
import TableComponent from "@/src/app/component/CustomTable";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import OnboardingHook from "@/src/routes/Admin/Hooks/onboarding-hook";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import {
  formatEngagementRate,
  formatFollowers,
  UsernameLink,
} from "@/src/helper/followersformat";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";
import { ArrowLeft, MessageCircle, RefreshCcw, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { useParams } from "next/navigation";
import CustomButton from "@/src/app/component/button";
import { useRouter } from "next/navigation";
import { SendOnboardingMessage } from "@/src/routes/Admin/API/admin.routes";
import { toast } from "sonner";

export default function OnboardingInfluencerByCampaignId() {
  const { Id } = useParams<{ Id: string }>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingHook(
    Id,
    currentPage
  );

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
                className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
                  isRefetching ? "animate-spin" : ""
                }`}
              />
            </Button>
          </div>
          <CustomButton
            className="bg-secondaryButton hover:bg-secondaryHover italic text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-1 sm:gap-2 rounded-md px-3 sm:px-4 md:px-6 h-8 sm:h-9 transition-all cursor-pointer"
            onClick={() => {
              router.replace(`/Admin/onboarding`);
            }}
          >
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Back to Onboarding</span>
            <span className="sm:hidden">Back</span>
          </CustomButton>
        </div>
        <p className="italic text-xs text-slate-200 mt-2 mb-2">
          Showing {data?.influencers.length} of {data?.total} influencers
        </p>
      </div>

      <TableComponent
        header={[
          "Influencer",
          "Followers",
          "Engagement",
          "Country",
          "Pricing",
          "Platform",
          "Admin",
          "Company",
          "Send Message",
        ]}
        subheader={data?.influencers?.map(
          (influencer: ReviewInfluencerResponse) => [
            <div
              key={`profile-${influencer._id}`}
              className="flex items-center gap-3"
            >
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/15">
                <Image
                  src={influencer.picture}
                  alt={influencer.username}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="truncate max-w-[160px]">
                <p className="font-semibold">
                  <span
                    className="text-white hover:text-blue-600 hover:underline cursor-pointer"
                    onClick={() =>
                      window.open(
                        UsernameLink(influencer.platform, influencer.username),
                        "_blank"
                      )
                    }
                  >
                    {influencer.username}
                  </span>
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {influencer.bio || "—"}
                </p>
              </div>
            </div>,
            formatFollowers(influencer.followers),
            <div
              key={`engagement-${influencer._id}`}
              className="truncate text-xs sm:text-sm flex items-center"
            >
              {formatEngagementRate(influencer.engagementRate)}
            </div>,
            influencer.country,
            <div key={`pricing-${influencer._id}`} className="truncate">
              ${influencer.pricing}
            </div>,
            <div key={`platform-${influencer._id}`} className="truncate">
              <PlatformBadge platform={[influencer.platform]} />
            </div>,
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer.admin_approved ? "approved" : "reject"}
            />,
            <StatusBadge
              key={`status-${influencer._id}`}
              status={influencer.company_approved ? "approved" : "reject"}
            />,
            <div
              key={`action-${influencer._id}`}
              className="text-xs text-slate-400"
            >
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => {
                  handleMessage(influencer.platform, influencer.username);
                  // handleSendOnboardingMessage(1565041078267027);
                }}
              >
                <span className="flex items-center gap-2">
                  Message <MessageCircle className="h-4 w-4" />
                </span>
              </Button>
            </div>,
          ]
        )}
        paginationstart={currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />
    </>
  );
}
