'use client';

import { useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';

import {
  MessageSquare,
  MoreHorizontal,
  Play,
  Search,
  Video,
  Check,
  RefreshCw,
  Send,
  ChevronLeft,
  Maximize2,
} from 'lucide-react';
import Image from 'next/image';
import NegotiationStatsHook from '@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook';
import useSendAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influencer-send-message-hook';
import useAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influencer-hook';

interface CardType {
  id: string;
  title: string;
  campaign: string;
  thumb: string;
  thread_id?: string;
  rights?: string;
  comments?: number;
  status?: string;
}

interface CampaignBrief {
  title?: string;
  campaign_logo_url?: string;
}

interface NegotiationItem {
  _id: string;
  name?: string;
  thread_id?: string;
  negotiation_status?: string;
  campaign_brief?: CampaignBrief;
}

interface ChatMessage {
  _id: string;
  sender: 'ADMIN' | 'USER' | 'AI';
  username?: string;
  message: string;
  timestamp: string;
}
interface NegotiationResponse {
  negotiation_controls?: NegotiationItem[];
}

const COLUMNS = [
  { id: 'drafts', label: 'Drafts', count: 5, color: 'slate' },
  { id: 'review', label: 'Under Review', count: 12, color: 'primary' },
  { id: 'revision', label: 'Revision', count: 3, color: 'amber' },
  { id: 'approved', label: 'Approved', count: 28, color: 'emerald' },
];

// const MOCK_CARDS = {
//   drafts: [
//     {
//       id: '1',
//       title: 'Summer24 - @alex_creatives',
//       campaign: 'Summer Launch',
//       type: 'video',
//       rights: 'Full Rights',
//       thumb:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuDgZ3DmRxJgpDr-vZ5akw4hJ96IMzjon5qig09AKkuU2VUMyBx_seNE6Y46zsrEQ2OiQa1ApPYAPC-PNt4op-9CBHYz6eS5d3nAUNT6lUtQoeqUvR98B_L5DanH33COp4yirumB9348C2JvZPZyHMUN9VYbrvgN8JrDmjGIUSvoN8fDLIK_AM7150CI9WS7A-tk8rssqJZCFkjPCosUUN0GwSzH-sR2qsWO22_nof_zdGQqY61YvMKfPftgB2MpWWznINStG7CrXh0',
//       avatar:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuA9WYfN4-bwHM5ZxUjim5f986NPdbh41Dk7VidgvjCMvJmtbL0gy3zPdHBmqTQ60aYdd_SYWUrhdtVY1WifhcE1sKRRVsekkDOwD3Mt0eCSN1Ew1ycemhvzQu5-xQhEjbGRx_AA-coeGenNJzhB03Ob3BP72cUJBCvGKOQ6HtKC1x-blVGtJ-wS35w8saFVQNXhDMnMxSt9nUE0m0NsMxCGogQXrnD60b4RbL2Y5oqEKQL8RR5HCPPylFZe1omXb_UYny9HXHcleQI',
//     },
//   ],
//   review: [
//     {
//       id: '2',
//       title: 'Unboxing v1 - @tech_reviews',
//       campaign: 'Tech Launch',
//       type: 'video',
//       rights: 'Full Rights',
//       comments: 3,
//       thumb:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuARQT8XBdfBp_SJf2iVSPnRJoKkiEqan9teAuuR8QaqL1TpuoKk4OnM1cUmoiwEfSO6NC2S3JCWtUcEkAX3Ejn01015oNiUlDh0awpmgiYPpZesw2ypCUOnARNaA5YiSRGYrMD2znllP1sYwISlFGT4lCCrUxPrHplgDuFQ46Af2RAViIKPY_vfcFyB1F8XHM8nrdnmiq1KkJiz3vvFShBLS6LFffzxSDySgaQggpor_BUXW-8vQ9bujzC84-VYO1p7nmxgn83-HaU',
//       avatar: '',
//     },
//   ],
//   revision: [
//     {
//       id: '3',
//       title: 'PastaNight - @foodie_ella',
//       campaign: 'New Menu 2024',
//       status: 'Waiting for v2',
//       thumb:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuD1OdMYpwbxkPxkmbkCR1FacZChhNv4pqZtRtk7yLRN8xoTSSFUtwmrkFg_6wglEWJIs5xc4Ak-I19BRRXNzc8inIyPAbUN7nLdiSKCGxpB5yYpxe2rV9W9HQXV45ejvnN8OJkH082Utb-3o-JmTlmhuleGBPb-fDQJ_FiIJOq8ssGNBWrxjOhMFmnHhvYR3d5zko7855B8MkiE2Ly3L8zB7CjNmF5Z0CuZCsTVxUZIISK0J1EFVfvwcjs_NaeX_6oVrzM6mM-JLXg',
//       avatar:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuABFF3c2x7pBYZZQ0phixYuQjfagNmecn_R0tK4GgVsjGkPDY7BUYesI1V4wUXrSRGIEkTzM_ryOlPJI4HeiPIueggX64c6hKZ81QnH3PZP-fDIxDCErnnJD3NdlVWqgUSZU28UXIPr-hFj_bvK0xZmwgaD4CKzwVff0iHZ5f2RpQ2D1EqhnQ1FhrJQgJ7ZkOpdNlrweNsYZsx8vmU78TxyR4RfW0BuMHPvaiXWZZnDHd6C1vtbn4qa9lQInO3dAJ7VajG_9PPcImo',
//     },
//   ],
//   approved: [
//     {
//       id: '4',
//       title: 'JapanVlog - @marina_travels',
//       campaign: 'Global Series',
//       rights: 'Full Rights',
//       status: 'Ready to Post',
//       thumb:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuBHmX2silH_KC9VRGVX9Yrkwie9X3n_8gcTfsjQX4Q-zVCDysiCYWX5cXIlaq7tkEMPBxLsQp2OBjc-PJVlof5VNMNfhTDKwC4LFHc7toxLgrkuw254HZlVbudSjEOx2HCt5cy_zq8CQQFG2eFijcnL2VqW8YVRPxUacuTgkvid-QkImer-9yJ1vpRvQt6vWO6X2wgFD3hHrpGzQcbERsXB6QypF0ITNisqeFPr9S8u2dQX-6CI34gSIy6EojVx2foQmXQug9vp52Y',
//       avatar: '',
//     },
//   ],
// };

const countStyles: Record<string, string> = {
  slate: 'bg-slate-100 border-slate-200 text-slate-600',
  primary: 'bg-[var(--color-primaryButton)] text-white',
  amber: 'bg-amber-100 border-amber-200 text-amber-700',
  emerald: 'bg-emerald-100 border-emerald-200 text-emerald-700',
};

export default function ContentFeedbackPage() {
  const [search, setSearch] = useState('');
  interface SelectedCardType {
    id: string;
    title: string;
    campaign: string;
    thread_id?: string;
  }
  const [selectedCard, setSelectedCard] = useState<SelectedCardType | null>(null);
  const [feedback, setFeedback] = useState('');
  const { data } = NegotiationStatsHook(1, 50) as { data?: NegotiationResponse };

  // const threadId = selectedCard?.thread_id || '';
  const threadId = '923364417022';
  const { data: chatData, isLoading: chatLoading } = useAdminInfluencerMessagesHook(
    threadId,
    1,
    20,
  );
  const { sendMessage } = useSendAdminMessage(threadId);
  const [sending, setSending] = useState(false);
  const apiCards: CardType[] =
    data?.negotiation_controls
      ?.filter((item) => item.negotiation_status === 'agreed')
      .map((item) => ({
        id: item._id,
        title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
        campaign: item.campaign_brief?.title ?? 'Campaign',
        rights: 'Full Rights',
        status: 'Ready to Post',
        thumb:
          item.campaign_brief?.campaign_logo_url ?? 'https://via.placeholder.com/300',
        thread_id: item.thread_id,
      })) ?? [];

  const videoMessage = chatData?.messages?.find(
    (msg: ChatMessage) => typeof msg.message === 'string' && msg.message.includes('.mp4'),
  );

  const videoUrl = videoMessage?.message;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="font-sans">
      <PageHeader
        title="Content Review & Feedback Pipeline"
        description="Review content from influencers and provide feedback"
        icon={<MessageSquare className="size-5" />}
        actions={
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                type="text"
                placeholder="Search content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">Live Pipeline</span>
            </div>
          </div>
        }
      />

      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const combinedCards: CardType[] = col.id === 'approved' ? [...apiCards] : [];

          return (
            <div
              key={col.id}
              className="flex w-80 shrink-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
                    {col.label}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      col.color === 'primary'
                        ? 'bg-(--color-primaryButton) text-white'
                        : countStyles[col.color]
                    }`}
                  >
                    {col.count}
                  </span>
                </div>
                <button className="text-white/40 hover:text-white/70 transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto">
                {combinedCards?.map((card) => (
                  <div
                    key={card.id}
                    onClick={() =>
                      setSelectedCard({
                        id: card.id,
                        title: card.title,
                        campaign: card.campaign,
                        thread_id: card.thread_id, // 👈 important
                      })
                    }
                    className={`cursor-pointer rounded-xl border bg-white/5 p-3 transition-all hover:shadow-lg ${
                      col.id === 'review'
                        ? 'border-2 border-(--color-primaryButton)'
                        : col.id === 'revision'
                          ? 'border-l-4 border-l-amber-400 border-white/10'
                          : 'border-white/10 hover:border-(--color-primaryButton)/30'
                    }`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden rounded-lg ">
                      <Image
                        src={card.thumb}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />

                      {col.id === 'review' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-(--color-primaryButton)/10">
                          <Play
                            className="size-10 text-(--color-primaryButton)"
                            fill="currentColor"
                          />
                        </div>
                      )}

                      {col.id === 'revision' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20">
                          <RefreshCw className="size-8 text-amber-500" />
                        </div>
                      )}

                      {col.id === 'approved' && (
                        <div className="absolute top-2 right-2 rounded-full bg-emerald-500 p-1">
                          <Check className="size-3 text-white" />
                        </div>
                      )}

                      <div className="absolute top-2 right-2 rounded-lg bg-white/90 p-1">
                        <Video className="size-3 text-slate-700" />
                      </div>
                    </div>
                    <h4 className="truncate text-sm font-bold text-white">
                      {card.title}
                    </h4>
                    <p className="mb-3 text-xs text-white/50">{card.campaign}</p>

                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase text-blue-400">
                        {'rights' in card ? card.rights : 'Full Rights'}
                      </span>

                      {'comments' in card && card.comments && (
                        <div className="flex items-center gap-1 text-white/50">
                          <MessageSquare className="size-3" />
                          <span className="text-xs font-bold">{card.comments}</span>
                        </div>
                      )}

                      {'status' in card && card.status && (
                        <span className="text-[10px] font-bold text-emerald-400">
                          {card.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview & Feedback modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-background)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-1 flex-col border-r border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedCard.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {selectedCard.campaign} Campaign
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white focus:border-[var(--color-primaryButton)] focus:outline-none">
                    <option>Version 1 (Active)</option>
                    <option disabled>Version 2 (Draft)</option>
                  </select>
                  <button className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <Maximize2 className="size-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-hidden bg-slate-900 p-4">
                <div className="relative aspect-9/16 h-[92%] max-h-150 overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                  {videoUrl ? (
                    <>
                      {/* VIDEO ELEMENT */}
                      <video
                        src={videoUrl}
                        className="h-full w-full object-cover"
                        controls={isPlaying}
                      />

                      {/* PLAY BUTTON OVERLAY */}
                      {!isPlaying && (
                        <div
                          onClick={() => setIsPlaying(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                        >
                          <Play
                            className="size-16 text-white/80 hover:text-white hover:scale-110 transition-all"
                            fill="currentColor"
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    // fallback if no video
                    <div className="flex h-full items-center justify-center text-white/50 text-sm">
                      No video available
                    </div>
                  )}

                  {/* PROGRESS BAR (fake for now) */}
                  <div className="absolute bottom-6 left-6 right-6 h-1.5 overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-1/3 rounded-full bg-(--color-primaryButton)" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 p-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-white">0:45</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Resolution
                    </p>
                    <p className="text-sm font-bold text-white">1080 × 1920</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Usage Rights
                    </p>
                    <span className="inline-block rounded border border-(--color-primaryButton)/20 bg-(--color-primaryButton)/10 px-2 py-0.5 text-[10px] font-bold text-(--color-primaryButton)">
                      Standard Commercial
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <span className="text-xs font-bold">unboxing_draft_v1.mp4 (42MB)</span>
                </div>
              </div>
            </div>
            <div className="flex w-100 shrink-0 flex-col bg-white/2">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                  <MessageSquare className="size-4 text-(--color-primaryButton)" />
                  Feedback
                </h4>
                <span className="rounded-full bg-(--color-primaryButton)/10 px-2.5 py-0.5 text-[10px] font-bold text-(--color-primaryButton)">
                  3 UNREAD
                </span>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {chatLoading ? (
                  <p className="text-white/50 text-sm">Loading...</p>
                ) : (
                  chatData?.messages?.map((msg: ChatMessage) => {
                    const isAdmin = msg.sender === 'ADMIN';

                    return (
                      <div
                        key={msg._id}
                        className={`flex gap-3 ${isAdmin ? 'justify-end' : ''}`}
                      >
                        {!isAdmin && <div className="size-8 rounded-full bg-slate-600" />}

                        <div className="max-w-[80%] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {msg.username || msg.sender}
                            </span>
                            <span className="text-[10px] text-white/40">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </span>
                          </div>

                          <div
                            className={`rounded-2xl p-3 text-xs ${
                              isAdmin
                                ? 'bg-[var(--color-primaryButton)] text-white rounded-tr-none'
                                : 'bg-white/5 text-white/70 rounded-tl-none'
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="space-y-4 border-t border-white/10 p-5">
                {' '}
                <div className="relative">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Type your feedback..."
                    className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
                  />

                  <button
                    disabled={sending}
                    onClick={async () => {
                      if (!feedback.trim() || sending) return;

                      try {
                        setSending(true);
                        await sendMessage(feedback);
                        setFeedback('');
                      } finally {
                        setSending(false);
                      }
                    }}
                    className="absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-lg bg-[var(--color-primaryButton)]/10 text-[var(--color-primaryButton)] hover:bg-[var(--color-primaryButton)] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="size-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/10 px-4 py-3 text-sm font-bold text-white hover:border-white/20 hover:bg-white/5 transition-colors">
                    <RefreshCw className="size-4" />
                    Revision
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primaryButton)] px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity">
                    <Check className="size-4" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
