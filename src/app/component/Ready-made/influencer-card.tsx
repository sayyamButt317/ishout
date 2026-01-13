import { PlatformType } from "@/src/types/readymadeinfluencers-type";
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
  MapPin,
  Circle,
} from "lucide-react";
import DeleteInfluencerhook from "@/src/routes/Admin/Hooks/deleteinfluencer-hook";
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
import { InfluencerCardProps } from "@/src/types/Admin-Type/influencercard-type";

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
      campaign_id: Id,
      influencer_id: influencer?.influencer_id,
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
      const axiosError = error as AxiosError<{ detail: string }>;
      toast.error("Failed to update influencer status", {
        description: axiosError.response?.data?.detail as string,
      });
    } finally {
      setActionLoading(null);
    }
  };

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
    <article
      className="group relative w-full max-w-5xl mx-auto rounded-xl border bg-white backdrop-blur-sm text-white p-4 shadow-lg hover:shadow-xl transition-shadow overflow-hidden
"
    >
      {/* STATUS BADGE */}
      <div className="absolute top-4 right-4">
        {influencer?.admin_approved === true ? (
          <Badge className="bg-green-100 text-green-700 gap-1">
            <CircleCheck className="h-4 w-4" /> Approved
          </Badge>
        ) : influencer?.admin_approved === false ? (
          <Badge className="bg-red-100 text-red-700 gap-1">
            <XCircle className="h-4 w-4" /> Rejected
          </Badge>
        ) : (
          <Badge className="bg-yellow-100 text-yellow-700 gap-1">
            <Circle className="h-4 w-4" /> Pending
          </Badge>
        )}
      </div>

      {/* INFLUENCER PROFILE */}
      <div className="flex items-center gap-2 mb-4">
        <Image
          src={influencer?.picture}
          alt={influencer?.username}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover p-1 bg-gray-100"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            <span
              className="text-xs font-semibold hover:text-blue-600 hover:underline cursor-pointer truncate"
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
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {influencer?.country}
              </p>
            </div>
          </h3>
        </div>
      </div>
      {/* PLATFORM BADGE */}
      <div className="mb-4 flex justify-end">
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
      {/* VIEW PROFILE AND SEND MESSAGE BUTTONS */}
      <div className="items-center justify-center text-center mb-4 flex flex-row gap-0.5 w-full">
        <CustomButton
          onClick={() => {
            handleViewProfile();
          }}
          className="mt-2 flex items-center justify-center text-sm bg-transparent border border-gray-800 text-gray-950 rounded-full transition-colors cursor-pointer shadow-2xl"
        >
          Profile
        </CustomButton>
        <CustomButton
          className="mt-2 flex items-center justify-center text-sm bg-transparent border border-gray-800 text-gray-950 rounded-full transition-colors cursor-pointer shadow-2xl"
          onClick={() => {
            handleMessage(
              influencer?.platform as PlatformType,
              influencer?.username
            );
          }}
        >
          <span className="text-sm font-medium text-gray-950">Message</span>
        </CustomButton>
      </div>

      {/* STATS */}
      <div className="mt-5 grid grid-cols-2 text-center bg-gray-50 rounded-xl p-3">
        <div>
          <p className="text-xs text-gray-400">Followers</p>
          <p className="text-lg font-bold text-gray-900">
            {formatFollowers(influencer?.followers || 0)}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400">Engagement</p>
          <p className="text-lg font-bold text-gray-900">
            {engagementPercentage(influencer?.engagementRate)}%
          </p>
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
      {/* {actionSuccess === "approved" &&
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
        )} */}

      {influencer?.admin_approved === true &&
        influencer?.pricing !== undefined && (
          <div className="bg-white rounded-lg p-4 mb-4 shadow-2xl">
            <div className="text-center">
              <div className="text-xl font-bold text-black mb-1">
                <span className="text-secondaryButton text-lg font-bold">
                  ${influencer?.pricing?.toFixed(2)}
                </span>
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
              className=" bg-secondaryButton border text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
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
              className=" bg-primaryButton hover:bg-black/20 border text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
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
          <CustomButton
            onClick={() =>
              onDelete(influencer?.platform, influencer.influencer_id)
            }
            className="cursor-pointer border bg-transparent border-primaryButton text-primaryButton hover:text-white text-sm font-medium py-2.5 rounded-lg "
            disabled={deleteInfluencerhook.isPending}
          >
            {deleteInfluencerhook.isPending ? (
              <Loader2Icon className="animate-spin h-4 w-4 text-red-500" />
            ) : (
              <Trash2Icon className="h-4 w-4 text-deleteButton" />
            )}
          </CustomButton>
        </div>
      )}
    </article>
  );
};

export default InfluencerCard;
