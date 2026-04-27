export type ScrubHoverPosition = {
    time: number;
    clientX: number;
    trackTop: number;
};

export type UseTimelineScrubOptions = {
    selectedPreviewMediaUrl: string | null;
    duration: number | null;
};

export type TimelineScrubPreviewProps = {
    scrubHover: ScrubHoverPosition;
    mediaUrl: string;
    duration: number | null;
    scrubVideoRef: React.RefObject<HTMLVideoElement | null>;
    pendingScrubTimeRef: React.MutableRefObject<number | null>;
};
