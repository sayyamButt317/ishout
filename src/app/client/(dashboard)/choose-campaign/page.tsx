'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import PageHeader from '@/src/app/component/PageHeader';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import openWhatsApp from '@/src/app/component/custom-component/companywhastapp';
import { Button } from '@/components/ui/button';
import { CampaignOption } from '@/src/types/Compnay/campaign-option-type';
import { OPTIONS } from '@/src/constant/campaign-option';

export default function ChooseCampaign() {
  return (
    <div className="w-full min-h-screen flex flex-col px-4 sm:px-8 py-6">
      <Header />
      <CampaignList />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <>
      <PageHeader
        title="Choose how you want to create your Campaign"
        description="Whether you need AI-powered creative direction or direct engagement via WhatsApp, we've got you covered."
        icon={<Sparkles className="size-5" />}
      />

      <div className="text-center mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primaryButton/10 border border-primaryButton/20 text-primarytext text-xs font-bold tracking-widest uppercase">
          <Sparkles className="w-3 h-3 fill-primarytext" />
          Campaign Builder
        </div>
      </div>
    </>
  );
}

function CampaignList() {
  return (
    <div className="w-full mx-auto flex flex-col gap-12 border-t border-white/10 mt-8 pt-10">
      {OPTIONS.map((option) => (
        <CampaignCard key={option.id} option={option} />
      ))}
    </div>
  );
}


function CampaignCard({ option }: { option: CampaignOption }) {
  const router = useRouter();
  const Icon = option.icon;
  const a = option.accent;

  const handleClick = () => {
    if (option.id === 'whatsapp') return openWhatsApp();
    if (option.route) router.push(option.route);
  };

  return (
    <div className="group relative">
      {/* Glow */}
      <div
        className={`absolute -inset-0.5 bg-linear-to-r ${a.glow} ${a.glowOpacity} transition-opacity duration-500 rounded-3xl blur-xl`}
      />
      {/* Card */}
      <div
        className={`relative bg-black/40 backdrop-blur-xl border border-gray-500/30 ${a.border} rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-1.5 ${a.cardGlow} flex flex-col md:flex-row`}
      >
        {/* Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <div className={`w-14 h-14 rounded-2xl ${a.iconBg} flex items-center justify-center mb-6`}>
            <Icon className={`w-6 h-6 ${a.iconColor}`} />
          </div>

          <h3
            className={`text-2xl md:text-3xl font-extrabold text-white mb-4 transition ${a.titleGlow}`}
          >
            {option.title}
          </h3>

          <p className="text-white/60 text-sm md:text-base mb-6 max-w-md">
            {option.description}
          </p>

          <Button
            onClick={handleClick}
            className={`inline-flex cursor-pointer w-1/4 items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition active:scale-95 hover:scale-[1.03] ${a.btnClass}`}
            aria-label={`Start ${option.title}`}
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Image */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="flex items-center justify-center">
            <Image
              src={option.img}
              alt={option.title}
              width={option.imgWidth}
              height={option.imgHeight}
              className="object-contain rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="mt-16 text-center">
      <p className="text-sm text-white/40">
        Not sure which one to choose?{' '}
        <a
          href="mailto:info@ishout.com"
          className="text-primarytext hover:underline underline-offset-4"
        >
          Talk to our support team
        </a>
      </p>
    </div>
  );
}