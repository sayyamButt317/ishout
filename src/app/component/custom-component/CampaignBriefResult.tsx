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
  const [campaignImages, setCampaignImages] = useState<File[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>([]);
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
      id: localBrief.id as string,
      video_links: videoLinks.filter(Boolean), // remove empty
    };

    updateBrief(
      {
        brief: payload,
        product_image_urls: campaignImages, // array of files
      },
      {
        onSuccess: (data) => {
          setLocalBrief(data);
          setEditable(false);
          toast.success('Campaign brief updated');
        },
      },
    );
  };

  const handleApprove = () => {
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

      {/* EXTRA FIELDS */}
      <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 mt-10 mb-14 shadow-xl flex flex-col gap-10">
        {/* IMAGE FIELD */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white leading-tight">
              Campaign Images
            </h3>
            <p className="text-sm text-neutral-400">Click Edit button to make changes</p>
            <p className="text-xs text-neutral-500 italic">Add Product Images</p>
          </div>

          {/* Image grid */}
          <div className="flex flex-wrap gap-4 pt-2">
            {campaignImages.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-lg"
              >
                <Image
                  src={URL.createObjectURL(img)}
                  alt={`Selected ${index}`}
                  fill
                  className="object-cover"
                />
                {editable && (
                  <button
                    type="button"
                    onClick={() =>
                      setCampaignImages(campaignImages.filter((_, i) => i !== index))
                    }
                    className="absolute top-1 right-1 bg-black/60 hover:bg-red-500/80 backdrop-blur-md text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {/* + Button to add more images */}
            <label
              htmlFor="image-upload"
              className={`w-24 h-24 flex items-center justify-center border-2 rounded-xl transition-all text-white text-2xl
          ${
            editable
              ? 'border-dashed border-white/20 hover:border-white/50 hover:bg-white/5 cursor-pointer'
              : 'border-white/10 cursor-not-allowed opacity-50'
          }`}
            >
              <span className="font-light">+</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              disabled={!editable}
              onChange={(e) => {
                if (e.target.files) {
                  setCampaignImages([...campaignImages, ...Array.from(e.target.files)]);
                }
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* VIDEO LINKS */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white leading-tight">Video Links</h3>
            <p className="text-xs text-neutral-500 italic">
              Add reference video links for campaign
            </p>
          </div>

          <div className="space-y-3">
            {videoLinks.map((link, index) => (
              <div
                key={index}
                className="flex gap-3 animate-in fade-in slide-in-from-left-2"
              >
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={link}
                  disabled={!editable}
                  onChange={(e) =>
                    setVideoLinks(
                      videoLinks.map((v, i) => (i === index ? e.target.value : v)),
                    )
                  }
                  className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm transition-all focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 ${
                    !editable ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/[0.07]'
                  }`}
                />
                {editable && (
                  <button
                    type="button"
                    onClick={() =>
                      setVideoLinks(videoLinks.filter((_, i) => i !== index))
                    }
                    className="px-2 text-neutral-400 hover:text-red-400 transition-colors text-2xl"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {editable && (
              <button
                type="button"
                onClick={() => setVideoLinks([...videoLinks, ''])}
                className="mt-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center gap-2"
              >
                <span className="text-lg">+</span> Add Video Link
              </button>
            )}
          </div>
        </div>
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
