'use client';

import { History } from 'lucide-react';
import ImageAssetPicker from '@/src/app/component/imageStudio/assets';
import ImagePreview from '@/src/app/component/imageStudio/imagePreview';
import ImageStyle from '@/src/app/component/imageStudio/imageStyle';

export default function ImageGenerationStylePage() {
  return (
    <div className="flex flex-col font-sans">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <ImageAssetPicker />
        <ImageStyle />
        <ImagePreview />
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between border-t border-white/10 px-6 py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded border border-[var(--color-primaryButton)]/20 bg-[var(--color-primaryButton)]/10 px-2 py-1">
            <span className="size-1.5 rounded-full bg-[var(--color-primaryButton)]" />
            <span className="text-[10px] font-bold uppercase text-[var(--color-primaryButton)]">
              Engine Active
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase text-white/40">
            Model: Creative-Gen-I2.0
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <History className="size-4 text-white/40" />
            <span className="text-[10px] font-medium text-white/50">
              Auto-saved 2m ago
            </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold uppercase text-white/50">
              Credits:
            </span>
            <span className="text-[10px] font-bold text-[var(--color-primaryButton)]">
              128
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
