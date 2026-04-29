"use client";

import { useState, useMemo } from "react";
import {
  ChevronRight, ChevronLeft, FileText, Clock,
  PenSquare, PlusCircle, CheckCircle, Sparkles, Rocket,
} from "lucide-react";
import Image from "next/image";

// ── Constants ─────────────────────────────────────────────────────────────────

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const TIME_SLOTS = [
  { time: "09:00 AM", label: "Morning Rush",       hour: 9    },
  { time: "11:30 AM", label: "Lunch Break",         hour: 11.5 },
  { time: "08:00 PM", label: "Peak · Recommended",  hour: 20, hot: true },
  { time: "09:45 PM", label: "Late Night",           hour: 21.75 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildCalendar(year: number, month: number) {
  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays   = new Date(year, month, 0).getDate();
  const cells: { day: number; muted?: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: prevDays - i, muted: true });
  for (let d = 1; d <= daysInMonth; d++)   cells.push({ day: d });
  const rem = 7 - (cells.length % 7);
  if (rem < 7) for (let d = 1; d <= rem; d++) cells.push({ day: d, muted: true });
  return cells;
}

function slotAvailable(year: number, month: number, day: number, hour: number) {
  const slot = new Date(year, month, day, Math.floor(hour), (hour % 1) * 60);
  return slot > new Date();
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function CampaignSchedulePage() {
  const today = useMemo(() => new Date(), []);

  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay,  setSelectedDay]  = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [caption,   setCaption]   = useState("");
  const [hashtags,  setHashtags]  = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const cells = useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  const isToday  = (d: number) => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
  const isPast   = (d: number) => new Date(viewYear, viewMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isAtMin  = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const goMonth = (dir: 1 | -1) => {
    setViewMonth(m => {
      const next = m + dir;
      if (next < 0)  { setViewYear(y => y - 1); return 11; }
      if (next > 11) { setViewYear(y => y + 1); return 0; }
      return next;
    });
    setSelectedDay(null); setSelectedTime(null);
  };

  const availableSlots = selectedDay
    ? TIME_SLOTS.filter(s => slotAvailable(viewYear, viewMonth, selectedDay, s.hour))
    : [];

  const summaryDate = selectedDay
    ? new Date(viewYear, viewMonth, selectedDay).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : "—";

  const canSchedule = !!selectedDay && !!selectedTime && caption.trim().length > 0;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="max-w-4xl mx-auto pt-12 pb-24 px-4 md:px-6">

        {/* ── Header ── */}
        <section className="mb-12 text-center">
          <nav className="flex items-center justify-center gap-2 text-white/30 text-xs mb-6">
            <span className="hover:text-[#ff4e7e] cursor-pointer transition-colors">Campaigns</span>
            <ChevronRight size={12} />
            <span className="text-[#ff4e7e] font-bold">Midnight Cyber-Pulse Launch</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Midnight Cyber-Pulse Launch
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-sm leading-relaxed">
            Drive viral hype for the next-gen wearable tech launch. Maximize day-one pre-order conversions through immersive visual storytelling.
          </p>
          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#ff4e7e]/30 bg-[#ff4e7e]/5 text-[#ff4e7e] text-sm font-bold hover:bg-[#ff4e7e] hover:text-white transition-all">
              <FileText size={14} /> View Campaign Brief
            </button>
          </div>
        </section>

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
                    const past  = isPast(day);
                    const today = isToday(day);
                    const sel   = selectedDay === day;
                    return (
                      <button key={i} disabled={past} onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                        className={`py-2 rounded-xl transition-all font-medium text-sm
                          ${past ? "text-white/15 cursor-not-allowed"
                            : sel  ? "bg-[#ff4e7e] text-white font-black shadow-[0_0_12px_rgba(255,78,126,0.4)]"
                            : today ? "ring-1 ring-[#ff4e7e]/50 text-[#ff4e7e] hover:bg-[#ff4e7e]/10"
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
                    {availableSlots.map(({ time, label, hot }) => {
                      const active = selectedTime === time;
                      return (
                        <button key={time} onClick={() => setSelectedTime(time)}
                          className={`py-3 px-5 rounded-xl text-sm transition-all border flex justify-between items-center
                            ${active
                              ? "bg-[#ff4e7e]/10 text-[#ff4e7e] border-[#ff4e7e]/30 font-bold"
                              : "bg-white/4 text-white/40 border-white/5 hover:bg-white/10 hover:text-white"}`}>
                          <span>{time}</span>
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
                <textarea rows={5} value={caption} maxLength={2200} onChange={e => setCaption(e.target.value)}
                  placeholder="Enter your cinematic hook here..."
                  className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff4e7e] transition-all resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Hashtags</label>
                  <input type="text" value={hashtags} onChange={e => setHashtags(e.target.value)}
                    placeholder="#cyberpulse #launch #tech"
                    className="w-full bg-black/30 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-[#ff4e7e] transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Tagged Partners</label>
                  <div className="flex items-center justify-between bg-black/30 border border-white/10 rounded-2xl px-5 py-3.5 cursor-pointer hover:border-[#ff4e7e]/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0D0D12]" />
                        <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-[#0D0D12]" />
                      </div>
                      <span className="text-sm text-white/50">AuraWear + 2 others</span>
                    </div>
                    <PlusCircle size={18} className="text-white/20 group-hover:text-[#ff4e7e] transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Section 3: Summary & CTA ── */}
          <div className="p-6 md:p-10 bg-[#ff4e7e]/5 border-t border-[#ff4e7e]/10">
            <div className="flex flex-col md:flex-row items-center gap-8">

              {/* Preview */}
              <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden relative border border-white/10 shrink-0">
                <Image src="/assets/fineSHIT.jpg" alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#ff4e7e] px-2 py-0.5 rounded text-[9px] font-black uppercase text-white tracking-tight">Preview</span>
                </div>
              </div>

              {/* Summary + CTA */}
              <div className="flex-1 space-y-5 w-full">
                <div className="space-y-1">
                  {([
                    { label: "Publish Date",   value: summaryDate },
                    { label: "Schedule Time",  value: selectedTime ?? "—" },
                    { label: "Campaign",       value: "Midnight Cyber-Pulse", pink: true },
                  ] as { label: string; value: string; pink?: boolean }[]).map(({ label, value, pink }, i, arr) => (
                    <div key={i} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                      <span className="text-white/40 text-sm">{label}</span>
                      <span className={`font-bold text-sm ${pink ? "text-[#ff4e7e]" : value === "—" ? "text-white/20" : "text-white"}`}>{value}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => canSchedule && setConfirmed(true)} disabled={!canSchedule}
                  className="w-full bg-[#ff4e7e] hover:bg-primaryHover disabled:opacity-30 disabled:cursor-not-allowed text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(255,78,126,0.3)] flex items-center justify-center gap-2">
                  <Rocket size={15} /> Schedule Post
                </button>

                <p className="text-[10px] text-center leading-relaxed px-4
                  text-white/20">
                  {!canSchedule
                    ? (!selectedDay ? "← Pick a date to continue"
                      : !selectedTime ? "← Pick a time slot"
                      : "← Add a caption to continue")
                    : "By scheduling, you agree to the Campaign Fulfillment Terms."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Insight Strip ── */}
        <div className="mt-8 rounded-2xl p-5 md:p-6 bg-white/3 border border-white/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#ff4e7e]/20 flex items-center justify-center text-[#ff4e7e] shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-bold text-sm">Optimization Tip</h4>
              <p className="text-xs text-white/30 mt-0.5">8:00 PM – 10:00 PM sees 42% higher engagement for tech-noir content.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:pl-4 md:border-l border-white/10">
            <span className="text-[10px] text-white/20 uppercase font-black tracking-widest hidden md:block">Creator</span>
            <div className="w-8 h-8 rounded-full bg-[#ff4e7e]/20 border border-[#ff4e7e]/20 flex items-center justify-center text-[#ff4e7e] text-xs font-bold shrink-0">A</div>
            <span className="text-xs font-bold">Alex Rivera</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center">
        <span className="text-xl font-extrabold tracking-tighter uppercase text-white/10">AuraCreator</span>
      </footer>

      {/* Snackbar */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-3 bg-black/80 border border-[#ff4e7e]/30 px-8 py-4 rounded-full backdrop-blur-xl transition-all duration-500 z-50
        ${confirmed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
        <CheckCircle size={18} className="text-[#ff4e7e]" />
        <span className="text-sm text-white font-bold">Schedule confirmed for Alex Rivera.</span>
      </div>
    </div>
  );
}