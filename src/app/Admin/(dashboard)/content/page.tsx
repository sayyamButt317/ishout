'use client';
import TableComponent from '@/src/app/component/CustomTable';
import React, { useState, useEffect } from 'react';
import { RefreshCcw, UserPlus, Trash } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import OnboardingCampaignHook from '@/src/routes/Admin/Hooks/onboardingCampaign-hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { useRouter } from 'next/navigation';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';

export default function InfluencersContentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const router = useRouter();
  const { data, isLoading, refetch, isRefetching } = OnboardingCampaignHook(currentPage);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteCampaignHook = DeleteCampaignHook();

  useEffect(() => {
    if (briefData) setAdminBrief({ ...briefData.response, id: briefData.id });
  }, [briefData]);

  const rowKey = (c: CompanyCampaignResponse) => c.campaign_id ?? c._id ?? '';

  const renderActions = (campaign: CompanyCampaignResponse) => (
    <div className="flex items-center justify-between w-full">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 hover:bg-red-500/10 rounded-lg"
        disabled={deleteCampaignHook.isPending}
        onClick={() => {
          const id = campaign.campaign_id ?? campaign._id;
          if (confirm('Are you sure you want to delete this campaign?') && id)
            deleteCampaignHook.mutate(id);
        }}
      >
        <Trash className="text-red-400 size-5" />
      </Button>

      <div className="flex items-center gap-2">
        <CustomButton
          className="bg-primaryButton hover:bg-primaryHover text-white text-xs px-4 mr-4 py-1.5 rounded-lg whitespace-nowrap"
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
        <Button
          className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-1.5 rounded-lg whitespace-nowrap border border-white/20"
          onClick={() =>
            router.push(`/Admin/content/influncers_content?campaign_id=${campaign.campaign_id ?? campaign._id}`)
          }
        >
          View Content
        </Button>
      </div>
    </div>
  );

  const buildRow = (campaign: CompanyCampaignResponse) => {
    const id = rowKey(campaign);
    return [
      <div key={`company-${id}`} className="truncate font-medium">{campaign?.company_name}</div>,
      <div key={`name-${id}`} className="truncate text-white/80">{campaign?.name}</div>,
      <div key={`country-${id}`} className="truncate text-white/80">{campaign?.country?.join(', ') || '-'}</div>,
      <div key={`actions-${id}`} className="col-span-full">{renderActions(campaign)}</div>,
    ];
  };

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
        header={['Company Name', 'Campaign Name', 'Country', ' ']}
        imageUrls={data?.campaigns?.map((c: CompanyCampaignResponse) => c?.campaign_logo_url || null)}
        statuses={data?.campaigns?.map((c: CompanyCampaignResponse) => c.status)}
        campaignIds={data?.campaigns?.map((c: CompanyCampaignResponse) => rowKey(c) || null)}
        subheader={data?.campaigns?.map(buildRow)}
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