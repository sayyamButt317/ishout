'use client';

import CampaignAllInfluencerHook from '@/src/routes/Admin/Hooks/feedback/CampaignInfluencer-hook';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Influencer } from '@/src/types/Admin-Type/Feedback/influencer-type';
import useCampaignAnalytics from '@/src/routes/Admin/Hooks/Report/analytics-hook';
import useCampaignBriefStats from '@/src/routes/Admin/Hooks/Report/campaign-brief-stats-hook';
import { useMemo, useState } from 'react';
import { AnalyticsDashboardSkeleton } from '@/src/app/component/skeletons/admin-skeletons';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CustomButton from '@/src/app/component/button';
import { PDFViewer } from '@react-pdf/renderer';
import CampaignReport from '@/src/app/component/reporting/CampaignReport';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import useInfluencerDemographicsAssets from '@/src/routes/Admin/Hooks/Report/influencer-demographics-assets-hook';
import DemographicsAssetsDialog from '@/src/app/component/custom-component/DemographicsAssetsDialog';
import { Play, ExternalLink, Trophy, RefreshCcw } from 'lucide-react';
import useOverallCampaignOutcomes from '@/src/routes/Admin/Hooks/Report/overall-campaign-outcomes-hook';

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

function engagementTone(rate: number): { bar: string; label: string } {
  if (rate < 2)
    return {
      bar: 'border-amber-500/40 bg-amber-500/15 dark:border-amber-500/30 dark:bg-amber-500/10',
      label: 'text-amber-800 dark:text-amber-200/90',
    };
  if (rate < 5)
    return {
      bar: 'border-border bg-muted/60 dark:border-white/10 dark:bg-white/4',
      label: 'text-foreground dark:text-white',
    };
  return {
    bar: 'border-emerald-500/40 bg-emerald-500/15 dark:border-emerald-500/30 dark:bg-emerald-500/10',
    label: 'text-emerald-800 dark:text-emerald-200/90',
  };
}

export default function InfluencerReportHeader() {
  const { id } = useParams<{ id: string }>();

  const { data: influencerData } = CampaignAllInfluencerHook(id);
  const {
    data: negotiationData,
    isLoading: isNegotiationLoading,
    refetch: refetchNegotiation,
    isRefetching: isNegotiationRefetching,
  } = NegotiationAgreedByCampaignHook(id);
  const { data: campaignAnalytics, isLoading, isError } = useCampaignAnalytics(id);


  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportPdfKey, setReportPdfKey] = useState(0);
  const [demographicsOpen, setDemographicsOpen] = useState(false);
  const [selectedInfluencerUsername, setSelectedInfluencerUsername] = useState<
    string | null
  >(null);
  const summaryMutation = useCampaignBriefStats();
  const { data: overallOutcomes, refetch: refetchOverallOutcomes } =
    useOverallCampaignOutcomes(id);
  const { data: demographicsData, isLoading: isDemographicsLoading } =
    useInfluencerDemographicsAssets(
      id,
      selectedInfluencerUsername ?? undefined,
      demographicsOpen,
    );

  const handleViewReport = async () => {
    try {
      const tasks: Promise<unknown>[] = [
        summaryMutation.mutateAsync(id),
        refetchOverallOutcomes(),
      ];
      if (!negotiationData) tasks.push(refetchNegotiation());
      await Promise.all(tasks);
      setReportPdfKey((k) => k + 1);
      setReportOpen(true);
    } catch {
      setReportPdfKey((k) => k + 1);
      setReportOpen(true);
    }
  };

  const isReportLoading = summaryMutation.isPending || isNegotiationLoading;
  const demographicsImageUrls = useMemo(
    () =>
      demographicsData?.demographics?.map((item) => item.image_url).filter(Boolean) ?? [],
    [demographicsData?.demographics],
  );

  const analytics = campaignAnalytics?.summary;
  const top = campaignAnalytics?.top_performer;

  if (isError) {
    return <div className="text-red-500">Failed to load analytics</div>;
  }

  if (isLoading) return <AnalyticsDashboardSkeleton />;

  return (
    <div className="space-y-6">
      <RefreshCcw className={`size-4 ${isNegotiationRefetching ? 'animate-spin' : ''}`} />
      <Dialog open={reportOpen} onOpenChange={setReportOpen}>
        <DialogContent
          className="h-[98vh] w-[98vw] max-w-[98vw] overflow-hidden rounded-none p-0 sm:max-w-[98vw]"
          aria-describedby={undefined}
        >
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Campaign Report</DialogTitle>
          </DialogHeader>
          <div className="h-[calc(98vh-88px)] px-2 pb-2">
            {negotiationData ? (
              <PDFViewer key={reportPdfKey} style={{ width: '100%', height: '100%' }}>
                <CampaignReport
                  negotiationData={negotiationData as AgreedNegotiationResponse}
                  summaryData={summaryMutation.data}
                  overallOutcomes={overallOutcomes}
                />
              </PDFViewer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading report data...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <DemographicsAssetsDialog
        open={demographicsOpen}
        onOpenChange={(open) => {
          setDemographicsOpen(open);
          if (!open) setSelectedInfluencerUsername(null);
        }}
        imageUrls={demographicsImageUrls}
        isLoading={isDemographicsLoading}
        username={selectedInfluencerUsername}
      />

      {analytics && (
        <div className="space-y-6 rounded-3xl border border-border bg-card/90 p-5 shadow-sm dark:border-white/6 dark:bg-linear-to-b dark:from-white/3 dark:to-transparent dark:shadow-none sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl dark:text-white">
                Campaign Analytics Dashboard
              </h1>
              <p className="text-sm text-muted-foreground dark:text-white/40">
                Performance snapshot and influencer breakdown for this campaign.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <CustomButton
                className="bg-primaryButton hover:bg-primaryHover text-white shadow-md shadow-primaryButton/20"
                disabled={isReportLoading}
                onClick={handleViewReport}
              >
                {isReportLoading ? 'Loading Report...' : 'View Report'}
              </CustomButton>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 md:gap-3 lg:gap-4">
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

          {/* TOP PERFORMER */}
          {top && (
            <div className="relative overflow-hidden rounded-2xl border border-border bg-primary/5 px-5 py-5 sm:min-h-26 sm:px-6 sm:py-6 dark:border-white/10 dark:bg-linear-to-r dark:from-[#FF3B8D]/8 dark:via-violet-600/6 dark:to-transparent">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-linear-to-b from-primaryButton via-primaryButton/60 to-transparent"
              />
              <div className="flex flex-col gap-4 pl-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pl-4">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#FF3B8D] to-[#c42a6f] text-white shadow-md shadow-[#FF3B8D]/25 ring-1 ring-black/10 dark:ring-white/15 sm:h-14 sm:w-14">
                    <Trophy
                      className="h-6 w-6 sm:h-7 sm:w-7"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground dark:text-white/45">
                      Top performer
                    </p>
                    <p className="mt-1 truncate text-base font-semibold text-foreground sm:text-lg dark:text-white">
                      @{top.username}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground dark:text-white/50">
                      {top.interaction} interactions · {top.likes} likes · {top.comments}{' '}
                      comments
                    </p>
                  </div>
                </div>
                {top.reel_url ? (
                  <a
                    href={top.reel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-xl border border-border bg-muted/60 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/25 dark:hover:bg-white/10 sm:self-center"
                  >
                    View reel
                    <ExternalLink className="h-4 w-4 opacity-70" aria-hidden />
                  </a>
                ) : null}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:gap-8">
        {influencerData?.influencers?.map((inf: Influencer, index: number) => {
          const profile = inf?.data?.profile;
          const reel = inf?.data?.reel;

          if (!profile || !reel) return null;

          const isPlaying = playingIndex === index;

          const engRateNumber = profile.followers
            ? ((reel.likes + reel.comments + reel.interaction) / profile.followers) * 100
            : 0;

          const engRate = profile.followers ? engRateNumber.toFixed(2) + '%' : 'N/A';
          const engTone = engagementTone(engRateNumber);

          return (
            <div
              key={`${profile.username}-${reel.url}-${index}`}
              className="group flex overflow-hidden rounded-2xl border border-border bg-card shadow-md ring-1 ring-border/40 transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-border hover:shadow-lg dark:border-white/10 dark:bg-linear-to-br dark:from-[#1c1c24] dark:via-[#16161d] dark:to-[#101014] dark:shadow-[0_4px_28px_-10px_rgba(0,0,0,0.55)] dark:ring-white/4 dark:hover:border-white/15 dark:hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)]"
            >
              {/* VIDEO */}
              <div
                className="relative w-[42%] shrink-0 cursor-pointer border-r border-border bg-muted dark:border-white/10 dark:bg-zinc-950 sm:w-[45%]"
                onClick={() => setPlayingIndex(index)}
              >
                <div className="relative aspect-9/16 h-full min-h-[220px] w-full sm:min-h-[260px]">
                  {!isPlaying ? (
                    <>
                      <Image
                        src={reel.thumbnail}
                        alt="thumbnail"
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition duration-300 group-hover:bg-black/40">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-primaryButton shadow-lg shadow-black/30 ring-2 ring-white/40 backdrop-blur-sm transition duration-300 group-hover:scale-110">
                          <Play
                            className="ml-0.5 h-6 w-6 text-primaryButton"
                            strokeWidth={2.25}
                            fill="currentColor"
                            aria-hidden
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <video
                      src={reel.media_url}
                      controls
                      autoPlay
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* DETAILS */}
              <div className="flex min-h-0 min-w-0 flex-1 flex-col p-5 sm:p-6">
                <div className="min-w-0 flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <Image
                        src={profile.profile_image}
                        alt={profile.username}
                        width={52}
                        height={52}
                        className="rounded-full ring-2 ring-border ring-offset-2 ring-offset-background dark:ring-white/15 dark:ring-offset-[#16161d]"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg dark:text-white">
                        {profile.name || profile.username}
                      </p>
                      <p className="truncate text-sm text-primaryButton/80">
                        @{profile.username}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-muted/50 px-3 py-2.5 dark:border-white/8 dark:bg-white/3">
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground dark:text-white/60">
                      {profile.biography}
                    </p>
                  </div>

                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-3">
                    <Stat label="Followers" value={formatNumber(profile.followers)} />
                    <Stat label="Following" value={formatNumber(profile.following)} />
                    <Stat label="Posts" value={formatNumber(profile.media_count)} />
                    <Stat label="Likes" value={formatNumber(reel.likes)} />
                    <Stat label="Comments" value={formatNumber(reel.comments)} />
                    <Stat label="Interactions" value={formatNumber(reel.interaction)} />
                    {/* <Stat label="Views" value={formatNumber(reel.views)} /> */}
                  </div>

                  {/* ENGAGEMENT */}
                  <div
                    className={`rounded-xl border px-3 py-2.5 text-sm text-muted-foreground dark:text-white/60 ${engTone.bar}`}
                  >
                    Engagement:{' '}
                    <span className={`font-semibold ${engTone.label}`}>
                      {engRate}{' '}
                      <span className="text-muted-foreground dark:text-white/50">
                        ({getEngagementLabel(engRateNumber)})
                      </span>
                    </span>
                  </div>
                </div>

                {/* FOOTER — caption + actions */}
                <div className="mt-auto shrink-0 space-y-4 border-t border-border pt-4 dark:border-white/10">
                  <blockquote className="border-l-2 border-primaryButton/70 pl-3 text-xs italic leading-relaxed text-muted-foreground sm:text-sm dark:text-white/45">
                    {reel.caption}
                  </blockquote>

                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-muted/70 p-3 ring-1 ring-inset ring-border dark:bg-black/25 dark:ring-white/5">
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primaryButton transition hover:text-primaryHover"
                    >
                      Open reel
                      <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden />
                    </a>
                    <CustomButton
                      className="bg-primaryButton hover:bg-primaryHover text-white shadow-md shadow-primaryButton/25"
                      onClick={() => {
                        setSelectedInfluencerUsername(profile.username);
                        setDemographicsOpen(true);
                      }}
                    >
                      View Demographics
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="group relative flex min-h-24 flex-col justify-center overflow-hidden rounded-2xl border border-border bg-muted/50 px-4 py-4 shadow-sm transition-[border-color,box-shadow] hover:border-border hover:shadow-md md:min-h-26 dark:border-white/10 dark:bg-linear-to-b dark:from-[#202028] dark:to-[#18181f] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_14px_-4px_rgba(0,0,0,0.45)] dark:hover:border-white/14 dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_22px_-6px_rgba(0,0,0,0.5)]">
      <div
        className="pointer-events-none absolute inset-x-3 top-0 h-px rounded-full bg-linear-to-r from-transparent via-primaryButton/50 to-transparent opacity-90"
        aria-hidden
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-xs dark:text-white/45">
        {label}
      </p>
      <p className="mt-2.5 text-xl font-bold tabular-nums tracking-tight text-foreground md:text-2xl dark:text-white">
        {value}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative flex min-h-14 flex-col justify-center overflow-hidden rounded-xl border border-border bg-muted/40 px-3 py-2.5 shadow-sm transition-[border-color,background-color] hover:border-border hover:bg-muted/60 dark:border-white/10 dark:bg-linear-to-b dark:from-white/10 dark:to-white/3 dark:shadow-black/20 dark:hover:border-white/18">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground dark:text-white/40">
        {label}
      </p>
      <p className="mt-1.5 text-base font-bold tabular-nums tracking-tight text-foreground dark:text-white">
        {value}
      </p>
    </div>
  );
}
