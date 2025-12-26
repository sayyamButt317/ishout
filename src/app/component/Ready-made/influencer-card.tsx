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
  Loader2,
  DollarSign,
  UserCheck,
} from "lucide-react";
import DeleteInfluencerhook from "@/src/routes/Admin/Hooks/deleteinfluencer-hook";

import { Button } from "@/components/ui/button";
import { UpdateInfluencerStatusRequestProps } from "@/src/types/Admin-Type/Campaign.type";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ApprovedInfluencersStore } from "@/src/store/Campaign/influencers.store";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import StatusBadge from "../custom-component/statusbadge";
import {
  engagementPercentage,
  formatFollowers,
  UsernameLink,
} from "@/src/helper/followersformat";
import { AxiosError } from "axios";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";

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
  const [showPriceInputs, setShowPriceInputs] = useState(false);

  const deleteInfluencerhook = DeleteInfluencerhook();
  const { Id } = useParams<{ Id: string }>();

  const onDelete = (platform: string, influencer_id: string) => {
    deleteInfluencerhook.mutate({
      platform: platform,
      influencer_id: influencer_id,
    });
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

    const basePayload: UpdateInfluencerStatusRequestProps = {
      campaign_id: Id ?? "",
      influencer_id: influencer.influencer_id,
      platform: influencer?.platform,
      status,
      username: influencer?.username,
      followers: influencer?.followers,
      engagementRate: influencer?.engagementRate,
      picture: influencer?.picture,
      bio: influencer?.bio,
      country: influencer?.country,
    };

    const payload: UpdateInfluencerStatusRequestProps =
      status === "approved"
        ? { ...basePayload, pricing: parseFloat(minAmount) }
        : basePayload;

    setActionLoading(status);
    setActionSuccess(null);

    try {
      if (status === "approved" && onAccept) {
        await onAccept(payload);
        ApprovedInfluencersStore.getState().addApprovedInfluencer(influencer);
      } else if (status === "rejected" && onReject) {
        await onReject(payload);
      }
      setActionSuccess(status);
      setShowPriceInputs(false);
    } catch (error) {
      console.error("Failed to update influencer status", error);
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error("Failed to update influencer status", {
        description: axiosError.response?.data?.detail as string,
      });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <article className="group relative w-full rounded-xl border bg-white backdrop-blur-sm text-white p-2 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
      <div className="absolute top-0 right-0">
        <Badge className=" flex items-center gap-2 border text-xs">
          {influencer?.admin_approved === true ? (
            <span className="flex items-center gap-2">
              Approved <CircleCheck className="h-4 w-4 text-green-400" />
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Pending <Loader2 className="h-4 w-4 text-red-400" />
            </span>
          )}
        </Badge>
      </div>
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
          width={60}
          height={60}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="flex flex-col gap-2 justify-center">
          <h3 className="text-lg font-semibold text-black">
            <span
              className="text-sm font-medium hover:text-blue-600 hover:underline cursor-pointer truncate"
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
            </span>
            <div className="line-clamp-2 w-40">
              <p className="text-xs font-normal text-gray-500 truncate">
                {influencer?.bio || "No bio available"}
              </p>
            </div>
          </h3>
        </div>
      </div>
      <div className="mb-4 flex justify-between">
        <Badge className=" flex items-center gap-2 border text-xs">
          {influencer?.country.toUpperCase()}
        </Badge>
        <Badge className=" flex items-center gap-2 bg-transparent border text-xs">
          {influencer?.platform === "instagram" ? (
            <SiInstagram className="h-4 w-4 text-red-800" />
          ) : influencer?.platform === "tiktok" ? (
            <SiTiktok className="h-4 w-4 text-red-800" />
          ) : (
            <SiYoutube className="h-4 w-4 text-red-800" />
          )}
        </Badge>
      </div>

      <div className="text-center mb-4">
        <button
          className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-1.5 bg-black rounded-full transition-colors cursor-pointer hover:bg-gray-800 shadow-2xl"
          onClick={() => {
            handleMessage(
              influencer?.platform as PlatformType,
              influencer?.username
            );
          }}
        >
          {/* <MessageCircle className="h-4 w-4cursor-pointer" /> */}
          <span className="text-sm text-white">Message</span>
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4 shadow-2xl">
        <div className="grid grid-cols-2 gap-4">
          {/* Engagement Rate */}
          <div className="text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {engagementPercentage(influencer?.engagementRate)}%
            </div>
            <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <CircleCheck className="h-4 w-4 text-black" /> Engagement
            </div>
          </div>
          {/* Followers */}
          <div className="text-center">
            <div className="text-2xl font-bold text-black mb-1">
              {formatFollowers(influencer?.followers || 0)}
            </div>
            <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
              <UserCheck className="h-4 w-4 text-black" /> Followers
            </div>
          </div>
        </div>
      </div>

      {actionSuccess === "approved" && (
        <div className="mb-4 px-2 flex items-center justify-between gap-2 bg-white rounded-lg p-2 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className=" rounded-full p-1">
              <CircleCheck className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-sm text-green-500 font-semibold">Status:</p>
          </div>
          <StatusBadge status="approved" />
        </div>
      )}

      {actionSuccess === "rejected" && (
        <div className="mb-4 px-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="rounded-full p-1">
              <XCircle className="h-5 w-5 text-red-400  " />
            </div>
            <p className="text-sm text-white font-semibold">Status:</p>
          </div>
          <StatusBadge status="reject" />
        </div>
      )}

      {/* Price Input Section*/}
      {showPriceInputs && actionSuccess === null && (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-2xl">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-black" />
            <h4 className="text-sm font-semibold text-black">Set Pricing</h4>
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
                className="bg-gray-700/50 border-gray-600 text-black placeholder:text-gray-500 focus:border-amber-500"
                min="0"
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Enter the price of the influencer
          </p>
        </div>
      )}

      {/* Show saved prices after approval */}
      {actionSuccess === "approved" &&
        minAmount &&
        parseFloat(minAmount) > 0 && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-2xl">
            <div className="text-center">
              <div className="text-xl font-bold text-black mb-1">
                ${parseFloat(minAmount).toFixed(2)}
              </div>
              <div className="text-xs text-black font-medium">
                Influencer Pricing
              </div>
            </div>
          </div>
        )}

      {actionSuccess === null && (showAccept || showReject) && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {showAccept && (
            <CustomButton
              onClick={() => handleStatusChange("approved")}
              className=" bg-black border text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
              disabled={
                actionLoading !== null || influencer?.admin_approved === true
              }
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
              className=" bg-black/10 hover:bg-black/20 border text-red-500 text-sm font-medium py-2.5 rounded-lg transition-colors"
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
          }}
          className="w-full mt-2 border text-black text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Cancel
        </CustomButton>
      )}

      {showDelete && (
        <div className="mt-4 flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              onDelete(influencer?.platform, influencer.influencer_id)
            }
            className="cursor-pointer"
            disabled={deleteInfluencerhook.isPending}
          >
            {deleteInfluencerhook.isPending ? (
              <Loader2Icon className="animate-spin h-4 w-4 text-red-500" />
            ) : (
              <Trash2Icon className="h-4 w-4 text-red-500" />
            )}
          </Button>
        </div>
      )}
    </article>
  );
};

export default InfluencerCard;
