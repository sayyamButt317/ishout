"use client";

import { useState, useMemo, useCallback, useEffect, type ComponentType, type ReactNode } from "react";
import {
  ChevronRight,
  ChevronLeft,
  PenSquare,
  PlusCircle,
  CheckCircle,
  Rocket,
  CalendarDays,
  Hash,
  AtSign,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import NegotiationAgreedByCampaignHook from "@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook";
import usePostingStore from "@/src/store/Report/posting-store";
import { InfluencerPostingDetailsHook } from "@/src/routes/Influencer/hooks/influencer-mutation";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TIME_SLOTS = [
  { time: "09:00 AM", label: "Morning", hour: 9 },
  { time: "11:30 AM", label: "Midday", hour: 11.5 },
  { time: "08:00 PM", label: "Peak", hour: 20, hot: true },
  { time: "09:45 PM", label: "Night", hour: 21.75 },
];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells: { day: number; muted?: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, muted: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d });
  const rem = 7 - (cells.length % 7);
  if (rem < 7) for (let d = 1; d <= rem; d++) cells.push({ day: d, muted: true });
  return cells;
}

function slotAvailable(year: number, month: number, day: number, hour: number) {
  const slot = new Date(year, month, day, Math.floor(hour), (hour % 1) * 60);
  return slot > new Date();
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  children: ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primaryButton/10 text-primaryButton">
        <Icon size={14} />
      </span>
      {children}
    </h2>
  );
}

export default function CampaignSchedulePage() {
  const today = useMemo(() => new Date(), []);
  const { Id } = useParams<{ Id: string }>();
  const { data, isLoading } = NegotiationAgreedByCampaignHook(Id ?? "");
  const { mutate: submitPostingDetails, isPending, isSuccess } =
    InfluencerPostingDetailsHook();

  const {
    postingDate,
    setPostingDateForPosting,
    date,
    setDateForPosting,
    time,
    setTimeForPosting,
    caption,
    setCaptionForPosting,
    hashtags,
    setHashtagsForPosting,
    tagpartners,
    setTagpartnersForPosting,
  } = usePostingStore();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [hashtagText, setHashtagText] = useState(hashtags.join(" "));
  const [tagText, setTagText] = useState(tagpartners.join(", "));

  const calendarDate = postingDate ? new Date(postingDate) : new Date();
  const viewYear = calendarDate.getFullYear();
  const viewMonth = calendarDate.getMonth();
  const cells = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  const logoUrl = data?.campaign_logo_url?.trim() ?? "";
  const campaignTitle = data?.campaign_brief?.title ?? "Campaign";
  const deliverables = data?.campaign_brief?.deliverables_per_influencer ?? [];
  const timeline = data?.campaign_brief?.timeline ?? [];
  const platforms = data?.campaign?.platform ?? [];

  const isToday = (d: number) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isPast = (d: number) =>
    new Date(viewYear, viewMonth, d) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isAtMin = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const goMonth = (dir: 1 | -1) => {
    setPostingDateForPosting(new Date(viewYear, viewMonth + dir, 1));
  };

  const handleDaySelect = useCallback(
    (day: number) => {
      setSelectedDay(day);
      setTimeForPosting("");
      setDateForPosting(new Date(viewYear, viewMonth, day).toLocaleDateString("en-US"));
    },
    [viewYear, viewMonth, setDateForPosting, setTimeForPosting],
  );

  const handleHashtagChange = useCallback(
    (text: string) => {
      setHashtagText(text);
      setHashtagsForPosting(text.split(/[\s,]+/).filter(Boolean));
    },
    [setHashtagsForPosting],
  );

  const handleTagChange = useCallback(
    (text: string) => {
      setTagText(text);
      setTagpartnersForPosting(text.split(",").map((s) => s.trim()).filter(Boolean));
    },
    [setTagpartnersForPosting],
  );

  const availableSlots = selectedDay
    ? TIME_SLOTS.filter((s) => slotAvailable(viewYear, viewMonth, selectedDay, s.hour))
    : [];

  const summaryDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  const canSchedule = !!selectedDay && !!time && caption.trim().length > 0;

  const hint = !selectedDay
    ? "Select a date"
    : !time
      ? "Select a time"
      : !caption.trim()
        ? "Add a caption"
        : null;

  const handleSchedule = useCallback(() => {
    if (!canSchedule) return;
    submitPostingDetails({
      campaign_id: Id ?? "",
      campaign_name: campaignTitle,
      logo_url: logoUrl,
      posting_date: date,
      posting_time: time,
      caption,
      hashtag: hashtags,
      tag_users: tagpartners,
    });
  }, [
    canSchedule,
    submitPostingDetails,
    Id,
    campaignTitle,
    logoUrl,
    date,
    time,
    caption,
    hashtags,
    tagpartners,
  ]);

  useEffect(() => {
    if (isSuccess) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/6 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-lg items-center justify-between px-4 sm:max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
            iShout
          </span>
          <span className="text-[11px] text-white/40">Schedule post</span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pb-28 pt-5 sm:max-w-2xl sm:px-6 sm:pt-6">
        {/* Campaign summary */}
        <section className="mb-5 rounded-2xl border border-white/8 bg-[#111] p-4">
          {isLoading ? (
            <div className="flex gap-3 animate-pulse">
              <div className="h-14 w-14 shrink-0 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={campaignTitle}
                    fill
                    sizes="56px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-white/20">
                    Logo
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-base font-semibold leading-snug text-white">
                  {campaignTitle}
                </h1>
                {platforms.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {platforms.map((p) => (
                      <span
                        key={p}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/50"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {(deliverables.length > 0 || timeline.length > 0) && !isLoading && (
            <div className="mt-3 grid grid-cols-1 gap-2 border-t border-white/6 pt-3 sm:grid-cols-2">
              {deliverables.length > 0 && (
                <div className="rounded-lg bg-white/3 p-2.5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    Deliverables
                  </p>
                  <ul className="space-y-0.5 text-[11px] leading-relaxed text-white/55">
                    {deliverables.slice(0, 3).map((item, i) => (
                      <li key={i} className="line-clamp-2">
                        · {item}
                      </li>
                    ))}
                    {deliverables.length > 3 && (
                      <li className="text-white/30">+{deliverables.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
              {timeline.length > 0 && (
                <div className="rounded-lg bg-white/3 p-2.5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    Timeline
                  </p>
                  <ul className="space-y-0.5 text-[11px] leading-relaxed text-white/55">
                    {timeline.slice(0, 3).map((item, i) => (
                      <li key={i} className="line-clamp-2">
                        · {item}
                      </li>
                    ))}
                    {timeline.length > 3 && (
                      <li className="text-white/30">+{timeline.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Schedule */}
        <section className="mb-4 rounded-2xl border border-white/8 bg-[#111] p-4">
          <SectionTitle icon={CalendarDays}>Date & time</SectionTitle>

          <div className="mt-3 space-y-4">
            {/* Calendar */}
            <div className="rounded-xl border border-white/6 bg-black/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/80">
                  {MONTHS[viewMonth]} {viewYear}
                </span>
                <div className="flex gap-0.5">
                  <button
                    type="button"
                    onClick={() => goMonth(-1)}
                    disabled={isAtMin}
                    aria-label="Previous month"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white disabled:opacity-25"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goMonth(1)}
                    aria-label="Next month"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition hover:bg-white/5 hover:text-white"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>

              <div className="mb-1 grid grid-cols-7 gap-0.5 text-center text-[9px] font-semibold text-white/25">
                {DAYS.map((d, i) => (
                  <div key={`${d}-${i}`}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-0.5">
                {cells.map(({ day, muted }, i) => {
                  if (muted) {
                    return (
                      <div key={i} className="flex h-8 items-center justify-center text-[10px] text-white/10">
                        {day}
                      </div>
                    );
                  }
                  const past = isPast(day);
                  const todayCell = isToday(day);
                  const sel = selectedDay === day;
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={past}
                      onClick={() => handleDaySelect(day)}
                      className={`flex h-8 items-center justify-center rounded-lg text-xs font-medium transition
                        ${past ? "cursor-not-allowed text-white/15" : ""}
                        ${sel ? "bg-primaryButton text-white shadow-sm shadow-primaryButton/30" : ""}
                        ${!sel && !past && todayCell ? "ring-1 ring-primaryButton/40 text-primaryButton" : ""}
                        ${!sel && !past && !todayCell ? "text-white/70 hover:bg-white/8" : ""}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            <div>
              <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/35">
                {selectedDay ? `Time · ${MONTHS[viewMonth].slice(0, 3)} ${selectedDay}` : "Pick a date first"}
              </p>

              {!selectedDay ? (
                <div className="flex min-h-[72px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/20 px-4">
                  <p className="text-center text-[11px] text-white/25">
                    Select a date above to see available slots
                  </p>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="flex min-h-[72px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/20 px-4">
                  <p className="text-center text-[11px] text-white/25">No slots left for this day</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {availableSlots.map(({ time: slotTime, label, hot }) => {
                    const active = time === slotTime;
                    return (
                      <button
                        key={slotTime}
                        type="button"
                        onClick={() => setTimeForPosting(slotTime)}
                        className={`relative rounded-xl border px-2 py-2.5 text-left transition
                          ${active
                            ? "border-primaryButton/40 bg-primaryButton/10 text-primaryButton"
                            : "border-white/6 bg-black/20 text-white/60 hover:border-white/15 hover:text-white"}`}
                      >
                        {hot && !active && (
                          <span className="absolute -top-1.5 right-1.5 rounded bg-primaryButton/90 px-1 py-px text-[8px] font-bold uppercase text-white">
                            Best
                          </span>
                        )}
                        <span className="block text-xs font-semibold">{slotTime}</span>
                        <span className="mt-0.5 block text-[9px] opacity-60">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mb-4 rounded-2xl border border-white/8 bg-[#111] p-4">
          <SectionTitle icon={PenSquare}>Post content</SectionTitle>

          <div className="mt-3 space-y-3">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                  Caption
                </label>
                <span className="text-[10px] text-white/25">{caption.length}/2,200</span>
              </div>
              <textarea
                rows={3}
                value={caption}
                maxLength={2200}
                onChange={(e) => setCaptionForPosting(e.target.value)}
                placeholder="Write your post caption…"
                className="w-full resize-none rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primaryButton/50"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-white/35">
                  <Hash size={10} /> Hashtags
                </label>
                <input
                  type="text"
                  value={hashtagText}
                  onChange={(e) => handleHashtagChange(e.target.value)}
                  placeholder="#brand #launch"
                  className="w-full rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primaryButton/50"
                />
              </div>
              <div>
                <label className="mb-1.5 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-white/35">
                  <AtSign size={10} /> Tags
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/30 px-3 py-2.5 focus-within:ring-2 focus-within:ring-primaryButton/50">
                  <PlusCircle size={14} className="shrink-0 text-white/25" />
                  <input
                    type="text"
                    value={tagText}
                    onChange={(e) => handleTagChange(e.target.value)}
                    placeholder="@partner1, @partner2"
                    className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-white/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary + desktop CTA */}
        <section className="hidden rounded-2xl border border-primaryButton/15 bg-primaryButton/[0.04] p-4 sm:block">
          <div className="mb-3 flex gap-3">
            {logoUrl && (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10">
                <Image src={logoUrl} alt="" fill sizes="64px" className="object-cover" />
              </div>
            )}
            <div className="flex-1 space-y-1.5 text-sm">
              {[
                { label: "Date", value: summaryDate },
                { label: "Time", value: time || "—" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2 border-b border-white/[0.05] pb-1.5 last:border-0">
                  <span className="text-white/40">{label}</span>
                  <span className={`font-medium ${value === "—" ? "text-white/20" : "text-white"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSchedule}
            disabled={!canSchedule || isPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primaryButton py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primaryHover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Rocket size={14} />
            {isPending ? "Scheduling…" : "Schedule post"}
          </button>
          {hint && (
            <p className="mt-2 text-center text-[10px] text-white/30">{hint}</p>
          )}
        </section>
      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="mb-2 flex items-center justify-between text-[11px]">
          <span className="text-white/40">{summaryDate}</span>
          <span className={`font-medium ${time ? "text-primaryButton" : "text-white/25"}`}>
            {time || "No time"}
          </span>
        </div>
        <button
          type="button"
          onClick={handleSchedule}
          disabled={!canSchedule || isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primaryButton py-3.5 text-xs font-bold uppercase tracking-wider text-white transition active:scale-[0.98] disabled:opacity-40"
        >
          <Rocket size={14} />
          {isPending ? "Scheduling…" : hint ?? "Schedule post"}
        </button>
      </div>

      {/* Success toast */}
      <div
        className={`fixed bottom-24 left-1/2 z-[60] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-primaryButton/30 bg-[#111]/95 px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-500 sm:bottom-8
          ${isSuccess ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <CheckCircle size={16} className="shrink-0 text-primaryButton" />
        <span className="text-xs font-semibold text-white">Post scheduled successfully</span>
      </div>
    </div>
  );
}
