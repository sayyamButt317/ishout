'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import CustomButton from '../button';
import CaptionBlock from '@/src/app/component/campaign-report/CaptionBlock';
import ExtractPostDemoGraphicsHook from '@/src/routes/Admin/Hooks/feedback/report-hook';
import useReportStore from '@/src/store/Report/report-store';
import type { ExtractReportResponse } from '@/src/types/Admin-Type/Feedback/influencer-type';
import {
  ReelExtractSchema,
  ReelFormValues,
} from '@/src/validators/influencerdetails-validator';

type InfluencerDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function InfluencerDetailDialog({
  open,
  onOpenChange,
}: InfluencerDetailDialogProps) {
  const { campaign_id } = useReportStore();
  const { mutate, isPending } = ExtractPostDemoGraphicsHook();
  const [report, setReport] = useState<ExtractReportResponse | null>(null);

  const form = useForm<ReelFormValues>({
    resolver: zodResolver(ReelExtractSchema),
    defaultValues: { username: '', url: '' },
  });

  const onSubmit = (values: ReelFormValues) => {
    if (!campaign_id) {
      toast.error('Campaign ID missing');
      return;
    }
    mutate(
      { campaign_id, username: values.username, url: values.url },
      { onSuccess: setReport },
    );
  };

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setReport(null);
      form.reset();
    }
  };

  const { profile, reel } = report ?? {};

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Influencer Analytics</DialogTitle>
        </DialogHeader>

        {isPending && (
          <div className="flex items-center justify-center p-10">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {!isPending && !report && (
          <Card className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="@username"
                          {...field}
                          className="h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Instagram reel url"
                          {...field}
                          className="h-12 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CustomButton
                  disabled={isPending}
                  className="h-12 w-full rounded-xl bg-primarytext text-white disabled:opacity-50"
                >
                  {isPending ? 'Extracting...' : 'Extract Analytics'}
                </CustomButton>
              </form>
            </Form>
          </Card>
        )}

        {!isPending && profile && reel && (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl border bg-black">
              {reel.media_url ? (
                <video
                  src={reel.media_url}
                  controls
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <Image
                  src={reel.thumbnail || ''}
                  alt="reel"
                  width={400}
                  height={400}
                  className="h-full w-full rounded-xl object-cover"
                />
              )}
            </div>

            <div className="min-w-0 space-y-4">
              <Card className="overflow-hidden rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={profile.profile_image || ''}
                    alt="profile"
                    width={50}
                    height={50}
                    className="h-12 w-12 shrink-0 rounded-full"
                  />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{profile.name || 'N/A'}</p>
                    <p className="truncate text-sm text-gray-500">@{profile.username}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm wrap-anywhere whitespace-pre-wrap text-gray-600">
                  {profile.biography}
                </p>
              </Card>

              <Card className="space-y-2 rounded-xl p-4">
                <p>❤️ Likes: {reel.likes}</p>
                <p>💬 Comments: {reel.comments}</p>
                <p>👀 Views: {reel.views}</p>
                <p>⚡ Engagement: {reel.interaction}</p>
              </Card>

              <Card className="overflow-hidden rounded-xl p-4">
                <CaptionBlock
                  caption={reel.caption}
                  className="text-sm not-italic text-gray-600"
                />
              </Card>

              {reel.timestamp && (
                <p className="text-xs text-gray-400">
                  {new Date(reel.timestamp).toLocaleString()}
                </p>
              )}

              <CustomButton
                onClick={() => setReport(null)}
                className="w-full bg-primaryHover"
              >
                Back
              </CustomButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
