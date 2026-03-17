'use client';
import { useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';
import { Search, Play, Maximize2, TrendingUp, Zap } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const TABS = [
  { id: 'fashion', label: 'Fashion & Beauty' },
  { id: 'tech', label: 'Tech & Gadgets' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'realestate', label: 'Real Estate' },
];

const TEMPLATES = [
  {
    id: '1',
    title: 'Cinematic Outfit Swap',
    tags: ['Fast-paced', 'High Energy'],
    usedBy: '1.2k brands',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wKmPFMy3t_kZdL8hj2WsmxRshgLw-HpI6Dt2hHJ5K4hK4cWCLeHpXh2nLN4zTUi0QIdVifTkDDv6rpMobxf-GPXeLWD8YzTQiVTiyyMc3t9Mkn-uEhLtcZIA4fayKuFXAE7tNcO0-ZqiTiya9ulswIDopKShz5_8FsKtsoIUeLChl7wWCTLrTEi-L8VVoDId5XD0phQWTAja1egQEcYnir0nhR8pj9TdxR8vekzSQNIRFA2BMqOnVtaLhRvfq5irgPLV6E6s53M',
    badge: { label: 'Trending', icon: TrendingUp },
  },
  {
    id: '2',
    title: 'Minimalist Skincare Ritual',
    tags: ['Minimalist', 'Voiceover-ready'],
    usedBy: '840 brands',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOKyGG_sA2P2umHmkcjC3s-cjRLFRUT0va4K0qc7-nM2TlSzxySpYr6DtHGRrS5-Oogmvvex7Z4iOALWSYbhJl0H58gk2r4Xt1DQ2Aq5FLumwVNw0oO8rnbf-1uGJy_VUQG7CURflu69gThXGKQfvG8UIRQgY_Jm62bkttlwHiYIaAR-NVykoGa1OStFVE0t42bEvpjj8SI7oQS9x29Ayl5ievH6veWVwL5KYbgbfyGwnxKq4IqZxfLfYGt7dpy9y4_ePu5f_uuuw',
  },
  {
    id: '3',
    title: 'Studio BTS Reveal',
    tags: ['Raw & Authentic', 'Behind the Scenes'],
    usedBy: '420 brands',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxP9dVe5PM23-TZ1tlQvq5Vj7L29SPD9ifmI-3IpFYP5PoI-ApFhoHoF6Yphg_prO6xi-42XjxcT0StEsLeULGdoQBMFKS6wGBjvYcTPHVvm_mISkcdtSCns-84rofFgr5Eh-i5D3Ilyu9jP5cjN80rx-n3wzHFNjChqaxxme_72opchXbfo8JCgcszUCFihWaZz06BaVG6vlkKKziIMeNBjxzekUUtnHmRLUYrVVwfjCkNdMT1-eAXx0RIDfw4k9K6PyyJ_TESrg',
    badge: { label: 'New Style', icon: Zap },
  },
  {
    id: '4',
    title: 'Macro Texture Showcase',
    tags: ['Macro Shots', 'Sensory (ASMR)'],
    usedBy: '2.1k brands',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCd5lj1gEOO0AtMMQTmsPSB4bt3kfiK9rHjQWyVYJYnqA3BcLfB8UdPRjNc4FqnQ0GDQQl5N2NkIFzEngVEwf5AVPKPUl15LJsf0HJwvMumXV7clsg-HPzn0rXUlqLuS2F5GtIk0bn7vZ-q7J0zHWhSDIn1ve9tnRAd0XP4lBLJaUtTtGJ9u6IguNknLa5XxWuBJNzSPyjGRK8w2J2BVXv-SQR4hAcLFYhhqPD-qF5SoqGF2BsbxkbSNLVDo_ZxXpb0i880kfCPdLc',
  },
  {
    id: '5',
    title: 'Streetwear Drop Reveal',
    tags: ['Urban', '3D Reveal'],
    usedBy: '610 brands',
    thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6wKmPFMy3t_kZdL8hj2WsmxRshgLw-HpI6Dt2hHJ5K4hK4cWCLeHpXh2nLN4zTUi0QIdVifTkDDv6rpMobxf-GPXeLWD8YzTQiVTiyyMc3t9Mkn-uEhLtcZIA4fayKuFXAE7tNcO0-ZqiTiya9ulswIDopKShz5_8FsKtsoIUeLChl7wWCTLrTEi-L8VVoDId5XD0phQWTAja1egQEcYnir0nhR8pj9TdxR8vekzSQNIRFA2BMqOnVtaLhRvfq5irgPLV6E6s53M',
  },
];

export default function VideoStudioPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('fashion');
  const [platform, setPlatform] = useState('all');
  const [sort, setSort] = useState('popularity');
  const router = useRouter();


  return (
    <div className="font-sans">
      <PageHeader
        title="Video Template Library"
        description="Browse AI-optimized video templates curated for your industry"
        icon={<Play className="size-5" />}
        actions={
          <div className="relative w-full max-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
            />
          </div>
        }
      />

      {/* Hero */}
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold leading-tight text-white tracking-tight md:text-4xl">
          Industry-Specific Video Templates
        </h1>
        <p className="max-w-3xl text-base text-white/60">
          Browse high-fidelity, AI-optimized templates curated for your industry. Each layout is
          tested for high engagement across social platforms.
        </p>
      </div>

      {/* Tabs & Filters */}
      <div className="mb-10 flex flex-col gap-6 border-b border-white/10 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4 overflow-x-auto pb-4 md:gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 border-b-2 pb-4 text-sm font-bold transition-colors ${
                activeTab === tab.id
                  ? 'border-[var(--color-primaryButton)] text-[var(--color-primaryButton)]'
                  : 'border-transparent text-white/50 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4 pb-4">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-xs text-white/50">Platform:</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="border-none bg-transparent text-xs font-bold text-white focus:ring-0"
            >
              <option value="all">All Platforms</option>
              <option value="tiktok">TikTok</option>
              <option value="reels">Reels</option>
              <option value="youtube">YouTube</option>
            </select>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
            <span className="text-xs text-white/50">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border-none bg-transparent text-xs font-bold text-white focus:ring-0"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest</option>
              <option value="most-used">Most Used</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section header */}
      <div className="mb-8 flex items-center gap-3">
        <h3 className="text-xl font-bold text-white">Trending in Fashion</h3>
        <span className="rounded bg-[var(--color-primaryButton)]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-primaryButton)]">
          24 New Templates
        </span>
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {TEMPLATES.map((tpl) => (
          <div
            key={tpl.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur transition-all hover:border-white/20"
          >
            <div className="relative aspect-[9/16] shrink-0 overflow-hidden bg-slate-900">
              <Image
                src={tpl.thumb}
                alt={tpl.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 1536px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              {tpl.badge && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-[var(--color-primaryButton)]/30 bg-[var(--color-primaryButton)]/20 px-2 py-1 backdrop-blur-md">
                  <tpl.badge.icon className="size-3 text-[var(--color-primaryButton)]" />
                  <span className="text-[10px] font-bold uppercase text-[var(--color-primaryButton)]">
                    {tpl.badge.label}
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                <Play className="size-4 text-white" fill="currentColor" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-3 flex flex-wrap gap-1">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/5 bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="mb-1 font-bold text-sm text-white">{tpl.title}</h4>
                <p className="text-[11px] text-white/50">Used by {tpl.usedBy}</p>
              </div>
            </div>
            <div className="mt-auto flex gap-2 p-4">
              <button
               onClick={() => router.push('/client/video-studio/style')}
               className="flex-1 rounded-lg bg-[var(--color-primaryButton)] py-2.5 text-xs font-bold text-white transition-colors hover:opacity-90">
                Use Template
              </button>
              <button className="flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-white transition-colors hover:bg-white/10">
                <Maximize2 className="size-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
