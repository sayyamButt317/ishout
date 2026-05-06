'use client';
import { Button } from '@/components/ui/button';
import TableComponent from '@/src/app/component/CustomTable';
import { Loader2Icon, RefreshCcw, Hourglass } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { usePendingCampaigns } from '@/pendingCampaign-hook';
import AdminGenerateInfluencersHook from '@/src/routes/Admin/Hooks/Influencers/generateInfluencers-hook';
import { AdminAllCampaignApiResponse } from '@/src/types/Admin-Type/Campaign-type';
import useAuthStore from '@/src/store/AuthStore/authStore';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import CustomButton from '@/src/app/component/button';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';
import { ApprovedInfluencersStore } from '@/src/store/Campaign/influencers.store';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/Campaign/deleteCampaign.hook';
import { Trash } from 'lucide-react';
import { WhatsAppShareButton } from '@/src/app/component/custom-component/whatsappshare';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import { Skeleton } from 'boneyard-js/react';

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

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

  const campaigns = (data?.campaigns ?? []) as AdminAllCampaignApiResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

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
    <Skeleton name="admin-campaign-table" loading={isLoading}>
      <PageHeader
        title="Pending Campaigns"
        description={`Showing ${campaigns.length} of ${totalCount} pending campaigns`}
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
          'Followers',
          'Country',
          'Status',
          'Requested',
          'Created At',
          'Chat',
          'Delete',
          ' ',
          ' ',
        ]}
        imageUrls={campaigns.map((campaign) => campaign.campaign_logo_url || null)}
        statuses={campaigns.map((campaign) => campaign.status)}
        campaignIds={campaigns.map((campaign) => campaign._id)}
        campaigns={campaigns}
        subheader={campaigns.map((campaign) => [
          campaign.company_name,
          campaign.name,
          <PlatformBadge key={campaign._id} platform={campaign.platform} />,
          campaign.followers?.join(', ') || '-',
          campaign.country?.join(', ') || '-',
          <StatusBadge key={campaign._id} status={campaign.status} />,
          <CountButton key={campaign._id} count={campaign.limit} />,
          new Date(campaign.created_at).toLocaleDateString(),
          <WhatsAppShareButton key={campaign._id} userId={campaign.user_id || ''} />,
          <Button
            key={campaign._id}
            variant="ghost"
            size="icon"
            disabled={deleteCampaignHook.isPending}
            onClick={() => {
              setSelectedCampaignId(campaign._id);
              setDeleteOpen(true);
            }}
          >
            <Trash className="size-5 text-red-300 cursor-pointer" />
          </Button>,
          <CustomButton
            key={campaign._id}
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
          <div key={`view-${campaign._id}`} className="min-w-180px">
            {campaign?.generated === false ? (
              <CustomButton
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
    </Skeleton>
  );
}
