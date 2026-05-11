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
        className="max-h-[90vh] w-[92vw] max-w-7xl overflow-y-auto border-white/10 bg-[#0f0f12] p-6"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            Demographics Assets {username ? `• @${username}` : ''}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-sm text-white/60">
            Loading demographics...
          </div>
        ) : imageUrls.length ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imageUrls.map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
              >
                <div className="relative h-80 w-full bg-black">
                  <Image
                    src={imageUrl}
                    alt="Demographics asset"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-sm text-white/60">
            No demographics assets found.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
