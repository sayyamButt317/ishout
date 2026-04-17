export interface CampaignOption {
    id: 'campaign-breif' | 'whatsapp';
    title: string;
    description: string;
    icon: React.ElementType;
    route?: string;
    img: string;
    imgWidth: number;
    imgHeight: number;
    accent: {
        glow: string;
        border: string;
        iconBg: string;
        iconColor: string;
        glowOpacity: string;
        btnClass: string;
        titleGlow: string;
        cardGlow: string;
    };
};
