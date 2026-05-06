'use client';
import { Button } from '@/components/ui/button';
import InfluencerCard from '@/src/app/component/Ready-made/influencer-card';
import ExportToExcel from '@/src/app/component/custom-component/exportToExcel';
import Spinner from '@/src/app/component/custom-component/spinner';
import CampaignByIdHook from '@/src/routes/Admin/Hooks/Campaign/campaignById-hook';
import { ReadyMadeInfluencerResponse } from '@/src/types/readymadeinfluencers-type';
import { ArrowLeft, ChevronRight, Download, UserCheck, UserX, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import CustomButton from '@/src/app/component/button';
import { Skeleton } from 'boneyard-js/react';

export default function CampaignByIdPage() {
  const { Id } = useParams<{ Id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = CampaignByIdHook(Id ?? '');

  const approvedCount = data?.approved_influencers?.length ?? 0;
  const rejectedCount = data?.rejected_influencers?.length ?? 0;
  const campaignTitle = (data as { name?: string } | undefined)?.name ?? 'Campaign';
  const totalCount = approvedCount + rejectedCount;

  return (
    <Skeleton name="admin-influencer-grid" loading={isLoading}>
      <div className="font-sans">
        <header
          className="mb-10 relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.4)]"
          role="banner"
        >
          <div
            className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-(--color-primaryButton) opacity-[0.08] blur-[60px]"
            aria-hidden
          />
          <div
            className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--color-primaryButton) to-transparent opacity-60"
            aria-hidden
          />

          <div className="relative px-6 py-6 sm:px-8 sm:py-7">
            <nav className="mb-4 flex items-center gap-1.5 text-xs" aria-label="Breadcrumb">
              <Link
                href="/Admin/all-campaign"
                className="font-medium text-white/45 transition-colors hover:text-primaryButton"
              >
                All Campaigns
              </Link>
              <ChevronRight className="size-3.5 text-white/25" aria-hidden />
              <span className="font-medium text-white/60">{campaignTitle}</span>
            </nav>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <div className="flex items-center gap-4">
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-(--color-primaryButton)/20 bg-(--color-primaryButton)/12 text-(--color-primaryButton)"
                    aria-hidden
                  >
                    <Users className="size-7" />
                  </div>
                  <div className="min-w-0">
                    <h1 className="truncate text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      <h1 className="truncate text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                        {campaignTitle}
                      </h1>
                      <p className="mt-0.5 text-sm font-medium text-white/50">
                        Influencers · {totalCount} total
                      </p>
                    </h1>
                  </div>
                </div>

                {/* Stat pills */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3.5 py-2">
                    <UserCheck className="size-4 text-emerald-400" aria-hidden />
                    <span className="text-sm font-semibold text-emerald-400">
                      {approvedCount} approved
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-2">
                    <UserX className="size-4 text-(--color-deleteButton)" aria-hidden />
                    <span className="text-sm font-semibold text-(--color-deleteButton)">
                      {rejectedCount} rejected
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:gap-3">
                <CustomButton
                  className="h-11 gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:border-white/15"
                  onClick={() => router.push('/Admin/all-campaign')}
                >
                  <ArrowLeft className="size-4" />
                  Back to list
                </CustomButton>
                <Button
                  className="h-11 gap-2 rounded-xl bg-(--color-primaryButton) px-4 text-sm font-semibold text-white transition-all hover:opacity-95"

                  onClick={() => ExportToExcel()}
                >
                  <Download className="size-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </header>

        {isError && (
          <div className="flex justify-center items-center min-h-50">
            <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10">
              Error loading influencers
            </div>
          </div>
        )}

        {/* Approved section */}
        <div className="flex flex-row items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-white">Approved Influencers</h2>
          {approvedCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 h-9 gap-1.5"
              onClick={() => ExportToExcel()}
            >
              <Download className="size-4" />
              Export
            </Button>
          )}
        </div>

        {data?.approved_influencers?.length ? (
          <div className="w-full mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {data.approved_influencers.map((approved: ReadyMadeInfluencerResponse) => (
              <InfluencerCard
                key={approved._id}
                influencer={approved}
                showAccept={false}
                showReject={false}
                showDelete={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10 mb-8">
            No approved influencers found
          </div>
        )}

        {/* Rejected section */}
        <h2 className="text-lg font-semibold text-white mb-4">Rejected Influencers</h2>
        {data?.rejected_influencers?.length ? (
          <div className="w-full mx-auto mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {data.rejected_influencers.map((rejected: ReadyMadeInfluencerResponse) => (
              <InfluencerCard
                key={rejected._id}
                influencer={rejected}
                showAccept={false}
                showReject={false}
                showDelete={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-slate-200 border border-dashed border-white/30 rounded-xl p-10 mb-8">
            No rejected influencers found
          </div>
        )}
      </div>
    </Skeleton>
  );
}
