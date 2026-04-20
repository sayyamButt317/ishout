'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import TableComponent from '@/src/app/component/CustomTable';
import CompanyCampaignHook from '@/src/routes/Company/api/Hooks/companyCampaign.hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { useEffect, useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';
import { LayoutGrid } from 'lucide-react';
import CustomButton from '@/src/app/component/button';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';

export default function AllCampaign() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = CompanyCampaignHook(currentPage);
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteCampaignHook = DeleteCampaignHook();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  useEffect(() => {
    if (briefData) {
      setAdminBrief({ ...briefData.response, id: briefData.id });
    }
  }, [briefData]);

  return (
    <>
      <PageHeader
        title="All Campaigns"
        description={
          data?.campaigns?.length != null && data?.total != null
            ? `Showing ${data.campaigns.length} of ${data.total} campaigns`
            : 'Your campaigns across all statuses'
        }
        icon={<LayoutGrid className="size-5" />}
      />
      <TableComponent
        header={[
          'Campaign Name',
          'followers',
          'Platform',
          'Category',
          'Country',
          'Requested ',
          // "Approved ",
          // "Rejected ",
          'Status',
          'Created At',
          'Delete',
          'View',
        ]}
        imageUrls={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => campaign?.campaign_logo_url || null,
        )}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => [
          <div key={`name-${campaign?.campaign_id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`followers-${campaign?.campaign_id}`} className="truncate">
            {campaign?.followers?.join(', ')}
          </div>,
          <div key={`platform-${campaign?.campaign_id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign.campaign_id}`} className="truncate">
            {campaign?.category?.join(', ') || '-'}
          </div>,
          <div key={`country-${campaign?.campaign_id}`} className="truncate">
            {campaign?.country?.join(', ')}
          </div>,
          <div
            key={`requested-${campaign?.campaign_id}`}
            className="truncate items-center justify-center"
          >
            {campaign?.limit}
          </div>,

          <div key={`status-${campaign?.campaign_id}`} className="truncate">
            <StatusBadge status={campaign.status} />
          </div>,
          <div key={`created-at-${campaign?.campaign_id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`delete-${campaign.campaign_id}`} className="truncate">
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteCampaignHook.isPending}
              onClick={() => {
                setSelectedCampaignId(campaign.campaign_id);
                setDeleteOpen(true);
              }}
            >
              <Trash className="size-5 text-red-300 cursor-pointer" />
            </Button>
          </div>,
          <CustomButton
            key={`view-brief-${campaign?.campaign_id}`}
            className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
            disabled={!campaign.brief_id}
            onClick={() => {
              if (!campaign.brief_id) return;
              setSelectedBriefId(campaign.brief_id);
              setDialogOpen(true);
            }}
          >
            View Brief
          </CustomButton>,
        ])}
        paginationstart={data?.page ?? 1}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={adminBrief}
        onUpdate={(updatedBrief) => setAdminBrief(updatedBrief)}
      />
      <DeleteDialogue
        heading="Delete Campaign"
        subheading="Are you sure you want to delete this campaign?"
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        ondelete={() => {
          if (selectedCampaignId) {
            deleteCampaignHook.mutate(selectedCampaignId);
            setDeleteOpen(false);
          }
        }}
      />
    </>
  );
}
