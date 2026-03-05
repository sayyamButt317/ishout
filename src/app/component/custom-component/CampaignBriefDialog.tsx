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
  onUpdate?: (updatedBrief: UpdateCampaignBrief) => void; // parent callback
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

  const handleExportPDF = () => {
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

    // Title
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

    doc.save('campaign-brief.pdf');
  };
  const handleSave = () => {
    if (!localBrief?.id) return toast.error('Brief ID missing');

    updateBrief(localBrief, {
      onSuccess: (data) => {
        toast.success('Campaign brief updated successfully');
        setLocalBrief(data);
        setEditable(false);
        if (onUpdate) onUpdate(data);
      },
      onError: () => toast.error('Failed to update campaign brief'),
    });
  };

  if (!localBrief) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[95vw] !max-w-[1200px] h-[92vh] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl overflow-y-auto p-0">
        {/* HEADER */}
        <div className="flex items-center justify-between p-10 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Campaign Logo */}
            {localBrief.campaign_logo_url && (
              <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white/5 p-2 border border-white/10">
                <Image
                  src={localBrief.campaign_logo_url}
                  alt="Campaign Logo"
                  fill
                  className="object-contain"
                  priority // optional, if it's above the fold and important for LCP
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

          <div className="flex gap-2">
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
      </DialogContent>
    </Dialog>
  );
}
