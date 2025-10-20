import { ReadyMadeInfluencerResponse } from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import React from "react";
import CustomButton from "../button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import DeleteInfluencerhook from "@/src/hooks/deleteinfluencer-hook";
import MoreInfluencershook from "@/src/hooks/rejectedinfluencers.hook";
import { MoreInfluencerReplacePayload } from "@/src/types/readymadeinfluencers-type";
import Spinner from "../spinner";
export interface InfluencerCardProps {
  influencer: ReadyMadeInfluencerResponse;
  onAccept?: (influencer: ReadyMadeInfluencerResponse) => void;
  onReject?: (influencer: ReadyMadeInfluencerResponse) => void;
  onAddAll?: () => void;
  onRejectAll?: () => void;
  showAccept?: boolean;
  showReject?: boolean;
  showDelete?: boolean;
}

const InfluencerCard = ({
  influencer,
  onAccept,
  showAccept = true,
  showReject = true,
  showDelete = true,
}: InfluencerCardProps) => {
  const {
    influencer_username,
    name,
    bio,
    country,
    followers,
    engagementRate,
    pic,
    platform,
    category,
  } = influencer;

  const deleteInfluencerhook = DeleteInfluencerhook();
  const moreInfluencershook = MoreInfluencershook();

  const onDelete = (platform: string, influencer_id: string) => {
    deleteInfluencerhook.mutate({
      platform: platform,
      influencer_id: influencer_id,
    });
  };
  return (
    <article className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Image
          src={pic || "/assets/avatar.png"}
          alt={influencer_username || "influencer"}
          width={56}
          height={56}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full border object-cover ring-1 ring-slate-200"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-slate-900 truncate text-base">
              {name || "No name available"}
            </p>
          </div>
          <div className="mt-0.5 flex items-center justify-between gap-2">
            <span className="text-xs text-slate-500 truncate">
              @{influencer_username || "username"}
            </span>
            <div className="flex items-center gap-1">
              {country && (
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 max-w-full truncate">
                  {country}
                </span>
              )}
              {category && (
                <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-[11px] text-blue-700 max-w-full truncate">
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="mt-3 text-sm text-slate-700 line-clamp-2 sm:line-clamp-3">
        <span className="text-secondaryButton font-extrabold">Bio:</span>
        <span className="text-secondaryText">{bio || "No bio available"}</span>
      </p>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-2 text-center">
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Followers
          </div>
          <div className="text-xs font-semibold text-slate-800">
            {(followers || 0).toLocaleString()}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-2 text-center">
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Engagement
          </div>
          <div className="text-xs font-semibold text-emerald-700">
            {engagementRate ? `${(engagementRate * 100).toFixed(2)}%` : "N/A"}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 px-2 py-2 text-center">
          <div className="text-[10px] uppercase tracking-wide text-slate-500">
            Platform
          </div>
          <div className="text-xs font-semibold text-slate-800 capitalize">
            {platform || "N/A"}
          </div>
        </div>
      </div>

      {/* Actions */}
      {(showAccept || showReject || showDelete) && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {showAccept && (
            <CustomButton
              onClick={() => onAccept?.(influencer)}
              className="bg-primaryButton hover:bg-primaryHover text-white text-xs px-3 py-1.5"
            >
              Accept
            </CustomButton>
          )}
          {showReject && (
            <CustomButton
              onClick={() => {
                const payload: MoreInfluencerReplacePayload = {
                  replaceId: influencer._id,
                  request: {
                    platform: [platform],
                    category: [category],
                    followers: [followers.toString()],
                    country: [country],
                    limit: 1,
                    more: 1,
                    exclude_ids: [influencer._id],
                  },
                };
                moreInfluencershook.mutate(payload);
              }}
              className="bg-secondaryButton hover:bg-secondaryHover text-white text-xs px-3 py-1.5"
            >
              {moreInfluencershook.isPending ? <Spinner size="sm" /> : "Reject"}
            </CustomButton>
          )}
          {showDelete && (
            <CustomButton
              onClick={() => onDelete(platform, influencer._id)}
              className="col-span-2 sm:col-span-1 bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5"
              disabled={deleteInfluencerhook.isPending}
            >
              {deleteInfluencerhook.isPending ? (
                <Loader2Icon className="animate-spin h-3 w-3" />
              ) : (
                <Trash2Icon className="h-3 w-3" />
              )}
            </CustomButton>
          )}
        </div>
      )}
    </article>
  );
};

export default InfluencerCard;
