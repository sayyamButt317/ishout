'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Pencil } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import useAuthStore from '@/src/store/AuthStore/authStore';
import CampaignBriefHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-hook';
import { CampaignBriefItem } from '@/src/types/Compnay/campaign-brief.types';

export default function CampaignBriefPage() {
  const { user_id } = useAuthStore();

  const { data, isLoading } = CampaignBriefHook(user_id);

  const [selectedBrief, setSelectedBrief] = useState<CampaignBriefItem | null>(null);
  const [open, setOpen] = useState(false);

  const briefs: CampaignBriefItem[] = data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        Loading Campaign Briefs...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 min-h-screen py-10 px-4">
      {/* Cards List */}
      <div className="space-y-6">
        {briefs.map((brief) => (
          <Card
            key={brief.id}
            onClick={() => {
              setSelectedBrief(brief);
              setOpen(true);
            }}
            className="bg-gradient-to-r from-neutral-900/90 to-neutral-800/60 
                 border border-white/10 rounded-3xl 
                 hover:shadow-2xl hover:border-primaryButton/40
                 transition-all duration-300 cursor-pointer"
          >
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                {/* LEFT CONTENT */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primaryButton/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primaryButton" />
                    </div>

                    <div>
                      <p className="text-xs text-neutral-400">Brief ID</p>
                      <p className="text-white font-semibold tracking-wide">{brief.id}</p>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                    {brief.prompt}
                  </p>

                  <div className="flex items-center gap-4 pt-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-neutral-300 border border-white/10">
                      Version {brief.version}
                    </span>

                    <span className="px-3 py-1 text-xs rounded-full bg-white/5 text-neutral-400 border border-white/10">
                      {new Date(brief.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* RIGHT SIDE ACTION */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBrief(brief);
                      setOpen(true);
                    }}
                  >
                    <Pencil className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= DIALOG ================= */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-4xl bg-gradient-to-br from-neutral-900 to-neutral-950 
                     border border-white/10 rounded-3xl 
                     max-h-[90vh] overflow-y-auto p-0"
        >
          {selectedBrief && (
            <>
              {/* Header */}
              <div className="p-8 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primaryButton/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primaryButton" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Campaign Brief Details
                    </h2>
                    <p className="text-sm text-neutral-400 mt-1">
                      ID: {selectedBrief.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8 text-white">
                {/* Prompt */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-3">
                    Original Prompt
                  </h3>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-neutral-300 whitespace-pre-line leading-relaxed">
                    {selectedBrief.prompt}
                  </div>
                </div>

                {/* Structured Response Rendering */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-neutral-400 mb-6">
                    Generated Response
                  </h3>

                  <div className="space-y-6">
                    {Object.entries(selectedBrief.response).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-sm font-semibold text-primaryButton mb-2 capitalize">
                          {key.replaceAll('_', ' ')}
                        </h4>

                        {Array.isArray(value) ? (
                          <ul className="list-disc list-inside text-neutral-300 space-y-1">
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-neutral-300">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <span className="px-4 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    Version {selectedBrief.version}
                  </span>

                  <span className="px-4 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-400">
                    {new Date(selectedBrief.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
