'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { SiInstagram, SiTiktok, SiYoutube, SiWhatsapp } from 'react-icons/si';
import CustomButton from '../button';
import { Card } from '@/components/ui/card';
import { PlatformType } from '@/src/types/readymadeinfluencers-type';
import { formatFollowers, formatEngagementRate } from '@/src/helper/followersformat';
import { ReviewInfluencerResponse } from '@/src/types/Admin-Type/review-influencer';

interface InfluencerCardProps {
  influencer: ReviewInfluencerResponse;
  onEdit: (influencer: ReviewInfluencerResponse) => void;
  onMessage: (platform: PlatformType, username: string) => void;
  sendNegotiation?: (influencer: ReviewInfluencerResponse) => void;
  negotiationId?: string;
  lastOfferedPrice?: number | null;
  negotiationStatus?: string | null;
}

export default function InfluencerCard({
  influencer,
  onEdit,
  onMessage,
  sendNegotiation,
  negotiationId,
  negotiationStatus,
}: InfluencerCardProps) {
  const router = useRouter();

  const displayName = influencer?.username?.replace('@', '') || 'No name available';
  const handleViewProfile = useCallback(() => {
    if (influencer?.platform === 'instagram') {
      window.open(`https://www.instagram.com/${influencer?.username}`, '_blank');
      return;
    }
    if (influencer?.platform === 'tiktok') {
      window.open(`https://www.tiktok.com/@${influencer?.username}`, '_blank');
      return;
    }
    if (influencer?.platform === 'youtube') {
      window.open(`https://www.youtube.com/@${influencer?.username}`, '_blank');
      return;
    }
  }, [influencer]);

  return (
    <Card className="group relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="relative p-4">
        {/* Top Row */}
        <div className="flex items-start justify-between gap-3">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            TOP CREATOR
          </span> */}

          {/* <div className="flex items-center gap-2">
            {negotiationId && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleViewNegotiation}
                className="h-8 rounded-full border border-[#ED3E75] bg-[#ED3E75] text-white hover:bg-[#d73669] font-normal text-xs flex items-center gap-1.5"
              >
                <SiWhatsapp className="text-base" /> View
              </Button>
            )}
            {onEdit && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onEdit(influencer)}
                className="h-8 rounded-full border border-white/40 bg-white/[0.02] text-white/90 hover:bg-white/[0.06] font-normal text-xs cursor-pointer"
              >
                Edit
              </Button>
            )}
          </div> */}
        </div>

        {/* Image + Basic Info */}
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          <div className="relative aspect-[4/3]">
            <Image
              src={influencer?.picture}
              alt={influencer?.username}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white truncate">{displayName}</h3>
            <p className="mt-1 text-xs text-white/60 truncate">
              {influencer?.bio || influencer?.country || influencer?.platform}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-white/60 min-w-0">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{influencer?.country}</span>
              <span className="text-white/25">|</span>
              {influencer?.platform === 'instagram' ? (
                <span className="inline-flex items-center gap-1">
                  <SiInstagram size={14} className="text-primarytext" />
                  <span className="capitalize">{influencer?.platform}</span>
                </span>
              ) : influencer?.platform === 'tiktok' ? (
                <span className="inline-flex items-center gap-1">
                  <SiTiktok size={14} className="text-white" />
                  <span className="capitalize">{influencer?.platform}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <SiYoutube size={14} className="text-red-500" />
                  <span className="capitalize">{influencer?.platform}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Followers / Engage / Price */}
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Followers
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              {formatFollowers(influencer?.followers || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Engage
            </p>
            <p className="mt-1 text-base font-semibold text-primarytext">
              {formatEngagementRate(influencer?.engagementRate || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
              Price
            </p>
            <p className="mt-1 text-base font-semibold text-white">
              ${influencer?.pricing ?? 0}
            </p>
          </div>
        </div>

        {/* Min/Max/Approved Price */}
        {/* <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[11px] font-bold text-white/60">Min Price</p>
            <p className="mt-1 text-sm font-bold text-white">
              ${influencer?.min_price ?? 0}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[11px] font-bold text-white/60">Max Price</p>
            <p className="mt-1 text-sm font-bold text-white">
              ${influencer?.max_price ?? 0}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[11px] font-bold text-white/60">Approved Price</p>
            <p className="mt-1 text-sm font-bold text-white">
              ${influencer?.last_offered_price ?? 0}
            </p>
          </div>
        </div> */}

        {/* iShout / Brand Status */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[12px] font-bold text-white/70">iShout</p>
            <p
              className={`mt-1 text-[11px] font-bold ${
                influencer?.admin_approved ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {influencer?.admin_approved ? 'Approved' : 'Not Approved'}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[12px] font-bold text-white/70">Brand</p>
            <p
              className={`mt-1 text-[11px] font-bold ${
                influencer?.company_approved ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {influencer?.company_approved ? 'Approved' : 'Not Approved'}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[12px] font-bold text-white/70">Influencer</p>
            <p
              className={`mt-1 text-[11px] font-bold capitalize ${
                (negotiationStatus ?? influencer?.negotiation_status)
                  ? 'text-emerald-300'
                  : 'text-red-300'
              }`}
            >
              {negotiationStatus ?? influencer?.negotiation_status ?? 'Pending'}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <CustomButton
            className="h-10 rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/[0.06] font-normal text-sm"
            onClick={() =>
              onMessage(influencer?.platform as PlatformType, influencer?.username)
            }
          >
            Message
          </CustomButton>
          <CustomButton
            className="h-10 rounded-full bg-primaryButton hover:bg-primaryHover text-white font-normal text-sm"
            onClick={handleViewProfile}
          >
            View Profile
          </CustomButton>
        </div>

        {/* {sendNegotiation && (
          <div className="mt-4">
            <CustomButton
              disabled={
                influencer?.phone_number && influencer?.min_price && influencer?.max_price
                  ? false
                  : true
              }
              onClick={() => sendNegotiation(influencer)}
              className="w-full h-12 rounded-2xl bg-[#ED3E75] text-white italic"
            >
              <SiWhatsapp className="text-2xl text-white" /> Start Negotiation
            </CustomButton>
          </div>
        )} */}
      </div>
    </Card>
  );
}
