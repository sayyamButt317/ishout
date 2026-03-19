import React, { useState } from 'react'
import Image from 'next/image'
import { Check, Smartphone, Monitor, Music2, RefreshCw, Sparkles } from 'lucide-react'
import { SiInstagram, SiTiktok, SiYoutube } from 'react-icons/si';

const VideoStyle = () => {

    const [selectedStyle, setSelectedStyle] = useState('cinematic');
    const [ratio, setRatio] = useState<'9:16' | '16:9'>('9:16');
    const [audioSource, setAudioSource] = useState<'ai' | 'library'>('ai');
    const [prompt, setPrompt] = useState('');

    
    const VIDEO_STYLES = [
        { id: 'cinematic', label: 'Cinematic', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaHEyFugjbe7Xy2TLGN7ALzFnAEKibzOi9BOm6PrEGgLTYTbgrkQeom6SZvJFLXfVOzO6tQlqGtdW6YRIKl7eb13ocINjV7sGfIP9HsbrIO5xNVp8Tj99kurlGYHJts5oZ8_uFDzBbztoNnI-rgKuR53zFaEnLRyzwiY__185MAM_ZQ1Ma40IFjMJaxdX6bO06Cn3tlnxx12Jrx3XYI3IfIDLreMsZqmKZ4cL_9GMq7gAtUK0Yh--F6zPzU_zHof84LLuWUOhUY4M', selected: true },
        { id: 'hype', label: 'Hype', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBltPdCalZIR9NZoXHUKqdZYpMZvOfww0ZLjmuEYfq6BjeVTTyY8Pm3KqDpYVtmRKtA45-ux7sZA_4Q4h-7V6x4MaTgQrZ4Wl_lA15pKxfvMQmbAPCduNrJHBviVIhT0aWTu2vNSbZvnYs-DkzZm6zTn9z-P9TlqPPxccq8BcGUQPu18q7-SMCc5x9HZVBWdwaLnDhCY-hEvQGamEa0xEw6a-RMoAZxLVZ-EtHYoni27h1dT1WRf9DYOWeAVFf6-l9xdJNE3XUfUPo' },
        { id: 'aesthetic', label: 'Aesthetic', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHFAVfYlRkKXUTjWvFTzd-yiIkqjxJXvR6_SgQu5RhUsJHpgS2HyzrrUwNR9F97hUuNaHc73bTW3DFl_Mal12x0Qkiuo38vP2ntQQLSc8Co_VX25rLXYFSa06tNBjYPLAzAyzh5Q_nvPEw7QV7ngOljTPBscZGWlbACXq2J7-n0Ww3RdV0689ikFhyx6nRLa9z2tjI0HwsWuYcZoEXwX93JPgKVj5QRwLrePXgH8y0NjHz4BOD6OgrDGlk68fhJze4BVcOLPfAVxg' },
        { id: 'minimal', label: 'Minimal', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcF7q2m8zU39rLDqFfodXxDbcouNTH5cTws6u6g6Y6WjcV3WrVGKKiPh3pGPHpLK9ryzgX28DMYtWbB2z9qRCqz2pTWpy1rdqGmrND8My8zwxl94m7QcgDQjUw--_OMifp-7w7164IxBdRLIMbLHjaQQJPotq0P_zyMOyGEB6OeedLHDvvrHf_xw1-54OIpeaDlHAwP7aY_3LG3idfsVlX_zzQ_mw-lEkqVxFc6-c75yhVA3Lohk_p1rGzWx7smCqdJ6GuGEC8jBI' },
      ];
  return (
    <section className="flex-1 overflow-y-auto p-8">
    <div className="mx-auto max-w-3xl space-y-10">
      {/* 1. Video Style */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[var(--color-primaryButton)]/20 text-sm font-bold text-[var(--color-primaryButton)]">
            1
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Select Video Style
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {VIDEO_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className="flex flex-col gap-3"
            >
              <div
                className={`relative w-full overflow-hidden rounded-xl border-2 transition-all ${
                  selectedStyle === style.id
                    ? 'border-[var(--color-primaryButton)] shadow-[0_0_20px_rgba(255,78,126,0.3)]'
                    : 'border-white/10 hover:border-[var(--color-primaryButton)]/50'
                }`}
              >
                <div className="aspect-[4/5] w-full">
                  <Image
                    src={style.thumb}
                    alt={style.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                {selectedStyle === style.id && (
                  <div className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-[var(--color-primaryButton)] text-white">
                    <Check className="size-3" />
                  </div>
                )}
              </div>
              <span
                className={`text-center text-sm font-medium ${
                  selectedStyle === style.id
                    ? 'font-bold text-[var(--color-primaryButton)]'
                    : 'text-white/50'
                }`}
              >
                {style.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Ratio */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
        <div className="mb-6 flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[var(--color-primaryButton)]/20 text-sm font-bold text-[var(--color-primaryButton)]">
              2
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Aspect Ratio
            </h3>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setRatio('9:16')}
              className={`flex flex-1 flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                ratio === '9:16'
                  ? 'border-[var(--color-primaryButton)] bg-[var(--color-primaryButton)]/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
                <SiTiktok className={`size-8 ${ratio === '9:16' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'}`} />
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  ratio === '9:16' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'
                }`}
              >
                TikTok (9:16)
              </span>
            </button>
            <button
              onClick={() => setRatio('16:9')}
              className={`flex flex-1 flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                ratio === '16:9'
                  ? 'border-[var(--color-primaryButton)] bg-[var(--color-primaryButton)]/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
                <SiYoutube className={`size-8 ${ratio === '16:9' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'}`} />
              <span
                className={`text-xs font-bold uppercase tracking-wider ${
                  ratio === '16:9' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'
                }`}
              >
                YouTube (16:9)
              </span>
            </button>
            <button
              onClick={() => setRatio('9:16')}
              className={`flex flex-1 flex-col items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                ratio === '9:16'
                  ? 'border-[var(--color-primaryButton)] bg-[var(--color-primaryButton)]/5'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
           <SiInstagram className={`size-8 ${ratio === '9:16' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'}`} />
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                ratio === '9:16' ? 'text-[var(--color-primaryButton)]' : 'text-white/40'
              }`}
            >
              Instagram (9:16)
            </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Audio */}
      <div>
          <div className="mb-6 flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[var(--color-primaryButton)]/20 text-sm font-bold text-[var(--color-primaryButton)]">
              3
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Audio
            </h3>
          </div>
          <div className="mb-4 flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setAudioSource('ai')}
              className={`flex-1 rounded-md py-2 text-xs font-bold transition-colors ${
                audioSource === 'ai'
                  ? 'bg-[var(--color-primaryButton)] text-white shadow-sm'
                  : 'text-white/50'
              }`}
            >
              AI Generated
            </button>
            <button
              onClick={() => setAudioSource('library')}
              className={`flex-1 rounded-md py-2 text-xs font-bold transition-colors ${
                audioSource === 'library'
                  ? 'bg-[var(--color-primaryButton)] text-white shadow-sm'
                  : 'text-white/50'
              }`}
            >
              From Library
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Music2 className="size-5 text-[var(--color-primaryButton)]" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white">Deep House Vibes</p>
              <p className="text-[10px] uppercase text-white/50">
                Energetic • Modern
              </p>
            </div>
            <RefreshCw className="size-4 text-white/40" />
          </div>
        </div>

      {/* 4. Script / Prompt */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[var(--color-primaryButton)]/20 text-sm font-bold text-[var(--color-primaryButton)]">
              4
            </span>
            <h3 className="text-xl font-bold tracking-tight text-white">
              Script / Prompt
            </h3>
          </div>
          <button className="flex items-center gap-1 text-xs font-bold text-[var(--color-primaryButton)]">
            <Sparkles className="size-3.5" />
            AI Enhance
          </button>
        </div>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the desired video flow... e.g., Start with a slow pan over the watch, then transition to a series of fast cuts showing the watch being worn in different city locations."
            className="min-h-[150px] w-full resize-none rounded-xl border-2 border-white/10 bg-white/5 p-5 pr-16 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
          />
          <span className="absolute bottom-4 right-4 font-mono text-[10px] text-white/40">
            {prompt.length} / 1000
          </span>
        </div>
      </div>
    </div>
  </section>
  )
}

export default VideoStyle