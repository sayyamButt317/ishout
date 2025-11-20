import {
  PlatformType,
  ReadyMadeInfluencerResponse,
} from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import CustomButton from "../button";
import {
  CircleCheck,
  Loader2Icon,
  Trash2Icon,
  XCircle,
  MessageCircle,
} from "lucide-react";
import DeleteInfluencerhook from "@/src/routes/Admin/Hooks/deleteinfluencer-hook";
import Spinner from "../custom-component/spinner";
import { Button } from "@/components/ui/button";
import { UpdateInfluencerStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/approved-influencers.store";

export interface InfluencerCardProps {
  influencer: ReadyMadeInfluencerResponse;

  onAccept?: (
    payload: UpdateInfluencerStatusRequestProps
  ) => Promise<void> | void;
  onReject?: (
    payload: UpdateInfluencerStatusRequestProps
  ) => Promise<void> | void;

  showAccept?: boolean;
  showReject?: boolean;
  showDelete?: boolean;
}

const InfluencerCard = ({
  influencer,
  onAccept,
  onReject,
  showAccept = true,
  showReject = true,
  showDelete = true,
}: InfluencerCardProps) => {
  const [actionLoading, setActionLoading] = useState<
    "approved" | "rejected" | null
  >(null);
  const [actionSuccess, setActionSuccess] = useState<
    "approved" | "rejected" | null
  >(null);

  const deleteInfluencerhook = DeleteInfluencerhook();
  const { Id } = useParams<{ Id: string }>();

  const onDelete = (platform: string, influencer_id: string) => {
    deleteInfluencerhook.mutate({
      platform: platform,
      influencer_id: influencer_id,
    });
  };

  // Format followers number ( 195000 -> 195K)
  const formatFollowers = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  const engagementPercentage = influencer?.engagementRate
    ? Math.round(influencer?.engagementRate * 100)
    : 0;

  const UsernameLink = (platform: PlatformType, username: string) => {
    if (platform === "instagram") {
      return `https://www.instagram.com/${username}`;
    } else if (platform === "tiktok") {
      return `https://www.tiktok.com/@${username}`;
    } else if (platform === "youtube") {
      return `https://www.youtube.com/@${username}`;
    }
  };
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

  const handleStatusChange = async (status: "approved" | "rejected") => {
    const actionFn = status === "approved" ? onAccept : onReject;
    if (!actionFn) return;

    const payload: UpdateInfluencerStatusRequestProps = {
      campaign_id: Id ?? "",
      influencer_id: influencer.id,
      platform: influencer?.platform,
      status,
      username: influencer?.username,
      followers: influencer?.followers,
      engagementRate: influencer?.engagementRate,
      picture: influencer?.picture,
      bio: influencer?.bio,
      country: influencer?.country,
    };

    setActionLoading(status);
    setActionSuccess(null);

    try {
      await actionFn(payload);
      if (status === "approved") {
        ApprovedInfluencersStore.getState().addApprovedInfluencer(influencer);
      }
      setActionSuccess(status);
    } catch (error) {
      console.error("Failed to update influencer status", error);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <article className="group relative w-full rounded-xl border bg-gray-800/50 backdrop-blur-sm text-white p-2 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      {actionLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <Spinner size="md" />
          <p className="mt-2 text-sm font-medium">
            {actionLoading === "approved" ? "Approving..." : "Rejecting..."}
          </p>
        </div>
      )}
      <div className="flex items-center justify-center mb-4">
        <Image
          src={influencer?.picture}
          alt={influencer?.username}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full border-2 border-gray-600 object-cover"
        />
      </div>

      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-white">
          <span
            className="text-white hover:text-blue-600 hover:underline cursor-pointer"
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
            {influencer?.username || "No name available"}
          </span>
        </h3>
        <button
          className="mt-2 flex items-center justify-center gap-2 mx-auto px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500 rounded-lg transition-colors"
          onClick={() => {
            handleMessage(
              influencer?.platform as PlatformType,
              influencer?.username
            );
          }}
        >
          <MessageCircle className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-blue-400">Message</span>
        </button>
      </div>

      {actionSuccess === "approved" && (
        <div className="mb-4 flex flex-row items-center gap-2 justify-center bg-green-500/20 border border-green-500 rounded-lg py-2">
          <CircleCheck className="h-5 w-5 text-green-400" />
          <span className="text-sm font-semibold text-green-400">Approved</span>
        </div>
      )}

      {actionSuccess === "rejected" && (
        <div className="mb-4 flex flex-row items-center gap-2 justify-center bg-red-500/20 border border-red-500 rounded-lg py-2">
          <XCircle className="h-5 w-5 text-red-400" />
          <span className="text-sm font-semibold text-red-400">Rejected</span>
        </div>
      )}

      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Engagement Rate */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {engagementPercentage}%
            </div>
            <div className="text-xs text-gray-400">Engagement rate</div>
          </div>
          {/* Followers */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatFollowers(influencer?.followers || 0)}
            </div>
            <div className="text-xs text-gray-400">Followers</div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex flex-row items-center gap-2 justify-center rounded-lg py-2">
        <div className="flex items-center gap-0.5 text-sm text-white">
          <CircleCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs text-white">Brand Safety</span>
          <CircleCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs text-white">Content Performance</span>
        </div>
      </div>
      <div className="mb-4 flex flex-row items-center gap-0.5 justify-center ">
        <CircleCheck className="h-4 w-4 text-amber-300" />
        <span className="text-xs text-white">Content Approved</span>
      </div>

      {/* Type of Content */}
      <div className="mb-4 flex justify-center items-center">
        <Badge
          key={influencer?.platform}
          className={` flex items-center gap-2 bg-transparent border text-xs ${
            influencer?.platform === "instagram"
              ? "bg-blue-100 text-blue-800"
              : influencer?.platform === "tiktok"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {influencer?.platform.charAt(0).toUpperCase() +
            influencer?.platform.slice(1)}
        </Badge>
      </div>

      {actionSuccess === null && (showAccept || showReject) && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {showAccept && (
            <CustomButton
              onClick={() => handleStatusChange("approved")}
              className=" bg-black/10 hover:bg-black/20 border text-amber-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={actionLoading !== null}
            >
              {actionLoading === "approved" ? <Spinner size="sm" /> : "Approve"}
            </CustomButton>
          )}
          {showReject && (
            <CustomButton
              onClick={() => handleStatusChange("rejected")}
              className=" bg-black/10 hover:bg-black/20 border text-red-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={actionLoading !== null}
            >
              {actionLoading === "rejected" ? <Spinner size="sm" /> : "Reject"}
            </CustomButton>
          )}
        </div>
      )}

      {showDelete && (
        <div className="mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(influencer?.platform, influencer.id)}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
            disabled={deleteInfluencerhook.isPending}
          >
            {deleteInfluencerhook.isPending ? (
              <Loader2Icon className="animate-spin h-4 w-4" />
            ) : (
              <Trash2Icon className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </article>
  );
};

export default InfluencerCard;
