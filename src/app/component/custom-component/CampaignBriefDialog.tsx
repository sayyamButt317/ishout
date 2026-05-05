'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Pencil, Save, X,
  BarChart3, Link2, ImageIcon, Users, Megaphone, Film,
  Package, Calendar, BookCheck, ShieldCheck, Info,
  MousePointerClick, UserSearch, Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import useUpdateCampaignBrief from '@/src/routes/Company/api/Hooks/useUpdateCampaignBriefHook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import jsPDF from 'jspdf';
import Image from 'next/image';
import BriefCard from './BriefCard';
import EditableList from '@/src/app/component/custom-component/EditableList';

interface CampaignBriefDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefData: UpdateCampaignBrief | null;
  onUpdate?: (updatedBrief: UpdateCampaignBrief) => void;
}

export default function CampaignBriefDialog({
  open,
  onOpenChange,
  briefData,
  onUpdate,
}: CampaignBriefDialogProps) {
  const [editable, setEditable] = useState(false);
  const [localBrief, setLocalBrief] = useState<UpdateCampaignBrief | null>(briefData);

  const { mutate: updateBrief, isPending } = useUpdateCampaignBrief();

  useEffect(() => {
    if (open && briefData) {
      const id = setTimeout(() => {
        setLocalBrief(briefData);
        setEditable(false);
      }, 0);
      return () => clearTimeout(id);
    }
  }, [open, briefData]);

  const setArr = (key: keyof UpdateCampaignBrief, value: string[]) => {
    if (!localBrief) return;
    setLocalBrief({ ...localBrief, [key]: value });
  };

  /**
   * Load image bytes for jsPDF.
   */
  const loadImageForPdf = async (
    url: string,
  ): Promise<{
    dataUrl: string;
    format: 'JPEG' | 'PNG' | 'WEBP';
    w: number;
    h: number;
  } | null> => {
    const trimmed = url.trim();
    const blobToPdfImage = (
      blob: Blob,
    ): Promise<{ dataUrl: string; format: 'JPEG' | 'PNG' | 'WEBP'; w: number; h: number } | null> =>
      new Promise((resolve) => {
        if (!blob.type.startsWith('image/')) { resolve(null); return; }
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const img = new window.Image();
          img.onload = () => {
            let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG';
            if (blob.type.includes('png')) format = 'PNG';
            else if (blob.type.includes('webp')) format = 'WEBP';
            resolve({ dataUrl, format, w: img.naturalWidth, h: img.naturalHeight });
          };
          img.onerror = () => resolve(null);
          img.src = dataUrl;
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });

    const proxyPath = `/api/campaign-brief-image?url=${encodeURIComponent(trimmed)}`;
    try {
      const proxied = await fetch(proxyPath);
      if (proxied.ok) {
        const blob = await proxied.blob();
        const fromProxy = await blobToPdfImage(blob);
        if (fromProxy) return fromProxy;
      }
    } catch { /* fall through */ }

    return new Promise((resolve) => {
      const finish = (dataUrl: string, mime: string, w: number, h: number) => {
        let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG';
        if (mime.includes('png')) format = 'PNG';
        else if (mime.includes('webp')) format = 'WEBP';
        resolve({ dataUrl, format, w, h });
      };
      fetch(trimmed, { mode: 'cors' })
        .then((res) => { if (!res.ok) throw new Error('fetch failed'); return res.blob(); })
        .then((blob) => {
          if (!blob.type.startsWith('image/')) throw new Error('not an image');
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const img = new window.Image();
            img.onload = () => finish(dataUrl, blob.type, img.naturalWidth, img.naturalHeight);
            img.onerror = () => resolve(null);
            img.src = dataUrl;
          };
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(blob);
        })
        .catch(() => {
          const img = new window.Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) { resolve(null); return; }
              ctx.drawImage(img, 0, 0);
              finish(canvas.toDataURL('image/jpeg', 0.9), 'image/jpeg', img.naturalWidth, img.naturalHeight);
            } catch { resolve(null); }
          };
          img.onerror = () => resolve(null);
          img.src = trimmed;
        });
    });
  };

  const handleExportPDF = async () => {
    if (!localBrief) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;
    const margin = 15;
    const textWidth = pageWidth - margin * 2;

    const checkPageBreak = (lines: number) => {
      if (y + lines * 6 > pageHeight - 15) { doc.addPage(); y = 20; }
    };
    const addSection = (title: string, items: string[]) => {
      if (!items?.length) return;
      checkPageBreak(2);
      doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
      doc.text(title, margin, y); y += 8;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
      items.forEach((item) => {
        const split = doc.splitTextToSize(`• ${item}`, textWidth);
        checkPageBreak(split.length);
        doc.text(split, margin + 4, y); y += split.length * 6;
      });
      y += 4;
    };

    doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
    doc.text('Campaign Brief', margin, y); y += 10;
    doc.setFontSize(12); doc.setFont('helvetica', 'normal');
    const brandText = doc.splitTextToSize(localBrief.brand_name_influencer_campaign_brief || '', textWidth);
    doc.text(brandText, margin, y); y += brandText.length * 6 + 5;

    addSection('Campaign Overview', localBrief.campaign_overview);
    addSection('Campaign Objectives', localBrief.campaign_objectives);
    addSection('Target Audience', localBrief.target_audience);
    addSection('Influencer Profile', localBrief.influencer_profile);
    addSection('Key Campaign Message', localBrief.key_campaign_message);
    addSection('Content Direction', localBrief.content_direction);
    addSection('Deliverables', localBrief.deliverables_per_influencer);
    addSection('Hashtags & Mentions', localBrief.hashtags_mentions);
    addSection('Timeline', localBrief.timeline);
    addSection('Approval Process', localBrief.approval_process);
    addSection('KPIs & Success Metrics', localBrief.kpis_success_metrics);
    addSection('Usage Rights', localBrief.usage_rights);
    addSection("Do's & Don'ts", localBrief.dos_donts);

    if (localBrief.product_image_urls?.length) {
      doc.addPage(); y = 20;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
      doc.text('Product Images', margin, y); y += 10;
      for (const link of localBrief.product_image_urls) {
        const loaded = await loadImageForPdf(link.trim());
        if (!loaded) {
          const fallback = doc.splitTextToSize(`(Could not embed image) ${link}`, textWidth);
          if (y + fallback.length * 5 > pageHeight - 15) { doc.addPage(); y = 20; }
          doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(120, 120, 120);
          doc.text(fallback, margin, y); y += fallback.length * 5 + 4;
          doc.setTextColor(0, 0, 0);
          continue;
        }
        const { w, h, dataUrl, format } = loaded;
        let drawW = textWidth, drawH = (h / w) * drawW;
        if (drawH > 90) { drawH = 90; drawW = (w / h) * drawH; }
        if (y + drawH > pageHeight - 15) { doc.addPage(); y = 20; }
        try { doc.addImage(dataUrl, format, margin, y, drawW, drawH); }
        catch { try { doc.addImage(dataUrl, 'JPEG', margin, y, drawW, drawH); } catch { continue; } }
        y += drawH + 8;
      }
    }

    if (localBrief.video_links?.length) {
      doc.addPage(); y = 20;
      doc.setFont('helvetica', 'bold'); doc.setFontSize(16);
      doc.text('Links', margin, y); y += 10;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
      localBrief.video_links.forEach((link: string) => {
        const split = doc.splitTextToSize(link, textWidth);
        doc.text(split, margin, y);
        doc.link(margin, y - 4, textWidth, 6, { url: link });
        y += split.length * 6 + 4;
      });
    }
    doc.save('campaign-brief.pdf');
  };

  const handleSave = () => {
    if (!localBrief?.id) return toast.error('Brief ID missing');
    updateBrief(
      { brief: localBrief },
      {
        onSuccess: (data) => {
          toast.success('Campaign brief updated successfully');
          setLocalBrief(data);
          setEditable(false);
          if (onUpdate) onUpdate(data);
        },
        onError: () => toast.error('Failed to update campaign brief'),
      },
    );
  };

  if (!localBrief) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw]! max-w-300! h-[92vh] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl overflow-y-auto p-0">

        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 px-6 md:px-10 pb-8 pt-8">
          <div className="space-y-3">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondaryButton/20 text-purple-300 text-[10px] font-black uppercase tracking-widest border border-white/[0.06]">
              <Sparkles className="w-3 h-3" />
              Campaign Brief
            </div>

            {/* Logo + title */}
            <div className="flex items-center gap-4">
              {localBrief.campaign_logo_url && (
                <div className="w-14 h-14 relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                  <Image src={localBrief.campaign_logo_url} alt="Campaign Logo" fill className="object-contain p-1" priority />
                </div>
              )}
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-0.5">Campaign</p>
                <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                  {localBrief.brand_name_influencer_campaign_brief}
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={editable ? handleSave : () => setEditable(true)}
              disabled={isPending}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all
                hover:scale-[1.03] active:scale-95 disabled:opacity-50 shadow-lg shadow-primaryButton/20
                bg-primaryButton hover:bg-primaryHover cursor-pointer"
            >
              {editable
                ? isPending
                  ? <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
                  : <><Save className="w-3.5 h-3.5" />Save</>
                : <><Pencil className="w-3.5 h-3.5" />Edit</>}
            </button>

            {editable && (
              <button
                onClick={() => { setLocalBrief(briefData); setEditable(false); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-white transition-all"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}

            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm text-white transition-all"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-6 md:px-10 pt-8">

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

          <BriefCard icon={<BookCheck className="w-6 h-6" />} title="Approval Process" accent="secondary">
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

          {/* Do's & Don'ts — full width */}
          <BriefCard icon={<BookCheck className="w-6 h-6" />} title="Do's & Don'ts" accent="primary" colSpan>
            <EditableList items={localBrief.dos_donts ?? []} editable={editable}
              placeholder="One item per line. Prefix with ✓ or ✗ to distinguish…"
              onChange={(v: string[]) => setArr('dos_donts', v)} />
          </BriefCard>

          {/* ── Product Images — full width ── */}
          {localBrief.product_image_urls && localBrief.product_image_urls.length > 0 && (
            <div className="md:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] border-l-4 border-l-purple-500">
              <div className="flex items-center gap-2.5 mb-4">
                <ImageIcon className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-black text-white/80 uppercase tracking-[0.12em]">Campaign Images</h4>
              </div>
              <div className="flex flex-wrap gap-4">
                {localBrief.product_image_urls.map((img: string, index: number) => (
                  <div key={index} className="relative w-28 h-28 rounded-xl overflow-hidden border border-white/10">
                    <Image src={img} alt={`product-${index}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Reference Links — full width ── */}
          {localBrief.video_links && localBrief.video_links.length > 0 && (
            <div className="md:col-span-2 bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] border-l-4 border-l-primaryButton">
              <div className="flex items-center gap-2.5 mb-4">
                <Link2 className="w-4 h-4 text-primarytext" />
                <h4 className="text-xs font-black text-white/80 uppercase tracking-[0.12em]">Reference Links</h4>
              </div>
              <div className="flex flex-col gap-2">
                {localBrief.video_links.map((link: string, index: number) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primaryButton hover:underline"
                  >
                    <Link2 className="w-3.5 h-3.5 shrink-0" />
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* bottom padding */}
        <div className="pb-10" />
      </DialogContent>
    </Dialog>
  );
}