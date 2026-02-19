import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import React from "react";
import CustomButton from "../button";

import {
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";
import {
  formatFollowers,
  formatEngagementRate,
  UsernameLink,
} from "@/src/helper/followersformat";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";

interface OnboardingCardProps {
  influencer: ReviewInfluencerResponse;
  onEdit: (influencer: ReviewInfluencerResponse) => void;
  onMessage: (platform: PlatformType, username: string) => void;
  onApprove?: (influencer: ReviewInfluencerResponse) => void;
  onReject?: (influencer: ReviewInfluencerResponse) => void;
  onDelete?: (influencer: ReviewInfluencerResponse) => void;
}

const OnboardingCard = ({
  influencer,
  onEdit,
  onMessage,
  onApprove,
  onReject,
  onDelete,
}: OnboardingCardProps) => {
  const handleViewProfile = () => {
    if (influencer?.platform === "instagram") {
      window.open(`https://ig.me/m/${influencer?.username}`, "_blank");
    } else if (influencer?.platform === "tiktok") {
      window.open(`https://www.tiktok.com/@${influencer?.username}`, "_blank");
    } else if (influencer?.platform === "youtube") {
      window.open(`https://www.youtube.com/@${influencer?.username}`, "_blank");
    }
  };

  return (
    <Card className="group relative w-full rounded-[28px] border border-white/10 bg-[#0f0f10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />

      <div className="relative p-6">

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Image
              src={influencer?.picture}
              alt={influencer?.username}
              width={72}
              height={72}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="min-w-0">
              <div
                className="text-[22px] italic font-semibold leading-tight text-white truncate cursor-pointer"
                onClick={() =>
                  window.open(
                    UsernameLink(
                      influencer?.platform as PlatformType,
                      influencer?.username
                    ),
                    "_blank"
                  )
                }
              >
                @{influencer?.username || "No name available"}
              </div>

              <div className="mt-1 flex items-center gap-2 text-sm text-white/60 min-w-0">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{influencer?.country}</span>
                <span className="text-white/25">|</span>
                <span className="inline-flex items-center gap-2">
                  {influencer?.platform === "instagram" ? (
                    <SiInstagram className="text-primarytext" size={16} />
                  ) : influencer?.platform === "tiktok" ? (
                    <SiTiktok className="text-white" size={16} />
                  ) : (
                    <SiYoutube className="text-red-500" size={16} />
                  )}
                  <span className="text-white/60 capitalize">{influencer?.platform}</span>
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            onClick={() => onEdit(influencer)}
            className="h-8 rounded-full border border-white/40 bg-white/[0.02] px-6 text-base font-medium text-white/90 hover:bg-white/[0.06] hover:text-white"
          >
            Edit
          </Button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <CustomButton
            className="h-12 rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/[0.06] font-normal"
            onClick={() => {
              onMessage(
                influencer?.platform as PlatformType,
                influencer?.username
              );
            }}
          >
            Message
          </CustomButton>
          <CustomButton
            onClick={handleViewProfile}
            className="h-12 rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/[0.06] font-normal"
          >
            View Profile
          </CustomButton>
        </div>

        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] divide-x divide-white/10">
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">FOLLOWERS</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {formatFollowers(influencer?.followers || 0)}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">ENGAGE</p>
            <p className="mt-1 text-lg font-semibold text-primarytext">
              {formatEngagementRate(influencer?.engagementRate)}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-[11px] tracking-[0.16em] text-white/60">PRICE</p>
            <p className="mt-1 text-lg font-semibold text-white">
              ${influencer?.pricing || 0}
            </p>
          </div>
        </div>

        <div className="relative mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">

          <div className="absolute left-1/2 top-1/2 h-18 w-px -translate-x-1/2 -translate-y-1/2 bg-white"></div>

          <div className="py-6 text-center">
            <p className="text-sm text-white/75">Min Price</p>
            <p className="mt-1 text-xl font-semibold text-white">
              ${influencer?.min_price || 0}
            </p>
          </div>

          <div className="py-6 text-center">
            <p className="text-sm text-white/75">Max Price</p>
            <p className="mt-1 text-xl font-semibold text-white">
              ${influencer?.max_price || 0}
            </p>
          </div>

        </div>


        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
            <p className="text-sm text-white/75">Admin Status</p>
            <p
              className={`mt-1 text-lg  font-normal ${influencer?.admin_approved ? "text-emerald-400" : "text-red-400"
                }`}
            >
              {influencer?.admin_approved ? "Approved" : "Not Approved"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-center">
            <p className="text-sm text-white/75">Company Status</p>
            <p
              className={`mt-1 text-lg  font-normal ${influencer?.company_approved ? "text-emerald-400" : "text-red-400"
                }`}
            >
              {influencer?.company_approved ? "Approved" : "Not Approved"}
            </p>
          </div>
        </div>


        {/* 
        <div className="mt-6 flex items-center gap-3">
          <Button
            onClick={() => onApprove?.(influencer)}
            className="flex-1 h-12 rounded-2xl bg-[#ED3E75] hover:bg-[#d73669] active:bg-[#c52f5f] text-white italic font-normal text-base shadow-lg shadow-[#ED3E75]/30 transition-all active:scale-[0.985]"
          >
            Approve
          </Button>


          <Button
            onClick={() => onReject?.(influencer)}
            className="flex-1 h-12 rounded-2xl bg-[#224085] hover:bg-[#1c356f] active:bg-[#162b5a] text-white italic font-normal text-base shadow-lg shadow-[#224085]/30 transition-all active:scale-[0.985]"
          >
            Reject
          </Button>


          <Button
            variant="ghost"
            onClick={() => onDelete?.(influencer)}
          className="h-12 w-12 rounded-2xl border border-[#FF6262]/20 bg-[#FF62620D] text-[#FF6262] hover:bg-[#FF6262]/15 transition-all"

          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
        */}
      </div>
    </Card>
  );
};

export default OnboardingCard;