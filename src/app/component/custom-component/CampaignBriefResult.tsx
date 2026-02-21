'use client';
import { CampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import {
    Copy,
    CheckCircle2,
    Sparkles,
    RotateCcw,
    Pencil,
    Save,
} from 'lucide-react';
import { useState } from 'react';
import { Section } from './briefsection';

interface Props {
    brief: CampaignBrief;
    onRegenerate?: () => void;
}

const CampaignBriefResult = ({ brief, onRegenerate }: Props) => {
    const [copied, setCopied] = useState(false);
    const [editable, setEditable] = useState(false);
    const [localBrief, setLocalBrief] = useState<CampaignBrief>(brief);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(JSON.stringify(localBrief, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const updateSection = (key: keyof CampaignBrief, value: string[]) => {
        setLocalBrief({ ...localBrief, [key]: value });
    };

    return (
        <div className="relative max-w-7xl mx-auto px-6 py-20">
            {/* HEADER */}
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
                <div>
                    <div className="flex items-center gap-2 text-white/40 text-sm mb-3">
                        <Sparkles size={14} />
                        AI Generated Strategy
                    </div>
                    <h2 className="text-4xl font-semibold tracking-tight">
                        Campaign Intelligence Report
                    </h2>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => setEditable(!editable)}
                        className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                    >
                        {editable ? <Save size={16} /> : <Pencil size={16} />}
                        {editable ? 'Save' : 'Edit'}
                    </button>
                    {editable &&
                        <button
                            onClick={() => setEditable(!editable)}
                            className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                        >
                            Cancel
                        </button>
                    }

                    <button
                        onClick={onRegenerate}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                    >
                        <RotateCcw size={16} />
                        Regenerate
                    </button>

                    <button
                        onClick={handleCopy}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                    >
                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                </div>
            </div>

            {/* EXECUTIVE SUMMARY */}
            <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl p-12 mb-16 shadow-[0_0_100px_rgba(255,255,255,0.04)]">
                <h3 className="text-2xl font-semibold mb-6 text-white">
                    Executive Summary
                </h3>
                <p className="text-white/70 leading-relaxed">
                    {localBrief.brand_name_influencer_campaign_brief}
                </p>
            </div>



            {/* SECTIONS */}
            <div className="grid md:grid-cols-2 gap-8">
                <Section
                    title="Campaign Overview"
                    items={localBrief.campaign_overview}
                    editable={editable}
                    onChange={(v) => updateSection('campaign_overview', v)}
                />
                <Section
                    title="Campaign Objectives"
                    items={localBrief.campaign_objectives}
                    editable={editable}
                    onChange={(v) => updateSection('campaign_objectives', v)}
                />
                <Section
                    title="Target Audience"
                    items={localBrief.target_audience}
                    editable={editable}
                    onChange={(v) => updateSection('target_audience', v)}
                />
                <Section
                    title="Influencer Profile"
                    items={localBrief.influencer_profile}
                    editable={editable}
                    onChange={(v) => updateSection('influencer_profile', v)}
                />
                <Section
                    title="Key Campaign Message"
                    items={localBrief.key_campaign_message}
                    editable={editable}
                    onChange={(v) => updateSection('key_campaign_message', v)} />
                <Section
                    title="Content Direction"
                    items={localBrief.content_direction}
                    editable={editable}
                    onChange={(v) => updateSection('content_direction', v)}
                />
                <Section
                    title="Deliverables"
                    items={localBrief.deliverables_per_influencer}
                    editable={editable}
                    onChange={(v) => updateSection('deliverables_per_influencer', v)}
                />
                <Section
                    title="Hashtags & Mentions"
                    editable={editable}
                    items={localBrief.hashtags_mentions}
                    onChange={(v) => updateSection('hashtags_mentions', v)}
                />
                <Section
                    title="Timeline"
                    items={localBrief.timeline}
                    editable={editable}
                    onChange={(v) => updateSection('timeline', v)}
                />
                <Section
                    title="Approval Process"
                    items={localBrief.approval_process}
                    editable={editable}
                    onChange={(v) => updateSection('approval_process', v)}
                />
                <Section
                    title="KPIs & Success Metrics"
                    editable={editable}
                    items={localBrief.kpis_success_metrics}
                    onChange={(v) => updateSection('kpis_success_metrics', v)}
                />
                <Section
                    title="Usage Rights"
                    items={localBrief.usage_rights}
                    editable={editable}
                    onChange={(v) => updateSection('usage_rights', v)}


                />
                <Section
                    title="Do's & Don'ts"
                    editable={editable}
                    items={localBrief.dos_donts}
                    onChange={(v) => updateSection('dos_donts', v)}
                />
            </div>
        </div>
    );
};

export default CampaignBriefResult;




