'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from '@/components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import Image from 'next/image';
import { formatVideoDuration } from '@/src/utils/video-duration';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';

export default function ContentFeedbackPanel({
    selectedContentFeedback,
    setSelectedContentFeedback,
    selectedPreviewMediaUrl,
    negotiationId,
    selectedCard,
    videoRef,
}: ContentFeedbackPanelProps) {
    const saveContentFeedbackMutation = useSaveContentFeedbackHook();

    const [open, setOpen] = useState(false);
    const [timestamp, setTimestamp] = useState<number | null>(null);
    const [snapshot, setSnapshot] = useState<string | null>(null);

    const captureFrame = () => {
        const video = videoRef?.current;
        if (!video) return null;

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0);

        return canvas.toDataURL('image/png');
    };

    const handleOpen = () => {
        if (videoRef?.current) {
            setTimestamp(videoRef.current.currentTime);
            videoRef.current.pause();
            setSnapshot(captureFrame());
        }
        setOpen(true);
    };

    const AddFeedback = async () => {
        try {
            await saveContentFeedbackMutation.mutateAsync({
                negotiation_id: negotiationId,
                campaign_id: selectedCard?.campaign_id || '',
                content_url: selectedPreviewMediaUrl || '',
                msg: selectedContentFeedback,
                timestamp,
                snapshot,
            });

            toast.success('Feedback added');
            setOpen(false);
        } catch {
            toast.error('Error saving feedback');
        }
    };

    return (
        <>
            <Button onClick={handleOpen}>
                <PlusIcon className="h-4 w-4" />
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Feedback</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm">
                        {formatVideoDuration(timestamp)}
                    </p>

                    {snapshot && (
                        <Image
                            src={snapshot}
                            alt="snapshot"
                            width={400}
                            height={200}
                            className="rounded"
                        />
                    )}

                    <textarea
                        value={selectedContentFeedback}
                        onChange={(e) => setSelectedContentFeedback(e.target.value)}
                        className="w-full p-2 rounded"
                    />

                    <Button onClick={AddFeedback}>Save</Button>
                </DialogContent>
            </Dialog>
        </>
    );
}