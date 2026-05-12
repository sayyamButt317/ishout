'use client';

import React from 'react';
import TableComponent from '@/src/app/component/CustomTable';
import { RefreshCcw, ClipboardList } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { Button } from '@/components/ui/button';
import { TablePageSkeleton } from '@/src/app/component/skeletons/admin-skeletons';
import { PostingDetailsHook } from '@/src/routes/Admin/Mutations/DemoGraphics';

interface PostingDetail {
    _id: string;
    campaign_id: string;
    caption: string;
    hashtag: string;
    posting_date: string;
    posting_time: string;
    tag_users: string[];
    created_at: string;
    updated_at: string;
}

interface PostingDetailsResponse {
    success: boolean;
    count: number;
    posting_details: PostingDetail[];
}

export default function PostingDetailsPage() {
    const { data, isLoading, refetch, isRefetching } = PostingDetailsHook();
    const postingData = data as PostingDetailsResponse | undefined;
    const details = postingData?.posting_details ?? [];

    if (isLoading) return <TablePageSkeleton columns={7} />;

    return (
        <>
            <PageHeader
                title="Posting Details"
                description={`Showing ${details.length} of ${postingData?.count ?? 0} posting details`}
                icon={<ClipboardList className="size-5" />}
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
                    'Campaign ID',
                    'Posting Date',
                    'Posting Time',
                    'Hashtag',
                    'Tagged Users',
                    'Caption',
                    'Created At',
                ]}
                subheader={details.map((detail) => [
                    <div key={`cid-${detail._id}`} className="truncate max-w-[140px]" title={detail.campaign_id}>
                        {detail.campaign_id}
                    </div>,
                    <div key={`date-${detail._id}`} className="truncate whitespace-nowrap">
                        {detail.posting_date || '-'}
                    </div>,
                    <div key={`time-${detail._id}`} className="truncate whitespace-nowrap">
                        {detail.posting_time || '-'}
                    </div>,
                    <div key={`hash-${detail._id}`} className="truncate">
                        {detail.hashtag || '-'}
                    </div>,
                    <div key={`tags-${detail._id}`} className="flex flex-wrap gap-1">
                        {detail.tag_users?.length
                            ? detail.tag_users.map((user) => (
                                <span
                                    key={user}
                                    className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80"
                                >
                                    @{user}
                                </span>
                            ))
                            : '-'}
                    </div>,
                    <div key={`cap-${detail._id}`} className="truncate max-w-[200px]" title={detail.caption}>
                        {detail.caption || '-'}
                    </div>,
                    <div key={`created-${detail._id}`} className="truncate whitespace-nowrap">
                        {detail.created_at
                            ? new Date(detail.created_at).toLocaleDateString()
                            : '-'}
                    </div>,
                ])}
                paginationstart={1}
                paginationend={1}
                isLoading={isLoading}
            />
        </>
    );
}
