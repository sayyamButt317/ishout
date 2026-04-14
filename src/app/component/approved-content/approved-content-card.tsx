'use client';

import { ExternalLink, Video } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CustomButton from '@/src/app/component/button';
import type { ApprovedContentItem } from '@/src/types/Compnay/approved-content-type';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

function isApproved(value: string | undefined) {
  return (value ?? '').toLowerCase() === 'approved';
}

function displayOrDash(value: string | undefined) {
  const t = value?.trim();
  return t ? t : '—';
}

function formatHashtags(tags: string[] | undefined) {
  if (!tags?.length) return '—';
  return tags.join(', ');
}

export default function ApprovedContentCard({ item }: { item: ApprovedContentItem }) {
  const adminOk = isApproved(item.video_approve_admin);
  const brandOk = isApproved(item.video_approve_brand);

  return (
    <Card className="group relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0f0f10] text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="relative p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-white/80">
            <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Video className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Approved content
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="relative aspect-video">
            <video
              src={item.video_url}
              className="size-full object-contain"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[12px] font-bold text-white/70">iShout</p>
            <p
              className={`mt-1 text-[11px] font-bold ${
                adminOk ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {adminOk ? 'Approved' : item.video_approve_admin || 'Pending'}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center">
            <p className="text-[12px] font-bold text-white/70">Brand</p>
            <p
              className={`mt-1 text-[11px] font-bold ${
                brandOk ? 'text-emerald-300' : 'text-red-300'
              }`}
            >
              {brandOk ? 'Approved' : item.video_approve_brand || 'Pending'}
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/4 p-3 text-[11px] text-white/55">
          <p>
            <span className="font-semibold text-white/70">Updated</span>{' '}
            {formatDate(item.updated_at)}
          </p>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/4 p-3 text-[11px] text-white/60">
          <div className="grid gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/45">
                Hashtags
              </p>
              <p className="mt-0.5 break-words text-white/80">
                {formatHashtags(item.hashtags)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CustomButton
            className="h-10 w-full rounded-full border border-white/40 bg-transparent text-white/90 hover:bg-white/6 font-normal text-sm"
            onClick={() => window.open(item.video_url, '_blank', 'noopener,noreferrer')}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <ExternalLink className="size-4" />
              Open video
            </span>
          </CustomButton>
        </div>
      </div>
    </Card>
  );
}
