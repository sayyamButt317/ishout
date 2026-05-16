'use client';

import Image from 'next/image';
import CustomButton from '../button';

interface ContentHeaderProps {
  title: string;
  logo?: string;
  description?: string;
  category?: string;
  deliverables?: string[];
  timeline?: string[];
  platform?: string[];
  companyName?: string;
  briefId?: string;
  progress?: number;
  status?: string;
  brandThreadId?: string;

  onViewBrief?: (briefId: string) => void;
}

const ContentHeader = ({
  title,
  logo,
  description,
  category,
  deliverables = [],
  timeline = [],
  platform = [],
  companyName,
  briefId,
  brandThreadId,
  onViewBrief,
}: ContentHeaderProps) => {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-black/5 bg-white/80 p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#111111]/90 md:p-5">

      {/* Subtle Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          background:
            'radial-gradient(circle at top right, var(--color-primaryButton), transparent 35%)',
        }}
      />

      <div className="relative flex flex-col gap-4">

        {/* TOP ROW */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          {/* LEFT */}
          <div className="flex min-w-0 flex-1 gap-3">

            {/* Logo */}
            <div className="shrink-0">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-black/5 bg-black/3 dark:border-white/10 dark:bg-white/4">

                {logo ? (
                  <Image
                    src={logo}
                    alt={title}
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full w-full bg-black/5 dark:bg-white/5" />
                )}
              </div>
            </div>

            {/* Title Area */}
            <div className="min-w-0 flex-1">

              {/* Tags */}
              <div className="mb-2 flex flex-wrap items-center gap-2">

                {category && (
                  <span className="max-w-full rounded-full bg-primaryButton/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-primaryButton">
                    {category}
                  </span>
                )}

                {status && (
                  <span className="max-w-full rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-500">
                    {status}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl font-semibold tracking-tight text-black dark:text-white md:text-2xl">
                {title}
              </h1>

              {/* Description */}
              {description && (
                <p className="mt-1 text-sm leading-6 text-black/60 dark:text-white/60">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">

            {briefId && (
              <CustomButton
                onClick={() => onViewBrief?.(briefId)}
                className="h-9 whitespace-nowrap rounded-xl bg-primaryButton px-4 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 dark:text-white"
              >
                View Brief
              </CustomButton>
            )}
          </div>
        </div>

        {/* INLINE META */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/5 pt-3 text-sm dark:border-white/10">

          {companyName && (
            <div className="flex min-w-0 max-w-full items-center gap-2">
              <span className="shrink-0 text-black/40 dark:text-white/40">
                Brand
              </span>

              <span className="min-w-0 text-black dark:text-white">
                {companyName}
              </span>
            </div>
          )}

          {platform.length > 0 && (
            <div className="flex min-w-0 max-w-full items-center gap-2">
              <span className="shrink-0 text-black/40 dark:text-white/40">
                Platforms
              </span>

              <span className="min-w-0 text-black dark:text-white">
                {platform.join(' • ')}
              </span>
            </div>
          )}

          {deliverables.length > 0 && (
            <div className="flex min-w-0 max-w-full items-center gap-2">
              <span className="shrink-0 text-black/40 dark:text-white/40">
                Deliverables
              </span>

              <span className="min-w-0 text-black dark:text-white">
                {deliverables.join(' • ')}
              </span>
            </div>
          )}

          {timeline.length > 0 && (
            <div className="flex min-w-0 max-w-full items-center gap-2">
              <span className="shrink-0 text-black/40 dark:text-white/40">
                Timeline
              </span>

              <span className="min-w-0 text-black dark:text-white">
                {timeline.join(' • ')}
              </span>
            </div>
          )}

       
        </div>
      </div>
    </header>
  );
};

export default ContentHeader;