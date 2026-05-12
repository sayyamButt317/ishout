"use client";
import { useState, useMemo, useCallback } from "react";
import {
  ChevronRight, ChevronLeft, Clock,
  PenSquare, PlusCircle, CheckCircle, Rocket,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import NegotiationAgreedByCampaignHook from "@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook";
import { InfluencerPostingDetailsHook } from "@/src/routes/Admin/Mutations/DemoGraphics";
import usePostingStore from "@/src/store/Report/posting-store";
import ContentHeader from "../../component/custom-component/ContentHeader";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TIME_SLOTS = [
  { time: "09:00 AM", label: "Morning Rush", hour: 9 },
  { time: "11:30 AM", label: "Lunch Break", hour: 11.5 },
  { time: "08:00 PM", label: "Peak · Recommended", hour: 20, hot: true },
  { time: "09:45 PM", label: "Late Night", hour: 21.75 },
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

export default function CampaignSchedulePage() {
  const today = useMemo(() => new Date(), []);
  const { Id } = useParams<{ Id: string }>();
  const { data } = NegotiationAgreedByCampaignHook(Id ?? "");
  const { mutate: submitPostingDetails, isPending } = InfluencerPostingDetailsHook();
  console.log("Logo url", data?.campaign_logo_url);

  const {
    postingDate, setPostingDateForPosting,
    date, setDateForPosting,
    time, setTimeForPosting,
    caption, setCaptionForPosting,
    hashtags, setHashtagsForPosting,
    tagpartners, setTagpartnersForPosting,
  } = usePostingStore();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [hashtagText, setHashtagText] = useState(hashtags.join(" "));
  const [tagText, setTagText] = useState(tagpartners.join(", "));

  const calendarDate = postingDate ? new Date(postingDate) : new Date();
  const viewYear = calendarDate.getFullYear();
  const viewMonth = calendarDate.getMonth();

  const cells = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  const isToday = (d: number) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isPast = (d: number) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isAtMin = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const goMonth = (dir: 1 | -1) => {
    const next = new Date(viewYear, viewMonth + dir, 1);
    setPostingDateForPosting(next);
  };

  const handleDaySelect = useCallback((day: number) => {
    setSelectedDay(day);
    setTimeForPosting("");
    const formatted = new Date(viewYear, viewMonth, day).toLocaleDateString("en-US");
    setDateForPosting(formatted);
  }, [viewYear, viewMonth, setDateForPosting, setTimeForPosting]);

  const handleTimeSelect = useCallback((t: string) => {
    setTimeForPosting(t);
  }, [setTimeForPosting]);

  const handleHashtagChange = useCallback((text: string) => {
    setHashtagText(text);
    const parsed = text.split(/[\s,]+/).filter(Boolean);
    setHashtagsForPosting(parsed);
  }, [setHashtagsForPosting]);

  const handleTagChange = useCallback((text: string) => {
    setTagText(text);
    const parsed = text.split(",").map(s => s.trim()).filter(Boolean);
    setTagpartnersForPosting(parsed);
  }, [setTagpartnersForPosting]);

  const availableSlots = selectedDay
    ? TIME_SLOTS.filter(s => slotAvailable(viewYear, viewMonth, selectedDay, s.hour))
    : [];

  const summaryDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  const canSchedule = !!selectedDay && !!time && caption.trim().length > 0;

  const handleSchedule = useCallback(() => {
    if (!canSchedule) return;

submitPostingDetails({
  campaign_id: Id ?? "",
  campaign_name: data?.campaign_brief?.title ?? "",
  logo_url: data?.campaign_logo_url ?? "",
  posting_date: date,
  posting_time: time,
  caption,
  hashtag: hashtags,
  tag_users: tagpartners,
});
  }, [canSchedule, submitPostingDetails, Id, data, date, time, caption, hashtags, tagpartners]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="mx-auto pt-12 pb-24 px-4 md:px-6">
        <ContentHeader
          title={data?.campaign_brief?.title ?? ""}
          logo={data?.campaign_logo_url ?? ""}
          deliverables={data?.campaign_brief?.deliverables_per_influencer}
          timeline={data?.campaign_brief?.timeline}
          platform={data?.campaign?.platform}
          brandThreadId={data?.campaign?.brand_thread_id}
        />

        {/* ── Main Card ── */}
        <div className="rounded-3xl overflow-hidden border border-white/8 bg-white/3">

          {/* ── Section 1: Schedule ── */}
          <div className="p-6 md:p-10 border-b border-white/5">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-[#ff4e7e]/10 p-2 rounded-lg text-[#ff4e7e]"><Clock size={18} /></span>
              Select Posting Time
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Calendar */}
              <div className="bg-white/4 p-5 rounded-2xl border border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-bold text-sm">{MONTHS[viewMonth]} {viewYear}</span>
                  <div className="flex gap-1">
                    <button onClick={() => goMonth(-1)} disabled={isAtMin}
                      className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => goMonth(1)}
                      className="p-1.5 text-white/30 hover:text-white hover:bg-white/5 rounded-full transition-all">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-white/30 mb-3 font-black tracking-widest">
                  {DAYS.map(d => <div key={d}>{d}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {cells.map(({ day, muted }, i) => {
                    if (muted) return <div key={i} className="py-2 text-white/10 text-xs">{day}</div>;
                    const past = isPast(day);
                    const isTodayCell = isToday(day);
                    const sel = selectedDay === day;
                    return (
                      <button key={i} disabled={past} onClick={() => handleDaySelect(day)}
                        className={`py-2 rounded-xl transition-all font-medium text-sm
                          ${past ? "text-white/15 cursor-not-allowed"
                            : sel ? "bg-[#ff4e7e] text-white font-black shadow-[0_0_12px_rgba(255,78,126,0.4)]"
                              : isTodayCell ? "ring-1 ring-[#ff4e7e]/50 text-[#ff4e7e] hover:bg-[#ff4e7e]/10"
                                : "text-white hover:bg-white/10"}`}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4">
                  {selectedDay ? `Slots — ${MONTHS[viewMonth]} ${selectedDay}` : "Select a day first"}
                </p>

                {!selectedDay ? (
                  <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10 min-h-40">
                    <p className="text-white/20 text-xs text-center leading-relaxed">Pick a date on the<br />calendar to see slots</p>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-white/10 min-h-40">
                    <p className="text-white/20 text-xs text-center leading-relaxed">No more slots<br />available today</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {availableSlots.map(({ time: slotTime, label, hot }) => {
                      const active = time === slotTime;
                      return (
                        <button key={slotTime} onClick={() => handleTimeSelect(slotTime)}
                          className={`py-3 px-5 rounded-xl text-sm transition-all border flex justify-between items-center
                            ${active
                              ? "bg-[#ff4e7e]/10 text-[#ff4e7e] border-[#ff4e7e]/30 font-bold"
                              : "bg-white/4 text-white/40 border-white/5 hover:bg-white/10 hover:text-white"}`}>
                          <span>{slotTime}</span>
                          <span className={`text-[10px] ${active ? "text-[#ff4e7e]" : "text-white/20"} ${hot ? "font-bold" : ""}`}>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Section 2: Content Prep ── */}
          <div className="p-6 md:p-10 bg-black/20">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
              <span className="bg-[#ff4e7e]/10 p-2 rounded-lg text-[#ff4e7e]"><PenSquare size={18} /></span>
              Content Preparation
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-widest">Post Caption</label>
                  <span className="text-[10px] text-white/20">{caption.length} / 2,200</span>
                </div>
                <textarea rows={5} value={caption} maxLength={2200}
                  onChange={e => setCaptionForPosting(e.target.value)}
                  placeholder="Enter your cinematic hook here..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff4e7e] transition-all resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Hashtags</label>
                  <input type="text" value={hashtagText}
                    onChange={e => handleHashtagChange(e.target.value)}
                    placeholder="#cyberpulse #launch #tech"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff4e7e] transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Tagged Partners</label>
                  <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-3.5 transition-all focus-within:ring-2 focus-within:ring-[#ff4e7e]">
                    <PlusCircle size={18} className="text-white/20 shrink-0" />
                    <input type="text" value={tagText}
                      onChange={e => handleTagChange(e.target.value)}
                      placeholder="@partner1, @partner2"
                      className="flex-1 bg-transparent text-white text-sm placeholder:text-white/20 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10 bg-[#ff4e7e]/5 border-t border-[#ff4e7e]/10">
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Preview */}
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden relative border border-white/10 shrink-0">
                <Image src={data?.campaign_logo_url ?? ""} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#ff4e7e] px-2 py-0.5 rounded text-[9px] font-black uppercase text-white tracking-tight">Preview</span>
                </div>
              </div>

              <div className="flex-1 space-y-5 w-full">
                <div className="space-y-1">
                  {([
                    { label: "Publish Date", value: summaryDate },
                    { label: "Schedule Time", value: time || "—" },
                    { label: "Campaign", value: data?.campaign_brief?.title ?? "—", pink: true },
                  ] as { label: string; value: string; pink?: boolean }[]).map(({ label, value, pink }, i, arr) => (
                    <div key={label} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                      <span className="text-white/40 text-sm">{label}</span>
                      <span className={`font-bold text-sm ${pink ? "text-[#ff4e7e]" : value === "—" ? "text-white/20" : "text-white"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleSchedule} disabled={!canSchedule || isPending}
                  className="w-full bg-[#ff4e7e] hover:bg-primaryHover disabled:opacity-30 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,78,126,0.3)] flex items-center justify-center gap-2">
                  <Rocket size={15} /> {isPending ? "Scheduling..." : "Schedule Post"}
                </button>

                <p className="text-[10px] text-center leading-relaxed px-4 text-white/20">
                  {!canSchedule
                    ? (!selectedDay ? "← Pick a date to continue"
                      : !time ? "← Pick a time slot"
                        : "← Add a caption to continue")
                    : "By scheduling, you agree to the Campaign Fulfillment Terms."}
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center">
        <span className="text-xl font-extrabold tracking-tighter uppercase text-white/10">iShout</span>
      </footer>

      {/* Snackbar */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-3 bg-black/80 border border-[#ff4e7e]/30 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-500 z-50
        ${confirmed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <CheckCircle size={18} className="text-[#ff4e7e]" />
        <span className="text-sm text-white font-bold">Post scheduled successfully!</span>
      </div>
    </div>
  );
}
