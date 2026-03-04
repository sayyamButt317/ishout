'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Search } from 'lucide-react';
import useAuthStore from '@/src/store/AuthStore/authStore';
import CampaignBriefHook, {
  DeleteCampaignBriefHook,
} from '@/src/routes/Company/api/Hooks/get-campaign-brief-hook';
import { CampaignBriefItem } from '@/src/types/Compnay/campaign-brief.types';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import { Trash } from 'lucide-react';
import Spinner from '@/src/app/component/custom-component/spinner';

export default function CampaignBriefPage() {
  const { user_id } = useAuthStore();
  const { data, isLoading } = CampaignBriefHook(user_id);
  const deleteBriefMutation = DeleteCampaignBriefHook(user_id);

  const [selectedBrief, setSelectedBrief] = useState<CampaignBriefItem | null>(null);
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [search, setSearch] = useState('');


  const briefs = useMemo(() => data ?? [], [data]);

  const filteredBriefs = useMemo(() => briefs.filter((brief) => brief.response.title?.toLowerCase().includes(search.toLowerCase()) || brief.response.brand_name_influencer_campaign_brief?.toLowerCase().includes(search.toLowerCase())), [briefs, search]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <Spinner size={24} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 md:px-12 py-10">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Campaign Brief</h1>
          <p className="italic text-sm text-neutral-400 mt-2">
            Search, manage and download your AI-generated campaign briefs.
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
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
          >
            <ArrowUpDown className="w-4 h-4 mr-2" />
            {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
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
                {brief.response.brand_name_influencer_campaign_brief}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-neutral-500">
                  {new Date(brief.created_at).toLocaleDateString()}
                </span>

                <div className="flex items-center gap-2">
                  {/* ================= DELETE BUTTON ================= */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => deleteBriefMutation.mutate(brief.id)}
                  >
                    <Trash className="size-5" />
                  </Button>

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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CampaignBriefDialog
        open={open}
        onOpenChange={setOpen}
        briefData={selectedBrief?.response}
      />
    </div>
  );
}
