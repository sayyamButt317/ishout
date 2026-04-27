import { ReactNode } from "react";

export type VideoPanelProps = {
    selectedPreviewMediaUrl: string | null;
    selectedPreviewMediaType: 'video' | 'image' | null;
    isPlaying: boolean;
    setIsPlaying: (value: boolean) => void;
    setSelectedVideoDuration: (value: number | null) => void;
    setSelectedVideoResolution: (value: string) => void;
    timelineSlot?: ReactNode;
    pinCommentMode?: boolean;
    onPinComment?: () => void;
    onTimeUpdate?: (currentTime: number) => void;
};
