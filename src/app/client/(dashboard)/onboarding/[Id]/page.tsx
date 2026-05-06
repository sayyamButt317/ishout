'use client';
import { useCallback, useState } from 'react';
import OnboardingHook from '@/src/routes/Admin/Hooks/Campaign/onboarding-hook';
import { ReviewInfluencerResponse } from '@/src/types/Admin-Type/review-influencer';
import { ArrowLeft, RefreshCcw, UserPlus } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import { PlatformType } from '@/src/types/readymadeinfluencers-type';
import { useParams, useRouter } from 'next/navigation';
import CustomButton from '@/src/app/component/button';
import ChooseOptionDialog from '@/src/app/component/custom-component/choseoptionDialogue';
import InfluencerCard from '@/src/app/component/Ready-made/influencer_card';
import { Skeleton } from 'boneyard-js/react';

export default function ClientOnboardingInfluencerByCampaignId() {
  const { Id } = useParams<{ Id: string }>();
  const router = useRouter();
  const currentPage = 1;
  const { data, isLoading, refetch, isRefetching } = OnboardingHook(Id, currentPage);

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

  return (
    <>
      <Skeleton name="influencer-card" loading={isLoading}>
        <PageHeader
          title="Onboarded Influencers"
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
                onClick={() => router.replace('/client/onboarding')}
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                Back to Onboarding
              </CustomButton>
            </>
          }
        />

        {data?.influencers?.length ? (
          <div className="mt-6 flex w-full flex-row flex-wrap gap-4 rounded-2xl border border-white/10 bg-black/10 p-6 backdrop-blur-lg">
            {data?.influencers?.map((influencer: ReviewInfluencerResponse) => {
              return (
                <InfluencerCard
                  key={influencer._id}
                  influencer={influencer}
                  onEdit={handleEdit}
                  onMessage={handleMessage}
                />
              );
            })}
          </div>
        ) : (
          !isLoading && (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="rounded-xl border border-dashed border-white/30 p-10 text-center text-slate-200">
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
      </Skeleton>
    </>
  );
}
