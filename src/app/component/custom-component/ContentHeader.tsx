import Image from "next/image";
import { Bolt, CalendarDays } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CustomButton from "../button";

interface ContentHeaderProps {
  title: string;
  logo?: string;
  description: string;
  category: string;

  endInDays?: number;
  deliverables?: string[];
  timeline?: string[];
  platform?: string[];
  companyName?: string;
  briefId?: string;
  brandThreadId?: string;
  onViewBrief?: (briefId: string) => void;
}

const ContentHeader = ({
  title,
  logo,
  description,
  category,
  endInDays = 14,
  deliverables = [],
  timeline = [],
  platform = [],
  companyName,
  briefId,
  brandThreadId,
  onViewBrief,
}: ContentHeaderProps) => {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141414] p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

        {/* ================= LEFT: IMAGE ================= */}
        <div className="relative shrink-0 flex flex-col items-center">

          {/* IMAGE */}
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-primaryButton/20 p-1 md:h-64 md:w-64">
            <div className="h-full w-full overflow-hidden rounded-full">
              {logo ? (
                <Image
                  src={logo}
                  alt={title}
                  width={256}
                  height={256}
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-white/5" />
              )}
            </div>
          </div>

          {/* WHATSAPP BELOW IMAGE */}
          {brandThreadId && (
            <div className="flex items-center gap-2 mt-3">
              <FaWhatsapp className="text-green-500 text-lg" />
              <span className="text-white/70 text-xs">
                {brandThreadId}
              </span>
            </div>
          )}

          {/* ICON BADGE */}
          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primaryButton text-white shadow-lg">
            <Bolt className="h-5 w-5" />
          </div>
        </div>

        {/* ================= RIGHT: CONTENT ================= */}
        <div className="flex-1 space-y-6">

          {/* TOP ROW: CATEGORY + BRIEF BUTTON (RIGHT SIDE) */}
          <div className="flex justify-between items-start flex-wrap gap-4">

            {/* CATEGORY */}
            <span className="rounded-full bg-primaryButton/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primarytext">
              {category}
            </span>

            {briefId && (
              <CustomButton
                onClick={() => onViewBrief?.(briefId)}
                className="h-9 px-5 rounded-xl bg-primaryButton cursor-pointer hover:bg-primaryHover text-white text-sm font-semibold shadow-md transition-all"
              >
                View Brief
              </CustomButton>
            )}
          </div>

          {/* TITLE */}
          <div>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">
              {description}
            </p>
          </div>

          {/* META INFO */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            {companyName && (
              <div>
                <p className="text-[10px] uppercase text-white/40">Company</p>
                <p className="text-white font-semibold">{companyName}</p>
              </div>
            )}

            {platform?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase text-white/40">Platform</p>
                <p className="text-white font-semibold">
                  {platform.join(", ")}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 text-white/60">
              <CalendarDays className="h-4 w-4" />
              Ends in {endInDays} days
            </div>
          </div>

          {/* ================= GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* DELIVERABLES */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white text-sm font-semibold mb-3">
                Deliverables
              </h3>
              <ul className="space-y-2 text-xs text-white/70 text-justify">
                {deliverables.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* TIMELINE */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <h3 className="text-white text-sm font-semibold mb-3">
                Timeline
              </h3>
              <ul className="space-y-2 text-xs text-white/70 text-justify">
                {timeline.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* BG EFFECT */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primaryButton/10 blur-3xl" />
    </header>
  );
};

export default ContentHeader;