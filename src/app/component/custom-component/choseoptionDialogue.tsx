'use client';
import { useEffect, useState, type ComponentType } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import CustomButton from '../button';
import AddInfluencerNumberHook from '@/src/routes/Admin/Hooks/addInfluencerNumber-hook';
import { PlatformType } from '@/src/types/readymadeinfluencers-type';
import { Loader2 } from 'lucide-react';
// import { useEffect, useState,ComponentType } from 'react';
import PhoneInput from 'react-phone-number-input';
import {
  removePlusPrefix,
  normalizePhoneNumberForDisplay,
} from '@/src/utils/phone.utils';

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

type CountryOption = { value?: string; label: string };
type FlagIconComponent = ComponentType<{
  country: string;
  title: string;
  className?: string;
}>;

function MobileCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
}: {
  value?: string;
  onChange: (value?: string) => void;
  options: CountryOption[];
  iconComponent: FlagIconComponent;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1 rounded px-1 py-0.5 hover:bg-white/10 transition-colors"
      >
        {value && <FlagIcon country={value} title={selectedLabel} />}
        <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-6 top-1/4 bottom-[15%] z-50 flex flex-col rounded-2xl border border-white/10 bg-[#0d0d1e] shadow-2xl overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="text-sm font-semibold text-white">Select Country</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-base leading-none text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {options
                .filter((o) => o.value)
                .map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      onChange(o.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                      o.value === value
                        ? 'bg-white/10 font-semibold text-white'
                        : 'text-white/80'
                    }`}
                  >
                    <FlagIcon country={o.value!} title={o.label} />
                    <span>{o.label}</span>
                  </button>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default function ChooseOptionDialog({
  open,
  onClose,
  influencer,
}: ChooseOptionDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [maxPricing, setMaxPricing] = useState<string>('');
  const [minPricing, setMinPricing] = useState<string>('');

  const { mutate: addInfluencerNumber, isPending } = AddInfluencerNumberHook();

  useEffect(() => {
    if (influencer) {
      setPhoneNumber(influencer.phone_number || '');
      setMaxPricing(
        influencer.max_price && influencer.max_price > 0
          ? String(influencer.max_price)
          : '',
      );
      setMinPricing(
        influencer.min_price && influencer.min_price > 0
          ? String(influencer.min_price)
          : '',
      );
    }
  }, [influencer]);

  if (!influencer) return null;
  const displayValue = normalizePhoneNumberForDisplay(phoneNumber);
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
              <p className="text-sm text-white/50 capitalize">{influencer.platform}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-white/40">
                Phone Number
              </Label>

              <PhoneInput
                international
                defaultCountry="AE"
                countryCallingCodeEditable={false}
                placeholder="97150XXXXXXX"
                value={displayValue}
                onChange={(value) => {
                  const valueWithoutPlus = removePlusPrefix(value);
                  setPhoneNumber(valueWithoutPlus);
                }}
                countrySelectComponent={MobileCountrySelect}
                disabled={isPending}
                className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus-within:border-[#ff4e7e] focus-within:ring-2 focus-within:ring-[#ff4e7e]/30 text-white placeholder:text-white/30 w-full 
  [&_.PhoneInput]:border-none 
  [&_.PhoneInput]:bg-transparent
  [&_.PhoneInputInput]:border-none 
  [&_.PhoneInputInput]:bg-transparent 
  [&_.PhoneInputInput]:outline-none 
  [&_.PhoneInputCountry]:border-none"
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
                  onChange={(e) => setMinPricing(e.target.value)}
                  disabled={isPending}
                  placeholder=""
                  className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#ff4e7e] focus:ring-2 focus:ring-[#ff4e7e]/30 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-white/40">
                  Max Price
                </Label>
                <Input
                  type="number"
                  value={maxPricing}
                  onChange={(e) => setMaxPricing(e.target.value)}
                  disabled={isPending}
                  placeholder=""
                  className="h-12 rounded-2xl bg-white/[0.05] border border-white/10 focus:border-[#ff4e7e] focus:ring-2 focus:ring-[#ff4e7e]/30 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                addInfluencerNumber(
                  {
                    campaign_influencer_id: influencer._id,
                    phone_number: phoneNumber,
                    platform: influencer.platform as PlatformType,
                    min_price: minPricing ? Number(minPricing) : 0,
                    max_price: maxPricing ? Number(maxPricing) : 0,
                  },
                  {
                    onSuccess: () => {
                      onClose();
                    },
                  },
                );
              }}
              className="h-11 px-8 rounded-2xl bg-[#ff4e7e] hover:bg-[#ff6f7f] text-white font-medium shadow-lg shadow-[#ff4e7e]/30 transition-all flex items-center justify-center min-w-[110px]"
            >
              {isPending ? <Loader2 className="animate-spin" /> : 'Save Changes'}
            </CustomButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
