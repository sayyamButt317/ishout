'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import React, { useState, useEffect } from 'react';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import { RefreshCcw, UserPlus } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import OnboardingCampaignHook from '@/src/routes/Admin/Hooks/onboardingCampaign-hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { useRouter } from 'next/navigation';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';
import { Trash } from 'lucide-react';

export default function InfluencersContentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingCampaignHook(currentPage);
  const router = useRouter();

  const rowKey = (campaign: CompanyCampaignResponse) =>
    campaign.campaign_id ?? campaign._id ?? '';
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
      <PageHeader
        title="Content Feedback & Pipeline"
        description="Showing campaigns waiting for content feedback review"
        icon={<UserPlus className="size-5" />}
        actions={
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
        }
      />

      <TableComponent
        header={[
          'Company Name',
          'Campaign Name',
          'Platform',
          'Followers',
          'Country',
          'Status',
          'Requested',
          'Onboarded',
          'Created At',
          'Delete',
          ' ',
          ' ',
          ' ',
        ]}
        imageUrls={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => campaign?.campaign_logo_url || null,
        )}
        statuses={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => campaign.status,
        )}
        campaignIds={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => rowKey(campaign) || null,
        )}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => {
          const id = rowKey(campaign);
          return [
            <div key={`company-${id}`} className="truncate">
              {campaign?.company_name}
            </div>,
            <div key={`campaign-name-${id}`} className="truncate">
              {campaign?.name}
            </div>,
            <div key={`platform-${id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`followers-${id}`} className="truncate">
              {Array.isArray(campaign?.followers)
                ? campaign.followers.map((f: number) => `${f}`).join(', ')
                : '-'}
            </div>,
            <div key={`country-${id}`} className="truncate">
              {campaign?.country?.join(', ') || '-'}
            </div>,
            <div key={`status-${id}`} className="truncate">
              <StatusBadge status={campaign?.status} />
            </div>,
            <div key={`requested-influencers-${id}`} className="truncate">
              <CountButton count={campaign?.limit} />
            </div>,
            <div key={`onboarding-influencers-${id}`} className="truncate">
              <CountButton count={campaign?.approved_influencer_count} />
            </div>,

            <div key={`created-at-${id}`} className="truncate">
              {new Date(campaign?.created_at).toLocaleDateString()}
            </div>,

            <div key={`delete-${id}`} className="truncate">
              <Button
                variant="ghost"
                size="icon"
                disabled={deleteCampaignHook.isPending}
                onClick={() => {
                  const delId = campaign.campaign_id ?? campaign._id;
                  if (
                    confirm('Are you sure you want to delete this campaign?') &&
                    delId
                  ) {
                    deleteCampaignHook.mutate(delId);
                  }
                }}
              >
                <Trash className="text-red-300 cursor-pointer size-md" />
              </Button>
            </div>,
            <div key={`view-brief-${id}`} className="truncate">
              <CustomButton
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
                disabled={!campaign.brief_id}
                onClick={() => {
                  if (campaign.brief_id) {
                    setSelectedBriefId(campaign.brief_id);
                    setDialogOpen(true);
                  }
                }}
              >
                View Brief
              </CustomButton>
            </div>,
            <div key={`view-${id}`} className="truncate">
              <Button
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
                onClick={() => {
                  router.push(
                    `/Admin/content/influncers_content?campaign_id=${campaign.campaign_id ?? campaign._id
                    }`,
                  );
                }}
              >
                View Content
              </Button>
            </div>,
          ];
        })}
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
