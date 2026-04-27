'use client';

import React from 'react';
import Link from 'next/link';

export type PageHeaderProps = {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  badge?: { label: string; variant?: 'default' | 'success' | 'warning' | 'danger' };
  className?: string;
};

const badgeVariants = {
  default:
    'bg-[var(--color-primaryButton)]/10 text-[var(--color-primaryButton)] border border-[var(--color-primaryButton)]/20',
  success: 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20',
  warning: 'bg-amber-400/10 text-amber-400 border border-amber-400/20',
  danger:
    'bg-[var(--color-deleteButton)]/10 text-[var(--color-deleteButton)] border border-[var(--color-deleteButton)]/20',
};

/**
 * iShout Dashboard PageHeader
 * AI SaaS style — uses app theme: primary #ff4e7e, section overlays, Sora font.
 */
export default function PageHeader({
  title,
  description,
  icon,
  actions,
  breadcrumbs,
  badge,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`mb-4 font-sans ${className}`} role="banner">
      {/* Breadcrumbs */}
      {breadcrumbs != null && breadcrumbs.length > 0 && (
        <nav className="mb-3 flex items-center gap-1.5" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <svg
                  className="size-3 text-white/20"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M4 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs font-medium text-white/40 transition-colors hover:text-white/70"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-xs font-medium text-white/50">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Main header card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.07] px-5 py-5 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%), var(--color-background)',
        }}
      >
        {/* Subtle primary glow top-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'var(--color-primaryButton)' }}
        />

        <div className="relative flex flex-col gap-4 sm:gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: icon + title + description */}
          <div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center">
            {icon != null && (
              <div
                aria-hidden
                className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-primaryButton)]/20 bg-[var(--color-primaryButton)]/10 text-[var(--color-primaryButton)]"
              >
                {icon}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1
                  className="truncate text-xl font-semibold tracking-tight text-white md:text-2xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {title}
                </h1>
                {badge != null && (
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badgeVariants[badge.variant ?? 'default']}`}
                  >
                    {badge.label}
                  </span>
                )}
              </div>

              {description != null && (
                <div className="mt-1 text-sm leading-relaxed text-white/50">
                  {description}
                </div>
              )}
            </div>
          </div>

          {/* Right: action slots */}
          {actions != null && (
            <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-2.5 lg:w-auto">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
