'use client';

import { useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';
import {
  Upload,
  Eye,
  Trash2,
  ImagePlus,
  Check,
  Smartphone,
  Monitor,
  Music2,
  RefreshCw,
  Sparkles,
  Settings,
  Maximize2,
  Video,
  Zap,
  History,
} from 'lucide-react';
import Image from 'next/image';
import CustomButton from '@/src/app/component/button';
import AssetPicker from '@/src/app/component/videoStudio/assets';
import VideoStyle from '@/src/app/component/videoStudio/videostyle';
import VideoPreview from '@/src/app/component/videoStudio/videopreview';


export default function VideoTemplateStyle() {
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [audioSource, setAudioSource] = useState<'ai' | 'library'>('ai');
  const [prompt, setPrompt] = useState('');

  return (
    <div className="flex flex-col font-sans">
      <div className="flex flex-1">
        <AssetPicker />
        <VideoStyle />
        <VideoPreview />
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
            Model: Creative-Gen-V2.5
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
            <span className="text-[10px] font-bold uppercase text-white/50">Credits:</span>
            <span className="text-[10px] font-bold text-[var(--color-primaryButton)]">128</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
