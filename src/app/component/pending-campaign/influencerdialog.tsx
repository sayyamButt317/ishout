'use client';

import { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Search, User } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ExtractSchema, FormValues } from '@/src/validators/influencerdetails-validator';
import { AddInfluencerByUrlHook } from '@/src/routes/Admin/Mutations/DemoGraphics';
import { toast } from 'sonner';
import type {
  AddInfluencerApiData,
  AddInfluencerApiResponse,
} from '@/src/store/Influencer/AddInfluencer.store';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign_id: string;
}

function isAddInfluencerApiResponse(v: unknown): v is AddInfluencerApiResponse {
  if (!v || typeof v !== 'object') return false;
  const o = v as Record<string, unknown>;
  if (o.success !== true || !o.data || typeof o.data !== 'object') return false;
  const d = o.data as Record<string, unknown>;
  return (
    typeof d.username === 'string' &&
    typeof d.picture === 'string' &&
    typeof d.followers === 'number'
  );
}

const InfluencerDetailDialog = ({ open, onOpenChange, campaign_id }: DialogProps) => {
  const [addedInfluencer, setAddedInfluencer] = useState<AddInfluencerApiData | null>(null);
  const { mutate: addInfluencerByUsername, isPending } = AddInfluencerByUrlHook();

  const form = useForm<FormValues>({
    resolver: zodResolver(ExtractSchema),
    defaultValues: { username: '' },
  });

  const onSubmit = (values: FormValues) => {
    if (!campaign_id?.trim()) {
      toast.error('Campaign ID missing');
      return;
    }
    const username = values.username.trim().replace(/^@+/, '');
    if (!username) {
      toast.error('Enter a valid username.');
      return;
    }
    addInfluencerByUsername(
      { campaign_id: campaign_id.trim(), username },
      {
        onSuccess: (response: unknown) => {
          if (isAddInfluencerApiResponse(response)) {
            setAddedInfluencer(response.data);
          } else {
            toast.error('Unexpected response from server.');
          }
        },
      },
    );
  };

  const handleClose = useCallback(
    (state: boolean) => {
      onOpenChange(state);
      if (!state) {
        setAddedInfluencer(null);
        form.reset();
      }
    },
    [form, onOpenChange],
  );

  const showForm = !isPending && !addedInfluencer;
  const showProfile = !isPending && addedInfluencer;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f12] text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <User className="size-5 text-[#FF3B8D]" aria-hidden />
            Look up influencer
          </DialogTitle>
          <DialogDescription className="text-white/55">
            Enter an Instagram username to add an influencer to this campaign.
          </DialogDescription>
        </DialogHeader>

        {isPending && (
          <div className="flex flex-col items-center justify-center gap-3 py-14">
            <Loader2 className="size-10 animate-spin text-[#FF3B8D]" aria-hidden />
            <p className="text-sm text-white/60">Fetching details…</p>
          </div>
        )}

        {showForm && (
          <Card className="border border-white/10 bg-white/4 p-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. creatorname or @creatorname"
                          autoComplete="off"
                          {...field}
                          className="h-11 rounded-xl border-white/15 bg-white/5 text-white placeholder:text-white/35"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isPending}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primaryButton text-white hover:opacity-95 disabled:opacity-50"
                >
                  <Search className="size-4" aria-hidden />
                  Extract details
                </Button>
              </form>
            </Form>
          </Card>
        )}

        {showProfile && addedInfluencer && (
          <div className="space-y-4">
            <Card className="border border-white/10 bg-white/4 p-4">
              <div className="flex items-start gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
                  {addedInfluencer.picture ? (
                    <Image
                      src={addedInfluencer.picture}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                      unoptimized
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-white/40">
                      <User className="size-8" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="truncate font-semibold text-white">
                    @{addedInfluencer.username}
                  </p>
                  <p className="text-xs capitalize text-white/50">{addedInfluencer.platform}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-white/50">
                    <span>
                      Followers {addedInfluencer.followers.toLocaleString()}
                    </span>
                    <span>
                      Engagement{' '}
                      {addedInfluencer.engagementRate != null
                        ? `${addedInfluencer.engagementRate}%`
                        : '—'}
                    </span>
                    <span>Country {addedInfluencer.country ?? '—'}</span>
                  </div>
                </div>
              </div>
              {addedInfluencer.bio ? (
                <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed whitespace-pre-wrap text-white/75">
                  {addedInfluencer.bio}
                </p>
              ) : null}
              <div className="mt-3 space-y-1 border-t border-white/10 pt-3 text-[11px] text-white/40">
                <p>Influencer ID: {addedInfluencer.influencer_id}</p>
                <p>Campaign ID: {addedInfluencer.campaign_id}</p>
                {addedInfluencer.created_at ? (
                  <p>Added: {new Date(addedInfluencer.created_at).toLocaleString()}</p>
                ) : null}
              </div>
            </Card>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
                onClick={() => {
                  setAddedInfluencer(null);
                  form.reset();
                }}
              >
                Add another
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primaryButton text-white hover:opacity-95"
                onClick={() => handleClose(false)}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InfluencerDetailDialog;
