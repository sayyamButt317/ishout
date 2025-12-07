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
  Loader2,
  DollarSign,
  UserCheck,
} from "lucide-react";
import DeleteInfluencerhook from "@/src/routes/Admin/Hooks/deleteinfluencer-hook";

import { Button } from "@/components/ui/button";
import { UpdateInfluencerStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/approved-influencers.store";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StatusBadge from "../custom-component/statusbadge";

export interface InfluencerCardProps {
  influencer: ReadyMadeInfluencerResponse;

  onAccept?: (
    payload: UpdateInfluencerStatusRequestProps & {
      minAmount?: number;
      maxAmount?: number;
    }
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
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [showPriceInputs, setShowPriceInputs] = useState(false);

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
    if (status === "approved" && !showPriceInputs) {
      setShowPriceInputs(true);
      return;
    }

    const actionFn = status === "approved" ? onAccept : onReject;
    if (!actionFn) return;
    if (status === "approved") {
      const min = parseFloat(minAmount);
    
      if (min < 0) {
        toast.error("Amounts cannot be negative");
        return;
      }

      }

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
      if (status === "approved" && onAccept) {
        await onAccept({
          ...payload,
          minAmount: parseFloat(minAmount),
          maxAmount: parseFloat(maxAmount),
        });
        ApprovedInfluencersStore.getState().addApprovedInfluencer(influencer);
      } else if (status === "rejected" && onReject) {
        await onReject(payload);
      }
      setActionSuccess(status);
      setShowPriceInputs(false);
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
          <Loader2 className="animate-spin text-white" />
          <p className="mt-2 text-sm font-medium">
            {actionLoading === "approved" ? "Approving..." : "Rejecting..."}
          </p>
        </div>
      )}
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={influencer?.picture}
          alt={influencer?.username}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full border-2 border-gray-600 object-cover"
        />
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
      </div>

      <div className="text-center mb-4">
        <button
          className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-700/50 rounded-sm transition-colors cursor-pointer"
          onClick={() => {
            handleMessage(
              influencer?.platform as PlatformType,
              influencer?.username
            );
          }}
        >
          <MessageCircle className="h-4 w-4cursor-pointer" />
          <span className="text-sm text-white">Message</span>
        </button>
      </div>

      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Engagement Rate */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {engagementPercentage}%
            </div>
            <div className="text-xs text-gray-400"> Engagement rate</div>
          </div>
          {/* Followers */}
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {formatFollowers(influencer?.followers || 0)}
            </div>
            <div className="text-xs text-gray-400">
              <UserCheck className="h-4 w-4 text-white" /> Followers Count
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-2 rounded-lg py-2">
        <div className="flex items-center gap-2">
          <CircleCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs text-white">Brand Safety</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs text-white">Content Performance</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs text-white">Content Approved</span>
        </div>
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
      {actionSuccess === "approved" && (
        <div className="mb-4 px-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-700/50 rounded-full p-1">
              <CircleCheck className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm text-white font-semibold">Status:</p>
          </div>
          <StatusBadge status="approved" />
        </div>
      )}

      {actionSuccess === "rejected" && (
        <div className="mb-4 px-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-gray-700/50 rounded-full p-1">
              <XCircle className="h-5 w-5 text-red-400  " />
            </div>
            <p className="text-sm text-white font-semibold">Status:</p>
          </div>
          <StatusBadge status="reject" />
        </div>
      )}

      {/* Price Input Section*/}
      {showPriceInputs && actionSuccess === null && (
        <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-white" />
            <h4 className="text-sm font-semibold text-white">
              Set Pricing
            </h4>
          </div>
          <div className="grid grid-cols-1S gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">
                Amount (USD)
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-amber-500"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Enter the price of the influencer
          </p>
        </div>
      )}

      {/* Show saved prices after approval */}
      {actionSuccess === "approved" && minAmount && maxAmount && (
        <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">
                ${parseFloat(minAmount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">Min Amount</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-1">
                ${parseFloat(maxAmount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-400">Max Amount</div>
            </div>
          </div>
        </div>
      )}

      {actionSuccess === null && (showAccept || showReject) && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {showAccept && (
            <CustomButton
              onClick={() => handleStatusChange("approved")}
              className=" bg-black/10 hover:bg-black/20 border text-amber-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={actionLoading !== null}
            >
              {actionLoading === "approved" ? (
                <Loader2 className="animate-spin text-white" />
              ) : showPriceInputs ? (
                "Confirm"
              ) : (
                "Approve"
              )}
            </CustomButton>
          )}
          {showReject && (
            <CustomButton
              onClick={() => {
                setShowPriceInputs(false);
                handleStatusChange("rejected");
              }}
              className=" bg-black/10 hover:bg-black/20 border text-red-300 text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={actionLoading !== null}
            >
              {actionLoading === "rejected" ? (
                <Loader2 className="animate-spin text-white" />
              ) : (
                "Reject"
              )}
            </CustomButton>
          )}
        </div>
      )}

      {showPriceInputs && actionSuccess === null && (
        <CustomButton
          onClick={() => {
            setShowPriceInputs(false);
            setMinAmount("");
            setMaxAmount("");
          }}
          className="w-full mt-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-gray-300 text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Cancel
        </CustomButton>
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
