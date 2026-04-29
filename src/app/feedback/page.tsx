'use client';
import {
  CheckCircle2, CirclePlay, Clock3,
  History, PencilLine, Volume2,
  Shield, MessageCircle, X,
} from 'lucide-react';
import Header from '../component/header';
import Image from 'next/image';
import CalendlyDemo from '../component/calendly-demo';
import CustomButton from '../component/button';
import LogoFooter from '../component/logo-footer';
import { chaosCards, contextFeatures, reviewCards } from '@/src/constant/Data/feedback';

// ─── Data ─────────────────────────────────────────────────────────────────────
const workflowSteps = [
  {
    num: '01', color: 'text-[#ff4e7e]', border: 'border-[#ff4e7e]', title: 'Submit Content', reverse: false,
    desc: 'Upload your raw or edited footage. Our engine prepares it for frame-accurate playback in seconds.',
    visual: (
      <div className="glass-card p-4 rounded-xl shadow-lg hover:scale-105 transition-transform border border-white/10 bg-white/5 backdrop-blur-xl">
        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0drjIcgKhMyGqzwLAp_owI5hjESxS60Aw0U83LO-B1ZYCfJB4Ok2fHaZHUZVaUfyRi_ycmc5n5_kZNWrdjuKlDM7Fh2tfnfl5krZIG0dCQYtvA8S6Ews9whVCwqPng7r1XxwV1PomLZtEx_MVGsm8omlIJfmOCZ0b4vdYxcMzKbvNeHNn8Z3gg6HWBKriGMpFrhGvjY4HuHX-2NLrfys79mJ8oX4FDoy0SnsSki_ez0mgtfr19jjENKEjfIX7i_rqx9VuvT-2vzU_" alt="Upload" width={400} height={200} className="rounded h-32 w-full object-cover" />
      </div>
    ),
  },
  {
    num: '02', color: 'text-[#d2bbff]', border: 'border-[#d2bbff]', title: 'Receive Feedback', reverse: true,
    desc: 'Reviewers drop pins on the timeline. You see exactly what they mean without decoding cryptic messages.',
    visual: (
      <div className="p-4 rounded-xl shadow-lg border border-[#d2bbff]/20 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between font-mono text-[10px] text-[#d2bbff] mb-2">
          <span>TIMESTAMP: 00:12:04</span><span>📌</span>
        </div>
        <p className="text-xs font-medium text-white/80">Remove this shaky footage and use the b-roll from the beach scene.</p>
      </div>
    ),
  },
  {
    num: '03', color: 'text-[#b2c5ff]', border: 'border-[#b2c5ff]', title: 'Review with Context', reverse: false,
    desc: 'Toggle between comments, drawings, and versions. Your creative flow remains uninterrupted.',
    visual: (
      <div className="rounded-xl p-4 flex gap-4 overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="w-1/2 h-20 bg-black/40 rounded flex items-center justify-center text-[10px] uppercase font-bold text-white/30">V1 Old</div>
        <div className="w-1/2 h-20 bg-[#ff4e7e]/10 border border-[#ff4e7e]/40 rounded flex items-center justify-center text-[10px] uppercase font-bold text-[#ff4e7e]">V2 New</div>
      </div>
    ),
  },
];

const footerLinks = ['Privacy Policy', 'Terms of Service', 'API Documentation', 'Contact Support'];
const healthStats = [{ label: 'Total Comments', value: '42' }, { label: 'Avg Resolution', value: '2.4h' }];
const bentoSmall = [
  { icon: Shield, color: 'text-[#b2c5ff]', title: 'Secure Links', desc: 'Password protected and time-limited shares.' },
  { icon: MessageCircle, color: 'text-[#e8184d]', title: 'Live Chat', desc: 'Real-time discussion alongside frames.' },
];

// ─── Reusable ─────────────────────────────────────────────────────────────────

const GlassCard = ({ className = '', children }: { className?: string; children: React.ReactNode }) => (
  <div className={`backdrop-blur-xl border border-white/10 bg-white/3 ${className}`}>{children}</div>
);

const ReviewCard = ({ item }: { item: typeof reviewCards[0] }) => (
  <article className="rounded-3xl border border-white/10 bg-[#1d1e30]/75 p-6 backdrop-blur-xl hover:border-white/20 transition-colors">
    <div className="flex gap-4">
      <div className={`h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 ${item.ringClass}`}>
        <Image src={item.avatar} alt={item.name} width={48} height={48} className="h-full w-full rounded-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">{item.name}</span>
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/60">{item.role}</span>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs font-bold text-white">{item.time}</span>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-white/70">{item.message}</p>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
          <CheckCircle2 className="h-3.5 w-3.5" />{item.badge}
        </span>
      </div>
    </div>
  </article>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InfluencerFeedback() {
  return (
    <div className="relative min-h-screen w-full bg-[#131313] overflow-x-hidden text-white">

      {/* NAV */}
      {/* <nav className="fixed top-0 w-full z-50 bg-[#131313]/60 backdrop-blur-2xl flex justify-between items-center px-6 md:px-12 h-20 border-b border-white/5 shadow-[0_4px_30px_rgba(232,24,77,0.04)]">
        <div className="text-2xl font-black tracking-tighter text-[#ff4e7e]">iShout</div>
        <div className="hidden md:flex gap-8 items-center">
          {[{ label: 'Platform', active: true }, { label: 'Feedback Engine' }, { label: 'Creators' }, { label: 'Pricing' }].map(({ label, active }) => (
            <a key={label} href="#" className={`text-sm uppercase font-semibold tracking-tight transition-all duration-300 hover:scale-105 ${active ? 'text-[#ff4e7e] border-b-2 border-[#ff4e7e] pb-1' : 'text-white/60 hover:text-[#ff4e7e]'}`}>{label}</a>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <button className="text-white/60 text-sm uppercase font-semibold px-4 py-2 hover:text-[#ff4e7e] transition-all">Login</button>
          <button className="bg-[#e8184d] hover:bg-[#ff4e7e] text-white px-6 py-2.5 rounded-lg text-sm uppercase font-bold tracking-wider hover:scale-105 transition-all duration-300 active:scale-95">Get Started</button>
        </div>
      </nav> */}

      <Header />

      <main className="w-full">

        {/* HERO */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-[#e8184d]/5 rounded-full blur-[120px] -z-10" />
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#e8184d] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-white/50">New: AI-Driven Frame Sync</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-linear-to-b from-white to-white/40 bg-clip-text  leading-[1.1]">
              Precision Feedback<br />for Creators
            </h1>
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light tracking-tight">
              Say goodbye to vague revisions. Experience a cinema-grade feedback environment where every comment lives exactly where it belongs.
            </p>
            {/* Video player mockup */}
            <div className="relative max-w-5xl mx-auto mt-20">
              <div className="absolute -inset-1 bg-linear-to-r from-[#e8184d]/20 to-[#d2bbff]/20 rounded-xl blur-2xl opacity-50" />
              <GlassCard className="relative rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-black relative">
                  <Image
                    src="https://i.pinimg.com/1200x/f8/78/b8/f878b8501bd1d0ded1680224f35d374a.jpg"
                    alt="Video workspace" fill className="object-cover opacity-80" unoptimized priority
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="w-full h-1 bg-white/10 rounded-full relative mb-4">
                      <div className="absolute left-0 top-0 h-full w-[45%] bg-[#e8184d] shadow-[0_0_8px_rgba(232,24,77,0.6)]" />
                      {[{ l: '12%', c: 'bg-[#ffb2b7]', g: 'shadow-[0_0_10px_rgba(255,78,126,0.8)]' }, { l: '38%', c: 'bg-[#d2bbff]', g: 'shadow-[0_0_10px_rgba(210,187,255,0.8)]' }, { l: '72%', c: 'bg-white/40', g: '' }].map(({ l, c, g }, i) => (
                        <div key={i} className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${c} rounded-full border-2 border-black cursor-pointer hover:scale-125 transition-transform ${g}`} style={{ left: l }} />
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-white/40 font-mono text-sm">
                      <span>00:12:04</span>
                      <div className="flex gap-4"><CirclePlay className="w-5 h-5" /><Volume2 className="w-5 h-5" /></div>
                    </div>
                  </div>
                  <GlassCard className="absolute top-12 left-[38%] p-4 rounded-lg w-56 shadow-2xl transform hidden md:block">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-white/10" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider">Editor Pro</span>
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed mb-2">Extend the cross-fade by 4 frames here.</p>
                    <div className="flex items-center justify-between text-[10px] text-[#ff4e7e] font-bold">
                      <span>@ 00:38:15</span>
                      <span className="bg-[#e8184d]/20 px-2 py-0.5 rounded">MARK DONE</span>
                    </div>
                  </GlassCard>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* FRAME-BY-FRAME PRECISION */}
        <section className="bg-[#131313] px-6 py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="mb-5 text-4xl font-bold text-white tracking-tighter">Frame-By-Frame <span className="text-[#e8184d]">Precision</span></h2>
              <p className="mb-8 text-lg text-white/50">Stop guessing. Provide pin-point feedback exactly where it matters. Our synchronized engine ensures the whole team sees the same frame, every time.</p>
              <div className="space-y-4">
                <GlassCard className="rounded-xl border-l-4 border-l-[#ff4e7e]! p-4">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-[#ff4e7e] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">Instant Sync</p>
                      <p className="text-xs text-white/50 mt-0.5">Real-time collaboration across timezones.</p>
                    </div>
                  </div>
                </GlassCard>
                <div className="rounded-xl p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <PencilLine className="h-5 w-5 text-[#d2bbff] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">Visual Annotations</p>
                      <p className="text-xs text-white/50 mt-0.5">Draw directly on the video canvas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="relative">
                <div className="absolute -inset-1 bg-linear-to-r from-[#e8184d]/20 to-[#d2bbff]/20 rounded-2xl blur-2xl opacity-50" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#1d1e30] shadow-2xl">
                  <Image src="https://i.pinimg.com/1200x/22/bf/a1/22bfa183386fa4e08775d045b78f7c22.jpg"
                    alt="Video Editor UI" unoptimized loading="lazy" width={1000} height={1000} className="aspect-video w-full object-cover opacity-80"
                  />
                  <GlassCard className="absolute left-[30%] top-[20%] rounded-2xl p-3">
                    <p className="text-[10px] font-bold text-white">0:03 iShout</p>
                    <p className="text-[11px] text-white/80">Increase saturation in the buildings here.</p>
                  </GlassCard>
                  <GlassCard className="absolute bottom-[40%] right-[15%] rounded-2xl p-3">
                    <p className="text-[10px] font-bold text-white">0:12 iShout</p>
                    <p className="text-[11px] text-white/80">Smooth out the camera transition.</p>
                  </GlassCard>
                  <div className="absolute bottom-0 w-full border-t border-white/10 bg-[#1d1e30]/80 p-5 backdrop-blur-xl">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CirclePlay className="h-4 w-4 text-white" /><Volume2 className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-mono text-[#e8184d]">00:03:15 / 00:05:00</span>
                    </div>
                    <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[40%] bg-linear-to-r from-[#e8184d] to-[#d2bbff]" />
                      <div className="absolute left-[30%] top-0 h-full w-0.5 bg-white shadow-[0_0_8px_white]" />
                      <div className="absolute left-[65%] top-0 h-full w-0.5 bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="py-32 bg-[#0e0e0e] px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 text-white">Goodbye,<br />WhatsApp Chaos</h2>
              <p className="text-white/50 mb-10 leading-relaxed max-w-md">Feedback should not be a scavenger hunt. Stop chasing messages across DMs, emails, and blurry screenshots.</p>
              <ul className="space-y-6">
                {['"Hey, what time was that change again?"', '"Wait, which version are we looking at?"', '"Check your voice notes from Tuesday morning."'].map((q) => (
                  <li key={q} className="flex items-start gap-4">
                    <X className="w-5 h-5 text-[#e8184d] shrink-0 mt-0.5" />
                    <span className="text-white/70 font-medium italic">{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-95">
              {chaosCards.map(({ channel, cls, msg }) => (
                <GlassCard key={channel} className={`absolute p-4 rounded-xl w-72 shadow-xl ${cls}`}>
                  <p className="text-[10px] font-bold text-[#e8184d] uppercase mb-2">{channel}</p>
                  <p className="text-xs text-white/60">{msg}</p>
                </GlassCard>
              ))}
              {/* <GlassCard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl w-64 shadow-xl -rotate-3">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3NtQvw0gR_cAsoiQr9wHZ6vQqlioRbsd6iGgTRWT53W3ZvqPEtKR0E--f6vd1vx8_i7HgbuRgqXQnukR_0YYnYh804DxdZANh9BoQmI1ooKTi98epu9zOrYQEwQwkdu0XetubKga2umhBDdv7SNT5czA2LtU-xPs57Aa-rKjNPSbw5kGB5MpxGB3uMsLBvc8J43IJoDOqRV6NGIvrBJuwn7M_crgG8UUpAEoJpEm6NuBW_o_XvG7Mhxsa3iXrwoCXOtuId7svz-Lo"
                  alt="Messy feedback" width={300} height={128} className="rounded h-32 w-full object-cover opacity-50 mb-2" />
                <p className="text-[10px] font-mono text-[#e8184d]">Look at this spot specifically!</p>
              </GlassCard> */}
            </div>
          </div>
        </section>

        {/* SOLUTION: CONTEXT IS EVERYTHING */}
        <section className="py-32 relative px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-white">Context is Everything</h2>
              <div className="h-1 w-24 bg-[#e8184d]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contextFeatures.map(({ icon: Icon, color, bg, title, desc, highlight }) => (
                <GlassCard key={title} className={`p-8 rounded-2xl group hover:bg-white/5 transition-colors ${highlight ? 'border-t-2 border-t-[#e8184d]/40!' : ''}`}>
                  <div className={`w-12 h-12 ${bg} flex items-center justify-center rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-32 bg-[#0e0e0e] px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black tracking-tighter mb-20 text-center uppercase text-white">The Workflow</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-[#e8184d] via-[#d2bbff] to-transparent -translate-x-1/2 hidden md:block" />
              <div className="space-y-28">
                {workflowSteps.map(({ num, color, border, title, desc, visual, reverse }) => (
                  <div key={num} className={`relative flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
                    <div className={`flex-1 ${reverse ? 'text-left' : 'md:text-right'}`}>
                      <span className={`${color} font-black text-xs uppercase tracking-[0.3em] mb-2 block`}>Step {num}</span>
                      <h3 className="text-3xl font-bold mb-4 text-white">{title}</h3>
                      <p className="text-white/50">{desc}</p>
                    </div>
                    <div className={`z-10 w-12 h-12 rounded-full bg-[#1a1a1a] border-2 ${border} flex items-center justify-center font-bold ${color} shrink-0`}>
                      {parseInt(num)}
                    </div>
                    <div className="flex-1">{visual}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEW STUDIO */}
        <section className="relative overflow-hidden bg-[#191a2c]/30 px-6 py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-3 text-4xl font-black tracking-tighter text-white md:text-5xl">Centralized Review Studio</h2>
              <p className="mx-auto max-w-2xl text-lg text-white/50">Detailed feedback loops integrated directly into the production timeline.</p>
            </div>
            <div className="relative mb-10">
              <div className="absolute -inset-1 bg-linear-to-r from-[#e8184d]/10 to-[#d2bbff]/10 rounded-3xl blur-xl" />
              <video src="https://ishout.s3.us-east-2.amazonaws.com/whatsapp-media/video/2026-04-17/936465739226340_f48456f9-60aa-4d90-bf35-305d5805c270.mp4"
                className="relative w-full rounded-2xl border border-white/10 object-cover object-center"
                controls autoPlay muted loop playsInline width={500} height={300}
              />
            </div>
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <GlassCard className="rounded-3xl p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/50">Production Timeline</p>
                    <Clock3 className="h-4 w-4 text-[#e8184d]" />
                  </div>
                  <div className="relative mb-4 h-20 overflow-hidden rounded-xl bg-black/40 border border-white/5">
                    {[12, 45, 78].map((pos) => <div key={pos} className="absolute top-0 h-full w-px bg-[#e8184d]/60" style={{ left: `${pos}%` }} />)}
                    <div className="absolute left-[30%] top-0 h-full w-px bg-white shadow-[0_0_12px_white]" />
                  </div>
                  <div className="flex justify-between px-1 font-mono text-[10px] text-white/40">
                    {['00:00:00', '00:01:24', '00:02:48', '00:04:12', '00:05:00'].map((t) => <span key={t}>{t}</span>)}
                  </div>
                </GlassCard>
                <div className="space-y-4">{reviewCards.map((item) => <ReviewCard key={item.name} item={item} />)}</div>
              </div>
              <aside className="space-y-5 lg:col-span-4">
                <GlassCard className="rounded-3xl p-7">
                  <h3 className="mb-6 text-xl font-bold text-white">Review Health</h3>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider text-white/50">
                    <span>Resolution Rate</span><span className="text-white">84%</span>
                  </div>
                  <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[84%] rounded-full bg-linear-to-r from-[#e8184d] to-[#d2bbff]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {healthStats.map(({ label, value }) => (
                      <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/50">{label}</p>
                        <p className="text-2xl font-black text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
                <div className="grid grid-cols-2 gap-3">
                  {bentoSmall.map(({ icon: Icon, color, title, desc }) => (
                    <GlassCard key={title} className="rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/5 transition-colors">
                      <Icon className={`h-6 w-6 ${color} mb-3`} />
                      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
                      <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
                    </GlassCard>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* BENTO GRID */}
        <section className="py-32 px-6 md:px-12 bg-[#131313]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-140">
              <GlassCard className="md:col-span-2 md:row-span-2 p-12 rounded-3xl flex flex-col justify-end bg-linear-to-br from-white/5 to-transparent">
                <div className="text-6xl font-black text-[#e8184d] mb-6">-40%</div>
                <h3 className="text-3xl font-bold mb-4 text-white">Revision Time</h3>
                <p className="text-white/50 max-w-sm">Teams using iShout report a near-halving of total revision cycles. Get to Final_Final_v3 faster than ever.</p>
              </GlassCard>
              <GlassCard className="md:col-span-2 p-10 rounded-3xl flex items-center gap-8">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                  <History className="w-8 h-8 text-[#d2bbff]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">Cinema Quality</h3>
                  <p className="text-white/50 text-sm">Review in full 4K resolution with HDR support. No compression artifacts during critical review.</p>
                </div>
              </GlassCard>
              {bentoSmall.map(({ icon: Icon, color, title, desc }) => (
                <GlassCard key={title} className="md:col-span-1 p-8 rounded-3xl flex flex-col justify-center text-center hover:bg-white/5 transition-colors">
                  <Icon className={`w-8 h-8 ${color} mx-auto mb-4`} />
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-white/50 text-xs mt-2">{desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[#e8184d]/5 -z-10" />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-[#e8184d]/10 rounded-full blur-[100px] -z-10" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white">Elevate Your Content<br />Workflow Today</h2>
            <p className="text-xl text-white/50 mb-12">Join 2,500+ influencers and editors who have reclaimed their creative sanity.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <CalendlyDemo>
                <div className="mt-6 rounded-[22px] inline-block">
                  <div className="p-2 border border-white/30 rounded-[20px] inline-block">
                    <CustomButton
                      className="
                      bg-[#ff3b8d] hover:bg-[#ff5a9e] cursor-pointer rounded-[14px] h-14 px-20 text-xl font-extrabold italic text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.45),0_0_40px_rgba(255,255,255,0.25),0_0_60px_rgba(255,255,255,0.12)]
              transition-all duration-150"
                    >
                      Book a Demo
                    </CustomButton>
                  </div>
                </div>
              </CalendlyDemo>
            </div>
          </div>
        </section>
      </main>
      <LogoFooter />
    </div>
  );
}