'use client';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import TableComponent from '@/src/app/component/CustomTable';
import CompanyCampaignHook from '@/src/routes/Company/api/Hooks/companyCampaign.hook';
import { useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';
import { LayoutGrid } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CompanyCampaignResponse } from '@/src/types/Admin-Type/Campaign-type';

export default function ClientInfluencersContentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = CompanyCampaignHook(currentPage);
  const router = useRouter();

  const rowKey = (campaign: CompanyCampaignResponse) =>
    campaign.campaign_id ?? campaign._id ?? '';

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
          'Requested ',
          'Status',
          'Created At',
          'View',
        ]}
        imageUrls={data?.campaigns?.map(
          (campaign: CompanyCampaignResponse) => campaign?.campaign_logo_url || null,
        )}
        subheader={data?.campaigns?.map((campaign: CompanyCampaignResponse) => {
          const id = rowKey(campaign);
          return [
            <div key={`name-${id}`} className="truncate">
              {campaign?.name}
            </div>,
            <div key={`followers-${id}`} className="truncate">
              {campaign?.followers?.join(', ')}
            </div>,
            <div key={`platform-${id}`} className="truncate">
              <PlatformBadge platform={campaign?.platform} />
            </div>,
            <div key={`requested-${id}`} className="truncate items-center justify-center">
              {campaign?.limit}
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
                  router.push(
                    `/client/approved-contents?campaign_id=${campaign.campaign_id}`,
                  );
                }}
              >
                View
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
