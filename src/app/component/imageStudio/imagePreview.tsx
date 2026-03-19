'use client';

import { ImageIcon, Maximize2, Settings, Zap } from 'lucide-react';

export default function ImagePreview() {

  return (
    <aside className="flex w-[450px] shrink-0 flex-col border-l border-white/10">
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div className="flex items-center gap-2">
          <span className="size-2 animate-pulse rounded-full bg-[var(--color-primaryButton)]" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Live Preview
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
            <Settings className="size-5" />
          </button>
          <button className="rounded-md p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white">
            <Maximize2 className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-black/20 p-8">
        <div className="relative w-full max-w-[280px] overflow-hidden rounded-3xl border-8 border-slate-800/80 bg-slate-900 shadow-2xl">
          <div className="aspect-square w-full">
            <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
              <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-[var(--color-primaryButton)]/10">
                <ImageIcon className="size-8 text-[var(--color-primaryButton)]" />
              </div>
              <h3 className="text-lg font-bold leading-tight text-white">
                Ready to generate
              </h3>
              <p className="px-4 text-xs text-white/50">
                Configure your assets and style to begin the AI image generation.
              </p>
              <div className="mt-6 w-full space-y-3 opacity-30">
                <div className="h-2 w-full rounded-full bg-slate-700" />
                <div className="h-2 w-3/4 rounded-full bg-slate-700" />
              </div>
            </div>
          </div>
          <div className="absolute top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-tighter text-white">
              Draft V1
            </span>
            <div className="h-2 w-px bg-white/20" />
            <span className="text-[10px] font-bold text-[var(--color-primaryButton)]">
              1:1
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4 border-t border-white/10 p-8">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-white/50">Estimated Generation</span>
          <span className="font-bold text-white">~15 seconds</span>
        </div>
        <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--color-primaryButton)] py-5 text-lg font-bold text-white shadow-[0_0_20px_rgba(255,78,126,0.3)] transition-opacity hover:opacity-90">
          <Zap className="size-5 transition-transform group-hover:rotate-12" />
          Generate Image
        </button>
        <p className="text-center text-[10px] font-medium uppercase tracking-widest text-white/40">
          Uses 1 Generation Credit
        </p>
      </div>
    </aside>
  );
}
