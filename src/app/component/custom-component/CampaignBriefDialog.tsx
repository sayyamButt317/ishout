'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FileText } from 'lucide-react';

interface CampaignBriefDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefData: {
    title?: string;
    brand_name_influencer_campaign_brief?: string;
    campaign_overview?: string[];
    campaign_objectives?: string[];
    target_audience?: string[];
    influencer_profile?: string[];
    content_direction?: string[];
    deliverables_per_influencer?: string[];
    timeline?: string[];
    kpis_success_metrics?: string[];
    usage_rights?: string[];
    dos_donts?: string[];
    created_at?: string;
  } | null | undefined;
}

const Section = ({
  title,
  items,
}: {
  title: string;
  items?: string[];
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default function CampaignBriefDialog({
  open,
  onOpenChange,
  briefData,
}: CampaignBriefDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!w-[95vw] !max-w-[1200px] h-[92vh] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl overflow-y-auto p-0">
        {briefData && (
          <>
            <div className="p-10 border-b border-white/10 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primaryButton/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primaryButton" />
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {briefData.title}
                    </h2>
                    <p className="text-neutral-400 mt-3 max-w-3xl text-sm">
                      {briefData.brand_name_influencer_campaign_brief}
                    </p>
                  </div>
                </div>
              </div>

              {briefData.created_at && (
                <div className="text-xs text-neutral-500 mt-4">
                  Created on{' '}
                  {new Date(briefData.created_at).toLocaleString()}
                </div>
              )}
            </div>

            <div className="p-10 grid md:grid-cols-2 gap-8">
              <Section
                title="Campaign Overview"
                items={briefData.campaign_overview}
              />
              <Section
                title="Campaign Objectives"
                items={briefData.campaign_objectives}
              />
              <Section
                title="Target Audience"
                items={briefData.target_audience}
              />
              <Section
                title="Influencer Profile"
                items={briefData.influencer_profile}
              />
              <Section
                title="Content Direction"
                items={briefData.content_direction}
              />
              <Section
                title="Deliverables"
                items={briefData.deliverables_per_influencer}
              />
              <Section title="Timeline" items={briefData.timeline} />
              <Section
                title="KPIs & Success Metrics"
                items={briefData.kpis_success_metrics}
              />
              <Section
                title="Usage Rights"
                items={briefData.usage_rights}
              />
              <Section title="Do's & Don'ts" items={briefData.dos_donts} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

