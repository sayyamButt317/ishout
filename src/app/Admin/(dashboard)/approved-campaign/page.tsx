'use client';
import { Button } from '@/components/ui/button';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { DropDownCustomStatus } from '@/src/app/component/custom-component/dropdownstatus';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import ApprovedCampaignHook from '@/approvedCampaign-hook';
import UpdateCampaignStatusHook from '@/src/routes/Admin/Hooks/Campaign/updateCamapignStatus-hook';
import { ApprovedCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { RefreshCcw, CircleCheck } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/Campaign/deleteCampaign.hook';
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

  const campaigns = (data?.campaigns ?? []) as ApprovedCampaignResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

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
        description={`Showing ${campaigns.length} of ${totalCount} approved campaigns`}
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
      <TableComponent<ApprovedCampaignResponse>
        header={[
          'Company Name',
          'Campaign Name',
          'Platform',
          'Category',
          'Followers',
          'Country',
          'Requested',
          'Status',
          'Created At',
          'Delete',
          ' ',
          ' ',
        ]}
        imageUrls={campaigns.map((campaign) => campaign?.campaign_logo_url || null)}
        statuses={campaigns.map((campaign) => campaign?.status)}
        campaignIds={campaigns.map((campaign) => campaign?._id)}
        campaigns={campaigns}
        subheader={campaigns.map((campaign) => [
          campaign.company_name,
          campaign.name,
          <PlatformBadge key={campaign._id} platform={campaign.platform} />,
          campaign.category?.join(', ') || '-',
          campaign.followers?.join(', ') || '-',
          campaign.country?.join(', ') || '-',
          <CountButton key={campaign._id} count={campaign.limit} />,
          <DropDownCustomStatus
            key={campaign._id}
            status={campaign?.status}
            updateStatus={(status: string) => {
              updateCampaignStatusHook.mutate({
                campaign_id: campaign?._id,
                status: status,
              });
            }}
          />,
          new Date(campaign.created_at).toLocaleDateString(),
          <Button
            key={campaign._id}
            variant="ghost"
            onClick={() => {
              setSelectedCampaignId(campaign._id);
              setDeleteOpen(true);
            }}
          >
            <Trash className="size-5 text-red-300" />
          </Button>,
          <Button
            key={`view-${campaign._id}`}
            className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
            onClick={() => {
              router.push(`/Admin/approved-campaign/${campaign?._id}`);
            }}
          >
            View Influencers
          </Button>,
          <Button
            key={`brief-${campaign._id}`}
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
          </Button>,
        ])}
        paginationstart={data?.page ?? currentPage}
        paginationend={totalPages}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
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
        onUpdate={(updatedBrief) => {
          setAdminBrief(updatedBrief);
        }}
      />
    </>
  );
};

export default ApprovedCampaignPage;
