'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import {
  Award,
  BadgeCheck,
  Bell,
  Brain,
  ChevronDown,
  Search,
  Sparkles,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const MENA_OPTIONS = [
  'Saudi Arabia',
  'UAE',
  'Egypt',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Jordan',
  'Lebanon',
] as const;

const CATEGORY_OPTIONS = [
  'Fashion',
  'Beauty',
  'Skin Care',
  'Food',
  'Travel',
  'Lifestyle',
  'Technology',
  'Sports',
  'Music',
  'Gaming',
  'Education',
  'Health',
  'Finance',
  'Real Estate',
  'Automotive',
  'Pets',
  'Fitness',
  'Art',
  'Photography',
  'Movies',
  'Parenting',
  'Environment',
  'Politics',
  'Science',
  'History',
] as const;

const FOLLOWER_BUCKETS = [
  '10k - 50k',
  '50k - 100k',
  '100k - 500k',
  '500k - 1M',
  '1M+',
] as const;

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube'] as const;

type Tier = 'emerald' | 'gold' | 'silver';

type DiscoveryCard = {
  id: string;
  name: string;
  handle: string;
  image: string;
  imageAlt: string;
  tier: Tier;
  authScore: number;
  followers: string;
  engagement: string;
  tags: string[];
  platforms: string[];
};

const ALL_MOCK: DiscoveryCard[] = [
  {
    id: '1',
    name: 'Elara Vance',
    handle: '@elaravision',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCaNpKRE09JdX04P_d6p9H4F578Oy014umQhTPGlBVjs_w4VKLOloDEKnHDoLqqCDclcZk4aq-WVEdYR5wX-piaK7nmQsy28-chac5xJoaRXh1vbjTyzpY9DKSeBtnOMoaiETnlui62p-13ZQDjM3f6DY3wawVBVJfxQiL0Q3T8Iz6L66NAt-3kg6WfEGQ9xez_HKKX_R9Ta7jFrrHiZCgOJTyO6bpJkWNRNvtwx3NUDtJpyLmtIPB97wZG4_yV0VfGfZfJ8ZSd6g4',
    imageAlt: 'Fashion creator portrait with neon city lights.',
    tier: 'emerald',
    authScore: 98.2,
    followers: '1.2M',
    engagement: '4.8%',
    tags: ['Sustainable Fashion', 'Digital Art', 'Urban Minimal'],
    platforms: ['IG', 'TT'],
  },
  {
    id: '2',
    name: 'Julian Thorne',
    handle: '@thorne.tech',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDO-UZz1pn8z-dJT-gW9yyAx4foLL4NHAHeJ4IYEqxwscG3tri6wngkWYnfENc3_DvqlfCGIxXQM7wilOih2Gprl9YoRa-UDqkaW_gQRFb4R25o5La9Q4dkqe9MH-KWRC7zy0sgYbx6cxKiZqsi9F3DITawQ2Qz3arYA_l1upvvre_I4Tm5hAVTA5Hertl1TnVPTzKeupeSpSOBCyeXWmhUq44BJnjfAQxvTAM4vvWmhiZsNqHoBv2B3HU0qOxpFW0wSYO91Oofaeg',
    imageAlt: 'Tech creator in minimalist studio lighting.',
    tier: 'gold',
    authScore: 94.5,
    followers: '850K',
    engagement: '6.2%',
    tags: ['Clean Tech', 'AI Reviews', 'Futurism'],
    platforms: ['YT'],
  },
  {
    id: '3',
    name: 'Sasha Moon',
    handle: '@sashamoon.ai',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCChdIcTrPYCUJMNHhfmK62KxfB8T1Msbkx-OhTHEhqNrhR5AOt0cZmWL7jkojRirmh3_kQCQgbtSzU4sQ_Dltlt1Ma2jSznTHDCxYaASggD4PSaQSi7UWgdILJSBHWPiu2QnsYCh4zYb0GFyaadwVeY9hpw06l9LF669WEUDFvcXjQO2XxvXmbe8nLfPsnv6rvnQjZj0FJ3TlFz1Hx-PtfEZmzKkO4dsv0Kk6Sy-zaQ501HHJ4CRnivfhSg9N3Qs-i0dH6xC-07v8',
    imageAlt: 'Digital creator with colorful rim lighting.',
    tier: 'emerald',
    authScore: 99.1,
    followers: '2.4M',
    engagement: '3.1%',
    tags: ['Luxury Wellness', 'Travel Tech', 'AI Art'],
    platforms: ['IG'],
  },
  {
    id: '4',
    name: 'Mira K.',
    handle: '@mira_lifestudio',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIyUa_sYQR8yqf2CVhcVF4DEwkxnT4-GS-tZl_ar93jzThUWqESUVFqkB5TaoIsyuATNe6_1qTxDbE6jBG3lZxwmTUQpRZO0XN-sypVLFEXWTjBjlG03NBE5LMYr6zMNZVhwEl87X8lrqaA9i4EgXe4uA6Mh4pLraiNxaa7E2Q_m85GYJVm0z3LZL1nktVVajyddgBNIlWN44rCXCkGYUiokWW2WBPmIuqRnUDEx8ht2xDUTd3zegtVJM7don3qyhQuNhkNw6HO0o',
    imageAlt: 'Lifestyle influencer in bright studio.',
    tier: 'silver',
    authScore: 88.7,
    followers: '420K',
    engagement: '7.4%',
    tags: ['Eco Home', 'Slow Living', 'Mindfulness'],
    platforms: ['IG', 'TT'],
  },
  {
    id: '5',
    name: 'Noah Reyes',
    handle: '@noah.reyes',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    imageAlt: 'Portrait of a male creator outdoors.',
    tier: 'gold',
    authScore: 91.0,
    followers: '620K',
    engagement: '5.1%',
    tags: ['Streetwear', 'Sneakers', 'Culture'],
    platforms: ['IG', 'YT'],
  },
  {
    id: '6',
    name: 'Amina Farouk',
    handle: '@amina.creates',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    imageAlt: 'Portrait of a creator smiling.',
    tier: 'emerald',
    authScore: 96.4,
    followers: '3.1M',
    engagement: '2.9%',
    tags: ['Beauty', 'GRWM', 'Skincare'],
    platforms: ['IG', 'TT'],
  },
  {
    id: '7',
    name: 'Chris Vale',
    handle: '@vale.codes',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    imageAlt: 'Developer creator headshot.',
    tier: 'silver',
    authScore: 87.2,
    followers: '210K',
    engagement: '8.0%',
    tags: ['Dev Tools', 'Startups', 'Product'],
    platforms: ['YT', 'TT'],
  },
  {
    id: '8',
    name: 'Lina Park',
    handle: '@lina.eats',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    imageAlt: 'Food creator portrait.',
    tier: 'gold',
    authScore: 93.1,
    followers: '980K',
    engagement: '6.8%',
    tags: ['Food', 'Restaurants', 'Travel'],
    platforms: ['IG'],
  },
];

const SORT_OPTIONS = ['Authenticity Score', 'Followers', 'Engagement rate'] as const;

function parseFollowersLabel(s: string): number {
  const n = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
  if (s.includes('M')) return n * 1_000_000;
  if (s.includes('K')) return n * 1_000;
  return n;
}

function platformFilter(
  card: DiscoveryCard,
  platform: (typeof PLATFORMS)[number],
): boolean {
  const code = platform === 'Instagram' ? 'IG' : platform === 'TikTok' ? 'TT' : 'YT';
  return card.platforms.includes(code);
}

function followerRangeFilter(card: DiscoveryCard, selected: string[]): boolean {
  if (selected.length === 0) return true;
  const count = parseFollowersLabel(card.followers);
  let label: (typeof FOLLOWER_BUCKETS)[number] | null = null;
  if (count >= 1_000_000) label = '1M+';
  else if (count >= 500_000) label = '500k - 1M';
  else if (count >= 100_000) label = '100k - 500k';
  else if (count >= 50_000) label = '50k - 100k';
  else if (count >= 10_000) label = '10k - 50k';
  return label !== null && selected.includes(label);
}

function TierBadge({ tier }: { tier: Tier }) {
  const config: Record<
    Tier,
    { label: string; Icon: typeof BadgeCheck; iconClass: string }
  > = {
    emerald: { label: 'Emerald', Icon: BadgeCheck, iconClass: 'text-[#00F0FF]' },
    gold: { label: 'Gold', Icon: Star, iconClass: 'fill-[#00eefc] text-[#00eefc]' },
    silver: { label: 'Silver', Icon: Award, iconClass: 'text-[#ab888e]' },
  };
  const { label, Icon, iconClass } = config[tier];
  return (
    <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-[rgba(25,25,30,0.6)] px-3 py-1 backdrop-blur-md">
      <Icon className={cn('size-4', iconClass)} aria-hidden />
      <span className="text-[11px] font-bold uppercase tracking-wide text-white">{label}</span>
    </div>
  );
}

function InfluencerDiscoveryCard({
  card,
  onViewProfile,
}: {
  card: DiscoveryCard;
  onViewProfile: (card: DiscoveryCard) => void;
}) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[rgba(25,25,30,0.8)] backdrop-blur-xl transition-all hover:border-[#00F0FF]/50">
      <div className="relative h-48">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          className="object-cover grayscale-[40%] transition-all duration-500 group-hover:grayscale-0"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
        <TierBadge tier={card.tier} />
        <div className="absolute bottom-4 left-4 flex gap-2">
          {card.platforms.map((p) => (
            <span
              key={p}
              className="rounded border border-white/10 bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-white backdrop-blur-sm"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="flex grow flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg text-white">{card.name}</h3>
            <p className="text-sm font-bold text-[#FF2D78]">{card.handle}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold text-white">{card.authScore}</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#00F0FF]">
              Auth. Score
            </div>
          </div>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-white/8 bg-[#1b1b20] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#e4bdc3]">
              Followers
            </p>
            <p className="text-xl font-semibold text-white">{card.followers}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-[#1b1b20] p-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#e4bdc3]">
              Eng. Rate
            </p>
            <p className="text-xl font-semibold text-white">{card.engagement}</p>
          </div>
        </div>
        <div className="mb-8 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#00F0FF]/20 bg-[#00F0FF]/10 px-2 py-1 text-[11px] font-bold text-[#00F0FF]"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="mt-auto w-full rounded-xl border border-[#00F0FF] py-3 text-sm font-semibold uppercase tracking-widest text-[#00F0FF] transition-all hover:bg-[#00F0FF]/10 active:scale-[0.98]"
          onClick={() => onViewProfile(card)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default function InfluencerDiscoveryView() {
  const [brief, setBrief] = useState('');
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>('Instagram');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [followers, setFollowers] = useState<string[]>([]);
  const [quickSearch, setQuickSearch] = useState('');
  const [sortIdx, setSortIdx] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);

  const clearFilters = useCallback(() => {
    setPlatform('Instagram');
    setCountry('');
    setCategory('');
    setFollowers([]);
    setQuickSearch('');
  }, []);

  const toggleFollower = (bucket: string) => {
    setFollowers((prev) =>
      prev.includes(bucket) ? prev.filter((b) => b !== bucket) : [...prev, bucket],
    );
  };

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      toast.success('Curator list updated', {
        description: brief.trim()
          ? 'Your brief was applied to ranking signals (demo).'
          : 'Add a brief next time for tighter matching (demo).',
      });
      setVisibleCount((c) => Math.min(Math.max(c, 4), ALL_MOCK.length));
    } finally {
      setIsGenerating(false);
    }
  }, [brief]);

  const cycleSort = () => {
    setSortIdx((i) => (i + 1) % SORT_OPTIONS.length);
  };

  const filteredPipeline = useMemo(() => {
    const q = quickSearch.trim().toLowerCase();
    let list = ALL_MOCK.filter((c) => platformFilter(c, platform));
    list = list.filter((c) => followerRangeFilter(c, followers));
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    const label = SORT_OPTIONS[sortIdx];
    const copy = [...list];
    if (label === 'Followers') {
      copy.sort(
        (a, b) => parseFollowersLabel(b.followers) - parseFollowersLabel(a.followers),
      );
    } else if (label === 'Engagement rate') {
      copy.sort(
        (a, b) => parseFloat(b.engagement) - parseFloat(a.engagement),
      );
    } else {
      copy.sort((a, b) => b.authScore - a.authScore);
    }
    return copy;
  }, [platform, followers, quickSearch, sortIdx]);

  const filteredCards = useMemo(
    () => filteredPipeline.slice(0, visibleCount),
    [filteredPipeline, visibleCount],
  );

  const onKeyDownBrief = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleGenerate();
    }
  };

  return (
    <div className="flex min-h-0 flex-col text-[#e4e1e9] selection:bg-[#FF2D78] selection:text-white">
      {/* In-page top bar (mirrors HTML app bar; not fixed — dashboard already has chrome) */}
      <header className="sticky top-0 z-20 -mx-4 mb-6 flex flex-col gap-4 border-b border-white/8 bg-[#0e0e13]/90 px-4 py-4 backdrop-blur-md sm:-mx-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-6">
          <span className="font-extrabold uppercase tracking-tighter text-[#FF2D78]">
            iShout
          </span>
          <nav className="hidden items-center gap-6 md:flex">
            <span className="border-b-2 border-[#00F0FF] pb-2 text-sm font-bold text-[#00F0FF]">
              Discover
            </span>
            <Link
              href="/Admin/all-campaign"
              className="pb-2 text-sm font-medium text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            >
              Campaigns
            </Link>
            <Link
              href="/Admin/campaign-report"
              className="pb-2 text-sm font-medium text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            >
              Analytics
            </Link>
            <Link
              href="/Admin/content"
              className="pb-2 text-sm font-medium text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            >
              Creators
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden items-center rounded-full border border-white/8 bg-[#1b1b20] px-4 py-2 lg:flex">
            <Search className="mr-2 size-4 text-[#e4bdc3]" aria-hidden />
            <input
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-48 border-none bg-transparent text-sm text-[#e4e1e9] placeholder:text-[#e4bdc3]/40 focus:outline-none focus:ring-0"
              placeholder="Quick search..."
              type="search"
              aria-label="Quick search influencers"
            />
          </div>
          <button
            type="button"
            className="text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <button
            type="button"
            className="text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            aria-label="AI assistant"
          >
            <Sparkles className="size-5" />
          </button>
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#FF2D78] p-0.5">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&q=80"
              alt="Account"
              fill
              className="rounded-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-12 sm:px-6">
        <section className="relative mb-16 text-center">
          <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF2D78]/10 blur-[100px]" />
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF2D78]/30 bg-[#FF2D78]/5 px-4 py-1.5">
            <Sparkles
              className="size-[18px] text-[#FF2D78] opacity-90 animate-pulse"
              aria-hidden
            />
            <span className="text-xs font-medium uppercase tracking-widest text-[#e4e1e9]">
              AI-Powered Campaign Engine
            </span>
          </div>
          <h1 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl">
            Discover <span className="italic text-[#FF2D78]">Visionary</span> Creators
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base text-[#e4bdc3] sm:text-lg">
            Describe your campaign goals, target audience, and preferred aesthetic. Our AI
            will curate a list of influencers that match your brand DNA perfectly.
          </p>

          <div className="mx-auto max-w-4xl rounded-2xl border border-white/8 bg-[rgba(25,25,30,0.8)] p-1 shadow-2xl backdrop-blur-xl">
            <div className="rounded-[14px] border border-white/5 bg-[#0D0D12] p-6 text-left">
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                onKeyDown={onKeyDownBrief}
                className="h-24 w-full resize-none border-none bg-transparent text-sm text-[#e4e1e9] placeholder:text-[#e4bdc3]/40 focus:outline-none focus:ring-0 sm:text-base"
                placeholder="e.g., A summer launch for our sustainable activewear brand featuring gen-z yoga influencers in urban settings who care about ocean plastic and have high engagement rates..."
              />
              <div className="mt-2 flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-xs text-[#e4bdc3]">
                  Press <span className="font-bold text-[#e4e1e9]">↵ Enter</span> to generate
                  curator list
                </span>
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => void handleGenerate()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-[#FF2D78] to-[#B000FF] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] disabled:opacity-60"
                >
                  <Sparkles className="size-[18px]" aria-hidden />
                  {isGenerating ? 'Generating…' : 'Generate Brief'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 space-y-8 lg:w-72">
            <div className="rounded-2xl border border-white/8 bg-[rgba(25,25,30,0.8)] p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold uppercase text-[#00F0FF]"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-[#e4bdc3]">
                    Platform
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {PLATFORMS.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPlatform(p)}
                        className={cn(
                          'rounded-lg border px-3 py-1.5 text-xs font-bold transition-colors',
                          platform === p
                            ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]'
                            : 'border-white/8 text-[#e4bdc3] hover:border-[#00F0FF]/50',
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-[#e4bdc3]">
                    Country (MENA)
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border border-white/8 bg-[#1b1b20] px-4 py-2.5 text-sm text-[#e4e1e9] focus:border-[#00F0FF] focus:outline-none focus:ring-1 focus:ring-[#00F0FF]"
                  >
                    <option value="">Select Regions</option>
                    {MENA_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-[#e4bdc3]">
                    Campaign Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-lg border border-white/8 bg-[#1b1b20] px-4 py-2.5 text-sm text-[#e4e1e9] focus:border-[#00F0FF] focus:outline-none focus:ring-1 focus:ring-[#00F0FF]"
                  >
                    <option value="">Select Categories</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-[#e4bdc3]">
                    Follower Range
                  </label>
                  <div className="space-y-2">
                    {FOLLOWER_BUCKETS.map((bucket) => (
                      <label
                        key={bucket}
                        className="group flex cursor-pointer items-center gap-3"
                      >
                        <input
                          type="checkbox"
                          checked={followers.includes(bucket)}
                          onChange={() => toggleFollower(bucket)}
                          className="size-4 rounded border-white/8 bg-transparent text-[#FF2D78] focus:ring-[#FF2D78]"
                        />
                        <span className="text-sm text-[#e4bdc3] transition-colors group-hover:text-[#e4e1e9]">
                          {bucket}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#FF2D78]/20 to-[#00F0FF]/20 p-6">
              <div className="pointer-events-none absolute -bottom-4 -right-4 opacity-10">
                <Brain className="size-[120px] text-white" aria-hidden />
              </div>
              <h4 className="mb-2 text-lg font-semibold text-white">Campaign Tip</h4>
              <p className="text-sm leading-relaxed text-[#e4e1e9]/80">
                Creators with &quot;Emerald&quot; status currently see a 12% higher ROI in
                sustainable fashion niches this quarter.
              </p>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Top Recommended{' '}
                <span className="text-[#00F0FF]">({filteredPipeline.length})</span>
              </h2>
              <div className="flex items-center gap-2 text-sm text-[#e4bdc3]">
                <span>Sort by:</span>
                <button
                  type="button"
                  onClick={cycleSort}
                  className="flex items-center gap-1 font-bold text-[#e4e1e9]"
                >
                  {SORT_OPTIONS[sortIdx]}
                  <ChevronDown className="size-[18px]" aria-hidden />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredCards.map((card) => (
                <InfluencerDiscoveryCard
                  key={card.id}
                  card={card}
                  onViewProfile={(c) =>
                    toast.message('Profile', { description: `Opening ${c.handle} (demo).` })
                  }
                />
              ))}
            </div>

            {filteredCards.length === 0 && (
              <p className="mt-10 text-center text-sm text-[#e4bdc3]">
                No creators match your quick search. Try a different keyword.
              </p>
            )}

            {visibleCount < filteredPipeline.length && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((c) => Math.min(c + 4, filteredPipeline.length))
                  }
                  className="rounded-xl border border-white/8 bg-[#2a292f] px-8 py-4 text-sm font-semibold uppercase tracking-widest text-[#e4e1e9] transition-all hover:border-[#FF2D78]/50"
                >
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      <footer className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-t border-white/8 bg-[#0e0e13] px-4 py-6 sm:px-6 md:flex-row">
        <div className="text-center md:text-left">
          <span className="mr-4 text-sm font-bold uppercase tracking-tighter text-[#FF2D78]">
            iShout AI
          </span>
          <span className="text-xs text-[#e4bdc3]">
            © {new Date().getFullYear()} iShout AI Platforms. All rights reserved.
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            className="text-xs text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-xs text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-xs text-[#e4bdc3] transition-colors hover:text-[#00F0FF]"
            href="#"
          >
            API Docs
          </a>
        </div>
      </footer>
    </div>
  );
}
