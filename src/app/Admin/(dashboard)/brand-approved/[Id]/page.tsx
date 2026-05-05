'use client';
import { useCallback, useState } from 'react';
import OnboardingHook from '@/src/routes/Admin/Hooks/onboarding-hook';
import { ReviewInfluencerResponse } from '@/src/types/Admin-Type/review-influencer';
import { ArrowLeft, RefreshCcw, UserPlus } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import { PlatformType } from '@/src/types/readymadeinfluencers-type';
import { useParams } from 'next/navigation';
import CustomButton from '@/src/app/component/button';
import { useRouter } from 'next/navigation';
import ChooseOptionDialog from '@/src/app/component/custom-component/choseoptionDialogue';
import InfluencerCard from '@/src/app/component/Ready-made/influencer_card';
import SendNegotiationHook from '@/src/routes/Admin/Hooks/Whatsapp/sendNegotiation-hook';
import NegotiationStatsHook from '@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook';

export default function OnboardingInfluencerByCampaignId() {
  const { Id } = useParams<{ Id: string }>();
  const { mutate: sendNegotiationMutation } = SendNegotiationHook();
  const router = useRouter();
  const [currentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingHook(Id, currentPage);
  const { data: negotiationData } = NegotiationStatsHook(1, 100);

  const getNegotiationForInfluencer = useCallback(
    (influencer: ReviewInfluencerResponse) => {
      if (!negotiationData?.negotiation_controls) return null;
      const negotiation = negotiationData.negotiation_controls.find(
        (n: { influencer_id: string; _id: string; last_offered_price: number }) =>
          n.influencer_id === influencer._id,
      );
      return negotiation
        ? {
            _id: negotiation._id,
            last_offered_price: negotiation.last_offered_price,
          }
        : null;
    },
    [negotiationData],
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<{
    _id: string;
    username: string;
    platform: string;
    picture: string;
    influencer_id: string;
    phone_number: string;
    min_price: number;
    max_price: number;
  } | null>(null);

  const handleMessage = useCallback((platform: PlatformType, username: string) => {
    if (platform === 'instagram') {
      window.open(`https://ig.me/m/${username}`, '_blank');
    } else if (platform === 'tiktok') {
      window.open(`https://www.tiktok.com/@${username}`, '_blank');
    }
  }, []);

  const handleEdit = useCallback((influencer: ReviewInfluencerResponse) => {
    setSelectedInfluencer({
      _id: influencer._id,
      username: influencer.username,
      platform: influencer.platform,
      picture: influencer.picture,
      influencer_id: influencer.influencer_id,
      phone_number: influencer.phone_number || '',
      min_price: influencer.min_price || 0,
      max_price: influencer.max_price || 0,
    });
    setDialogOpen(true);
  }, []);

  const handleSendNegotiation = useCallback(
    (influencer_id: string) => {
      sendNegotiationMutation(influencer_id);
    },
    [sendNegotiationMutation],
  );

  return (
    <>
      <PageHeader
        title="Brand Approved Influencer"
        description={`Showing ${data?.influencers?.length ?? 0} of ${data?.total ?? 0} influencers`}
        icon={<UserPlus className="size-5" />}
        actions={
          <>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-white/70 hover:bg-white/10 hover:text-white"
              onClick={() => refetch()}
              disabled={isRefetching}
              aria-label="Refresh list"
            >
              <RefreshCcw className={`size-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>
            <CustomButton
              className="sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white cursor-pointer max-w-[160px]"
              onClick={() => router.replace('/Admin/onboarding')}
            >
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              Back to Onboarding
            </CustomButton>
          </>
        }
      />

      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
            Loading onboarded influencers...
          </div>
        </div>
      )}

      {data?.influencers?.length ? (
        <div className="w-full flex flex-row flex-wrap gap-4 border border-white/10 rounded-2xl p-6 bg-black/10 backdrop-blur-lg mt-6">
          {data?.influencers?.map((influencer: ReviewInfluencerResponse) => {
            const negotiation = getNegotiationForInfluencer(influencer);
            return (
              <InfluencerCard 
                key={influencer._id}
                influencer={influencer}
                onEdit={handleEdit}
                onMessage={handleMessage}
                sendNegotiation={() => handleSendNegotiation(influencer._id)}
                negotiationId={negotiation?._id}
                lastOfferedPrice={negotiation?.last_offered_price}
              />
            );
          })}
        </div>
      ) : (
        !isLoading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
              No onboarded influencers found
            </div>
          </div>
        )
      )}

      <ChooseOptionDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        influencer={selectedInfluencer}
      />
    </>
  );
}
