'use client';

import openWhatsApp from '@/src/app/component/custom-component/companywhastapp';
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const options = [
  {
    id: 'campaign-breif',
    title: 'Generate Campaign',
    description:
      'Harness the power of iShout AI to draft professional briefs, select the perfect creator personas, and predict campaign ROI in seconds.',
    icon: Sparkles,
    route: '/client/campaign-breif',
    img: '/assets/iShout-gif-black-background.gif',
    accent: {
      glow: 'from-rgba(124, 39, 62, 0.5) to-pink-800',
      border: 'group-hover:border-primaryButton/40',
      iconBg: 'bg-primaryButton/10',
      iconColor: 'text-primarytext',
      glowOpacity: 'opacity-20 group-hover:opacity-40',
      radial: 'from-primaryButton/10',
      btnClass: 'bg-primaryButton hover:bg-primaryHover shadow-primaryButton/30',
      titleGlow: 'group-hover:drop-shadow-[0_0_12px_rgba(93, 25, 43, 0.5)]',
      cardGlow: 'group-hover:shadow-[0_0_30px_rgba(255,78,126,0.15)]',
    },
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Campaign',
    description:
      'Reach creators where they are most active. Direct-to-messaging campaigns with automated tracking and high response rates.',
    icon: MessageCircle,
    img: '/assets/whatsapp-campaign.png',
    accent: {
      glow: 'from-rgba(12, 87, 62, 0.5) to-teal-500',
      border: 'group-hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      glowOpacity: 'opacity-10 group-hover:opacity-30',
      radial: 'from-emerald-500/10',
      btnClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20',
      titleGlow: 'group-hover:drop-shadow-[0_0_12px_rgba(12, 87, 62, 0.5)]',
      cardGlow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
    },
  },
];

export default function ChooseCampaign() {
  const router = useRouter();

  return (
    <div className="col-span-12 w-full min-h-screen flex flex-col px-4 sm:px-8 lg:px-2 py-2">

      {/* ── Page Header ── */}
      <PageHeader
        title="Choose how you want to create your Campaign"
        description="Whether you need AI-powered creative direction or direct engagement via WhatsApp, we've got you covered."
        icon={<Sparkles className="size-5" />}
      />

      {/* ── Hero Badge ── */}
      <div className="mb-2 text-center">
        <div className="inline-flex items-center gap-2 px-3 rounded-full bg-primaryButton/10 border border-primaryButton/20 text-primarytext text-[10px] font-black tracking-widest uppercase">
          <Sparkles className="w-3 h-3 fill-primarytext" />
          Campaign Builder
        </div>
      </div>

      {/* ── Cards ── */}
      <div className="w-full mx-auto flex flex-col gap-10 md:gap-14 border-t border-white/10 p-10">
        {options.map((option) => {
          const Icon = option.icon;
          const a = option.accent;

          return (
            <div key={option.id} className="group relative">

              {/* Outer glow */}
              <div
                className={`absolute -inset-0.5 bg-linear-to-r ${a.glow} ${a.glowOpacity} transition-opacity duration-500 rounded-3xl blur-xl pointer-events-none`}
              />

              {/* Card */}
              <div
                className={`relative h-150 w-full bg-black/40 backdrop-blur-xl border border-gray-500/30 ${a.border} rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 ${a.cardGlow} flex flex-col md:flex-row min-h-85`}
              >

                {/* ── Left: Content ── */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-center">

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${a.iconBg} flex items-center justify-center mb-7`}>
                    <Icon className={`w-7 h-7 ${a.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-3xl md:text-4xl font-black text-white tracking-tight mb-4 transition-all duration-300 ${a.titleGlow}`}>
                    {option.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/55 text-base leading-relaxed mb-8 max-w-md">
                    {option.description}
                  </p>

                  {/* CTA */}
                  <div>
                    <button
                      onClick={() => {
                        if (option.id === 'whatsapp') {
                          openWhatsApp();
                        } else {
                          router.push(option.route ?? '');
                        }
                      }}
                      className={`inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm text-white transition-all active:scale-95 hover:scale-[1.03] shadow-lg ${a.btnClass}`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ── Right: Image ── */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8 ">
                  {/* radial glow behind image
                  <div
                    className={`absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] ${a.radial} via-transparent to-transparent pointer-events-none`}
                  /> */}
                  <div className="relative z-10 w-100 h-100 max-h-260px flex items-center justify-center">
                    <Image
                      src={option.img}
                      alt={option.title}
                      priority
                      width={340}
                      height={240}
                      className="rounded-2xl object-contain w-100 h-100 transition-all upoptimized duration-700 drop-shadow-2xl"
                    />
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer note ── */}
      <div className="mt-14 text-center">
        <p className="text-sm text-white/30">
          Not sure which one to choose?{' '}
          <a href="mailto:info@ishout.com" className="text-primarytext hover:underline underline-offset-4 transition-colors">
            Talk to our support team
          </a>
          .
        </p>
      </div>

    </div>
  );
}