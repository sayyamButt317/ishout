'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FileText, ArrowUpDown, Download, Search } from 'lucide-react';
import useAuthStore from '@/src/store/AuthStore/authStore';
import CampaignBriefHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-hook';
import { CampaignBriefItem } from '@/src/types/Compnay/campaign-brief.types';

export default function CampaignBriefPage() {
  const { user_id } = useAuthStore();
  const { data, isLoading } = CampaignBriefHook(user_id);

  const [selectedBrief, setSelectedBrief] =
    useState<CampaignBriefItem | null>(null);
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] =
    useState<'newest' | 'oldest'>('newest');
  const [search, setSearch] = useState('');

  const briefs: CampaignBriefItem[] = data ?? [];
  const filteredBriefs = useMemo(() => {
    return briefs
      .filter((brief) => {
        const title =
          brief.response.title?.toLowerCase() || '';
        const description =
          brief.response
            .brand_name_influencer_campaign_brief?.toLowerCase() ||
          '';
        return (
          title.includes(search.toLowerCase()) ||
          description.includes(search.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest'
          ? dateB - dateA
          : dateA - dateB;
      });
  }, [briefs, sortOrder, search]);

  // const handleExportPDF = () => {
  //   if (!selectedBrief) return;
  //   const content = `
  //     ${selectedBrief.response.title}
  //     ${selectedBrief.response.brand_name_influencer_campaign_brief}
  //     ${Object.entries(selectedBrief.response)
  //       .filter(([key]) => key !== 'title' && key !== 'id')
  //       .map(([key, value]) => {
  //         if (Array.isArray(value)) {
  //           return `\n${key
  //             .replaceAll('_', ' ')
  //             .toUpperCase()}\n- ${value.join('\n- ')}`;
  //         }
  //         return '';
  //       })
  //       .join('\n')}
  //   `;

  //   const blob = new Blob([content], {
  //     type: 'application/pdf',
  //   });

  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = `${selectedBrief.response.title}.pdf`;
  //   link.click();
  // };

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
        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>
        <ul className="space-y-2 text-sm text-neutral-300 list-disc list-inside">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        Loading Campaign Briefs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 md:px-12 py-10">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Campaign Briefs
          </h1>
          <p className="text-neutral-400 mt-2">
            Search, manage and download your AI-generated campaign strategies.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
            <input
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primaryButton"
            />
          </div>

          {/* 🔄 Sort */}
          <Button
            variant="outline"
            className="border-white/10 bg-white/5 hover:bg-white/10"
            onClick={() =>
              setSortOrder(
                sortOrder === 'newest' ? 'oldest' : 'newest'
              )
            }
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortOrder === 'newest'
              ? 'Newest First'
              : 'Oldest First'}
          </Button>
        </div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBriefs.map((brief) => (
          <Card
            key={brief.id}
            className="bg-gradient-to-br from-neutral-900 to-neutral-950
              border border-white/10 rounded-3xl
              hover:border-primaryButton/40 transition-all duration-300"
          >
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white line-clamp-2">
                {brief.response.title}
              </h3>

              <p className="text-sm text-neutral-400 line-clamp-3">
                {
                  brief.response
                    .brand_name_influencer_campaign_brief
                }
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-neutral-500">
                  {new Date(
                    brief.created_at
                  ).toLocaleDateString()}
                </span>

                <Button
                  size="sm"
                  className="rounded-full bg-primaryButton hover:opacity-90"
                  onClick={() => {
                    setSelectedBrief(brief);
                    setOpen(true);
                  }}
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="
    !w-[95vw] !max-w-[1200px] h-[92vh] bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-white/10 rounded-3xl overflow-y-auto p-0
  "
        >
          {selectedBrief && (
            <>
              <div className="p-10 border-b border-white/10 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-primaryButton/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primaryButton" />
                    </div>

                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {selectedBrief.response.title}
                      </h2>
                      <p className="text-neutral-400 mt-3 max-w-3xl text-sm">
                        {
                          selectedBrief.response
                            .brand_name_influencer_campaign_brief
                        }
                      </p>
                    </div>
                  </div>

                  {/* 📄 Export Button */}
                  {/* <Button
                    onClick={handleExportPDF}
                    className="rounded-full bg-primaryButton hover:opacity-90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button> */}
                </div>

                <div className="text-xs text-neutral-500 mt-4">
                  Created on{' '}
                  {new Date(
                    selectedBrief.created_at
                  ).toLocaleString()}
                </div>
              </div>

              {/* BODY */}
              <div className="p-10 grid md:grid-cols-2 gap-8">
                <Section
                  title="Campaign Overview"
                  items={selectedBrief.response.campaign_overview}
                />
                <Section
                  title="Campaign Objectives"
                  items={selectedBrief.response.campaign_objectives}
                />
                <Section
                  title="Target Audience"
                  items={selectedBrief.response.target_audience}
                />
                <Section
                  title="Influencer Profile"
                  items={selectedBrief.response.influencer_profile}
                />
                <Section
                  title="Content Direction"
                  items={selectedBrief.response.content_direction}
                />
                <Section
                  title="Deliverables"
                  items={selectedBrief.response.deliverables_per_influencer}
                />
                <Section
                  title="Timeline"
                  items={selectedBrief.response.timeline}
                />
                <Section
                  title="KPIs & Success Metrics"
                  items={selectedBrief.response.kpis_success_metrics}
                />
                <Section
                  title="Usage Rights"
                  items={selectedBrief.response.usage_rights}
                />
                <Section
                  title="Do’s & Don’ts"
                  items={selectedBrief.response.dos_donts}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
