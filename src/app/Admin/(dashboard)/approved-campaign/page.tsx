'use client';
import { Button } from '@/components/ui/button';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { DropDownCustomStatus } from '@/src/app/component/custom-component/dropdownstatus';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import ApprovedCampaignHook from '@/src/routes/Admin/Hooks/approvedCampaign-hook';
import UpdateCampaignStatusHook from '@/src/routes/Admin/Hooks/updateCamapignStatus-hook';
import { ApprovedCampaignResponse } from '@/src/types/Admin-Type/Campaign.type';
import { RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import { Trash } from 'lucide-react';

const ApprovedCampaignPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = ApprovedCampaignHook(currentPage);

  const updateCampaignStatusHook = UpdateCampaignStatusHook();
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);
  const deleteCampaignHook = DeleteCampaignHook();

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
      <div className="mb-6">
        <div className="flex flex-row ">
          <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
            Approved Campaigns
          </h1>
          <Button
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
          Showing {data?.campaigns.length} of {data?.total} approved campaigns
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
          // "Approved",
          'Status',
          'Created At',
          'View',
          'View Brief',
          'Delete',
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
          <div key={`source-${campaign?._id}`} className="truncate">
            {campaign?.user_type}
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
          <div key={`view-${campaign._id}`} className="truncate">
            <div key={`view-${campaign._id}`} className="truncate">
              <Button
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
                onClick={() => {
                  router.push(`/Admin/approved-campaign/${campaign?.campaign_id}`);
                }}
              >
                View
              </Button>
            </div>
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
                  deleteCampaignHook.mutate(campaign.campaign_id);
                }
              }}
            >
              <Trash className="size-5 text-red-300 cursor-pointer" />
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
