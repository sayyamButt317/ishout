'use client';

import CampaignAllInfluencerHook from '@/src/routes/Admin/Hooks/feedback/CampaignInfluencer-hook';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Influencer } from '@/src/types/Admin-Type/Feedback/influencer-type';
import useCampaignAnalytics from '@/src/routes/Admin/Hooks/Report/analytics-hook';
import useCampaignBriefStats from '@/src/routes/Admin/Hooks/Report/campaign-brief-stats-hook';
import { useState } from 'react';
import { Skeleton } from 'boneyard-js/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomButton from '@/src/app/component/button';
import { PDFViewer } from '@react-pdf/renderer';
import CampaignReport from '@/src/app/component/reporting/CampaignReport';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';

function formatNumber(n: number | string): string {
  if (typeof n === 'string') return n;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function getEngagementLabel(rate: number) {
  if (rate < 2) return 'Low';
  if (rate < 5) return 'Average';
  return 'High';
}

export default function InfluencerReportHeader() {
  const { id } = useParams<{ id: string }>();

  const { data: influencerData } = CampaignAllInfluencerHook(id);
  const {
    data: negotiationData,
    isLoading: isNegotiationLoading,
    refetch: refetchNegotiation,
  } = NegotiationAgreedByCampaignHook(id);
  const { data: campaignAnalytics, isLoading, isError } = useCampaignAnalytics(id);

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const summaryMutation = useCampaignBriefStats();

  const handleViewReport = async () => {
    try {
      const tasks: Promise<unknown>[] = [summaryMutation.mutateAsync(id)];
      if (!negotiationData) tasks.push(refetchNegotiation());
      await Promise.all(tasks);
      setReportOpen(true);
    } catch {
      setReportOpen(true);
    }
  };

  const isReportLoading = summaryMutation.isPending || isNegotiationLoading;

  const analytics = campaignAnalytics?.summary;
  const top = campaignAnalytics?.top_performer;

  if (isError) {
    return <div className="text-red-500">Failed to load analytics</div>;
  }

  return (
    <Skeleton name="admin-campaign-analytics" loading={isLoading}>
      <div className="space-y-6">
        <Dialog open={reportOpen} onOpenChange={setReportOpen}>
          <DialogContent className="h-[98vh] w-[98vw] max-w-[98vw] overflow-hidden rounded-none p-0 sm:max-w-[98vw]">
            <DialogHeader className="px-6 pt-6">
              <DialogTitle>Campaign Report</DialogTitle>
            </DialogHeader>
            <div className="h-[calc(98vh-88px)] px-2 pb-2">
              {negotiationData ? (
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                  <CampaignReport
                    negotiationData={negotiationData as AgreedNegotiationResponse}
                    summaryData={summaryMutation.data}
                  />
                </PDFViewer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/70">
                  Loading report data...
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {analytics && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Campaign Analytics Dashboard</h1>
              <span className="text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <CustomButton
                    className="bg-primaryButton hover:bg-primaryHover text-white"
                    disabled={isReportLoading}
                    onClick={handleViewReport}
                  >
                    {isReportLoading ? 'Loading Report...' : 'View Report'}
                  </CustomButton>
                </div>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
              <MiniCard label="Influencers" value={analytics.total_influencers} />
              <MiniCard label="Likes" value={analytics.total_likes} />
              <MiniCard label="Comments" value={analytics.total_comments} />
              <MiniCard label="Interactions" value={analytics.total_interactions} />
              <MiniCard
                label="Avg Interaction"
                value={analytics.avg_interaction_per_influencer}
              />
              <MiniCard label="Engagement %" value={`${analytics.engagement_rate}%`} />
            </div>

            {top && (
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-linear-to-r from-pink-500/10 to-purple-500/10 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
                    🏆
                  </div>

                  <div>
                    <p className="font-semibold text-white">Top Performer: @{top.username}</p>
                    <p className="text-xs text-white/40">
                      {top.interaction} interactions • {top.likes} likes • {top.comments}{' '}
                      comments
                    </p>
                  </div>
                </div>

                <a href={top.reel_url} target="_blank" className="text-xs font-medium text-pink-400">
                  View Reel →
                </a>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {influencerData?.influencers?.map((inf: Influencer, index: number) => {
            const profile = inf?.data?.profile;
            const reel = inf?.data?.reel;

            if (!profile || !reel) return null;

            const isPlaying = playingIndex === index;

            const engRateNumber = profile.followers
              ? ((reel.likes + reel.comments + reel.interaction) / profile.followers) * 100
              : 0;

            const engRate = profile.followers ? engRateNumber.toFixed(2) + '%' : 'N/A';

            return (
              <div
                key={`${profile.username}-${reel.url}-${index}`}
                className="flex overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f12]"
              >
                <div
                  className="relative aspect-9/16 w-[45%] cursor-pointer bg-black"
                  onClick={() => setPlayingIndex(index)}
                >
                  {!isPlaying ? (
                    <>
                      <Image
                        src={reel.thumbnail}
                        alt="thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 font-bold text-black">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <video src={reel.media_url} controls autoPlay className="h-full w-full object-cover" />
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <Image
                        src={profile.profile_image}
                        alt={profile.username}
                        width={45}
                        height={45}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-white">{profile.name || profile.username}</p>
                        <p className="text-sm text-white/40">@{profile.username}</p>
                      </div>
                    </div>

                    <p className="mb-3 line-clamp-2 text-xs text-white/50">{profile.biography}</p>

                    <div className="mb-3 grid grid-cols-2 gap-2">
                      <Stat label="Followers" value={formatNumber(profile.followers)} />
                      <Stat label="Following" value={formatNumber(profile.following)} />
                      <Stat label="Posts" value={formatNumber(profile.media_count)} />
                      <Stat label="Likes" value={formatNumber(reel.likes)} />
                      <Stat label="Comments" value={formatNumber(reel.comments)} />
                      <Stat label="Interactions" value={formatNumber(reel.interaction)} />
                      <Stat label="Views" value={formatNumber(reel.views)} />
                    </div>

                    <div className="text-xs text-white/50">
                      Engagement:{' '}
                      <span className="font-semibold text-white">
                        {engRate} ({getEngagementLabel(engRateNumber)})
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="mb-1 line-clamp-2 text-xs italic text-white/40">“{reel.caption}”</p>

                    <a href={reel.url} target="_blank" className="text-xs text-pink-500">
                      Open Reel ↗
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Skeleton>
  );
}

function MiniCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f0f12] p-3">
      <p className="text-[10px] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 p-2">
      <p className="text-[10px] text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

