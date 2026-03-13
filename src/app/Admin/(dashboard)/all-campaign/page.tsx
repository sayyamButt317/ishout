'use client';
import { Button } from '@/components/ui/button';
import TableComponent from '@/src/app/component/CustomTable';
import { WhatsAppShareButton } from '@/src/app/component/custom-component/whatsappshare';
import AllCampaignHook from '@/src/routes/Admin/Hooks/Allcampaign-hook';
import { RefreshCcw, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { AdminAllCampaignApiResponse } from '@/src/types/Admin-Type/Campaign.type';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import CountButton from '@/src/app/component/custom-component/countbutton';
import { Badge } from '@/components/ui/badge';
import UpdateStatusHook from '@/src/routes/Admin/Hooks/updateStatus-hook';
import { DropDownCustomStatus } from '@/src/app/component/custom-component/dropdownstatus';
import { DropdownMenuAction } from '@/src/app/component/custom-component/action';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import UploadCampaignLogoHook from '@/src/routes/Company/api/Hooks/upload-campaign-logo-hook';
import Image from 'next/image';
import ImageUploadModal from '@/src/app/component/custom-component/image-upload-modal';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Approved', value: 'approved' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
] as const;

export default function AllCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const deleteCampaignHook = DeleteCampaignHook();
  const appliedStatus = statusFilter === 'all' ? undefined : statusFilter.toLowerCase();
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const { data, isLoading, refetch, isRefetching } = AllCampaignHook(
    currentPage,
    appliedStatus,
  );

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const [uploadModalOpen, setUploadModalOpen] = useState<string | null>(null);
  const uploadLogoMutation = UploadCampaignLogoHook();

  const updateStatusHook = UpdateStatusHook();

  const campaigns = (data?.campaigns ?? []) as AdminAllCampaignApiResponse[];
  const totalPages = Math.max(data?.total_pages ?? 1, 1);
  const totalCount = data?.total ?? campaigns.length;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    if (briefData) {
      setAdminBrief({
        ...briefData.response,
        id: briefData.id,
      });
    }
  }, [briefData]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-row items-center gap-2">
            <h1 className="italic text-xl md:text-3xl font-semibold text-white tracking-tight">
              Company Generated Campaigns
            </h1>
            <Button
              className="cursor-pointer"
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
            Showing {campaigns?.length} of {totalCount} campaigns
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="campaign-status-filter"
            className="italic text-sm text-white/80"
          >
            Filter by status
          </label>
          <select
            id="campaign-status-filter"
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-primaryButton"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
          'Status',
          'Created At',
          'Chat',
          'Action',
          'View Brief',
        ]}
        imageUrls={campaigns.map((campaign) => campaign.campaign_logo_url || null)}
        statuses={campaigns.map((campaign) => campaign.status)}
        campaignIds={campaigns.map((campaign) => campaign._id)}
        subheader={campaigns.map((campaign) => [
          campaign.company_name,
          campaign.name,
          campaign.user_type,
          <PlatformBadge key={campaign._id} platform={campaign.platform} />,
          campaign.category?.join(', ') || '-',
          campaign.followers?.join(', ') || '-',
          campaign.country?.join(', ') || '-',
          <CountButton key={campaign._id} count={campaign.limit} />,
          <DropDownCustomStatus
            key={campaign._id}
            status={campaign.status}
            updateStatus={(status: string) =>
              updateStatusHook.mutate({ campaign_id: campaign._id, status })
            }
          />,
          new Date(campaign.created_at).toLocaleDateString(),
          <WhatsAppShareButton key={campaign._id} userId={campaign.user_id || ''} />,
          <Button
            key={campaign._id}
            variant="ghost"
            size="icon"
            onClick={() => deleteCampaignHook.mutate(campaign._id)}
          >
            <Trash className="text-red-300" />
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
        ])}
        onImageUpload={(rowIndex, file) => {
          const campaign = campaigns[rowIndex];
          if (!campaign) return;
          uploadLogoMutation.mutate(
            { brief_id: campaign.brief_id!, file },
            {
              onSuccess: () => {
                refetch();
              },
            },
          );
        }}
        paginationstart={data?.page ?? currentPage}
        paginationend={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={adminBrief}
        onUpdate={(updatedBrief) => setAdminBrief(updatedBrief)}
      />
      <ImageUploadModal
        open={uploadModalOpen !== null}
        onClose={() => setUploadModalOpen(null)}
        onUpload={(file) => {
          if (!uploadModalOpen) return;

          uploadLogoMutation.mutate(
            {
              brief_id: uploadModalOpen,
              file: file,
            },
            {
              onSuccess: () => {
                setUploadModalOpen(null);
                refetch(); // refresh table
              },
            },
          );
        }}
      />
    </>
  );
}
