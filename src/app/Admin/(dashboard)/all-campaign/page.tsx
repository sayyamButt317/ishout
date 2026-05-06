'use client';
import { Button } from '@/components/ui/button';
import TableComponent from '@/src/app/component/CustomTable';
import { WhatsAppShareButton } from '@/src/app/component/custom-component/whatsappshare';
import { RefreshCcw, Trash, LayoutList, Filter, Search, ArrowUpDown } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import React, { useState, useEffect, useMemo } from 'react';
import { AdminAllCampaignApiResponse } from '@/src/types/Admin-Type/Campaign-type';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import CountButton from '@/src/app/component/custom-component/countbutton';
import UpdateStatusHook from '@/src/routes/Admin/Hooks/Campaign/updateStatus-hook';
import { DropDownCustomStatus } from '@/src/app/component/custom-component/dropdownstatus';
import DeleteCampaignHook from '@/src/routes/Admin/Hooks/Campaign/deleteCampaign.hook';
import CustomButton from '@/src/app/component/button';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import UploadCampaignLogoHook from '@/src/routes/Company/api/Hooks/upload-campaign-logo-hook';
import ImageUploadModal from '@/src/app/component/custom-component/image-upload-modal';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import AllCampaignHook from '@/src/routes/Admin/Hooks/Campaign/Allcampaign-hook';

const STATUS_OPTIONS = [
  { label: 'All statuses', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Approved', value: 'approved' },
  { label: 'Completed', value: 'completed' },
  { label: 'Rejected', value: 'rejected' },
] as const;

const SORT_OPTIONS = [
  { label: 'Sort by...', value: '' },
  { label: 'Created At ↑', value: 'created_at_asc' },
  { label: 'Created At ↓', value: 'created_at_desc' },
  { label: 'Status A→Z', value: 'status_asc' },
  { label: 'Status Z→A', value: 'status_desc' },
  { label: 'Company Name A→Z', value: 'company_name_asc' },
  { label: 'Company Name Z→A', value: 'company_name_desc' },
  { label: 'Campaign Name A→Z', value: 'name_asc' },
  { label: 'Campaign Name Z→A', value: 'name_desc' },
];

export default function AllCampaignPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'created_at' | 'status' | 'company_name' | 'name';
    direction: 'asc' | 'desc';
  } | null>(null);

  const deleteCampaignHook = DeleteCampaignHook();
  const appliedStatus = statusFilter === 'all' ? undefined : statusFilter.toLowerCase();
  const [adminBrief, setAdminBrief] = useState<UpdateCampaignBrief | null>(null);

  const { data, isLoading, refetch, isRefetching } = AllCampaignHook(
    currentPage,
    appliedStatus,
  );

  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);

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
      setAdminBrief({ ...briefData.response, id: briefData.id });
    }
  }, [briefData]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSortConfig(null);
      return;
    }
    const lastUnderscoreIndex = value.lastIndexOf('_');
    const key = value.slice(0, lastUnderscoreIndex) as
      | 'created_at'
      | 'status'
      | 'company_name'
      | 'name';
    const direction = value.slice(lastUnderscoreIndex + 1) as 'asc' | 'desc';
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCampaigns = useMemo(() => {
    let result = [...campaigns];

    // Search: match company name or campaign name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.company_name?.toLowerCase().includes(q) || c.name?.toLowerCase().includes(q),
      );
    }

    // Sort
    if (sortConfig) {
      result.sort((a, b) => {
        const key = sortConfig.key;

        if (key === 'created_at') {
          const aTime = new Date(a.created_at).getTime();
          const bTime = new Date(b.created_at).getTime();
          return sortConfig.direction === 'asc' ? aTime - bTime : bTime - aTime;
        }

        const aVal = String(a[key] ?? '').toLowerCase();
        const bVal = String(b[key] ?? '').toLowerCase();
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [campaigns, searchQuery, sortConfig]);

  return (
    <>
      <PageHeader
        title="Company Generated Report"
        description={
          <>
            Showing{' '}
            <span className="font-medium text-white/80">
              {filteredAndSortedCampaigns.length}
            </span>{' '}
            of <span className="font-medium text-white/80">{totalCount}</span> campaigns
          </>
        }
        icon={<LayoutList className="size-5" />}
        actions={
          <div className="flex w-full min-w-0 flex-col gap-2 xl:w-auto xl:flex-row xl:flex-wrap xl:items-center xl:gap-3">
            <div className="flex w-full min-w-0 items-center gap-2 xl:w-auto">
              {/* Refresh */}
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0 text-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => refetch()}
                disabled={isRefetching}
                aria-label="Refresh list"
              >
                <RefreshCcw className={`size-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </Button>

              {/* Search */}
              <div className="relative min-w-0 flex-1 xl:w-56 xl:flex-none">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg border border-white/15 bg-white/5 pl-9 pr-3 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primaryButton focus:bg-white/10 focus:ring-2 focus:ring-primaryButton/20"
                />
              </div>
            </div>

            <div className="flex w-full min-w-0 items-center gap-2 xl:w-auto">
              {/* Sort */}
              <ArrowUpDown className="size-4 shrink-0 text-white/50" aria-hidden />
              <label htmlFor="campaign-sort" className="text-sm text-white/70">
                Sort by
              </label>
              <select
                id="campaign-sort"
                defaultValue=""
                onChange={handleSortChange}
                className="h-10 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 pl-3 pr-9 text-sm text-white outline-none transition-colors focus:border-primaryButton focus:bg-white/10 focus:ring-2 focus:ring-primaryButton/20 xl:w-56 xl:flex-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#0d1320] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full min-w-0 items-center gap-2 xl:w-auto">
              {/* Status Filter */}
              <Filter className="size-4 shrink-0 text-white/50" aria-hidden />
              <label htmlFor="campaign-status-filter" className="text-sm text-white/70">
                Filter by status
              </label>
              <select
                id="campaign-status-filter"
                value={statusFilter}
                onChange={handleStatusChange}
                className="h-10 min-w-0 flex-1 rounded-lg border border-white/15 bg-white/5 pl-3 pr-9 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-primaryButton focus:bg-white/10 focus:ring-2 focus:ring-primaryButton/20 xl:w-48 xl:flex-none"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="bg-[#0d1320] text-white"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        }
      />

      <TableComponent<AdminAllCampaignApiResponse>
        header={[
          'Company Name',
          'Campaign Name',
          'Source',
          'Platform',
          'Followers',
          'Country',
          'Requested',
          'Status',
          'Created At',
          'Chat',
          'Delete',
          ' ',
        ]}
        imageUrls={filteredAndSortedCampaigns.map(
          (campaign) => campaign.campaign_logo_url || null,
        )}
        statuses={filteredAndSortedCampaigns.map((campaign) => campaign.status)}
        campaignIds={filteredAndSortedCampaigns.map((campaign) => campaign._id)}
        campaigns={filteredAndSortedCampaigns}
        subheader={filteredAndSortedCampaigns.map((campaign) => [
          campaign.company_name,
          campaign.name,
          campaign.user_type,
          <PlatformBadge key={campaign._id} platform={campaign.platform} />,
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
            onClick={() => {
              setSelectedCampaignId(campaign._id);
              setDeleteOpen(true);
            }}
          >
            <Trash className="text-red-300 size-5" />
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
          const campaign = filteredAndSortedCampaigns[rowIndex];
          if (!campaign) return;
          uploadLogoMutation.mutate(
            { brief_id: campaign.brief_id!, file },
            { onSuccess: () => refetch() },
          );
        }}
        paginationstart={data?.page ?? currentPage}
        paginationend={totalPages}
        onPageChange={handlePageChange}
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

      <ImageUploadModal
        open={uploadModalOpen !== null}
        onClose={() => setUploadModalOpen(null)}
        onUpload={(file) => {
          if (!uploadModalOpen) return;
          uploadLogoMutation.mutate(
            { brief_id: uploadModalOpen, file },
            {
              onSuccess: () => {
                setUploadModalOpen(null);
                refetch();
              },
            },
          );
        }}
      />
    </>
  );
}