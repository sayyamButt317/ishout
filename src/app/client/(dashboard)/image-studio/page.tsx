'use client';

import { useState } from 'react';
import PageHeader from '@/src/app/component/PageHeader';
import {
  Search,
  Zap,
  Grid3X3,
  Shirt,
  Smile,
  UtensilsCrossed,
  Monitor,
  Dumbbell,
  Plane,
  Filter,
  ArrowUpDown,
  Check,
  ChevronUp,
  ImageIcon,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const THEMES = [
  { id: 'all', label: 'All Themes', icon: Grid3X3, active: true },
  { id: 'fashion', label: 'Fashion', icon: Shirt },
  { id: 'beauty', label: 'Beauty', icon: Smile },
  { id: 'food', label: 'Food', icon: UtensilsCrossed },
  { id: 'tech', label: 'Tech', icon: Monitor },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'travel', label: 'Travel', icon: Plane },
];

const ART_STYLES = [
  { id: 'photorealistic', label: 'Photorealistic', selected: true },
  { id: '3d', label: '3D Render' },
  { id: 'digital', label: 'Digital Art' },
  { id: 'minimalist', label: 'Minimalist' },
];

const TEMPLATES = [
  { id: '1', title: 'Vibrant E-commerce Shoe', usedBy: '1.8k brands', hot: true, primary: true, thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARAWrCK9e3Wh8dsDlIdyI6BBeLqEu9YE9AZ19PpJEQKbMgQ30L9lldEKkdNjc6ZcjlHZsOYOB8Tya-I5iNMwoYBGNPNtpg4gnAyRwbcDLkWAoGRVIVBymFfNVdntt28shDHSHFCMboHcJjfeK-fjsPA-jFOvCIsStbk3scbKwMN5fIwnzMUHRZLlmZ1ZaifxsI8JmvOraVUNacOEreZGusNVsgEJ1gUPw7gfgkm3R_-J4ZkZ7zT-s08jlikdKhZesiw3a9kF8BnLc', avatars: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAw-rBKZTIZwNZ9wZKSOQBMcpI3HTk-DIkyF-V_107VKy_jYuiRPsYj7dHEl4g1PT_bhqf2HOruQ55rTCv9oQ_exiAq28R0ZkhLYL_Ht0SjZJ80WavYK2i8QuviRhNOWlVrDs8mL_oimJ_jUqPeCVCRdrqTWwgL94ly9HQEzLDH04MfIqRPgfzlxpkvjXizPtYq5Xk_srkb80Cil1q4wko0-JC-750B4essk7-u1Nqo3gdO6dogil2dVy7kK6VtuAUENF6BMzMhm4w'] },
  { id: '2', title: 'Luxury Beauty Splash', usedBy: '940 brands', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-cWpVLKh8DpDTJAWNE-AzRU9HMbFGkpT9vVa5qgVKEtRTbO9A34uzdAoUv6XRnkK_j6HmNPhMdtJd6zo_yxg92l5zfiFVPlaL6QKtA1F8hBNK9Mv3FUfDjs6tX8kxZf-sItVSRw3N2nntPydc6NlpBuqtzhKT0B1yqZ6Dlpk2OVJXv2Lcl9Zg3X6cqHSnWC8-QxbRkWlDkufci2OQdTAPLKX4e4-vVV2dWxhLFNNF-wnNYCNkH6njiwjbFI74pRYE8ogpdzAzXTk' },
  { id: '3', title: 'Cyberpunk Tech Setup', usedBy: '3.2k brands', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAvUU_fThIpBYFxn9AO336urSJsLdG6xL2fUgUY5iZzK10y8cnGwrRgqwjqO51pmbr9QSnpKlLnym0gK4FVcFqmCxAAOAsIFQ8fKIF7ZD8DjwyhL1hLh5npm9nZEjik1wiIkxFzzV7WXZS7qqBd4871-t-1bCzTA0V8eFnkGXw_8DwCsMzd6gyfnuXwQfYFG5u8uopvddjyNhtLgY6nNOM0PKbEM1OuxME-5VNxoHewM5mACggYT-pqEguDwOYpWUMQvsOTj8Qd_E' },
  { id: '4', title: 'Organic Food Editorial', usedBy: '1.2k brands', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0wqG_ims2s_HkEYo_TF9v_ejWwO-vUVLbLt80KkN3vNfd7fyVvQCYSiTUg_AXC2P_0jBmOBZ2NhBtVaV_gwnbnLYK8cCkPKbS1yUs9ZPveZj-WvNmXCPBDPnDj4SFlNpRRUqw7CuT6EArDQ1HsOKsSiQkVsAfR1NvDP4i9xQq-wOkC6CwAH2U59VaqtyWhCpoPIL8_wzb3RsGzkv9d_Rr0ihUM7RnPZjL8AVgjWsdfySVXzd58bvZuL1wBz6aXWavQzuBePhlt_U' },
  { id: '5', title: 'Elite Fitness Gear', usedBy: '500+ brands', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4eweTuqk22tbtddTC-OYVRdjI9VhFEW1-c27MARfFdnhGOc_TvOKoURSAmJOsVf99b75islvqUFkTfLlUk1tJn4-3hQw8FT8sO6mOE89fsKoznF7QONfnqwhH2Xz35SAvIiMMVKxvXy51YC71WNUzmqWbm3byjOPBEgMD0M8BZHXpaGQ-D-7Bp9cgw8ovFBrLBtBLYL2NZN5Y16pGZhJN4VTjFmzXDRwZDEKbgWv3pv7Dj1SLM_7SeuZrDQLg0p8vr4fjXcGfqfY' },
  { id: '6', title: 'Tropical Paradise Escape', usedBy: '2.1k brands', thumb: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv_9L_5oQb_WRClqQsEhWZ1RJVZgrbGB-4n65nnMPgxbFua6y4xBzyUxuH0SSJfa822ndk5hLmSuRCIMvL3XHtY3lMV0CXy5APlSdjfn59MSEYH2hZPFjBUe6klIQN0Gyv5pQuevBNHKuUM5LglgIN6emPDtt-I-sye1iUtktzmum7ZlwBV1OHNW_XxP7NbnEc7xvTIYow9atP4Gt75bvy8Gaxj1lz_yBq9JeuoEA-6US_5x7UCpG3YNiDZPHcxB8G0FCWzVidEkY' },
];

const RECENT = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBYki5ZGA0YzHpTBF75KoH_I_vqgf0CPUlhVwiAxcMeJJL-RZAtIypWnzMmISzJfWZH_I2YD87K3r0qhNGzQsp9unu7k9HvvCculp0URD9jy6btY-qSLVEeieokdzz1V12vjhwF1CR5PcczQkjtgoKW1h9LF2BWHpzwIU3tFumJOyF81NCsu_yYWAXpbqwn72DfXDgL4M5yjYotKLeBNsBs6PUAlEgpmKrcfa0J-Aj1AkqdCoSOlNp0BoD0lZHHm0YC7Vh2uRnV-cs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAkhH6p40o5qEQ3Fx8C0uUoRFSCn4GSWd8aWOt8ZbqxIyIc_gaJGG7FAXk9SMJeg8uCGAg3wsB0oMWO_7sMxb5qgI2Ky5bEguluYRF0OgqCxdcK1OT_seWonGochjOQMS-BSPJKjlqD2iE_L18doJxbUT8nZFj678H--aPw6vYDxHxY_y3NS9K-5bmtdP7ba4FN2s58jdktBqcH8vzJuggbU6lNv8ZtufJ0RGRz9wqAjq-9rwGFQhFIIoKUCTcSZhOzJ4_tbueNLcM',
];

export default function ImageStudioPage() {
  const [search, setSearch] = useState('');
  const [activeTheme, setActiveTheme] = useState('all');
  const [ratio, setRatio] = useState('1:1');
  const [artStyle, setArtStyle] = useState('photorealistic');
  const [carouselOpen, setCarouselOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="font-sans">
      <PageHeader
        title="Image Studio"
        description="AI-powered image generation with industry templates"
        icon={<ImageIcon className="size-5" />}
        actions={
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
            <input
              type="text"
              placeholder="Describe the image you want to create..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
            />
          </div>
        }
      />

      {/* Theme filters */}
      <section className="mb-10 flex gap-3 overflow-x-auto pb-2">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTheme(t.id)}
            className={`flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              activeTheme === t.id || (t.active && activeTheme === 'all')
                ? 'bg-[var(--color-primaryButton)] text-white shadow-lg'
                : 'border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
            }`}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <aside className="space-y-8">
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/60">
              Style & Settings
            </h3>
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 space-y-6">
              <div>
                <p className="mb-3 text-xs font-medium text-white/50">ASPECT RATIO</p>
                <div className="grid grid-cols-3 gap-2">
                  {['1:1', '16:9', '9:16'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRatio(r)}
                      className={`flex aspect-square flex-col items-center justify-center rounded-lg border transition-colors ${
                        ratio === r
                          ? 'border-[var(--color-primaryButton)] bg-[var(--color-primaryButton)]/10 text-[var(--color-primaryButton)]'
                          : 'border-white/10 text-white/40 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`mb-1 border-2 ${
                          ratio === r ? 'border-[var(--color-primaryButton)]' : 'border-white/40'
                        } ${r === '1:1' ? 'size-4' : r === '16:9' ? 'h-4 w-6' : 'h-5 w-3'}`}
                      />
                      <span className="text-[10px] font-bold">{r}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium text-white/50">ARTISTIC STYLE</p>
                <div className="space-y-2">
                  {ART_STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setArtStyle(s.id)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors ${
                        artStyle === s.id
                          ? 'border-[var(--color-primaryButton)]/30 bg-[var(--color-primaryButton)]/20 text-white'
                          : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                      }`}
                    >
                      {s.label}
                      {artStyle === s.id && (
                        <Check className="size-4 text-[var(--color-primaryButton)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
                Recent
              </h3>
              <button className="text-[10px] font-bold text-[var(--color-primaryButton)] hover:underline">
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {RECENT.map((src, i) => (
                <div
                  key={i}
                  className="group aspect-square cursor-pointer overflow-hidden rounded-lg bg-white/5"
                >
                  {/* <Image
                    src={src}
                    alt={`Recent ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="160px"
                  /> */}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Trending Templates</h2>
              <p className="text-sm text-white/50">Curated by top industry designers</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-lg bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                <Filter className="size-5" />
              </button>
              <button className="rounded-lg bg-white/5 p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white">
                <ArrowUpDown className="size-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-[var(--color-primaryButton)]/40"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={tpl.thumb}
                    alt={tpl.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  {tpl.hot && (
                    <div className="absolute top-4 right-4 rounded-lg border border-[var(--color-primaryButton)]/30 bg-[var(--color-primaryButton)]/20 px-2 py-1 backdrop-blur-md">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primaryButton)]">
                        Hot
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="mb-1 text-lg font-bold text-white">{tpl.title}</h4>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xs text-white/50">Used by {tpl.usedBy}</span>
                  </div>
                  <button
                    onClick={() => router.push(`/image-studio/style`)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all ${
                      tpl.primary
                        ? 'bg-[var(--color-primaryButton)] text-white hover:opacity-90'
                        : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                    }`}
                
                  >
                    <Zap className="size-4" />
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <button className="rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white/60 transition-all hover:bg-white/10 hover:text-white">
              Load More Templates
            </button>
          </div>
        </div>
      </div>

      {/* Live feed carousel */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black/80 py-4 px-6 backdrop-blur-md transition-transform duration-500 ${
          carouselOpen ? 'translate-y-0' : 'translate-y-full hover:translate-y-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto">
          <div className="flex min-w-[80px] flex-col">
            <span className="mb-1 text-[10px] font-bold uppercase text-[var(--color-primaryButton)]">
              Live Feed
            </span>
            <span className="text-[8px] text-white/40">Recent Creations</span>
          </div>
          <div className="flex gap-4">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDnD4Z7TMnwEvrlgEytjw0s1koXcIYOOPF0dhPKHZ0xcIeEclJoLIAZOlpthCUxxjf7RgMK7gc8JJpoD_MIRibFoAn_2COoNfqQfD4kx-kHBO0-QoOL4o4gx3tdOZlTOzHdfJaHwxTVU8fStPmSS6IIdViCzDYNod0wMXJbduB9aIUKynbIgNvzixVNH3wazBun5qKzZHVxg-58wqHyyev1SBw9ieyWdD-EgYqHfRXexQlUPs4Me1EhRY62WuhtplyGmeiugQDDjrU',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuD7vBRNV5g_zDjyOagiVx8FFKzGs-9TvJ5LC-f61vYxzLIwEJYU9Y6doOnRvyeYa6-aJTa7GF9BE_Jr-C5CqXE66G8gInFg2-3UBZ0oZNq4oB-tlgI4k40RaCsWHxWib1q5Yw8m5mTohtQfVJ5Q-ciPREdTXt5fej2B6Noj5WNnqERD4aK5Ub643T1cDVnJXFmA-IhC97y83ZszHJnivR1QkVwQspDdzIkhNuoDD9-ePxIy_8iSaVOp3HWqPRNjCVfAukHq2SZa1yY',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuAgGUCk2IBjns1PEGnYmXllFvIcQYND9LapCaAZL_nTK3SV1WHXdKgD7b3-cV_3iBCK4GhjOqPqwAFRBu7vPfp1U16Ep7gO-SbX7YEDbHeNWN6mevHlC9v8EiKoPzQgYkVk_pP1BOIQVQNHXAP8NC6sc_GcSU-dIXbcdz6KFF4mK9E4K87HZNvplu_s8pT3CbntYQ_AqvWAa1hRb2qQs2niTvwQpX5QXgskf6VOzzYbMhY1j04rk0hjfI9myvnSMkV9HElz6rpUDPM',
            ].map((src, i) => (
              <div key={i} className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-1 ring-[var(--color-primaryButton)]/20">
                <Image src={src} alt="Recent generation" fill className="object-cover" sizes="48px" />
              </div>
            ))}
          </div>
          <button
            onClick={() => setCarouselOpen(!carouselOpen)}
            className="ml-auto flex items-center gap-1 text-xs font-bold text-[var(--color-primaryButton)]"
          >
            {carouselOpen ? 'Collapse' : 'Expand'} Carousel
            <ChevronUp className={`size-4 transition-transform ${carouselOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
