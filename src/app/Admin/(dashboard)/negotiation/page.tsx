'use client';
import { Button } from '@/components/ui/button';
import CustomButton from '@/src/app/component/button';
import {
  Bot,
  ChevronRight,
  ExternalLink,
  Filter,
  Handshake,
  RefreshCcw,
  Search,
  Trash,
  User,
} from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import NegotiationStatsHook from '@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook';
import { NegotiationStatsResponse } from '@/src/types/Admin-Type/negotiation.type';
import { useWhatsAppChatStore } from '@/src/store/Campaign/chat.store';
import DeleteNegotiationHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-delete-hook';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import { NegotiationListSkeleton } from '@/src/app/component/skeletons/admin-skeletons';
import Link from 'next/link';

export default function NegotiationPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { data, isLoading, refetch, isRefetching } = NegotiationStatsHook(
    currentPage,
    pageSize,
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const unreadMap = useWhatsAppChatStore((s) => s.unread);
  const deleteNegotiationHook = DeleteNegotiationHook();
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);

  const sessions = useMemo<NegotiationStatsResponse[]>(
    () => (data?.negotiation_controls as NegotiationStatsResponse[]) ?? [],
    [data?.negotiation_controls],
  );
  const filteredSessions = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return sessions.filter((session: NegotiationStatsResponse) => {
      const status = (session.negotiation_status ?? '').toLowerCase();
      const matchesStatus =
        statusFilter === 'all' || status === statusFilter.toLowerCase();
      if (!matchesStatus) return false;
      if (!q) return true;
      const haystack = [
        session.name ?? '',
        session.thread_id ?? '',
        session.user_message ?? '',
        session.intent ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [sessions, searchTerm, statusFilter]);

  const getStatusTone = (status?: string | null) => {
    const normalized = (status ?? '').toLowerCase();
    if (normalized === 'agreed') {
      return { dot: 'bg-emerald-400', text: 'text-emerald-300' };
    }
    if (normalized === 'escalated') {
      return { dot: 'bg-rose-400', text: 'text-rose-300' };
    }
    return { dot: 'bg-violet-400', text: 'text-violet-300' };
  };

  if (isLoading) return <NegotiationListSkeleton />;

  return (
    <div className="mt-5">
      <PageHeader
        title="Negotiations"
        description={`Showing ${filteredSessions.length} of ${data?.total ?? 0} user sessions`}
        icon={<Handshake className="size-5" />}
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
      <div className="mb-6 mt-4 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0f0f11] p-3 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-3 py-2 md:max-w-sm">
          <Search className="size-4 text-white/40" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search sessions..."
            className="w-full bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-white/40" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-xl border border-white/10 bg-black px-3 text-xs font-semibold text-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="agreed">Agreed</option>
            <option value="escalated">Escalated</option>
          </select>
          <select
            value={String(pageSize)}
            onChange={(e) => {
              setCurrentPage(1);
              setPageSize(Number(e.target.value));
            }}
            className="h-9 rounded-xl border border-white/10 bg-black px-3 text-xs font-semibold text-white outline-none"
          >
            <option value="10">10 / page</option>
            <option value="20">20 / page</option>
            <option value="50">50 / page</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSessions.map((userSession: NegotiationStatsResponse) => {
          const session = userSession as NegotiationStatsResponse & {
            campaign_logo_url?: string | null;
            admin_approved?: string | null;
            Brand_approved?: string | null;
            brief_s3_url?: string | null;
            campaign_brief?: {
              campaign_name?: string | null;
              title?: string | null;
              campaign_logo_url?: string | null;
            } | null;
          };
          const analysisIntent =
            session?.analysis && 'intent' in session.analysis
              ? session.analysis.intent
              : null;

          const intentText = session?.intent ?? analysisIntent ?? '-';
          const unreadCount = unreadMap?.[session.thread_id] ?? 0;
          const tone = getStatusTone(session.negotiation_status);
          const roundNumber = session.negotiation_round ?? 0;
          const updatedAt = session?._updated_at ?? session?.timestamp;
          const formattedUpdatedAt = updatedAt
            ? new Date(updatedAt).toLocaleString()
            : 'Unknown';
          const campaignTitle =
            session?.campaign_brief?.title ??
            session?.campaign_brief?.campaign_name ??
            'Untitled Campaign';


          return (
            <div
              key={userSession._id}
              className="group rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#17181c_0%,#111217_100%)] p-5 transition-all hover:border-violet-400/35 hover:shadow-[0_0_28px_rgba(139,92,246,0.14)]"
            >
              <div className="flex flex-wrap items-center gap-5 lg:flex-nowrap">
                <div className="min-w-[220px] flex-1">
                  <p className="text-lg font-bold text-white transition-colors group-hover:text-violet-200">
                    {userSession?.name || 'Unknown'}
                  </p>
                  <p className="mt-1 font-mono text-xs text-white/45">
                    {userSession?.thread_id || '-'}
                  </p>
                  <p className="mt-1 text-xs text-white/55">{campaignTitle}</p>
                  <p
                    className="mt-2 line-clamp-2 text-sm text-white/65"
                    title={userSession?.user_message || ''}
                  >
                    {userSession?.user_message || '-'}
                  </p>
                </div>

                <div className="min-w-[190px] flex-1">
                  <div className="mt-2 space-y-2 rounded-xl border border-white/10 bg-black/20 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/45">Mode</span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fuchsia-200">
                        {String(userSession?.conversation_mode ?? '')
                          .toLowerCase()
                          .includes('human') ? (
                          <User className="size-3" />
                        ) : (
                          <Bot className="size-3" />
                        )}
                        {userSession?.conversation_mode || '-'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/45">Intent</span>
                      <span className="truncate text-right text-xs text-white/75" title={intentText}>
                        {intentText}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-wide text-white/45">Brief</span>
                      {session?.brief_s3_url ? (
                        <Link
                          href={session.brief_s3_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-200 transition hover:bg-cyan-400/20"
                        >
                          Open
                          <ExternalLink className="size-3" />
                        </Link>
                      ) : (
                        <span className="text-xs text-white/45">N/A</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="min-w-[170px] flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Pricing Details
                  </p>
                  <div className="mt-1.5 grid grid-cols-2 gap-y-1 text-xs">
                    <span className="text-white/45">Range</span>
                    <span className="text-right font-semibold text-white">
                      {userSession?.min_price !== null &&
                        userSession?.min_price !== undefined &&
                        userSession?.max_price !== null &&
                        userSession?.max_price !== undefined
                        ? `$${userSession.min_price} - $${userSession.max_price}`
                        : '-'}
                    </span>
                    <span className="text-white/45">Last Offer</span>
                    <span className="text-right font-semibold text-white">
                      {userSession?.last_offered_price !== null &&
                        userSession?.last_offered_price !== undefined
                        ? `$${userSession.last_offered_price}`
                        : '-'}
                    </span>
                    <span className="font-bold text-violet-300">User Offer</span>
                    <span className="text-right font-bold text-violet-300">
                      {userSession?.user_offer !== null && userSession?.user_offer !== undefined
                        ? `$${userSession.user_offer}`
                        : '-'}
                    </span>
                  </div>
                </div>

                <div className="min-w-[140px] flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    Status & Round
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`size-2 rounded-full ${tone.dot}`} />
                    <span className={`text-xs font-bold uppercase tracking-wide ${tone.text}`}>
                      {userSession?.negotiation_status || 'Active'}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Round {roundNumber}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span
                          key={`${userSession._id}-step-${step}`}
                          className={`h-1.5 w-1.5 rounded-full ${step <= roundNumber ? 'bg-violet-300' : 'bg-white/20'
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-white/45">Updated: {formattedUpdatedAt}</p>
                </div>

                <div className="ml-auto flex items-center gap-3 lg:ml-0">
                  <div className="relative">
                    <CustomButton
                      onClick={() => {
                        router.push(
                          `/Admin/negotiation-chat/${userSession.thread_id}?negotiation_id=${userSession._id}`,
                        );
                      }}
                      className="relative border border-violet-400/30 bg-violet-500/10 px-5 text-white hover:bg-violet-500/25"
                    >
                      <span className="flex items-center gap-1.5">
                        View Chat <ChevronRight className="size-4" />
                      </span>
                    </CustomButton>
                    {unreadCount > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={
                      deletingThreadId === userSession.thread_id ||
                      deleteNegotiationHook.isPending
                    }
                    onClick={() => {
                      setSelectedThreadId(userSession.thread_id);
                      setDeleteOpen(true);
                    }}
                    className="text-white/45 hover:text-red-300"
                  >
                    <Trash className="size-5" />
                  </Button>
                </div>
              </div>



              <div className="mt-3">
                <p className="text-xs text-white/45" title={userSession?.final_reply ?? ''}>
                  Final Reply: {userSession?.final_reply ?? '-'}
                </p>
              </div>


            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3">
        <p className="text-xs text-white/50">
          Page {currentPage} of {data?.total_pages ?? 1}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 border-white/15 bg-transparent text-xs text-white hover:bg-white/10"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className="h-8 border-white/15 bg-transparent text-xs text-white hover:bg-white/10"
            disabled={currentPage >= (data?.total_pages ?? 1)}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, data?.total_pages ?? prev + 1))
            }
          >
            Next
          </Button>
        </div>
      </div>
      <DeleteDialogue
        heading="Delete Negotiation"
        subheading="Are you sure you want to delete this conversation?"
        open={deleteOpen}
        isDeleting={deleteNegotiationHook.isPending}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedThreadId(null);
        }}
        ondelete={async () => {
          if (selectedThreadId) {
            try {
              setDeletingThreadId(selectedThreadId);
              await deleteNegotiationHook.mutateAsync(selectedThreadId);
              setDeleteOpen(false);
              setSelectedThreadId(null);
              refetch();
            } catch (error) {
              console.error('Delete failed', error);
              // optionally show toast here
            } finally {
              setDeletingThreadId(null);
            }
          }
        }}
      />
    </div>
  );
}
