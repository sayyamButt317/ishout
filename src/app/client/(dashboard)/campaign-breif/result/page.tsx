'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CompanyCampaignBreifApi } from '@/src/routes/Company/api/company.routes';
import { Loader2, Search, Send } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

function extractBriefText(payload: unknown): string {
  if (payload == null) return '';
  if (typeof payload === 'string') return payload;

  const obj = payload as Record<string, unknown>;
  const candidates = [
    'campaignBrief',
    'campaign_brief',
    'brief',
    'response',
    'result',
    'text',
    'content',
    'message',
    'data',
  ];

  for (const key of candidates) {
    const v = obj[key];
    if (typeof v === 'string') return v;
  }

  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return String(payload);
  }
}

function getErrorMessage(err: unknown): string {
  if (!err) return 'Failed to generate campaign brief.';
  if (err instanceof Error) return err.message || 'Failed to generate campaign brief.';
  if (typeof err === 'string') return err;

  if (typeof err === 'object') {
    const maybe = err as {
      response?: { data?: { message?: unknown } };
      message?: unknown;
    };
    const apiMessage = maybe.response?.data?.message;
    if (typeof apiMessage === 'string' && apiMessage.trim()) return apiMessage;
    if (typeof maybe.message === 'string' && maybe.message.trim()) return maybe.message;
  }

  return 'Failed to generate campaign brief.';
}

type ChatItem = {
  id: string;
  prompt: string;
  createdAt: string;
  status: 'pending' | 'success' | 'error';
  responseText?: string;
  errorText?: string;
};

type ChatThread = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: ChatItem[];
};

const STORAGE_THREADS_KEY = 'ishout:cbreif:threads:v1';
const STORAGE_ACTIVE_THREAD_KEY = 'ishout:cbreif:activeThreadId:v1';

function safeParseThreads(raw: string | null): ChatThread[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t === 'object')
      .map((t) => {
        const obj = t as unknown as Record<string, unknown>;
        const items = Array.isArray(obj.items) ? (obj.items as unknown[]) : [];
        return {
          id: typeof obj.id === 'string' ? obj.id : crypto.randomUUID(),
          title: typeof obj.title === 'string' ? obj.title : 'New chat',
          createdAt:
            typeof obj.createdAt === 'string' ? obj.createdAt : new Date().toISOString(),
          updatedAt:
            typeof obj.updatedAt === 'string' ? obj.updatedAt : new Date().toISOString(),
          items: items
            .filter((m) => m && typeof m === 'object')
            .map((m) => {
              const mm = m as unknown as Record<string, unknown>;
              const status =
                mm.status === 'pending' || mm.status === 'success' || mm.status === 'error'
                  ? (mm.status as ChatItem['status'])
                  : 'success';

              return {
                id: typeof mm.id === 'string' ? mm.id : crypto.randomUUID(),
                prompt: typeof mm.prompt === 'string' ? mm.prompt : '',
                createdAt:
                  typeof mm.createdAt === 'string'
                    ? mm.createdAt
                    : new Date().toISOString(),
                status,
                responseText:
                  typeof mm.responseText === 'string' ? mm.responseText : undefined,
                errorText: typeof mm.errorText === 'string' ? mm.errorText : undefined,
              } satisfies ChatItem;
            }),
        } as ChatThread;
      });
  } catch {
    return [];
  }
}

export default function CampaignBreifResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPrompt = (searchParams.get('prompt') ?? '').trim();

  const [draft, setDraft] = useState('');
  const [search, setSearch] = useState('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [threads, setThreads] = useState<ChatThread[]>([]);

  const seededRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load persisted threads once.
  useEffect(() => {
    const loadedThreads = safeParseThreads(
      window.localStorage.getItem(STORAGE_THREADS_KEY)
    );
    const loadedActive = window.localStorage.getItem(STORAGE_ACTIVE_THREAD_KEY);
    if (loadedThreads.length) setThreads(loadedThreads);
    if (loadedActive) setActiveThreadId(loadedActive);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_THREADS_KEY, JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    if (activeThreadId) {
      window.localStorage.setItem(STORAGE_ACTIVE_THREAD_KEY, activeThreadId);
    } else {
      window.localStorage.removeItem(STORAGE_ACTIVE_THREAD_KEY);
    }
  }, [activeThreadId]);

  const activeThread = useMemo(() => {
    if (!activeThreadId) return null;
    return threads.find((t) => t.id === activeThreadId) ?? null;
  }, [activeThreadId, threads]);

  const createThread = (title?: string) => {
    const now = new Date().toISOString();
    const thread: ChatThread = {
      id: crypto.randomUUID(),
      title: (title ?? '').trim() || 'New chat',
      createdAt: now,
      updatedAt: now,
      items: [],
    };
    setThreads((prev) => [thread, ...prev]);
    setActiveThreadId(thread.id);
    return thread.id;
  };

  const sendPrompt = async (prompt: string, threadOverrideId?: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    const itemId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const threadId = threadOverrideId ?? activeThreadId ?? createThread(trimmed);
    setActiveThreadId(threadId);

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        const nextTitle =
          t.title === 'New chat' || !t.title.trim() ? trimmed : t.title;
        return {
          ...t,
          title: nextTitle,
          updatedAt: createdAt,
          items: [
            ...t.items,
            { id: itemId, prompt: trimmed, createdAt, status: 'pending' },
          ],
        };
      })
    );

    try {
      const res = await CompanyCampaignBreifApi(trimmed);
      const text = extractBriefText(res);
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id !== threadId) return t;
          return {
            ...t,
            updatedAt: new Date().toISOString(),
            items: t.items.map((m) =>
              m.id === itemId
                ? { ...m, status: 'success', responseText: text || '' }
                : m
            ),
          };
        })
      );
    } catch (err) {
      setThreads((prev) =>
        prev.map((t) => {
          if (t.id !== threadId) return t;
          return {
            ...t,
            updatedAt: new Date().toISOString(),
            items: t.items.map((m) =>
              m.id === itemId
                ? { ...m, status: 'error', errorText: getErrorMessage(err) }
                : m
            ),
          };
        })
      );
    }
  };

  const handleSend = () => {
    const prompt = draft.trim();
    if (!prompt) return;
    setDraft('');
    void sendPrompt(prompt);
  };

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    if (!initialPrompt) return;
    const newThreadId = createThread(initialPrompt);
    void sendPrompt(initialPrompt, newThreadId);
    router.replace('/client/campaign-breif/result');
  }, [initialPrompt]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.items.length]);

  const filteredThreads = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = [...threads].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    if (!q) return list;
    return list.filter((t) => t.title.toLowerCase().includes(q));
  }, [threads, search]);

  const activeTitle = activeThread?.title || 'Campaign Brief';

  return (
    <div className="relative min-h-[calc(100vh-2rem)] w-full bg-black overflow-hidden text-white">
      <Image
        src="https://ik.imagekit.io/dtdxnyskk/leftVector.svg"
        alt="leftVector"
        unoptimized={true}
        loading="lazy"
        width={900}
        height={900}
        className="absolute left-0 top-0 h-full w-auto object-contain pointer-events-none opacity-30"
      />
      <Image
        src="https://ik.imagekit.io/dtdxnyskk/rightVector.svg"
        alt="rightVector"
        unoptimized={true}
        loading="lazy"
        width={900}
        height={900}
        className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none opacity-30"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <aside className="w-full md:w-[320px] shrink-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold italic">Conversations</h2>
              </div>

              <Button
                type="button"
                className="mt-4 w-full bg-secondaryButton hover:bg-secondaryHover text-white italic"
                onClick={() => {
                  setSearch('');
                  setDraft('');
                  createThread();
                  router.replace('/client/campaign-breif/result');
                }}
              >
                + New Chat
              </Button>

              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Here"
                  className="pl-9 bg-black/30 border-white/10 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="p-5">
              <p className="text-xs text-white/60 italic">Today</p>
              <div className="mt-3 space-y-2">
                {filteredThreads.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm italic text-white/60">
                    No chats yet
                  </div>
                ) : (
                  filteredThreads.map((t) => {
                      const selected = t.id === activeThreadId;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setActiveThreadId(t.id);
                            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full text-left rounded-2xl px-4 py-3 border transition-all ${
                            selected
                              ? 'border-primaryButton/40 bg-primaryButton/10'
                              : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                          }`}
                        >
                          <p className="text-sm italic font-medium text-white truncate whitespace-nowrap">
                            {t.title}
                          </p>
                          <p className="text-xs italic text-white/50 mt-1">
                            {new Date(t.updatedAt).toLocaleString()}
                          </p>
                        </button>
                      );
                    })
                )}
              </div>
            </div>
          </aside>

          <main className="flex-1 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-center">
              <p className="text-sm italic text-white/70 truncate">{activeTitle}</p>
            </div>

            <div className="h-[calc(100vh-18rem)] md:h-[calc(100vh-14rem)] overflow-y-auto p-6">
              <div className="mx-auto w-full max-w-3xl">
                {!activeThread || activeThread.items.length === 0 ? (
                  <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8 text-sm sm:text-[15px] italic text-white/70">
                    Send a prompt to generate your campaign brief.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {activeThread.items.map((m) => (
                      <div key={m.id} id={`msg-${m.id}`} className="space-y-3">
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                          <p className="text-sm sm:text-[15px] italic text-white/85 whitespace-pre-line">
                            {m.prompt}
                          </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-black/25 p-6 sm:p-8">
                          {m.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-3 text-white/80 italic">
                              <Loader2 className="h-5 w-5 animate-spin" />
                              Generating...
                            </div>
                          ) : m.status === 'error' ? (
                            <p className="text-sm sm:text-[15px] italic leading-relaxed text-red-300 whitespace-pre-wrap">
                              {m.errorText || 'Failed to generate campaign brief.'}
                            </p>
                          ) : (
                            <p className="text-sm sm:text-[15px] italic leading-relaxed text-white/80 whitespace-pre-wrap">
                              {m.responseText || ''}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="mx-auto w-full max-w-3xl">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <Input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Type here for future messages..."
                    className="border-none bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 focus-visible:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && draft.trim()) handleSend();
                    }}
                  />
                  <Button
                    type="button"
                    size="icon"
                    className="rounded-full bg-white text-black hover:bg-white/95"
                    disabled={!draft.trim()}
                    onClick={() => {
                      handleSend();
                    }}
                    aria-label="Send"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
