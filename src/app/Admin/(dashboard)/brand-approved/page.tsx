'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import TableComponent from '@/src/app/component/CustomTable';
import { useState, useEffect } from 'react';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import { RefreshCcw, UserPlus } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { useRouter } from 'next/navigation';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/Campaign/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';
import { Trash } from 'lucide-react';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import OnboardingCampaignHook from '@/src/routes/Admin/Hooks/Campaign/onboardingCampaign-hook';

export default function OnboardingCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isRefetching } = OnboardingCampaignHook(currentPage);
  const router = useRouter();
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteCampaignHook = DeleteCampaignHook();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

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
        title="Brand Approved Influencer"
        description={`Showing ${campaigns.length} of ${totalCount} brand approved campaigns`}
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
        header={[
          'Company Name',
          'Campaign Name',
          'Platform',
          'Category',
          'Country',
          'Status',
          'Requested',
          'Onboarded',
          'Created At',
          'Delete',
          ' ',
          ' ',
        ]}
        imageUrls={campaigns.map((campaign) => campaign?.campaign_logo_url || null)}
        statuses={campaigns.map((campaign) => campaign?.status)}
        campaignIds={campaigns.map((campaign) => campaign?._id || campaign?.campaign_id)}
        campaigns={campaigns}
        subheader={campaigns.map((campaign) => [
          campaign.company_name,
          campaign.name,
          <PlatformBadge
            key={campaign._id || campaign.campaign_id}
            platform={campaign.platform}
          />,
          campaign.category?.join(', ') || '-',
          campaign.country?.join(', ') || '-',
          <StatusBadge
            key={campaign._id || campaign.campaign_id}
            status={campaign.status}
          />,
          <CountButton
            key={campaign._id || campaign.campaign_id}
            count={campaign.limit}
          />,
          <CountButton
            key={campaign._id || campaign.campaign_id}
            count={campaign.approved_influencer_count}
          />,
          new Date(campaign.created_at).toLocaleDateString(),
          <Button
            key={campaign._id || campaign.campaign_id}
            variant="ghost"
            size="icon"
            disabled={deleteCampaignHook.isPending}
            onClick={() => {
              setSelectedCampaignId(campaign.campaign_id);
              setDeleteOpen(true);
            }}
          >
            <Trash className="size-5 text-red-300 cursor-pointer" />
          </Button>,
          <CustomButton
            key={campaign._id || campaign.campaign_id}
            className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3"
            onClick={() => {
              router.push(
                `/Admin/brand-approved/${campaign._id || campaign.campaign_id}`,
              );
            }}
          >
            View Influencers
          </CustomButton>,
          <CustomButton
            key={`brief-${campaign._id || campaign.campaign_id}`}
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
        ])}
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
