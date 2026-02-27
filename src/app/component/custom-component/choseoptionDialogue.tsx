"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import CustomButton from "../button";
import AddInfluencerNumberHook from "@/src/routes/Admin/Hooks/addInfluencerNumber-hook";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface ChooseOptionDialogProps {
  open: boolean;
  onClose: () => void;
  influencer: {
    _id: string;
    username: string;
    platform: string;
    picture: string;
    influencer_id: string;
    phone_number: string;
    min_price: number;
    max_price: number;
  } | null;
}

export default function ChooseOptionDialog({
  open,
  onClose,
  influencer,
}: ChooseOptionDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [maxPricing, setMaxPricing] = useState<number>(0);
  const [minPricing, setMinPricing] = useState<number>(0);

  const { mutate: addInfluencerNumber, isPending } = AddInfluencerNumberHook();

  useEffect(() => {
    if (influencer) {
      setPhoneNumber(influencer.phone_number || "");
      setMaxPricing(influencer.max_price || 0);
      setMinPricing(influencer.min_price || 0);
    }
  }, [influencer]);

  if (!influencer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border border-white/10 bg-black text-white rounded-3xl overflow-hidden">
        <div className="relative p-8 space-y-8">
          <div className="space-y-2">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Update Influencer Details
            </DialogTitle>
            <p className="text-sm text-white/50">
              Add contact number and pricing range for this creator.
            </p>
          </div>
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <Image
              src={influencer.picture}
              alt={influencer.username}
              width={72}
              height={72}
              className="rounded-2xl object-cover ring-2 ring-white/10"
            />

            <div>
              <p className="text-lg font-semibold tracking-tight">
                @{influencer.username}
              </p>
              <p className="text-sm text-white/50 capitalize">
                {influencer.platform}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-white/40">
                Phone Number
              </Label>
              <Input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={isPending}
                placeholder="97150XXXXXXX"
                className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#ff4e7e] focus:ring-2 focus:ring-[#ff4e7e]/30 text-white placeholder:text-white/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-white/40">
                  Min Price
                </Label>
                <Input
                  type="number"
                  value={minPricing}
                  onChange={(e) => setMinPricing(Number(e.target.value))}
                  disabled={isPending}
                  className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#ff4e7e] focus:ring-2 focus:ring-[#ff4e7e]/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-white/40">
                  Max Price
                </Label>
                <Input
                  type="number"
                  value={maxPricing}
                  onChange={(e) => setMaxPricing(Number(e.target.value))}
                  disabled={isPending}
                  className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#ff4e7e] focus:ring-2 focus:ring-[#ff4e7e]/30 text-white"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <CustomButton
              onClick={onClose}
              className="h-11 px-6 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-white/70 transition-all"
            >
              Cancel
            </CustomButton>
            <CustomButton
              disabled={isPending}
              onClick={() => {
                addInfluencerNumber({
                  campaign_influencer_id: influencer._id,
                  phone_number: phoneNumber,
                  platform: influencer.platform as PlatformType,
                  min_price: minPricing,
                  max_price: maxPricing,
                });
                console.log("payload", {
                  campaign_influencer_id: influencer._id,
                  phone_number: phoneNumber,
                  platform: influencer.platform as PlatformType,
                  min_price: minPricing,
                  max_price: maxPricing,
                });
              }}
              className="h-11 px-8 rounded-2xl bg-[#ff4e7e] hover:bg-[#ff6f7f] text-white font-medium shadow-lg shadow-[#ff4e7e]/30 transition-all flex items-center justify-center min-w-[110px]"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Changes"
              )}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
