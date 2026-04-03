
export const formatVideoDuration = (seconds: number | null | undefined) => {
    if (seconds == null || Number.isNaN(seconds)) return '--:--';
    const total = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};



const getVideoResolution = (value: string) => {
    const video = document.createElement('video');
    video.src = value;
    video.load();
    return `${video.width} × ${video.height}`;
};

export const isVideoUrl = (value: string) => /\.(mp4|webm)(\?.*)?$/i.test(value);
export const isImageUrl = (value: string) =>
    /\.(jpg|jpeg|png|gif|webp|bmp)(\?.*)?$/i.test(value);
export const isAudioUrl = (value: string) =>
    /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(value);

export const AnalyzeURL = (value: string) => {
    const type = isVideoUrl(value) ? 'video' : isImageUrl(value) ? 'image' : isAudioUrl(value) ? 'audio' : null;
    const resolution = isVideoUrl(value) ? getVideoResolution(value) : '—';
    return { type, url: value, isVideoUrl: isVideoUrl(value), isImageUrl: isImageUrl(value), isAudioUrl: isAudioUrl(value), resolution };
};


export const AudioDurationFormat = (totalSeconds: number): string => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
