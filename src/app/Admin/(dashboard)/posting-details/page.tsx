'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RefreshCcw, ClipboardList, Search, ExternalLink } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { PostingDetailsHook } from '@/src/routes/Admin/Mutations/DemoGraphics';

interface PostingDetail {
    _id: string;
    campaign_id: string;
    campaign_name?: string;
    company_name?: string;
    logo_url?: string;
    caption: string;
    hashtag?: string[] | string;
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

function StatCard({
    label,
    value,
    barWidth,
    barClass,
    icon,
}: {
    label: string;
    value: number;
    barWidth: number;
    barClass: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="relative h-40 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 p-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] backdrop-blur-md transition-colors hover:bg-foreground/12 dark:border-foreground/8 dark:bg-foreground/5 dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:bg-foreground/10">
            <div className="absolute right-5 top-0 p-4 opacity-50">{icon}</div>
            <div className="pb-2 text-6xl text-foreground">{value}</div>
            <div className="mb-2 text-lg tracking-[0.15em] text-foreground/60">{label}</div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5">
                <div className={`h-full rounded-full ${barClass}`} style={{ width: `${Math.min(barWidth, 100)}%` }} />
            </div>
        </div>
    );
}

function SkeletonRow() {
    return (
        <tr className="animate-pulse border-b border-foreground/5">
            <td className="px-8 py-4">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-foreground/10" />
                    <div className="space-y-1.5">
                        <div className="h-3 w-28 rounded bg-foreground/10" />
                        <div className="h-2.5 w-20 rounded bg-foreground/5" />
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="h-3 w-24 rounded bg-foreground/10" />
            </td>
            <td className="px-6 py-4">
                <div className="space-y-1.5">
                    <div className="h-3 w-20 rounded bg-foreground/10" />
                    <div className="h-2.5 w-16 rounded bg-foreground/5" />
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="h-3 w-28 rounded bg-foreground/10" />
            </td>
            <td className="px-6 py-4">
                <div className="h-3 w-24 rounded bg-foreground/10" />
            </td>
            <td className="px-6 py-4">
                <div className="h-3 w-36 rounded bg-foreground/10" />
            </td>
            <td className="px-8 py-4 text-right">
                <div className="ml-auto h-8 w-8 rounded-lg bg-foreground/10" />
            </td>
        </tr>
    );
}

function normalizeHashtags(h: PostingDetail['hashtag']): string[] {
    if (Array.isArray(h)) return h;
    if (typeof h === 'string' && h.trim()) return h.split(/[\s,]+/).filter(Boolean);
    return [];
}

export default function PostingDetailsPage() {
    const [search, setSearch] = useState('');
    const { data, isLoading, refetch, isRefetching } = PostingDetailsHook();
    const postingData = data as PostingDetailsResponse | undefined;
    const details = useMemo(
        () => postingData?.posting_details ?? [],
        [postingData?.posting_details],
    );

    const filtered = useMemo(() => {
        const q = search.toLowerCase().trim();
        if (!q) return details;
        return details.filter((d) => {
            const hashtags = normalizeHashtags(d.hashtag).join(' ');
            const tags = (d.tag_users ?? []).join(' ');
            const hay = [
                d.campaign_name,
                d.company_name,
                d.campaign_id,
                d.caption,
                hashtags,
                tags,
                d.posting_date,
                d.posting_time,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return hay.includes(q);
        });
    }, [details, search]);

    const total = postingData?.count ?? details.length;

    return (
        <>
            <PageHeader
                title="Posting Details"
                description={`${filtered.length} of ${total} posting ${total === 1 ? 'record' : 'records'}`}
                icon={<ClipboardList className="size-5" />}
                actions={
                    <button
                        type="button"
                        onClick={() => refetch()}
                        disabled={isRefetching}
                        aria-label="Refresh list"
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/5 text-foreground/40 transition-all hover:text-foreground disabled:opacity-40"
                    >
                        <RefreshCcw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                    </button>
                }
            />

            <div className=" pb-12 sm:px-2">
                {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <StatCard
                        label="Total postings"
                        value={total}
                        barWidth={Math.min((total / 20) * 100, 100)}
                        barClass="bg-gradient-to-r from-primaryButton to-pink-400"
                        icon={<ClipboardList className="h-16 w-16 text-pink-500" />}
                    />
                </div> */}

                <div className="overflow-hidden rounded-2xl border border-red/5 bg-foreground/5 shadow-2xl shadow-black/40">
                    <div className="flex flex-col justify-between gap-4 border-b border-foreground/5 px-8 py-5 md:flex-row md:items-center">
                        <h2 className="text-xl font-black text-foreground">All posting details</h2>
                        <div className="relative w-full md:w-72">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/30" />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search campaign, caption, tags…"
                                className="w-full rounded-xl border border-white/[0.07] bg-foreground/5 py-2 pl-10 pr-4 text-sm text-foreground/95 outline-none transition-colors placeholder:text-foreground/40 focus:border-primaryButton/40"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-foreground/5">
                                    {[
                                        ['Campaign', 'px-8 py-5'],
                                        ['Company', 'px-6 py-5'],
                                        ['Schedule', 'px-6 py-5'],
                                        ['Hashtags', 'px-6 py-5'],
                                        ['Tagged', 'px-6 py-5'],
                                        ['Caption', 'px-6 py-5'],
                                        // ['Actions', 'px-8 py-5 text-right'],
                                    ].map(([h, cls]) => (
                                        <th
                                            key={h}
                                            className={`${cls} whitespace-nowrap border-b border-foreground/5 text-[10px] font-black uppercase tracking-wide text-foreground/80`}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-foreground/5">
                                {isLoading ? (
                                    [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-24 text-center">
                                            <div className="flex flex-col items-center gap-3 text-foreground/25">
                                                <ClipboardList className="h-10 w-10 opacity-30" />
                                                <p className="text-sm">No posting details found</p>
                                                {search ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => setSearch('')}
                                                        className="mt-1 cursor-pointer text-xs text-primaryButton hover:underline"
                                                    >
                                                        Clear search
                                                    </button>
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((detail) => {
                                        const hashtags = normalizeHashtags(detail.hashtag);
                                        return (
                                            <tr key={detail._id} className="transition-colors hover:bg-foreground/2.5">
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-foreground/10 bg-foreground/10">
                                                            {detail.logo_url ? (
                                                                <Image
                                                                    src={detail.logo_url}
                                                                    alt={detail.campaign_name ?? 'Campaign'}
                                                                    width={40}
                                                                    height={40}
                                                                    className="h-10 w-10 object-cover"
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-foreground/40">
                                                                    {(detail.campaign_name ?? detail.campaign_id ?? '?').slice(0, 2).toUpperCase()}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-bold text-foreground">
                                                                {detail.campaign_name ?? '—'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-foreground/60">{detail.company_name ?? '—'}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-foreground/80">{detail.posting_date || '—'}</p>
                                                    <p className="mt-0.5 text-[11px] text-foreground/45">{detail.posting_time || ''}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex max-w-[180px] flex-wrap gap-1">
                                                        {hashtags.length ? (
                                                            hashtags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-300"
                                                                >
                                                                    {tag.startsWith('#') ? tag : `#${tag}`}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-foreground/35">—</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex max-w-[160px] flex-wrap gap-1">
                                                        {detail.tag_users?.length ? (
                                                            detail.tag_users.map((user) => (
                                                                <span
                                                                    key={user}
                                                                    className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 text-[10px] text-foreground/70"
                                                                >
                                                                    @{user.replace(/^@/, '')}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-sm text-foreground/35">—</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="max-w-[220px] truncate text-sm text-foreground/55" title={detail.caption}>
                                                        {detail.caption || '—'}
                                                    </p>
                                                    <p className="mt-0.5 text-[11px] text-foreground/30">
                                                        {detail.created_at
                                                            ? new Date(detail.created_at).toLocaleString()
                                                            : ''}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-foreground/5 bg-foreground/5 px-8 py-5">
                        <p className="text-xs text-foreground/80">
                            Showing <span className="font-bold text-foreground">{filtered.length}</span> of{' '}
                            <span className="font-bold text-foreground">{details.length}</span> rows
                            {search.trim() ? (
                                <span className="text-foreground/45"> (search filtered)</span>
                            ) : null}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
