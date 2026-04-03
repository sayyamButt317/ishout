'use client';
import { Button } from '@/components/ui/button';
import TableComponent from '@/src/app/component/CustomTable';
import { Loader2Icon, RefreshCcw, Hourglass } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { usePendingCampaigns } from '@/src/routes/Admin/Hooks/pendingCampaign-hook';
import AdminGenerateInfluencersHook from '@/src/routes/Admin/Hooks/generateInfluencers-hook';
import { AdminAllCampaignApiResponse } from '@/src/types/Admin-Type/Campaign.type';
import useAuthStore from '@/src/store/AuthStore/authStore';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import CustomButton from '@/src/app/component/button';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';
import { ApprovedInfluencersStore } from '@/src/store/Campaign/influencers.store';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import { Trash } from 'lucide-react';

export default function AdminPendingCampaigns() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = usePendingCampaigns(currentPage);
  const { clearTemplate } = useReadyMadeTemplateStore();
  const { clearApprovedInfluencers } = ApprovedInfluencersStore();
  const generateInfluencers = AdminGenerateInfluencersHook();
  const { setCompanyUserId } = useAuthStore();
  const [loadingCampaignId, setLoadingCampaignId] = useState<string | null>(null);
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);
  const deleteCampaignHook = DeleteCampaignHook();
  // Sync API response to local state
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
        title="Pending Campaigns"
        description={`Showing ${data?.campaigns?.length ?? 0} of ${data?.total ?? 0} pending campaigns`}
        icon={<Hourglass className="size-5" />}
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
          'Status',
          'Created At',
          'Generate/View-Generated',
          'View Brief',
          'Delete',
        ]}
        imageUrls={data?.campaigns.map(
          (campaign: AdminAllCampaignApiResponse) => campaign?.campaign_logo_url || null,
        )}
        statuses={data?.campaigns.map((campaign: AdminAllCampaignApiResponse) => campaign.status)}
        subheader={data?.campaigns.map((campaign: AdminAllCampaignApiResponse) => [
          <div key={`company-name-${campaign._id}`} className="truncate">
            {campaign?.company_name}
          </div>,
          <div key={`campaign-name-${campaign._id}`} className="truncate">
            {campaign?.name}
          </div>,
          <div key={`platform-${campaign._id}`} className="truncate">
            <PlatformBadge platform={campaign?.platform} />
          </div>,
          <div key={`category-${campaign._id}`} className="truncate">
            {campaign?.category?.join(', ')}
          </div>,
          <div key={`followers-${campaign._id}`} className="truncate">
            {campaign?.followers?.join(', ')}
          </div>,
          <div key={`country-${campaign._id}`} className="truncate">
            {campaign?.country?.join(', ')}
          </div>,
          <div key={`requested-${campaign._id}`} className="truncate">
            <CountButton count={campaign?.limit} />
          </div>,
          <div key={`status-${campaign._id}`} className="truncate">
            <StatusBadge status={campaign?.status} />
          </div>,
          <div key={`created-at-${campaign._id}`} className="truncate">
            {new Date(campaign?.created_at).toLocaleDateString()}
          </div>,
          <div key={`view-${campaign._id}`} className="min-w-[180px]">
            {campaign?.generated === false ? (
              <CustomButton
                key={`generate-${campaign._id}`}
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
                onClick={() => {
                  clearTemplate();
                  clearApprovedInfluencers();
                  setLoadingCampaignId(campaign._id);

                  generateInfluencers.mutate(
                    {
                      campaign_id: campaign._id,
                      limit: campaign.limit,
                    },
                    {
                      onSuccess: () => {
                        setCompanyUserId(campaign.user_id);
                        setLoadingCampaignId(null);
                        router.push(`/Admin/pending-campaign/${campaign._id}`);
                      },
                      onError: () => {
                        setLoadingCampaignId(null);
                      },
                    },
                  );
                }}
                disabled={loadingCampaignId === campaign._id}
              >
                {loadingCampaignId === campaign._id ? (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                ) : (
                  'Generate Influencers'
                )}
              </CustomButton>
            ) : (
              <CustomButton
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
                onClick={() => {
                  router.push(`/Admin/pending-campaign/${campaign._id}`);
                }}
              >
                View Generated
              </CustomButton>
            )}
          </div>,
          <div key={`view-brief-${campaign._id}`} className="min-w-[90px] pl-4">
            <CustomButton
              className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
              onClick={() => {
                if (!campaign.brief_id) return;
                setSelectedBriefId(campaign.brief_id);
                setDialogOpen(true);
              }}
              disabled={!campaign.brief_id}
            >
              View Brief
            </CustomButton>
          </div>,
          <div key={`delete-${campaign._id}`} className="truncate">
            <Button
              variant="ghost"
              size="icon"
              disabled={deleteCampaignHook.isPending}
              onClick={() => {
                deleteCampaignHook.mutate(campaign._id);
              }}
            >
              <Trash className="size-5 text-red-300 cursor-pointer" />
            </Button>
          </div>,
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
        onUpdate={(updatedBrief) => {
          setAdminBrief(updatedBrief);
        }}
      />
    </>
  );
}
