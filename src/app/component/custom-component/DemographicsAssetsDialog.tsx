'use client';

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DemographicsAssetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrls: string[];
  isLoading?: boolean;
  username?: string | null;
}

export default function DemographicsAssetsDialog({
  open,
  onOpenChange,
  imageUrls,
  isLoading = false,
  username,
}: DemographicsAssetsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[min(92vh,920px)] w-[min(96vw,1600px)] max-w-[96vw] flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#121218] p-0 shadow-2xl sm:max-w-[96vw]"
        aria-describedby={undefined}
      >
        <DialogHeader className="shrink-0 border-b border-white/10 px-6 py-5">
          <DialogTitle className="text-left text-lg font-semibold tracking-tight text-white sm:text-xl">
            Demographics Assets {username ? `• @${username}` : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="flex min-h-[50vh] items-center justify-center text-sm text-white/60">
              Loading demographics...
            </div>
          ) : imageUrls.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {imageUrls.map((imageUrl, index) => (
                <div
                  key={`${imageUrl}-${index}`}
                  className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-inner shadow-black/40"
                >
                  <div className="relative min-h-[42vh] w-full bg-black md:min-h-[48vh] lg:min-h-[50vh]">
                    <Image
                      src={imageUrl}
                      alt="Demographics asset"
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 96vw, (max-width: 1280px) 45vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-white/60">
              No demographics assets found.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
