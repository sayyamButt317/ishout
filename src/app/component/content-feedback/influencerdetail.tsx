"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import ExtractPostDemoGraphicsHook from "@/src/routes/Admin/Hooks/feedback/report-hook";
import CustomButton from "../button";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import useReportStore from "@/src/store/Feedback/report-store";
import { Profile, Reel } from "@/src/types/Admin-Type/Feedback/influencer-type";
import {
    ExtractSchema,
    FormValues,
} from "@/src/validators/influencerdetails-validator";

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
type ReportData = {
    profile: Profile;
    reel: Reel;
};

const InfluencerDetailDialog = ({ open, onOpenChange }: DialogProps) => {
    const { mutate: extractdemographics } = ExtractPostDemoGraphicsHook();
    const { campaign_id } = useReportStore();

    const [reportData, setReportData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(ExtractSchema),
        defaultValues: {
            username: "",
            url: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        if (!campaign_id) {
            toast.error("Campaign ID missing");
            return;
        }
        setLoading(true);
        extractdemographics(
            {
                campaign_id,
                username: data.username,
                url: data.url,
            },
            {
                onSuccess: (res) => {
                    setReportData(res);
                    setLoading(false);
                },
                onError: () => {
                    toast.error("Failed to fetch data");
                    setLoading(false);
                },
            }
        );
    };

    const handleClose = (state: boolean) => {
        onOpenChange(state);
        if (!state) {
            setReportData(null);
            form.reset();
        }
    };

    const profile = reportData?.profile;
    const reel = reportData?.reel;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-4xl rounded-2xl">

                <DialogHeader>
                    <DialogTitle>Influencer Analytics</DialogTitle>
                </DialogHeader>

                {loading && (
                    <div className="p-10 flex items-center justify-center">
                        <Loader2 className="animate-spin" />
                    </div>
                )}

                {!loading && !reportData && (
                    <Card className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
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

                                <CustomButton className="w-full h-12 rounded-xl bg-primarytext text-white">
                                    Extract Analytics
                                </CustomButton>
                            </form>
                        </Form>
                    </Card>
                )}

                {!loading && profile && reel && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="rounded-xl overflow-hidden border bg-black">
                            {reel.media_url ? (
                                <video
                                    src={reel.media_url}
                                    controls
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <Image
                                    src={reel.thumbnail || ""}
                                    alt="reel"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            )}
                        </div>

                        {/* INFO */}
                        <div className="space-y-4">

                            <Card className="p-4 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={profile.profile_image || ""}
                                        alt="profile"
                                        width={50}
                                        height={50}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {profile.name || "N/A"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            @{profile.username}
                                        </p>
                                    </div>
                                </div>

                                <p className="mt-3 text-sm text-gray-600">
                                    {profile.biography}
                                </p>
                            </Card>

                            <Card className="p-4 rounded-xl space-y-2">
                                <p>❤️ Likes: {reel.likes}</p>
                                <p>💬 Comments: {reel.comments}</p>
                                <p>👀 Views: {reel.views}</p>
                                <p>⚡ Engagement: {reel.interaction}</p>
                            </Card>

                            <Card className="p-4 rounded-xl">
                                <p className="text-sm">
                                    {reel.caption}
                                </p>
                            </Card>

                            <p className="text-xs text-gray-400">
                                {reel.timestamp &&
                                    new Date(reel.timestamp).toLocaleString()}
                            </p>

                            <CustomButton
                                onClick={() => setReportData(null)}
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
};

export default InfluencerDetailDialog;