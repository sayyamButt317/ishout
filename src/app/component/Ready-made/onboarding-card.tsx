import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import React, { useCallback } from "react";
import CustomButton from "../button";

import { 
  MessageCircle, 
  Pencil, 
  MapPin,
  CircleCheck,
  XCircle,
  Circle,
  Phone,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReviewInfluencerResponse } from "@/src/types/Admin-Type/review-influencer";
import { 
  formatFollowers,
  formatEngagementRate,
  UsernameLink,
} from "@/src/helper/followersformat";
import { SiInstagram, SiTiktok, SiYoutube } from "react-icons/si";
import StatusBadge from "../custom-component/statusbadge";

interface OnboardingCardProps {
  influencer: ReviewInfluencerResponse;
  onEdit: (influencer: ReviewInfluencerResponse) => void;
  onMessage: (platform: PlatformType, username: string) => void;
}

const OnboardingCard = ({
  influencer,
  onEdit,
  onMessage,
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
    <Card
      className="group relative w-full max-w-5xl mx-auto rounded-xl border bg-[#131313] backdrop-blur-sm text-white p-4 shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
    >
      
      {/* <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div>
          {influencer?.admin_approved === true ? (
            <Badge className="bg-green-100 text-green-700 gap-1">
              <CircleCheck className="h-4 w-4" /> Admin Approved
            </Badge>
          ) : influencer?.admin_approved === false ? (
            <Badge className="bg-red-100 text-red-700 gap-1">
              <XCircle className="h-4 w-4" /> Admin Rejected
            </Badge>
          ) : (
            <Badge className="bg-yellow-100 text-yellow-700 gap-1">
              <Circle className="h-2 w-4" /> Admin Pending
            </Badge>
          )}
        </div>
        <div>
          {influencer?.company_approved === true ? (
            <Badge className="bg-green-100 text-green-700 gap-1">
              <CircleCheck className="h-4 w-4" /> Company Approved
            </Badge>
          ) : influencer?.company_approved === false ? (
            <Badge className="bg-red-100 text-red-700 gap-1">
              <XCircle className="h-4 w-4" /> Company Rejected
            </Badge>
          ) : (
            <Badge className="bg-yellow-100 text-yellow-700 gap-1">
              <Circle className="h-2 w-4" /> Company Pending
            </Badge>
          )}
        </div>
      </div> */}
    

      <div className="flex items-center gap-2 mb-4">
        <Image
          src={influencer?.picture}
          alt={influencer?.username}
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover p-1 bg-gray-100"
        />
        <div>
          <h3 className="text-md font-medium text-white">
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
            <div className="line-clamp-2 w-full">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MapPin className="" size={16} /> {influencer?.country} |{" "}
                <Badge className=" flex items-center gap-2 bg-transparent border text-xs">
                  {influencer?.platform === "instagram" ? (
                    <>
                      <SiInstagram className=" text-pink-600" size={16} />
                      <span className="text-xs text-gray-500 font-thin">
                        Instagram
                      </span>
                    </>
                  ) : influencer?.platform === "tiktok" ? (
                    <>
                      <SiTiktok
                        className=" text-black dark:text-white"
                        size={16}
                      />
                      <span className="text-xs text-gray-500 font-thin">
                        TikTok
                      </span>
                    </>
                  ) : (
                    <>
                      <SiYoutube className=" text-red-500" size={16} />
                      <span className="text-xs text-gray-500 font-thin">
                        YouTube
                      </span>
                    </>
                  )}
                </Badge>
              </p>
            </div>
          </h3>
        </div>
      </div>

    
      <div className="items-center justify-center text-center mb-4 flex flex-row w-full gap-2">
        <CustomButton
          className="mt-2 flex items-center justify-center text-sm bg-transparent border border-white text-white rounded-full transition-colors cursor-pointer shadow-2xl"
          onClick={() => {
            onMessage(
              influencer?.platform as PlatformType,
              influencer?.username
            );
          }}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          <span className="text-sm font-poppins text-white">Message</span>
        </CustomButton>
        <CustomButton
          onClick={() => {
            handleViewProfile();
          }}
          className="mt-2 flex items-center justify-center text-sm bg-transparent border border-white text-white rounded-full transition-colors cursor-pointer shadow-2xl"
        >
          <span className="text-md font-regular text-white">View Profile</span>
        </CustomButton>
        <Button
          variant="ghost"
          className="mt-2 flex items-center justify-center text-sm bg-transparent border border-white text-white rounded-full transition-colors cursor-pointer shadow-2xl"
          onClick={() => {
            onEdit(influencer);
          }}
        >
          <Pencil className="h-4 w-4 mr-2" />
          <span className="text-md font-regular text-white">Edit</span>
        </Button>
      </div>

    
      <div className="mt-5 grid grid-cols-2 gap-3">
  
        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Followers</p>
          <p className="italic text-lg font-bold text-white">
            {formatFollowers(influencer?.followers || 0)}
          </p>
        </div>

      
        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Engagement</p>
          <p className="italic text-lg font-bold text-white">
            {formatEngagementRate(influencer?.engagementRate)}
          </p>
        </div>

  
        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Pricing</p>
          <p className="italic text-lg font-bold text-white">
            ${influencer?.pricing || 0}
          </p>
        </div>

        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Phone</p>
          <p className="italic text-sm font-bold text-white flex items-center justify-center gap-1">
            <Phone className="h-3 w-3" />
            {influencer?.phone_number || "Not provided"}
          </p>
        </div>

      
        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Min Price</p>
          <p className="italic text-lg font-bold text-white flex items-center justify-center gap-1">
            <DollarSign className="h-4 w-4" />
            {influencer?.min_price || 0}
          </p>
        </div>

        <div className="bg-[#1C1C1C] rounded-xl p-3 text-center">
          <p className="text-xs text-white">Max Price</p>
          <p className="italic text-lg font-bold text-white flex items-center justify-center gap-1">
            <DollarSign className="h-4 w-4" />
            {influencer?.max_price || 0}
          </p>
        </div>
      </div>

  
      {influencer?.bio && (
        <div className="mt-4 bg-[#1C1C1C] rounded-xl p-3">
          <p className="text-xs text-white font-medium mb-1">Bio</p>
          <p className="text-sm text-gray-300">{influencer?.bio}</p>
        </div>
      )}

      {/* STATUS SECTION - HIDDEN */}
    
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between bg-[#1C1C1C] rounded-xl p-3">
          <span className="text-sm text-white">Admin Status</span>
          <StatusBadge status={influencer?.admin_approved ? "approved" : "reject"} />
        </div>
        <div className="flex items-center justify-between bg-[#1C1C1C] rounded-xl p-3">
          <span className="text-sm text-white">Company Status</span>
          <StatusBadge status={influencer?.company_approved ? "approved" : "reject"} />
        </div>
      </div>
      
    </Card>
  );
};

export default OnboardingCard;