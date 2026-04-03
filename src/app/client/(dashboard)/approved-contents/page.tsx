'use client';

import { Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/src/app/component/PageHeader';
import ApprovedContentCard from '@/src/app/component/approved-content/approved-content-card';
import ApprovedContentsMutation from '@/src/routes/Company/api/Hooks/approved-contents.hook';
import { CheckCircle, LayoutGrid, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ApprovedContentsPageContent() {
  const searchParams = useSearchParams();
  const campaignId = searchParams.get('campaign_id') ?? '';

  const approvedContentsMutation = ApprovedContentsMutation();
  const { mutate, reset, data, isPending } = approvedContentsMutation;

  useEffect(() => {
    if (!campaignId) {
      reset();
      return;
    }
    reset();
    mutate(campaignId);
  }, [campaignId, mutate, reset]);

  const isLoading = isPending;

  const description = !campaignId
    ? 'Select a campaign from All Campaigns to view approved content.'
    : isLoading
      ? 'Loading approved content…'
      : data
        ? `${data.total} approved item${data.total === 1 ? '' : 's'} · campaign ${data.campaign_id.slice(-8)}`
        : 'Approved content for this campaign';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contents"
        description={description}
        icon={<CheckCircle className="size-5" />}
      />

      {!campaignId && (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-[#0f0f10] px-4 py-4 text-sm text-white/70">
          <span>Open a campaign from</span>
          <Button
            asChild
            className="bg-(--color-primaryButton) hover:opacity-90 text-white"
          >
            <Link
              href="/client/approved-contents/all-campaigns"
              className="inline-flex items-center gap-2"
            >
              <LayoutGrid className="size-4" />
              All campaigns
            </Link>
          </Button>
        </div>
      )}

      {campaignId && isLoading && (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#0f0f10] py-16 text-white/60">
          <Loader2 className="size-6 animate-spin" />
          <span>Loading approved content…</span>
        </div>
      )}

      {campaignId && data && !data.approved_contents.length && (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/2 px-6 py-12 text-center text-sm text-white/50">
          No approved content to show.
        </div>
      )}

      {campaignId && data && data.approved_contents.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.approved_contents.map((item) => (
            <ApprovedContentCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ApprovedContentsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center gap-2 p-8 text-white/60">
          <Loader2 className="size-6 animate-spin" />
          Loading…
        </div>
      }
    >
      <ApprovedContentsPageContent />
    </Suspense>
  );
}
