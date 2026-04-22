import { PlatformType } from '@/src/types/readymadeinfluencers-type';
import Image from 'next/image';
import CustomButton from '../button';
import { MapPin, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReviewInfluencerResponse } from '@/src/types/Admin-Type/review-influencer';
import {
  formatFollowers,
  formatEngagementRate,
  UsernameLink,
} from '@/src/helper/followersformat';
import { SiInstagram, SiTiktok, SiWhatsapp, SiYoutube } from 'react-icons/si';
import { useRouter } from 'next/navigation';
import NegotiationPage from '../../Admin/(dashboard)/negotiation/page';
import InfluencerCard from '@/src/app/component/Ready-made/influencer-card';

interface OnboardingCardProps {
  influencer: ReviewInfluencerResponse;
  onEdit: (influencer: ReviewInfluencerResponse) => void;
  onMessage: (platform: PlatformType, username: string) => void;
  onApprove?: (influencer: ReviewInfluencerResponse) => void;
  onReject?: (influencer: ReviewInfluencerResponse) => void;
  onDelete?: (influencer: ReviewInfluencerResponse) => void;
  sendNegotiation?: (influencer: ReviewInfluencerResponse) => void;
  negotiationId?: string;
  lastOfferedPrice?: number | null;
}

const OnboardingCard = ({
  influencer,
  onEdit,
  onMessage,
  onApprove,
  onReject,
  onDelete,
  sendNegotiation,
  negotiationId,
  lastOfferedPrice,
}: OnboardingCardProps) => {
  const router = useRouter();

  const handleViewProfile = () => {
    if (influencer?.platform === 'instagram') {
      window.open(`https://www.instagram.com/${influencer?.username}`, '_blank');
    } else if (influencer?.platform === 'tiktok') {
      window.open(`https://www.tiktok.com/@${influencer?.username}`, '_blank');
    } else if (influencer?.platform === 'youtube') {
      window.open(`https://www.youtube.com/@${influencer?.username}`, '_blank');
    }
  };

  const handleViewNegotiation = () => {
    if (negotiationId) {
      router.push(`/Admin/negotiation-chat/${negotiationId}`);
    }
  };

  return (
    <Card className="group relative w-full max-w-md rounded-[28px] border border-white/10 bg-[#0f0f10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Image
              src={influencer?.picture}
              alt={influencer?.username}
              width={64}
              height={64}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="min-w-0">
              <div
                className="text-lg italic font-semibold leading-tight text-white truncate cursor-pointer"
                onClick={() =>
                  window.open(
                    UsernameLink(
                      influencer?.platform as PlatformType,
                      influencer?.username,
                    ),
                    '_blank',
                  )
                }
              >
                @{influencer?.username || 'No name available'}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60 min-w-0">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{influencer?.country}</span>
                <span className="text-white/25 text-sm">|</span>
                <span className="inline-flex items-center gap-1.5">
                  {influencer?.platform === 'instagram' ? (
                    <SiInstagram className="text-primarytext" size={14} />
                  ) : influencer?.platform === 'tiktok' ? (
                    <SiTiktok className="text-white" size={14} />
                  ) : (
                    <SiYoutube className="text-red-500" size={14} />
                  )}
                  <span className="text-white/60 capitalize text-xs">
                    {influencer?.platform}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {negotiationId && (
              <Button
                type="button"
                variant="ghost"
                onClick={handleViewNegotiation}
                className="h-7 rounded-full border border-[#ED3E75] bg-[#ED3E75] text-white hover:bg-[#d73669] font-normal text-sm cursor-pointer flex items-center gap-1.5"
              >
                <SiWhatsapp className="text-base text-white" /> View Chat
              </Button>
            )}
            {onEdit && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onEdit(influencer)}
                className="h-7 rounded-full border border-white/40 bg-white/[0.02] text-white/90 hover:bg-white/[0.06] font-normal text-sm cursor-pointer"
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <CustomButton
            className="h-10 rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/[0.06] font-normal text-sm"
            onClick={() => {
              onMessage(influencer?.platform as PlatformType, influencer?.username);
            }}
          >
            Message
          </CustomButton>
          <CustomButton
            onClick={handleViewProfile}
            className="h-10 rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/[0.06] font-normal text-sm"
          >
            View Profile
          </CustomButton>
        </div>
        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] divide-x divide-white/10">
          <div className="py-2.5 text-center">
            <p className="text-[10px] tracking-[0.16em] text-white/60">FOLLOWERS</p>
            <p className="mt-1 text-base font-semibold text-white">
              {formatFollowers(influencer?.followers || 0)}
            </p>
          </div>
          <div className="py-2.5 text-center">
            <p className="text-[10px] tracking-[0.16em] text-white/60">ENGAGE</p>
            <p className="mt-1 text-base font-semibold text-primarytext">
              {formatEngagementRate(influencer?.engagementRate)}
            </p>
          </div>
          <div className="py-2.5 text-center">
            <p className="text-[10px] tracking-[0.16em] text-white/60">PRICE</p>
            <p className="mt-1 text-base font-semibold text-white">
              ${influencer?.pricing || 0}
            </p>
          </div>
        </div>
        <div className="relative mt-4 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] divide-x divide-white/10">
          <div className="py-3 text-center">
            <p className="text-sm text-white/75">Min Price</p>
            <p className="mt-1 text-lg font-semibold text-white">
              ${influencer?.min_price || 0}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-sm text-white/75">Max Price</p>
            <p className="mt-1 text-lg font-semibold text-white">
              ${influencer?.max_price || 0}
            </p>
          </div>
          <div className="py-3 text-center">
            <p className="text-sm text-white/75">Approved Price</p>
            <p className="mt-1 text-lg font-semibold text-white">
              $
              {influencer.last_offered_price !== null &&
              influencer.last_offered_price !== undefined
                ? influencer.last_offered_price
                : 0}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {/* iShout */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-sm text-white/75 whitespace-nowrap">iShout</p>
            <p
              className={`mt-1 text-xs font-normal ${
                influencer?.admin_approved ? 'text-emerald-400' : 'text-red-400'
              } whitespace-nowrap`}
            >
              {influencer?.admin_approved ? 'Approved' : 'Not Approved'}
            </p>
          </div>

          {/* Brand */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-sm text-white/75 whitespace-nowrap">Brand</p>
            <p
              className={`mt-1 text-xs font-normal ${
                influencer?.company_approved ? 'text-emerald-400' : 'text-red-400'
              } whitespace-nowrap`}
            >
              {influencer?.company_approved ? 'Approved' : 'Not Approved'}
            </p>
          </div>

          {/* Influencer */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center flex flex-col items-center justify-center">
            <p className="text-sm text-white/75 whitespace-nowrap">Influencer</p>
            <p
              className={`mt-1 capitalize text-xs font-normal ${
                influencer?.negotiation_status ? 'text-emerald-400' : 'text-red-400'
              } whitespace-nowrap`}
            >
              {influencer?.negotiation_status ?? 'Pending'}
            </p>
          </div>
        </div>
        {(onApprove || onReject || onDelete) && (
          <div className="mt-6 flex items-center gap-3">
            {onApprove && (
              <Button
                onClick={() => onApprove(influencer)}
                className="flex-1 h-12 rounded-2xl bg-[#ED3E75] hover:bg-[#d73669] text-white italic"
              >
                Approve
              </Button>
            )}
            {onReject && (
              <Button
                onClick={() => onReject(influencer)}
                className="flex-1 h-12 rounded-2xl bg-[#224085] hover:bg-[#1c356f] text-white italic"
              >
                Reject
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                onClick={() => onDelete(influencer)}
                className="h-12 w-12 rounded-2xl border border-[#FF6262]/20 bg-[#FF62620D] text-[#FF6262]"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        {sendNegotiation && (
          <div className="mt-6 flex items-center gap-3">
            <CustomButton
              disabled={
                influencer?.phone_number && influencer?.min_price && influencer?.max_price
                  ? false
                  : true
              }
              onClick={() => sendNegotiation(influencer)}
              className="flex-1 h-12 rounded-2xl bg-[#ED3E75] text-white italic"
            >
              <SiWhatsapp className="text-2xl text-white" /> Start Negotiation
            </CustomButton>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OnboardingCard;
