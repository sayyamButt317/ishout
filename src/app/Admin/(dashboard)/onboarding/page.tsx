'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import React, { useState, useEffect } from 'react';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import { RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OnboardingCampaignHook from '@/src/routes/Admin/Hooks/onboardingCampaign-hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign.type';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { useRouter } from 'next/navigation';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import { Trash } from 'lucide-react';

export default function OnboardingCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingCampaignHook(currentPage);
  const router = useRouter();
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteCampaignHook = DeleteCampaignHook();

  useEffect(() => {
    if (briefData) {
      setAdminBrief({
        ...briefData.response,
        id: briefData.id,
      });
    }
  }, [briefData]);

  return (
    <>
      <div className="mb-6">
        <div className="flex flex-row items-center gap-2">
          <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
            Onboarding Influencer
          </h1>
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => {
              refetch();
            }}
            disabled={isRefetching}
          >
            <RefreshCcw
              className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
                isRefetching ? 'animate-spin' : ''
              }`}
            />
          </Button>
        </div>
        <p className="italic text-xs text-slate-200 mt-2">
          Showing {data?.campaigns?.length} onboarding campaigns that have waiting for
          influencers to be onboarded
        </p>
      </div>

      <TableComponent
        header={[
          'Company Name',
          'Campaign Name',
          'Source',
          'Platform',
          'Category',
          'Followers',
          'Country',
          'Requested',
          'Onboarded',
          'Status',
          'Created At',
          'View',
          'View Brief',
          'Delete',
        ]}
        imageUrls={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => campaign?.logo_url || null,
        )}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => [
          <div key={`company-${campaign._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`campaign-name-${campaign._id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`source-${campaign._id}`} className="truncate">
            {campaign?.user_type || '-'}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            {campaign?.category?.join(', ') || '-'}
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {Array.isArray(campaign?.followers)
              ? campaign.followers.map((f: number) => `${f}`).join(', ')
              : '-'}
          </div>,
          <div key={`country-${campaign._id}`} className="truncate">
            {campaign?.country?.join(', ') || '-'}
          </div>,
          <div key={`requested-influencers-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.limit} />
          </div>,
          <div key={`onboarding-influencers-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.approved_influencer_count} />
          </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            <StatusBadge status={campaign?.status} />
          </div>,
          <div key={`created-at-${campaign._id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`view-${campaign._id}`} className="truncate">
            <Button
              className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
              onClick={() => {
                router.push(`/Admin/onboarding/${campaign?._id}`);
              }}
            >
              View
            </Button>
          </div>,
          <div key={`view-brief-${campaign._id}`} className="truncate">
            <Button
              className="bg-secondaryButton hover:bg-secondaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
              disabled={!campaign.brief_id}
              onClick={() => {
                if (campaign.brief_id) {
                  setSelectedBriefId(campaign.brief_id);
                  setDialogOpen(true);
                }
              }}
            >
              View Brief
            </Button>
          </div>,
          <div key={`delete-${campaign._id}`} className="truncate">
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteCampaignHook.isPending}
              onClick={() => {
                if (confirm('Are you sure you want to delete this campaign?')) {
                  deleteCampaignHook.mutate(campaign._id);
                }
              }}
            >
              <Trash className="size-5 text-red-300 cursor-pointer" />
            </Button>
          </div>,
        ])}
        paginationstart={currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />
      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={adminBrief}
        onUpdate={(updatedBrief) => setAdminBrief(updatedBrief)}
      />
    </>
  );
}
