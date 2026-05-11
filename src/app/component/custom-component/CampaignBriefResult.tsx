'use client';
import EditableList from '@/src/app/component/custom-component/EditableList';
import { CampaignBrief, UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import {
  CheckCircle2, X, BarChart3, ImageIcon,
  Users, Megaphone, Film, Package, Calendar,
  BookCheck, ShieldCheck, Info, MousePointerClick, UserSearch,
} from 'lucide-react';
import { useState } from 'react';
import useUpdateCampaignBrief from '@/src/routes/Company/api/Hooks/useUpdateCampaignBriefHook';
import { toast } from 'sonner';
import Image from 'next/image';
import BriefCard from './BriefCard';
import { EditableText } from './EditableTextInput';
import UploadCampaignImageHook from '@/src/routes/Company/api/Hooks/UploadCampaignImage-hook';
import Button from '../button';
import { CampaignSBriefStore } from '@/src/store/Campaign/brief.store';
import {
  BriefBadge,
  BriefLogoBlock,
  BriefActions,
  GlassSectionCard,
  EditableLinksSection,
} from './BriefUI';

interface Props {
  brief: CampaignBrief;
  onRegenerate?: () => void;
  onApprove?: () => void;
}

const CampaignBriefResult = ({ brief, onApprove }: Props) => {
  const { mutate: uploadImageMutation, isPending } = UploadCampaignImageHook();
  const [campaignImages, setCampaignImages] = useState<File[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>(brief.video_links ?? []);
  const [newLink, setNewLink] = useState('');
  const [editable, setEditable] = useState(false);
  const [localBrief, setLocalBrief] = useState<CampaignBrief>(brief);
  const { mutate: updateBrief, isPending: isUpdating } = useUpdateCampaignBrief();
  const { imageUrls } = CampaignSBriefStore();

  const setArr = (key: keyof CampaignBrief, value: string[]) =>
    setLocalBrief((prev) => ({ ...prev, [key]: value }));

  const setStr = (key: keyof CampaignBrief, value: string) =>
    setLocalBrief((prev) => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!localBrief.id) { toast.error('Brief ID missing'); return; }
    const payload: UpdateCampaignBrief = {
      ...localBrief,
      id: localBrief.id as string,
      video_links: videoLinks.filter(Boolean),
      product_image_urls: imageUrls,
    };
    updateBrief(
      { brief: payload },
      { onSuccess: (data) => { setLocalBrief(data); setEditable(false); } },
    );
  };

  return (
    <div className="relative w-full mx-auto px-2 pt-2 pb-24">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/[0.07] px-6 pb-8 mb-10">
        <div className="space-y-3">
          <BriefBadge label="AI Generated Strategy" />
          <h2 className="text-4xl font-bold tracking-tight text-foreground/95">
            Campaign Brief
          </h2>
          <p className="text-foreground/50 text-sm max-w-xl">
            Click <span className="italic">Edit</span> to make changes and{' '}
            <span className="italic">Approve</span> to finalize the campaign brief.
            You can also add <span className="font-bold">Reference Images</span> and{' '}
            <span className="font-bold">Links</span> below to guide the influencers.
          </p>
        </div>

        <BriefActions
          editable={editable}
          isSaving={isUpdating}
          onEdit={() => setEditable(true)}
          onSave={handleSave}
          onCancel={() => setEditable(false)}
          extraActions={
            <button
              onClick={() => onApprove?.()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-green-500/30 bg-primaryButton text-white cursor-pointer font-bold text-sm hover:bg-primaryHover transition-colors"
            >
              Approve Campaign
            </button>
          }
        />
      </div>

      {/* ── CAMPAIGN LOGO + TITLE ── */}
      {(localBrief.campaign_logo_url || localBrief.title) && (
        <div className="flex items-center gap-5 mb-8 rounded-2xl p-5
          border border-black/8 dark:border-white/6
          bg-white/60 dark:bg-black/40
          backdrop-blur-md
          shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_4px_24px_-4px_rgba(0,0,0,0.06)]
          dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.4)]">
          <BriefLogoBlock logoUrl={localBrief.campaign_logo_url} title={localBrief.title} />
        </div>
      )}

      {/* ── EXECUTIVE SUMMARY ── */}
      <div className="relative rounded-2xl p-8 mb-8 overflow-hidden
        border border-black/8 dark:border-white/6
        border-l-4 border-l-primaryButton
        bg-white/60 dark:bg-black/40
        backdrop-blur-md
        shadow-[0_1px_0_0_rgba(255,255,255,0.7)_inset,0_4px_24px_-4px_rgba(0,0,0,0.06)]
        dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_8px_32px_-8px_rgba(0,0,0,0.5)]">
        {/* pink glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none bg-primaryButton/8" />
        <div className="flex items-center gap-2.5 mb-5">
          <BookCheck className="w-5 h-5 text-primarytext" />
          <h4 className="text-sm font-black text-foreground/80 uppercase tracking-[0.12em]">Executive Summary</h4>
        </div>
        <EditableText
          value={localBrief.brand_name_influencer_campaign_brief ?? ''}
          editable={editable}
          rows={4}
          placeholder="Describe the campaign executive summary…"
          onChange={(v) => setStr('brand_name_influencer_campaign_brief', v)}
        />
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <BriefCard icon={<Info className="w-6 h-6" />} title="Campaign Overview" accent="secondary">
          <EditableList items={localBrief.campaign_overview ?? []} editable={editable}
            placeholder="One item per line…" onChange={(v) => setArr('campaign_overview', v)} />
        </BriefCard>

        <BriefCard icon={<MousePointerClick className="w-6 h-6" />} title="Campaign Objectives" accent="primary">
          <EditableList items={localBrief.campaign_objectives ?? []} editable={editable}
            placeholder="One objective per line…" onChange={(v) => setArr('campaign_objectives', v)} />
        </BriefCard>

        <BriefCard icon={<Users className="w-6 h-6" />} title="Target Audience" accent="secondary">
          <EditableList items={localBrief.target_audience ?? []} editable={editable}
            placeholder="One audience segment per line…" onChange={(v) => setArr('target_audience', v)} />
        </BriefCard>

        <BriefCard icon={<UserSearch className="w-6 h-6" />} title="Influencer Profile" accent="primary">
          <EditableList items={localBrief.influencer_profile ?? []} editable={editable}
            placeholder="One profile trait per line…" onChange={(v) => setArr('influencer_profile', v)} />
        </BriefCard>

        <BriefCard icon={<Megaphone className="w-6 h-6" />} title="Key Campaign Message" accent="primary">
          <EditableList items={localBrief.key_campaign_message ?? []} editable={editable}
            placeholder="One message point per line…" onChange={(v) => setArr('key_campaign_message', v)} />
        </BriefCard>

        <BriefCard icon={<Film className="w-6 h-6" />} title="Content Direction" accent="secondary">
          <EditableList items={localBrief.content_direction ?? []} editable={editable}
            placeholder="One direction point per line…" onChange={(v) => setArr('content_direction', v)} />
        </BriefCard>

        <BriefCard icon={<Package className="w-6 h-6" />} title="Deliverables" accent="primary">
          <EditableList items={localBrief.deliverables_per_influencer ?? []} editable={editable}
            placeholder="One deliverable per line…" onChange={(v) => setArr('deliverables_per_influencer', v)} />
        </BriefCard>

        <BriefCard icon={<span className="text-2xl font-black leading-none">#</span>} title="Hashtags & Mentions" accent="secondary">
          <EditableList items={localBrief.hashtags_mentions ?? []} editable={editable}
            placeholder="#hashtag or @mention per line…" onChange={(v) => setArr('hashtags_mentions', v)} />
        </BriefCard>

        <BriefCard icon={<Calendar className="w-6 h-6" />} title="Timeline" accent="primary">
          <EditableList items={localBrief.timeline ?? []} editable={editable}
            placeholder="One timeline step per line…" onChange={(v) => setArr('timeline', v)} />
        </BriefCard>

        <BriefCard icon={<CheckCircle2 className="w-6 h-6" />} title="Approval Process" accent="secondary">
          <EditableList items={localBrief.approval_process ?? []} editable={editable}
            placeholder="One step per line…" onChange={(v) => setArr('approval_process', v)} />
        </BriefCard>

        <BriefCard icon={<BarChart3 className="w-6 h-6" />} title="KPIs & Success Metrics" accent="primary">
          <EditableList items={localBrief.kpis_success_metrics ?? []} editable={editable}
            placeholder="One KPI per line…" onChange={(v) => setArr('kpis_success_metrics', v)} />
        </BriefCard>

        <BriefCard icon={<ShieldCheck className="w-6 h-6" />} title="Usage Rights" accent="secondary">
          <EditableList items={localBrief.usage_rights ?? []} editable={editable}
            placeholder="One right per line…" onChange={(v) => setArr('usage_rights', v)} />
        </BriefCard>

        <BriefCard icon={<BookCheck className="w-6 h-6" />} title="Do's & Don'ts" accent="primary" colSpan>
          <EditableList items={localBrief.dos_donts ?? []} editable={editable}
            placeholder="One item per line. Prefix with ✓ or ✗ to distinguish…"
            onChange={(v) => setArr('dos_donts', v)} />
        </BriefCard>

        {/* ── Campaign Images ── */}
        <GlassSectionCard
          icon={<ImageIcon className="w-4 h-4" />}
          title="Campaign Images"
          accentColor="purple"
          subtitle={editable ? 'Upload product images for this campaign.' : 'Click Edit to manage images.'}
          colSpan
        >
          <div className="flex flex-wrap gap-3 mt-2">
            {campaignImages.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden ring-1 ring-black/10 dark:ring-white/10 shadow-md">
                <Image src={URL.createObjectURL(img)} alt={`img-${i}`} fill className="object-cover" />
                {editable && (
                  <button
                    type="button"
                    onClick={() => setCampaignImages(campaignImages.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-deleteButton rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            ))}

            <label
              htmlFor="img-upload"
              className={`w-24 h-24 flex flex-col items-center justify-center border-2 rounded-xl transition-all gap-1 text-foreground/40
                ${editable
                  ? 'border-dashed border-primaryButton/30 hover:border-primaryButton/60 hover:bg-primaryButton/5 hover:text-primarytext cursor-pointer'
                  : 'border-foreground/20 cursor-not-allowed opacity-30'}`}
            >
              <ImageIcon className="w-6 h-6" />
              <span className="text-[10px] font-medium">Add</span>
            </label>

            <input
              id="img-upload"
              type="file"
              accept="image/*"
              multiple
              disabled={!editable}
              onChange={(e) => {
                if (e.target.files)
                  setCampaignImages([...campaignImages, ...Array.from(e.target.files)]);
              }}
              className="hidden"
            />
          </div>

          {editable && (
            <Button
              onClick={() => uploadImageMutation({ brief_id: localBrief.id!, files: campaignImages })}
              disabled={isPending}
              className={`bg-primaryHover mt-3 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isPending
                ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading…</>
                : 'Add Image'}
            </Button>
          )}
        </GlassSectionCard>

        {/* ── Reference Links ── */}
        <EditableLinksSection
          links={videoLinks}
          editable={editable}
          newLink={newLink}
          onNewLinkChange={setNewLink}
          onAdd={() => {
            if (newLink.trim()) { setVideoLinks([...videoLinks, newLink.trim()]); setNewLink(''); }
          }}
          onRemove={(i) => setVideoLinks(videoLinks.filter((_, idx) => idx !== i))}
          onEdit={(i, v) => setVideoLinks(videoLinks.map((x, idx) => (idx === i ? v : x)))}
          colSpan
        />

      </div>
    </div>
  );
};

export default CampaignBriefResult;