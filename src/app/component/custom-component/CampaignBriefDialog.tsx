'use client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Pencil, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Section } from './briefsection';
import useUpdateCampaignBrief from '@/src/routes/Company/api/Hooks/useUpdateCampaignBriefHook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import jsPDF from 'jspdf';
import Image from 'next/image';

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

  const updateSection = (key: keyof UpdateCampaignBrief, value: string[]) => {
    if (!localBrief) return;
    setLocalBrief({ ...localBrief, [key]: value });
  };

  /**
   * Load image bytes for jsPDF. S3 URLs fail in the browser (CORS), so we try the
   * same-origin API proxy first: GET /api/campaign-brief-image?url=...
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
    ): Promise<{
      dataUrl: string;
      format: 'JPEG' | 'PNG' | 'WEBP';
      w: number;
      h: number;
    } | null> =>
      new Promise((resolve) => {
        if (!blob.type.startsWith('image/')) {
          resolve(null);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          const img = new window.Image();
          img.onload = () => {
            let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG';
            if (blob.type.includes('png')) format = 'PNG';
            else if (blob.type.includes('webp')) format = 'WEBP';
            resolve({
              dataUrl,
              format,
              w: img.naturalWidth,
              h: img.naturalHeight,
            });
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
    } catch {
      // fall through
    }

    return new Promise((resolve) => {
      const finish = (dataUrl: string, mime: string, w: number, h: number) => {
        let format: 'JPEG' | 'PNG' | 'WEBP' = 'JPEG';
        if (mime.includes('png')) format = 'PNG';
        else if (mime.includes('webp')) format = 'WEBP';
        resolve({ dataUrl, format, w, h });
      };

      fetch(trimmed, { mode: 'cors' })
        .then((res) => {
          if (!res.ok) throw new Error('fetch failed');
          return res.blob();
        })
        .then((blob) => {
          if (!blob.type.startsWith('image/')) throw new Error('not an image');
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result as string;
            const img = new window.Image();
            img.onload = () =>
              finish(dataUrl, blob.type, img.naturalWidth, img.naturalHeight);
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
              canvas.width = img.naturalWidth;
              canvas.height = img.naturalHeight;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                resolve(null);
                return;
              }
              ctx.drawImage(img, 0, 0);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
              finish(dataUrl, 'image/jpeg', img.naturalWidth, img.naturalHeight);
            } catch {
              resolve(null);
            }
          };
          img.onerror = () => resolve(null);
          img.src = trimmed;
        });
    });
  };

  const handleExportPDF = async () => {
    if (!localBrief) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;
    const margin = 15;
    const textWidth = pageWidth - margin * 2;

    const checkPageBreak = (lines: number) => {
      const requiredHeight = lines * 6;
      if (y + requiredHeight > pageHeight - 15) {
        doc.addPage();
        y = 20;
      }
    };

    const addSection = (title: string, items: string[]) => {
      if (!items || items.length === 0) return;

      checkPageBreak(2);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(title, margin, y);
      y += 8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      items.forEach((item) => {
        const splitText = doc.splitTextToSize(`• ${item}`, textWidth);
        checkPageBreak(splitText.length);
        doc.text(splitText, margin + 4, y);
        y += splitText.length * 6;
      });

      y += 4;
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Campaign Brief', margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const brandText = doc.splitTextToSize(
      localBrief.brand_name_influencer_campaign_brief || '',
      textWidth,
    );

    doc.text(brandText, margin, y);
    y += brandText.length * 6 + 5;

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
      doc.addPage();
      y = 20;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Product Images', margin, y);
      y += 10;

      const maxImgW = textWidth;
      const maxImgH = 90;

      for (const link of localBrief.product_image_urls) {
        const loaded = await loadImageForPdf(link.trim());
        if (!loaded) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(120, 120, 120);
          const fallback = doc.splitTextToSize(
            `(Could not embed image) ${link}`,
            textWidth,
          );
          if (y + fallback.length * 5 > pageHeight - 15) {
            doc.addPage();
            y = 20;
          }
          doc.text(fallback, margin, y);
          y += fallback.length * 5 + 4;
          doc.setTextColor(0, 0, 0);
          doc.link(margin, y - fallback.length * 5 - 2, textWidth, 6, { url: link });
          continue;
        }

        const { w, h, dataUrl, format } = loaded;
        let drawW = maxImgW;
        let drawH = (h / w) * drawW;
        if (drawH > maxImgH) {
          drawH = maxImgH;
          drawW = (w / h) * drawH;
        }

        if (y + drawH > pageHeight - 15) {
          doc.addPage();
          y = 20;
        }

        try {
          doc.addImage(dataUrl, format, margin, y, drawW, drawH);
        } catch {
          try {
            doc.addImage(dataUrl, 'JPEG', margin, y, drawW, drawH);
          } catch {
            const splitText = doc.splitTextToSize(link, textWidth);
            doc.text(splitText, margin, y);
            doc.link(margin, y - 4, textWidth, 6, { url: link });
            y += splitText.length * 6 + 4;
            continue;
          }
        }
        y += drawH + 8;
      }
    }
    if (localBrief.video_links?.length) {
      doc.addPage();
      y = 20;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Links', margin, y);
      y += 10;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      localBrief.video_links.forEach((link: string) => {
        const splitText = doc.splitTextToSize(link, textWidth);
        doc.text(splitText, margin, y);
        doc.link(margin, y - 4, textWidth, 6, { url: link });
        y += splitText.length * 6 + 4;
      });
    }

    doc.save('campaign-brief.pdf');
  };
  const handleSave = () => {
    if (!localBrief?.id) return toast.error('Brief ID missing');

    updateBrief(
      {
        brief: localBrief,
      },
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
      <DialogContent className="w-[95vw]! max-w-300! h-[92vh] bg-linear-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl overflow-y-auto p-0">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-10 border-b border-white/10 gap-6">
          {/* LEFT SIDE */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Campaign Logo */}
            {localBrief.campaign_logo_url && (
              <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white/5 p-2 border border-white/10">
                <Image
                  src={localBrief.campaign_logo_url}
                  alt="Campaign Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {/* Campaign Description */}
            <div>
              <p className="text-neutral-400 max-w-3xl text-sm leading-relaxed">
                {localBrief.brand_name_influencer_campaign_brief}
              </p>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              size="sm"
              className="flex items-center gap-2 rounded-full bg-primaryButton hover:opacity-90"
              onClick={editable ? handleSave : () => setEditable(true)}
              disabled={isPending}
            >
              {editable ? <Save size={16} /> : <Pencil size={16} />}
              {editable ? (isPending ? 'Saving...' : 'Save') : 'Edit'}
            </Button>

            {editable && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-white/20 hover:border-primaryButton hover:text-white"
                onClick={() => {
                  setLocalBrief(briefData);
                  setEditable(false);
                }}
              >
                Cancel
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              className="rounded-full border-white/20 hover:border-primaryButton hover:text-white"
              onClick={handleExportPDF}
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* SECTIONS */}
        <div className="p-10 grid md:grid-cols-2 gap-8">
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
        {/* MEDIA SECTION */}
        <div className="px-10 pb-10 space-y-6">
          {/* Product Images */}
          {localBrief.product_image_urls && localBrief.product_image_urls.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Product Images</h3>

              <div className="flex flex-wrap gap-4">
                {localBrief.product_image_urls.map((img: string, index: number) => (
                  <div
                    key={index}
                    className="relative w-28 h-28 rounded-xl overflow-hidden border border-white/10"
                  >
                    <Image
                      src={img}
                      alt={`product-${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {localBrief.video_links && localBrief.video_links.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Links</h3>

              <div className="flex flex-col gap-2">
                {localBrief.video_links.map((link: string, index: number) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primaryButton hover:underline text-sm"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
