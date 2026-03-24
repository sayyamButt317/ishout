'use client';

import { useParams } from 'next/navigation';
import { CheckCircle2, Users } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';

export default function BrandApprovedCampaignIdPage() {
  const params = useParams<{ Id: string }>();
  const id = params?.Id;

  return (
    <div className="font-sans">
      <PageHeader
        title={id ? `Campaign #${id}` : 'Campaign'}
        description="View campaign details and approved influencer performance."
        icon={<CheckCircle2 className="size-5" />}
        actions={
          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Export Summary
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Users className="size-5 text-[var(--color-primaryButton)]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                Influencers
              </p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Avg Engagement
          </p>
          <p className="mt-2 text-2xl font-bold text-[var(--color-primaryButton)]">4.8%</p>
          <p className="mt-2 text-sm text-white/60">Based on last 14 days</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-white/40">
            Budget Used
          </p>
          <p className="mt-2 text-2xl font-bold text-white">$12,450</p>
          <p className="mt-2 text-sm text-white/60">Out of $25k allocated</p>
        </div>
      </div>

      <section className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/50">
          Approved Influencers
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Add your influencer list table here (name, platform, status, metrics).
        </p>
      </section>
      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-surface-container-lowest rounded-xl p-4 mb-10 flex flex-wrap gap-4 items-center shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
          <div className="flex-1 min-w-[280px] relative">
            <input className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm" placeholder="Search campaigns..." type="text" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filter
            </button>
            <button className="px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-sm">sort</span>
              Recent
            </button>
          </div>
        </div>
        <div className="editorial-grid">
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(25,28,30,0.06)] hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">Active</div>
                <div className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest rounded-full">24 days left</div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-surface-container-lowest">
                  <img alt="Instagram Logo" className="w-5 h-5 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbkakmcqYGC1M_i5B-2oB7dMuxG2GU_EQJBKiDm2zlShNFNmp_OLaEJ0FRgG_PG3qlBCFqtMbEuO__O9F5B685Zjbj1qqcVhGGA-3T8ErwuyiNheZqYSrxqL6XcVZ1wfKuB4JJ-pxmR2TaZp2ZWgtyf1W6VuKc2h2JW5PC8jZVKki5AKYB5TQIdp3d8nH8u1rvCLJEkpaFx1L5rBr4dxPLdDq6hTEY1jABIqO60t97O_Ajz5yGWnadcG7QtZy6oNwsgqAo9qd8m1o" />
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-surface-container-lowest">
                  <img alt="TikTok Logo" className="w-5 h-5 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbkakmcqYGC1M_i5B-2oB7dMuxG2GU_EQJBKiDm2zlShNFNmp_OLaEJ0FRgG_PG3qlBCFqtMbEuO__O9F5B685Zjbj1qqcVhGGA-3T8ErwuyiNheZqYSrxqL6XcVZ1wfKuB4JJ-pxmR2TaZp2ZWgtyf1W6VuKc2h2JW5PC8jZVKki5AKYB5TQIdp3d8nH8u1rvCLJEkpaFx1L5rBr4dxPLdDq6hTEY1jABIqO60t97O_Ajz5yGWnadcG7QtZy6oNwsgqAo9qd8m1o" />
                </div>
              </div>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2 leading-tight">Summer Glow Essentials</h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Ends Aug 12, 2024
            </div><div className="flex items-center gap-6 mb-6 pt-2 border-t border-outline-variant/10"><div className="flex flex-col"><span className="text-[10px] text-outline font-bold uppercase tracking-wider">Creators</span><span className="text-sm font-bold text-on-surface">12 Hired</span></div><div className="flex flex-col"><span className="text-[10px] text-outline font-bold uppercase tracking-wider">Engagement</span><span className="text-sm font-bold text-primary">4.8%</span></div></div>
            <div className="mt-auto space-y-4">
              <div className="bg-surface-container-low rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-outline tracking-wider uppercase">Budget Used</span>
                  <span className="text-sm font-bold text-on-surface">$12,450 / $25k</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-1/2 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mb-2"><button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" title="Settings"><span className="material-symbols-outlined text-[20px]">settings</span></button><button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" title="Analytics"><span className="material-symbols-outlined text-[20px]">monitoring</span></button><button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" title="Chat"><span className="material-symbols-outlined text-[20px]">chat_bubble</span></button></div><a className="w-full py-3 bg-primary text-on-primary rounded-md font-semibold text-sm flex justify-center items-center gap-2 transition-all duration-300 hover:bg-primary-container hover:text-on-primary-container group-hover:shadow-lg" href="{{DATA:SCREEN:SCREEN_63}}">
                View Approved Influencers
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </a>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col group transition-all duration-300 hover:shadow-[0_12px_40px_rgba(25,28,30,0.06)] hover:-translate-y-1 opacity-80">
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full">Completed</div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center border-2 border-surface-container-lowest">
                  <img alt="Instagram Logo" className="w-5 h-5 object-contain" data-alt="Instagram icon colorful logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG-wDdwr-qljM-1x4wosgtDy1l5GeXQYj1Q1aW-ch8TMS3apPk3oLk50HjUkP2A9qba57DPFHC9ZjUFIOUb86xo3pSaoFOad2jesQT1m7oJGj4ar2Jk9ZamoMpYstYTkmm2zCxrvt0hhRTHCUU8ELyUZlvsR192-OE5Bk6HwFuzaXVmy48DML-41Rbi1lW5p2JMsrIBhSDovLClEJOd4c6RUREZ60R1PGqx6yLB8uWzx-hl64A_6_hMjhnN7ILP-ytNF-R5iyCLHY" />
                </div>
              </div>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-surface mb-2 leading-tight">Winter Cozy Wear</h3>
            <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Ended Jan 15, 2024
            </div><div className="flex items-center gap-6 mb-6 pt-2 border-t border-outline-variant/10"><div className="flex flex-col">
              <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Creators</span>
              <span className="text-sm font-bold text-on-surface">15 Total</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-outline font-bold uppercase tracking-wider">Avg. Engagement</span>
              <span className="text-sm font-bold text-primary">6.1%</span>
            </div>
            </div>
            <div className="mt-auto space-y-4">
              <div className="bg-surface-container-low rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-outline tracking-wider uppercase">Final Budget</span>
                  <span className="text-sm font-bold text-on-surface">$15,000 / $15k</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full w-full rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mb-2">
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors opacity-60" 
                title="Settings">
                  <span className="material-symbols-outlined text-[20px]">settings</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" 
                title="Analytics">
                  <span className="material-symbols-outlined text-[20px]">monitoring</span>
                </button>
                <button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors opacity-60" 
                title="Chat">
                  <span className="material-symbols-outlined text-[20px]">chat_bubble</span></button></div><a className="w-full py-3 bg-surface-container-high text-on-surface-variant rounded-md font-semibold text-sm flex justify-center items-center gap-2 transition-all duration-300 hover:bg-slate-200" href="{{DATA:SCREEN:SCREEN_63}}">
                View Campaign Results
                <span className="material-symbols-outlined text-lg">insights</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


