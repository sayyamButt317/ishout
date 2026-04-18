'use client';
import { Button } from '@/components/ui/button';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { DropDownCustomStatus } from '@/src/app/component/custom-component/dropdownstatus';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import ApprovedCampaignHook from '@/src/routes/Admin/Hooks/approvedCampaign-hook';
import UpdateCampaignStatusHook from '@/src/routes/Admin/Hooks/updateCamapignStatus-hook';
import { ApprovedCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { RefreshCcw, CircleCheck } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import { Trash } from 'lucide-react';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';

const ApprovedCampaignPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = ApprovedCampaignHook(currentPage);

  const updateCampaignStatusHook = UpdateCampaignStatusHook();
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);
  const deleteCampaignHook = DeleteCampaignHook();

  // ✅ DELETE DIALOG STATE
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  useEffect(() => {
    if (briefData) {
      setAdminBrief({
        ...briefData.response,
        id: briefData.id,
      });
    }
  }, [briefData]);

  const router = useRouter();
  return (
    <>
      <PageHeader
        title="Approved Campaigns"
        description={`Showing ${data?.campaigns?.length ?? 0} of ${data?.total ?? 0} approved campaigns`}
        icon={<CircleCheck className="size-5" />}
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
          'Category',
          'Followers',
          'Country',
          'Requested',
          // "Approved",
          'Status',
          'Created At',
          'Delete',
          ' ',
          ' ',
        ]}
        imageUrls={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => campaign?.campaign_logo_url || null,
        )}
        statuses={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => campaign?.status,
        )}
        campaignIds={data?.campaigns?.map(
          (campaign: ApprovedCampaignResponse) => campaign?.campaign_id,
        )}
        subheader={data?.campaigns?.map((campaign: ApprovedCampaignResponse) => [
          <div key={`company-name-${campaign?._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`campaign-name-${campaign?.campaign_id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            {campaign?.category?.join(', ') || '-'}
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {campaign?.followers?.join(', ') || '-'}
          </div>,
          <div key={`country-${campaign._id}`} className="truncate">
            {campaign?.country?.join(', ') || '-'}
          </div>,
          <div key={`requested-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.limit} />
          </div>,
          // <div key={`approved-${campaign._id}`} className="truncate">
          //   <CountButton count={(campaign as any)?.approved_influencer_count || 0} />
          // </div>,
          <div key={`status-${campaign?._id}`} className="truncate">
            <DropDownCustomStatus
              status={campaign?.status}
              updateStatus={(status: string) => {
                updateCampaignStatusHook.mutate({
                  campaign_id: campaign?.campaign_id,
                  status: status,
                });
              }}
            />
          </div>,
          <div key={`created-at-${campaign._id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`delete-${campaign._id}`} className="truncate">
            <Button
              key={campaign._id + 'del'}
              variant="ghost"
              onClick={() => {
                setSelectedCampaignId(campaign.campaign_id);
                setDeleteOpen(true);
              }}
            >
              <Trash className="size-5 text-red-300" />
            </Button>
          </div>,
          <div key={`view-${campaign._id}`} className="truncate">
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
                onClick={() => {
                  router.push(`/Admin/approved-campaign/${campaign?.campaign_id}`);
                }}
              >
                View Influencers
              </Button>
            </div>
          </div>,
          <div key={`view-brief-${campaign._id}`} className="truncate">
            <Button
              className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
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
        ])}
        paginationstart={currentPage}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
      {/* ✅ DELETE DIALOG (OUTSIDE TABLE) */}
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
      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={adminBrief}
        onUpdate={(updatedBrief) => {
          setAdminBrief(updatedBrief); // update local state
        }}
      />
    </>
  );
};

export default ApprovedCampaignPage;
