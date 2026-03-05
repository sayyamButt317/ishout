'use client';

import {
  CampaignBrief,
  UpdateCampaignBrief,
} from '@/src/types/Compnay/campaignbrieftype';
import { Copy, CheckCircle2, Sparkles, Check, Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { Section } from './briefsection';
import useUpdateCampaignBrief from '@/src/routes/Company/api/Hooks/useUpdateCampaignBriefHook';
import { toast } from 'sonner';
import Image from 'next/image';

interface Props {
  brief: CampaignBrief;
  onRegenerate?: () => void;
  onApprove?: () => void;
}

const CampaignBriefResult = ({ brief, onRegenerate, onApprove }: Props) => {
  const [copied, setCopied] = useState(false);
  const [editable, setEditable] = useState(false);
  const [localBrief, setLocalBrief] = useState<CampaignBrief>(brief);

  const { mutate: updateBrief, isPending: isUpdating } = useUpdateCampaignBrief();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(localBrief, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateSection = (key: keyof CampaignBrief, value: string[]) => {
    setLocalBrief({ ...localBrief, [key]: value });
  };

  const handleSave = () => {
    if (!localBrief.id) {
      toast.error('Brief ID missing');
      return;
    }

    const payload: UpdateCampaignBrief = {
      ...localBrief,
      id: localBrief.id,
    };

    updateBrief(payload, {
      onSuccess: (data) => {
        setLocalBrief(data);
        setEditable(false);
        toast.success('Campaign brief updated');
      },
    });
  };

  const handleApprove = () => {
    toast.success('Campaign approved');
    onApprove?.();
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 text-primarytext text-sm mb-3">
            <Sparkles size={14} />
            AI Generated Strategy
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white">
            Campaign Intelligence Report
          </h2>

          <p className="text-neutral-400 mt-3 max-w-2xl text-sm">
            Review, refine and approve your AI-generated campaign strategy.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={editable ? handleSave : () => setEditable(true)}
            disabled={isUpdating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primaryButton hover:bg-primaryHover transition text-white text-sm font-medium"
          >
            {editable ? <Save size={16} /> : <Pencil size={16} />}
            {editable ? (isUpdating ? 'Saving...' : 'Save') : 'Edit'}
          </button>

          {editable && (
            <button
              onClick={() => setEditable(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm text-white"
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleApprove}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm text-white"
          >
            <Check size={16} />
            Approve
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm text-white"
          >
            {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-12 mb-14 shadow-xl">
        <h3 className="text-2xl font-semibold mb-6 text-white">Executive Summary</h3>

        <p className="text-neutral-300 leading-relaxed">
          {localBrief.brand_name_influencer_campaign_brief}
        </p>
      </div>

      {/* CAMPAIGN HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-4 mb-14 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 shadow-xl">
        {localBrief.campaign_logo_url && (
          <Image
            src={localBrief.campaign_logo_url}
            alt="Campaign Logo"
            width={128}
            height={128}
            className="object-contain rounded-xl"
            priority
          />
        )}

        <div className="md:ml-4">
          {' '}
          {/* Add left margin for spacing from logo */}
          <h3 className="text-xl font-bold text-white mb-1">{localBrief.title}</h3>
        </div>
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
          onChange={(v) => updateSection('key_campaign_message', v)}
        />
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
          items={localBrief.hashtags_mentions}
          editable={editable}
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
          items={localBrief.kpis_success_metrics}
          editable={editable}
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
          items={localBrief.dos_donts}
          editable={editable}
          onChange={(v) => updateSection('dos_donts', v)}
        />
      </div>
    </div>
  );
};

export default CampaignBriefResult;
