'use client';

import { Sparkles, Pencil, Save, X, Link2, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

/* ─────────────────────────────────────────────
   GLASS CARD  — adaptive light/dark glass panel
   Used for Campaign Images and Reference Links
───────────────────────────────────────────── */
interface GlassSectionCardProps {
  icon: React.ReactNode;
  title: string;
  accentColor?: 'pink' | 'purple';         // left-border colour
  /** subtitle / helper text under the title */
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  colSpan?: boolean;
}

export function GlassSectionCard({
  icon,
  title,
  accentColor = 'pink',
  subtitle,
  children,
  colSpan,
}: GlassSectionCardProps) {
  const borderAccent =
    accentColor === 'purple' ? 'border-l-purple-500' : 'border-l-primaryButton';

  return (
    <div
      className={`
        ${colSpan ? 'md:col-span-2' : ''}
        relative overflow-hidden rounded-2xl p-6
        border border-black/8 dark:border-white/8
        border-l-4 ${borderAccent}
        backdrop-blur-md
        bg-white/60 dark:bg-white/4
        shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_4px_24px_-4px_rgba(0,0,0,0.06)]
        dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]
        transition-colors
      `}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className={accentColor === 'purple' ? 'text-purple-400' : 'text-primarytext'}>
          {icon}
        </span>
        <h4 className="text-xs font-black text-foreground/80 uppercase tracking-[0.12em]">
          {title}
        </h4>
      </div>
      {subtitle && (
        <p className="text-xs text-foreground/40 italic mb-4">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BRIEF BADGE  — "AI Generated Strategy" pill
───────────────────────────────────────────── */
interface BriefBadgeProps {
  label?: string;
}

export function BriefBadge({ label = 'AI Generated Strategy' }: BriefBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondaryButton/20 text-purple-400 dark:text-purple-300 text-[10px] font-black uppercase tracking-widest border border-foreground/6">
      <Sparkles className="w-3 h-3" />
      {label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BRIEF LOGO BLOCK  — logo image + campaign title
───────────────────────────────────────────── */
interface BriefLogoBlockProps {
  logoUrl?: string | null;
  title?: string | null;
  /** small label above the title, defaults to "Campaign Title" */
  label?: string;
}

export function BriefLogoBlock({ logoUrl, title, label = 'Campaign Title' }: BriefLogoBlockProps) {
  if (!logoUrl && !title) return null;
  return (
    <div className="flex items-center gap-4">
      {logoUrl && (
        <div className="w-14 h-14 relative rounded-xl overflow-hidden shrink-0 border border-black/8 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm p-1">
          <Image src={logoUrl} alt="Campaign Logo" fill className="object-contain" priority />
        </div>
      )}
      {title && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40 mb-0.5">
            {label}
          </p>
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   BRIEF ACTION BUTTONS
   Edit/Save + optional Cancel + right-side slot
───────────────────────────────────────────── */
interface BriefActionsProps {
  editable: boolean;
  isSaving?: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  /** extra buttons shown to the right (e.g. Approve, Export PDF) */
  extraActions?: React.ReactNode;
}

export function BriefActions({
  editable,
  isSaving,
  onEdit,
  onSave,
  onCancel,
  extraActions,
}: BriefActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
      {/* Edit / Save */}
      <button
        onClick={editable ? onSave : onEdit}
        disabled={isSaving}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all
          hover:scale-[1.03] active:scale-95 disabled:opacity-50
          shadow-lg shadow-primaryButton/20 cursor-pointer
          bg-primaryButton hover:bg-primaryHover"
      >
        {editable ? (
          isSaving ? (
            <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
          ) : (
            <><Save className="w-3.5 h-3.5" />Save</>
          )
        ) : (
          <><Pencil className="w-3.5 h-3.5" />Edit</>
        )}
      </button>

      {/* Cancel — only while editing */}
      {editable && (
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-foreground transition-all
            border border-black/10 dark:border-white/10
            bg-white/50 dark:bg-white/5
            hover:bg-white/70 dark:hover:bg-white/10
            backdrop-blur-sm"
        >
          <X className="w-3.5 h-3.5" /> Cancel
        </button>
      )}

      {/* Caller-supplied extras (Approve, Export PDF, etc.) */}
      {!editable && extraActions}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCT IMAGES SECTION
───────────────────────────────────────────── */
interface ProductImagesSectionProps {
  imageUrls: string[];
  colSpan?: boolean;
}

export function ProductImagesSection({ imageUrls, colSpan }: ProductImagesSectionProps) {
  if (!imageUrls.length) return null;
  return (
    <GlassSectionCard
      icon={<ImageIcon className="w-4 h-4" />}
      title="Campaign Images"
      accentColor="purple"
      colSpan={colSpan}
    >
      <div className="flex flex-wrap gap-4 mt-3">
        {imageUrls.map((img, index) => (
          <div
            key={index}
            className="relative w-28 h-28 rounded-xl overflow-hidden border border-black/8 dark:border-white/10"
          >
            <Image src={img} alt={`product-${index}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </GlassSectionCard>
  );
}

/* ─────────────────────────────────────────────
   REFERENCE LINKS SECTION (read-only)
───────────────────────────────────────────── */
interface ReferenceLinksSectionProps {
  links: string[];
  colSpan?: boolean;
}

export function ReferenceLinksSection({ links, colSpan }: ReferenceLinksSectionProps) {
  if (!links.length) return null;
  return (
    <GlassSectionCard
      icon={<Link2 className="w-4 h-4" />}
      title="Reference Links"
      accentColor="pink"
      colSpan={colSpan}
    >
      <div className="flex flex-col gap-2 mt-3">
        {links.map((link, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-primaryButton hover:underline"
          >
            <Link2 className="w-3.5 h-3.5 shrink-0" />
            {link}
          </a>
        ))}
      </div>
    </GlassSectionCard>
  );
}

/* ─────────────────────────────────────────────
   EDITABLE LINKS SECTION (full edit mode)
───────────────────────────────────────────── */
interface EditableLinksSectionProps {
  links: string[];
  editable: boolean;
  newLink: string;
  onNewLinkChange: (v: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onEdit: (index: number, value: string) => void;
  colSpan?: boolean;
}

export function EditableLinksSection({
  links,
  editable,
  newLink,
  onNewLinkChange,
  onAdd,
  onRemove,
  onEdit,
  colSpan,
}: EditableLinksSectionProps) {
  return (
    <GlassSectionCard
      icon={<Link2 className="w-4 h-4" />}
      title="Reference Links"
      accentColor="pink"
      subtitle={
        <>
          Click <span className="text-primaryButton not-italic font-semibold">Edit</span> to add Reference Links for this campaign.
        </>
      }
      colSpan={colSpan}
    >
      <div className="space-y-2.5">
        {links.map((link, i) => (
          <div key={i} className="flex gap-2.5 items-center">
            <div className="flex-1 flex items-center gap-3 bg-black/5 dark:bg-black/40 border border-foreground/8 rounded-xl px-4 py-2.5 focus-within:border-primaryButton/40 transition-colors">
              <Link2 className="w-3.5 h-3.5 text-foreground/25 shrink-0" />
              <input
                type="text"
                value={link}
                disabled={!editable}
                onChange={(e) => onEdit(i, e.target.value)}
                className="bg-transparent border-none text-sm text-foreground placeholder:text-foreground/25 focus:ring-0 focus:outline-none w-full disabled:opacity-60"
                placeholder="https://…"
              />
            </div>
            {editable && (
              <button
                onClick={() => onRemove(i)}
                className="w-8 h-8 rounded-lg bg-deleteButton/10 border border-deleteButton/20 flex items-center justify-center text-delete-text hover:bg-deleteButton/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}

        {editable && (
          <div className="flex gap-2.5 pt-1">
            <div className="flex-1 flex items-center gap-3 bg-black/5 dark:bg-black/40 border border-foreground/8 rounded-xl px-4 py-2.5 focus-within:border-primaryButton/40 transition-colors">
              <Link2 className="w-3.5 h-3.5 text-foreground/25 shrink-0" />
              <input
                type="text"
                value={newLink}
                onChange={(e) => onNewLinkChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onAdd()}
                className="bg-transparent border-none text-sm text-foreground placeholder:text-foreground/25 focus:ring-0 focus:outline-none w-full"
                placeholder="Paste a link and press Add or Enter…"
              />
            </div>
            <button
              onClick={onAdd}
              className="px-4 py-2 bg-primaryButton/10 border border-primaryButton/20 text-primarytext text-sm font-bold rounded-xl hover:bg-primaryButton/20 transition-colors"
            >
              Add
            </button>
          </div>
        )}

        {!links.length && !editable && (
          <p className="text-sm text-foreground/25 italic">No reference links added yet.</p>
        )}
      </div>
    </GlassSectionCard>
  );
}