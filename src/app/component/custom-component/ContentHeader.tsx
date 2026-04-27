import Image from 'next/image';
import { Bolt, CalendarDays } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

interface ContentHeaderProps {
  title: string;
  logo: string;
  description: string;
  category: string;

  endInDays?: number;
  targetReach?: string;
  conversionGoal?: string;
  budgetUtilized?: number;

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
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        {/* LOGO */}
        <div className="relative shrink-0">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-primaryButton/20 p-1 md:h-64 md:w-64">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image
                src={logo}
                alt={title}
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primaryButton text-white shadow-lg">
            <Bolt className="h-5 w-5" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 space-y-6">
          {/* TOP META */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-primaryButton/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primarytext">
              {category}
            </span>

            <span className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDays className="h-4 w-4" />
              Ends in {endInDays} days
            </span>
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
          <div className="space-y-6 pt-4 border-t border-white/10">
            {/* COMPANY + PLATFORM + BRIEF */}
            <div className="flex flex-wrap gap-6">
              {companyName && (
                <div>
                  <p className="text-[10px] uppercase text-white/40">Company</p>
                  <p className="text-white font-semibold">{companyName}</p>
                </div>
              )}

              {platform?.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase text-white/40">Platform</p>
                  <p className="text-white font-semibold">{platform.join(', ')}</p>
                </div>
              )}

              {briefId && (
                <div className="flex flex-col gap-2">
                  {/* Heading */}
                  <p className="text-[10px] uppercase tracking-widest text-white/40">
                    Brief
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => {
                      if (briefId && onViewBrief) {
                        onViewBrief(briefId);
                      }
                    }}
                    className="h-8 px-5 rounded-xl bg-primaryButton hover:bg-primaryHover text-white text-sm font-semibold shadow-md transition-all duration-200"
                  >
                    View Brief
                  </button>
                </div>
              )}
            </div>

            {/* DELIVERABLES */}
            {deliverables?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase text-white/40 mb-2">Deliverables</p>
                <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
                  {deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* TIMELINE */}
            {timeline?.length > 0 && (
              <div>
                <p className="text-[10px] uppercase text-white/40 mb-2">Timeline</p>
                <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
                  {timeline.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* WHATSAPP */}
            {brandThreadId && (
              <div className="flex items-center gap-2 pt-2">
                <FaWhatsapp className="text-green-500 text-xl" />
                <span className="text-white/80 text-sm">{brandThreadId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BG EFFECT */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primaryButton/10 blur-3xl" />
    </header>
  );
};

export default ContentHeader;
