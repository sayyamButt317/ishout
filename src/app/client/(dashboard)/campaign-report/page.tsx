'use client';

import { Button } from '@/components/ui/button';
import TableComponent from '@/src/app/component/CustomTable';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import PageHeader from '@/src/app/component/PageHeader';
import CompanyCampaignHook from '@/src/routes/Company/api/Hooks/companyCampaign.hook';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';
import { LayoutList, Filter, Search, ArrowUpDown } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  { label: 'Campaign Name A→Z', value: 'name_asc' },
  { label: 'Campaign Name Z→A', value: 'name_desc' },
];

export default function ClientCampaignReportPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: 'created_at' | 'status' | 'name';
    direction: 'asc' | 'desc';
  } | null>(null);
  const router = useRouter();

  const { data, isLoading } = CompanyCampaignHook(currentPage);
  const campaigns = useMemo(
    () => (data?.campaigns ?? []) as CompanyCampaignResponse[],
    [data?.campaigns],
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSortConfig(null);
      return;
    }
    const lastUnderscoreIndex = value.lastIndexOf('_');
    const key = value.slice(0, lastUnderscoreIndex) as 'created_at' | 'status' | 'name';
    const direction = value.slice(lastUnderscoreIndex + 1) as 'asc' | 'desc';
    setSortConfig({ key, direction });
  };

  const filteredAndSortedCampaigns = useMemo(() => {
    let result = [...campaigns];

    if (statusFilter !== 'all') {
      result = result.filter(
        (campaign) => campaign.status?.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((campaign) => campaign.name?.toLowerCase().includes(q));
    }

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
  }, [campaigns, searchQuery, sortConfig, statusFilter]);

  return (
    <>
      <PageHeader
        title="Campaigns Report"
        description={
          data?.campaigns?.length != null && data?.total != null
            ? `Showing ${filteredAndSortedCampaigns.length} of ${data.total} campaigns`
            : 'Your campaigns across all statuses'
        }
        icon={<LayoutList className="size-5" />}
        actions={
          <div className="flex w-full min-w-0 flex-col gap-2 xl:w-auto xl:flex-row xl:flex-wrap xl:items-center xl:gap-3">
            <div className="flex w-full min-w-0 items-center gap-2 xl:w-auto">
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
              <ArrowUpDown className="size-4 shrink-0 text-white/50" aria-hidden />
              <label htmlFor="client-campaign-sort" className="text-sm text-white/70">
                Sort by
              </label>
              <select
                id="client-campaign-sort"
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
              <Filter className="size-4 shrink-0 text-white/50" aria-hidden />
              <label
                htmlFor="client-campaign-status-filter"
                className="text-sm text-white/70"
              >
                Filter by status
              </label>
              <select
                id="client-campaign-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
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

      <TableComponent<CompanyCampaignResponse>
        header={[
          'Campaign Name',
          'Followers',
          'Platform',
          'Category',
          'Country',
          'Requested',
          'Status',
          'Created At',
          'View Report',
        ]}
        imageUrls={filteredAndSortedCampaigns.map(
          (campaign) => campaign?.campaign_logo_url || null,
        )}
        statuses={filteredAndSortedCampaigns.map((campaign) => campaign.status)}
        campaignIds={filteredAndSortedCampaigns.map(
          (campaign) => campaign._id ?? campaign.campaign_id,
        )}
        campaigns={filteredAndSortedCampaigns}
        subheader={filteredAndSortedCampaigns.map((campaign) => {
          const id = campaign.campaign_id ?? campaign._id ?? '';
          return [
            <div key={`name-${id}`} className="truncate">
              {campaign?.name}
            </div>,
            <div key={`followers-${id}`} className="truncate">
              {campaign?.followers?.join(', ') || '-'}
            </div>,
            <div key={`platform-${id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`category-${id}`} className="truncate">
              {campaign?.category?.join(', ') || '-'}
            </div>,
            <div key={`country-${id}`} className="truncate">
              {campaign?.country?.join(', ') || '-'}
            </div>,
            <div key={`requested-${id}`} className="truncate items-center justify-center">
              {campaign?.limit ?? '-'}
            </div>,
            <div key={`status-${id}`} className="truncate">
              <StatusBadge status={campaign.status} />
            </div>,
            <div key={`created-at-${id}`} className="truncate">
              {new Date(campaign?.created_at).toLocaleDateString()}
            </div>,
            <div key={`view-${id}`} className="truncate">
              <Button
                className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
                onClick={() => {
                  router.push(`/client/campaign-report/${id}`);
                }}
              >
                View Report
              </Button>
            </div>,
          ];
        })}
        paginationstart={data?.page ?? 1}
        paginationend={data?.total_pages ?? 1}
        onPageChange={(page: number) => {
          setCurrentPage(page);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
