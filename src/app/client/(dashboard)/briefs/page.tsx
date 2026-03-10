'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Search, Trash } from 'lucide-react';
import useAuthStore from '@/src/store/AuthStore/authStore';
import CampaignBriefHook, {
  DeleteCampaignBriefHook,
} from '@/src/routes/Company/api/Hooks/get-campaign-brief-hook';
import { CampaignBriefItem } from '@/src/types/Compnay/campaign-brief.types';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import Image from 'next/image';
import ImageUploadModal from '@/src/app/component/custom-component/image-upload-modal';
import UploadCampaignLogoHook from '@/src/routes/Company/api/Hooks/upload-campaign-logo-hook';

export default function CampaignBriefPage() {
  const { user_id } = useAuthStore();
  const { data, isLoading } = CampaignBriefHook(user_id);

  const deleteBriefMutation = DeleteCampaignBriefHook(user_id);

  const [briefs, setBriefs] = useState<CampaignBriefItem[]>(data ?? []);
  const [selectedBrief, setSelectedBrief] = useState<CampaignBriefItem | null>(null);

  const [uploadModalOpen, setUploadModalOpen] = useState<string | null>(null);
  const uploadLogoMutation = UploadCampaignLogoHook();

  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (data) setBriefs(data);
  }, [data]);

  const filteredBriefs = useMemo(() => {
    return briefs
      .filter((brief) => {
        const title = brief.response.title?.toLowerCase() || '';
        const description =
          brief.response.brand_name_influencer_campaign_brief?.toLowerCase() || '';

        return (
          title.includes(search.toLowerCase()) ||
          description.includes(search.toLowerCase())
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [briefs, sortOrder, search]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        Loading Campaign Briefs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 md:px-12 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Campaign Briefs</h1>
          <p className="text-neutral-400 mt-2">
            Search, manage and download your AI-generated campaign strategies.
          </p>
        </div>

        {/* Search + Sort */}
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

      {/* Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBriefs.map((brief) => (
          <Card
            key={brief.id}
            className="relative bg-linear-to-br from-neutral-900 to-neutral-950 border border-white/10 rounded-3xl hover:border-primaryButton/40 transition-all duration-300"
          >
            {/* Delete Button */}
            <button
              onClick={() =>
                deleteBriefMutation.mutate(brief.id, {
                  onSuccess: () =>
                    setBriefs((prev) => prev.filter((b) => b.id !== brief.id)),
                })
              }
              className="absolute top-4 right-4 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-full transition"
            >
              <Trash className="size-4" />
            </button>

            <CardContent className="p-6 space-y-4">
              {/* Logo + Title */}
              <div className="flex items-center gap-3">
                <div
                  className="relative w-[72px] h-[72px] shrink-0 cursor-pointer rounded-md border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden hover:border-primaryButton/40 transition"
                  onClick={() => setUploadModalOpen(brief.id)}
                >
                  {brief.response.campaign_logo_url ? (
                    <Image
                      src={brief.response.campaign_logo_url}
                      alt="Campaign Logo"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-white/40 text-sm font-medium">Upload</span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white line-clamp-2">
                  {brief.response.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-3">
                {brief.response.brand_name_influencer_campaign_brief}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs text-neutral-500">
                  {new Date(brief.created_at).toLocaleDateString()}
                </span>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full border-white/20 hover:border-primaryButton hover:text-white"
                    onClick={() => {
                      setSelectedBrief(brief);
                      setOpen(true);
                    }}
                  >
                    Edit
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

      {/* Campaign Brief Dialog */}
      <CampaignBriefDialog
        open={open}
        onOpenChange={setOpen}
        briefData={
          selectedBrief?.response
            ? { ...selectedBrief.response, id: selectedBrief.id }
            : null
        }
        onUpdate={(updatedBrief) => {
          if (!selectedBrief) return;

          const mergedResponse = { ...selectedBrief.response, ...updatedBrief };

          setSelectedBrief({ ...selectedBrief, response: mergedResponse });

          setBriefs((prev) =>
            prev.map((b) =>
              b.id === selectedBrief.id ? { ...b, response: mergedResponse } : b,
            ),
          );
        }}
      />

      <ImageUploadModal
        open={uploadModalOpen !== null}
        onClose={() => setUploadModalOpen(null)}
        currentImageUrl={
          filteredBriefs.find((b) => b.id === uploadModalOpen)?.response
            ?.campaign_logo_url || null
        }
        isLoading={uploadLogoMutation.isPending}
        onUpload={(file) => {
          if (!uploadModalOpen) return;

          uploadLogoMutation.mutate(
            { brief_id: uploadModalOpen, file },
            {
              onSuccess: (data) => {
                const newLogoUrl = data.logo_url;

                setBriefs((prev) =>
                  prev.map((b) =>
                    b.id === uploadModalOpen
                      ? {
                          ...b,
                          response: {
                            ...b.response,
                            campaign_logo_url: newLogoUrl,
                          },
                        }
                      : b,
                  ),
                );
                setUploadModalOpen(null);
              },
            },
          );
        }}
      />
    </div>
  );
}
