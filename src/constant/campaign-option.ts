import { MessageCircle, Sparkles } from "lucide-react";
import { CampaignOption } from "../types/Compnay/campaign-option-type";



export const OPTIONS: CampaignOption[] = [
    {
        id: 'campaign-breif',
        title: 'Generate Campaign',
        description:
            'Harness the power of iShout AI to draft professional briefs, select the perfect creator personas, and predict campaign ROI in seconds.',
        icon: Sparkles,
        route: '/client/campaign-breif',
        img: '/assets/iShout-gif-black-background.gif',
        imgWidth: 160,
        imgHeight: 140,
        accent: {
            glow: 'from-[rgba(124,39,62,0.5)] to-pink-800',
            border: 'group-hover:border-primaryButton/40',
            iconBg: 'bg-primaryButton/10',
            iconColor: 'text-primarytext',
            glowOpacity: 'opacity-20 group-hover:opacity-40',
            btnClass: 'bg-primaryButton hover:bg-primaryHover shadow-primaryButton/30',
            titleGlow: 'group-hover:drop-shadow-[0_0_12px_rgba(93,25,43,0.5)]',
            cardGlow: 'group-hover:shadow-[0_0_30px_rgba(255,78,126,0.15)]',
        },
    },
    {
        id: 'whatsapp',
        title: 'WhatsApp Campaign',
        description:
            'Reach creators where they are most active. Direct-to-messaging campaigns with automated tracking and high response rates.',
        icon: MessageCircle,
        img: '/assets/whatsapp-logo-1.png',
        imgWidth: 300,
        imgHeight: 240,
        accent: {
            glow: 'from-[rgba(12,87,62,0.5)] to-teal-500',
            border: 'group-hover:border-emerald-500/40',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
            glowOpacity: 'opacity-10 group-hover:opacity-30',
            btnClass: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20',
            titleGlow: 'group-hover:drop-shadow-[0_0_12px_rgba(12,87,62,0.5)]',
            cardGlow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]',
        },
    },
];