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
import type { Profile, Reel } from '@/src/types/Admin-Type/Feedback/influencer-type';
import {
    ExtractSchema,
    FormValues,
} from '@/src/validators/influencerdetails-validator';
import { AddInfluencerByUrlHook } from '@/src/routes/Admin/Mutations/DemoGraphics';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    campaign_id: string;
}

type ReportData = {
    profile: Profile;
    reel: Reel;
};



const InfluencerDetailDialog = ({ open, onOpenChange, campaign_id }: DialogProps) => {
    const [reportData, setReportData] = useState<ReportData | null>(null);
    const { mutate: addInfluencerByUsername, isPending } =
        AddInfluencerByUrlHook();


    const form = useForm<FormValues>({
        resolver: zodResolver(ExtractSchema),
        defaultValues: { username: '' },
    });


    const onSubmit = (values: FormValues) => {
        addInfluencerByUsername({
            campaign_id: campaign_id,
            username: values.username,
        });
    };

    const handleClose = useCallback(
        (state: boolean) => {
            onOpenChange(state);
            if (!state) {
                setReportData(null);
                form.reset();
            }
        },
        [form, onOpenChange],
    );


    const profile = reportData?.profile;
    const reel = reportData?.reel;
    const hasReelMedia = Boolean(reel?.url || reel?.media_url || reel?.thumbnail);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0f0f12] text-white sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <User className="size-5 text-[#FF3B8D]" aria-hidden />
                        Look up influencer
                    </DialogTitle>
                    <DialogDescription className="text-white/55">
                        Enter an Instagram username or paste a profile URL to load public profile details.
                    </DialogDescription>
                </DialogHeader>

                {isPending && (
                    <div className="flex flex-col items-center justify-center gap-3 py-14">
                        <Loader2 className="size-10 animate-spin text-[#FF3B8D]" aria-hidden />
                        <p className="text-sm text-white/60">Fetching details…</p>
                    </div>
                )}

                {!isPending && !reportData && (
                    <Card className="border border-white/10 bg-white/4 p-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white/80">Username or profile URL</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. creatorname or instagram.com/creatorname"
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

                {!isPending && profile && (
                    <div className="space-y-4">
                        <Card className="border border-white/10 bg-white/4 p-4">
                            <div className="flex items-start gap-4">
                                <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/10">
                                    {profile.profile_image ? (
                                        <Image
                                            src={profile.profile_image}
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
                                        {profile.name || '—'}
                                    </p>
                                    <p className="text-sm text-white/55">@{profile.username}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-xs text-white/50">
                                        <span>Followers {profile.followers?.toLocaleString?.() ?? profile.followers}</span>
                                        <span>Following {profile.following?.toLocaleString?.() ?? profile.following}</span>
                                        <span>Posts {profile.media_count ?? '—'}</span>
                                    </div>
                                </div>
                            </div>
                            {profile.biography ? (
                                <p className="mt-3 border-t border-white/10 pt-3 text-sm leading-relaxed text-white/75">
                                    {profile.biography}
                                </p>
                            ) : null}
                        </Card>

                        {hasReelMedia ? (
                            <Card className="border border-white/10 bg-white/4 p-4 space-y-3 text-sm text-white/80">
                                <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
                                    Recent reel / media
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                                    <span>❤️ {reel?.likes ?? '—'}</span>
                                    <span>💬 {reel?.comments ?? '—'}</span>
                                    <span>👀 {reel?.views ?? '—'}</span>
                                    <span>⚡ {reel?.interaction ?? '—'}</span>
                                </div>
                                {reel?.caption ? (
                                    <p className="line-clamp-6 text-xs text-white/65">{reel.caption}</p>
                                ) : null}
                                {reel?.timestamp ? (
                                    <p className="text-[11px] text-white/40">
                                        {new Date(reel.timestamp).toLocaleString()}
                                    </p>
                                ) : null}
                            </Card>
                        ) : (
                            <p className="rounded-lg border border-dashed border-white/15 bg-white/3 px-3 py-2 text-center text-xs text-white/45">
                                No reel metrics in this response (profile only).
                            </p>
                        )}

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
                                onClick={() => {
                                    setReportData(null);
                                    form.reset();
                                }}
                            >
                                Look up another
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
