'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import React, { useState, useEffect } from 'react';
import { RefreshCcw, UserPlus } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import OnboardingCampaignHook from '@/src/routes/Admin/Hooks/onboardingCampaign-hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { useRouter } from 'next/navigation';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/Campaign/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';
import { Trash } from 'lucide-react';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';

export default function InfluencersContentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingCampaignHook(currentPage);
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const rowKey = (campaign: CompanyCampaignResponse) =>
    campaign.campaign_id ?? campaign._id ?? '';
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteCampaignHook = DeleteCampaignHook();

  const campaigns = (data?.campaigns ?? []) as CompanyCampaignResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

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
        description={`Showing ${campaigns.length} of ${totalCount} campaigns waiting for content feedback review`}
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

      <TableComponent<CompanyCampaignResponse>
        header={['Company Name', 'Campaign Name', 'Platform', 'Delete', ' ', ' ', ' ']}
        imageUrls={campaigns.map(
          (campaign: CompanyCampaignResponse) => campaign?.campaign_logo_url || null,
        )}
        statuses={campaigns.map((campaign: CompanyCampaignResponse) => campaign.status)}
        campaignIds={campaigns.map(
          (campaign: CompanyCampaignResponse) => rowKey(campaign) || null,
        )}
        campaigns={campaigns}
        subheader={campaigns.map((campaign: CompanyCampaignResponse) => {
          const id = rowKey(campaign);
          return [
            campaign.company_name,
            campaign.name,
            <PlatformBadge key={`platform-${id}`} platform={campaign?.platform} />,
            <Button
              key={`delete-${id}`}
              variant="ghost"
              size="icon"
              disabled={deleteCampaignHook.isPending}
              onClick={() => {
                const delId = campaign.campaign_id ?? campaign._id;
                if (delId) {
                  setSelectedCampaignId(delId);
                  setDeleteOpen(true);
                }
              }}
            >
              <Trash className="text-red-300 cursor-pointer size-5" />
            </Button>,
            <Button
              key={`view-${id}`}
              className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
              onClick={() => {
                router.push(
                  `/Admin/content/influncers_content?campaign_id=${campaign.campaign_id ?? campaign._id
                  }`,
                );
              }}
            >
              View Content
            </Button>,
            <CustomButton
              key={`view-brief-${id}`}
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
            </CustomButton>,

          ];
        })}
        paginationstart={data?.page ?? currentPage}
        paginationend={totalPages}
        onPageChange={(page: number) => setCurrentPage(page)}
        isLoading={isLoading}
      />
      <DeleteDialogue
        heading="Delete Campaign"
        subheading="Are you sure you want to delete this campaign?"
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedCampaignId(null);
        }}
        ondelete={() => {
          if (selectedCampaignId) {
            deleteCampaignHook.mutate(selectedCampaignId, {
              onSuccess: () => {
                setDeleteOpen(false);
                setSelectedCampaignId(null);
                refetch();
              },
            });
          }
        }}
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
