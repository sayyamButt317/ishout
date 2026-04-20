'use client';
import EditableList from '@/src/app/component/custom-component/EditableList';
import {
  CampaignBrief,
  UpdateCampaignBrief,
} from '@/src/types/Compnay/campaignbrieftype';
import {
  CheckCircle2, Sparkles, Check, Pencil, Save, X,
  BarChart3, Link2, ImageIcon, Users, Megaphone, Film,
  Package, Calendar, BookCheck, ShieldCheck, Info,
  MousePointerClick, UserSearch,
} from 'lucide-react';
import { useState } from 'react';
import useUpdateCampaignBrief from '@/src/routes/Company/api/Hooks/useUpdateCampaignBriefHook';
import { toast } from 'sonner';
import Image from 'next/image';
import BriefCard from './BriefCard';

interface Props {
  brief: CampaignBrief;
  onRegenerate?: () => void;
  onApprove?: () => void;
}

function EditableText({
  value,
  editable,
  onChange,
  placeholder,
  rows = 6,
}: {
  value: string;
  editable: boolean;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  if (!editable) {
    return (
      <p className="text-md text-white/65 leading-relaxed ">
        {value || <span className="italic text-white/25">—</span>}
      </p>
    );
  }
  return (
    <textarea
      rows={rows}
      className='w-full bg-black/30 border border-white/10 rounded-xl  px-6 py-3 text-md text-white placeholder:text-white/30 focus:outline-none focus:border-primaryButton/50 focus:ring-1 focus:ring-primaryButton/20 transition-all resize-none disabled:opacity-50 disabled:cursor-default leading-relaxed'
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const CampaignBriefResult = ({ brief, onApprove }: Props) => {
  const [campaignImages, setCampaignImages] = useState<File[]>([]);
  const [videoLinks, setVideoLinks] = useState<string[]>(brief.video_links ?? []);
  const [newLink, setNewLink] = useState('');

  const [editable, setEditable] = useState(false);
  const [localBrief, setLocalBrief] = useState<CampaignBrief>(brief);

  const { mutate: updateBrief, isPending: isUpdating } = useUpdateCampaignBrief();

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
    };
    updateBrief(
      { brief: payload, product_image_urls: campaignImages },
      {
        onSuccess: (data) => {
          setLocalBrief(data);
          setEditable(false);
        },
      },
    );
  };

  const addLink = () => {
    if (newLink.trim()) { setVideoLinks([...videoLinks, newLink.trim()]); setNewLink(''); }
  };

  return (
    <div className="relative w-full mx-auto px-2 pt-2 pb-24">

      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/0.07 px-6 pb-8 mb-10">
        <div className="space-y-3">

          {/* badge — uses secondaryButton tint */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondaryButton/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-white/0.06">
            <Sparkles className="w-3 h-3" />
            AI Generated Strategy
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white">
            Campaign Intelligence Report
          </h2>
          <p className="text-white/45 text-md max-w-xl">
            Click Edit to make changes and Approve to finalize the campaign brief. You can also add reference images and Links to guide the influencers.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">

          {/* Edit / Save — primaryButton gradient */}
          <button
            onClick={editable ? handleSave : () => setEditable(true)}
            disabled={isUpdating}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-md text-white transition-all
              hover:scale-[1.03] active:scale-95 disabled:opacity-50 shadow-lg shadow-primaryButton/20
              bg-primaryButton hover:bg-primaryHover"
          >
            {editable
              ? isUpdating
                ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                : <><Save className="w-3.5 h-3.5" />Save</>
              : <><Pencil className="w-3.5 h-3.5" />Edit</>}
          </button>

          {editable && (
            <button
              onClick={() => setEditable(false)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-md text-white transition-all"
            >
              Cancel
            </button>
          )}

          {/* Approve */}
          <button
            onClick={() => onApprove?.()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-green-500/30 bg-primaryButton text-white cursor-pointer font-bold text-md hover:bg-primaryHover transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            Approve Campaign
          </button>

          {/* Copy */}
          {/* <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/0.03 text-white/50 font-bold text-md hover:bg-white/[0.07] hover:text-white transition-all"
          >
            {copied
              ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button> */}
        </div>
      </div>

      {/* ── CAMPAIGN LOGO + TITLE ─────────────────────────────────────────── */}
      {(localBrief.campaign_logo_url || localBrief.title) && (
        <div className="flex items-center gap-5 mb-8 bg-black/30 border border-white/0.06 rounded-2xl p-5">
          {localBrief.campaign_logo_url && (
            <Image
              src={localBrief.campaign_logo_url}
              alt="Campaign Logo"
              width={72}
              height={72}
              className="object-contain rounded-xl shrink-0"
              priority
            />
          )}
          <div>
            <p className="text-10px font-semibold uppercase tracking-widest text-white/30 mb-1">Campaign</p>
            <h3 className="text-2xl font-bold text-white">{localBrief.title}</h3>
          </div>
        </div>
      )}

      {/* ── EXECUTIVE SUMMARY ─────────────────────────────────────────────── */}
      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/0.06 border-l-4 border-l-primaryButton mb-8 overflow-hidden">
        {/* pink glow */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none bg-primaryButton/8" />
        <div className="flex items-center gap-2.5 mb-5">
          <BookCheck className="w-5 h-5 text-primarytext" />
          <h4 className="text-md font-black text-white/80 uppercase tracking-[0.12em]">Executive Summary</h4>
        </div>
        <EditableText
          value={localBrief.brand_name_influencer_campaign_brief ?? ''}
          editable={editable}
          rows={4}
          placeholder="Describe the campaign executive summary…"
          onChange={(v) => setStr('brand_name_influencer_campaign_brief', v)}
        />
      </div>

      {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <BriefCard icon={<Info className="w-6 h-6" />} title="Campaign Overview" accent="secondary">
          <EditableList items={localBrief.campaign_overview ?? []} editable={editable}
            placeholder="One item per line…" onChange={(v: string[]) => setArr('campaign_overview', v)} />
        </BriefCard>

        <BriefCard icon={<MousePointerClick className="w-6 h-6" />} title="Campaign Objectives" accent="primary">
          <EditableList items={localBrief.campaign_objectives ?? []} editable={editable}
            placeholder="One objective per line…" onChange={(v: string[]) => setArr('campaign_objectives', v)} />
        </BriefCard>

        <BriefCard icon={<Users className="w-6 h-6" />} title="Target Audience" accent="secondary">
          <EditableList items={localBrief.target_audience ?? []} editable={editable}
            placeholder="One audience segment per line…" onChange={(v: string[]) => setArr('target_audience', v)} />
        </BriefCard>

        <BriefCard icon={<UserSearch className="w-6 h-6" />} title="Influencer Profile" accent="primary">
          <EditableList items={localBrief.influencer_profile ?? []} editable={editable}
            placeholder="One profile trait per line…" onChange={(v: string[]) => setArr('influencer_profile', v)} />
        </BriefCard>

        <BriefCard icon={<Megaphone className="w-6 h-6" />} title="Key Campaign Message" accent="primary">
          <EditableList items={localBrief.key_campaign_message ?? []} editable={editable}
            placeholder="One message point per line…" onChange={(v: string[]) => setArr('key_campaign_message', v)} />
        </BriefCard>

        <BriefCard icon={<Film className="w-6 h-6" />} title="Content Direction" accent="secondary">
          <EditableList items={localBrief.content_direction ?? []} editable={editable}
            placeholder="One direction point per line…" onChange={(v: string[]) => setArr('content_direction', v)} />
        </BriefCard>

        <BriefCard icon={<Package className="w-6 h-6" />} title="Deliverables" accent="primary">
          <EditableList items={localBrief.deliverables_per_influencer ?? []} editable={editable}
            placeholder="One deliverable per line…" onChange={(v: string[]) => setArr('deliverables_per_influencer', v)} />
        </BriefCard>

        <BriefCard icon={<span className="text-2xl font-black leading-none">#</span>} title="Hashtags & Mentions" accent="secondary">
          <EditableList items={localBrief.hashtags_mentions ?? []} editable={editable}
            placeholder="#hashtag or @mention per line…" onChange={(v: string[]) => setArr('hashtags_mentions', v)} />
        </BriefCard>

        <BriefCard icon={<Calendar className="w-6 h-6" />} title="Timeline" accent="primary">
          <EditableList items={localBrief.timeline ?? []} editable={editable}
            placeholder="One timeline step per line…" onChange={(v: string[]) => setArr('timeline', v)} />
        </BriefCard>

        <BriefCard icon={<CheckCircle2 className="w-6 h-6" />} title="Approval Process" accent="secondary">
          <EditableList items={localBrief.approval_process ?? []} editable={editable}
            placeholder="One step per line…" onChange={(v: string[]) => setArr('approval_process', v)} />
        </BriefCard>

        <BriefCard icon={<BarChart3 className="w-6 h-6" />} title="KPIs & Success Metrics" accent="primary">
          <EditableList items={localBrief.kpis_success_metrics ?? []} editable={editable}
            placeholder="One KPI per line…" onChange={(v: string[]) => setArr('kpis_success_metrics', v)} />
        </BriefCard>

        <BriefCard icon={<ShieldCheck className="w-6 h-6" />} title="Usage Rights" accent="secondary">
          <EditableList items={localBrief.usage_rights ?? []} editable={editable}
            placeholder="One right per line…" onChange={(v: string[]) => setArr('usage_rights', v)} />
        </BriefCard>

        {/* Do's & Don'ts */}
        <BriefCard icon={<BookCheck className="w-6 h-6" />} title="Do's & Don'ts" accent="primary" colSpan>
          <EditableList items={localBrief.dos_donts ?? []} editable={editable}
            placeholder="One item per line. Prefix with ✓ or ✗ to distinguish…"
            onChange={(v: string[]) => setArr('dos_donts', v)} />
        </BriefCard>

        {/* ── Campaign Images ── */}
        <div className="md:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/0.06 border-l-4 border-l-purple-500">
          <div className="flex items-center gap-2.5 mb-1">
            <ImageIcon className="w-4 h-4 text-purple-400" />
            <h4 className="text-xs font-black text-white/80 uppercase tracking-[0.12em]">Campaign Images</h4>
          </div>
          <p className="text-xs text-white/30 italic mb-5">
            {editable ? 'Upload product images for this campaign.' : 'Click Edit to manage images.'}
          </p>

          <div className="flex flex-wrap gap-3">
            {campaignImages.map((img, i) => (
              <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-md">
                <Image src={URL.createObjectURL(img)} alt={`img-${i}`} fill className="object-cover" />
                {editable && (
                  <button
                    type="button"
                    onClick={() => setCampaignImages(campaignImages.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-deleteButton rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            ))}

            <label
              htmlFor="img-upload"
              className={`w-24 h-24 flex flex-col items-center justify-center border-2 rounded-xl transition-all gap-1 text-white/40
                ${editable
                  ? 'border-dashed border-primaryButton/30 hover:border-primaryButton/60 hover:bg-primaryButton/5 hover:text-primarytext cursor-pointer'
                  : 'border-white/10 cursor-not-allowed opacity-30'}`}
            >
              <ImageIcon className="w-6 h-6" />
              <span className="text-[10px] font-medium">Add</span>
            </label>
            <input id="img-upload" type="file" accept="image/*" multiple disabled={!editable}
              onChange={(e) => {
                if (e.target.files)
                  setCampaignImages([...campaignImages, ...Array.from(e.target.files)]);
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* ── Links ── */}
        <div className="md:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/0.06 border-l-4 border-l-primaryButton">
          <div className="flex items-center gap-2.5 mb-1">
            <Link2 className="w-6 h-6 text-primarytext" />
            <h4 className="text-xs font-black text-white/80 uppercase tracking-[0.12em]">Reference Links</h4>
          </div>
          <p className="text-xs text-white/30 italic mb-5">Click <span className="text-primaryButton">Edit</span> to add Reference Links for this campaign.</p>

          <div className="space-y-2.5">
            {videoLinks.map((link, i) => (
              <div key={i} className="flex gap-2.5 items-center">
                <div className="flex-1 flex items-center gap-3 bg-black/30 border border-white/0.08 rounded-xl px-4 py-2.5 focus-within:border-primaryButton/40 transition-colors">
                  <Link2 className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  <input
                    type="text"
                    value={link}
                    disabled={!editable}
                    onChange={(e) => setVideoLinks(videoLinks.map((v, idx) => idx === i ? e.target.value : v))}
                    className="bg-transparent border-none text-md text-white placeholder:text-white/25 focus:ring-0 focus:outline-none w-full disabled:opacity-60"
                    placeholder="https://…"
                  />
                </div>
                {editable && (
                  <button
                    onClick={() => setVideoLinks(videoLinks.filter((_, idx) => idx !== i))}
                    className="w-8 h-8 rounded-lg bg-deleteButton/10 border border-deleteButton/20 flex items-center justify-center text-delete-text hover:bg-deleteButton/20 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}

            {editable && (
              <div className="flex gap-2.5 pt-1">
                <div className="flex-1 flex items-center gap-3 bg-black/30 border border-white/0.08 rounded-xl px-4 py-2.5 focus-within:border-primaryButton/40 transition-colors">
                  <Link2 className="w-3.5 h-3.5 text-white/25 shrink-0" />
                  <input
                    type="text"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addLink()}
                    className="bg-transparent border-none text-md text-white placeholder:text-white/25 focus:ring-0 focus:outline-none w-full"
                    placeholder="Paste a link and press Add or Enter…"
                  />
                </div>
                <button
                  onClick={addLink}
                  className="px-4 py-2 bg-primaryButton/10 border border-primaryButton/20 text-primarytext text-md font-bold rounded-xl hover:bg-primaryButton/20 transition-colors"
                >
                  Add
                </button>
              </div>
            )}

            {!videoLinks.length && !editable && (
              <p className="text-md text-white/25 italic">There is no reference links added yet .</p>
            )}
          </div>
        </div>

      </div>{/* end grid */}
    </div>
  );
};

export default CampaignBriefResult;