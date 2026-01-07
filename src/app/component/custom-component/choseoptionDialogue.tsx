"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import CustomButton from "../button";
import AddInfluencerNumberHook from "@/src/routes/Admin/Hooks/addInfluencerNumber-hook";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { Loader2 } from "lucide-react";

interface ChooseOptionDialogProps {
  open: boolean;
  onClose: () => void;
  influencer: {
    username: string;
    platform: string;
    picture: string;
    influencer_id: string;
  } | null;
}

export default function ChooseOptionDialog({
  open,
  onClose,
  influencer,
}: ChooseOptionDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { mutate: addInfluencerNumber, isPending } = AddInfluencerNumberHook();

  if (!influencer) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-white shadow-2xl">
        <DialogTitle className="italic text-center text-2xl font-bold text-[#0B0B17]">
          Add Influencer Phone Number
        </DialogTitle>
        {/* Influencer Card */}
        <Card className="mt-6 border rounded-xl bg-white shadow-sm">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden">
              <Image
                src={influencer?.picture}
                alt={influencer?.username}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover p-1 bg-gray-100"
              />
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-[#0B0B17]">
                @{influencer.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {influencer.platform}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Phone Input */}
        <div className="mt-4 space-y-2">
          <Label className="text-sm font-medium text-[#0B0B17]">
            Phone Number
          </Label>
          <Input
            type="tel"
            required
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="[0-9]{10}"
            title="Please enter a valid phone number with country code"
            className="border-1 border-[#E0E0E0] rounded-md p-2 text-black"
            disabled={isPending}
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <CustomButton
            className="bg-secondaryButton hover:bg-secondaryHover italic text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-1 sm:gap-2 rounded-md px-3 sm:px-4 md:px-6 h-8 sm:h-9 transition-all cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
          <CustomButton
            className="bg-secondaryButton hover:bg-secondaryHover italic text-xs sm:text-sm font-medium text-white flex items-center justify-center gap-1 sm:gap-2 rounded-md px-3 sm:px-4 md:px-6 h-8 sm:h-9 transition-all cursor-pointer"
            disabled={isPending}
            onClick={() => {
              addInfluencerNumber({
                influencer_id: influencer.influencer_id,
                phone_number: phoneNumber,
                platform: influencer.platform as PlatformType,
              });
              onClose();
            }}
          >
            {isPending ? (
              <Loader2 className="animate-spin text-white" />
            ) : (
              "Save"
            )}
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
