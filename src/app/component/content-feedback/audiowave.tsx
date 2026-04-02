'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CirclePause, CirclePlay } from 'lucide-react';

interface WaveformProps {
    recordedVoiceURL: string;
    onReady?: () => void;
}

const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const Waveform: React.FC<WaveformProps> = ({ recordedVoiceURL = '', onReady }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const onReadyRef = useRef(onReady);
    useEffect(() => {
        onReadyRef.current = onReady;
    }, [onReady]);

    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!recordedVoiceURL || !containerRef.current) return;

        const ws = WaveSurfer.create({
            container: containerRef.current,
            height: 48,
            width: '100%',
            fillParent: true,
            waveColor: '#C4C4C4',
            progressColor: '#FF6F7F',
            cursorWidth: 1,
            cursorColor: 'transparent',
            barWidth: 3,
            barRadius: 3,
            barGap: 2,
            normalize: true,
            url: recordedVoiceURL,
            backend: 'MediaElement',
        });

        wavesurferRef.current = ws;

        ws.on('ready', (duration) => {
            setTotalTime(duration);
            setCurrentTime(0);
            onReadyRef.current?.();
        });
        ws.on('timeupdate', (t) => setCurrentTime(t));
        ws.on('seeking', (t) => setCurrentTime(t));
        ws.on('play', () => setPlaying(true));
        ws.on('pause', () => setPlaying(false));
        ws.on('finish', () => {
            setPlaying(false);
        });
        ws.on('error', () => {
            setHasError(true);
            setPlaying(false);
        });

        return () => {
            ws.destroy();
            wavesurferRef.current = null;
        };
    }, [recordedVoiceURL]);

    if (hasError) {
        return (
            <audio
                src={recordedVoiceURL}
                controls
                preload="metadata"
                className="w-full min-h-12 rounded-lg"
            />
        );
    }

    const timeLabel =
        totalTime > 0 ? `${formatTime(currentTime)} / ${formatTime(totalTime)}` : '00:00';

    return (
        <div className="flex w-full min-w-[min(100%,360px)] max-w-full items-center gap-3">
            <div
                ref={containerRef}
                className="h-12 min-h-12 min-w-[240px] w-full flex-1 overflow-hidden rounded-sm"
            />
            <span className="shrink-0 text-center text-xs text-[#1e4b8e] tabular-nums">{timeLabel}</span>
            <button
                type="button"
                onClick={() => wavesurferRef.current?.playPause()}
                className="shrink-0 p-1"
                aria-label={playing ? 'Pause' : 'Play'}
            >
                {playing ? (
                    <CirclePause className="h-8 w-10" color="#1e4b8e" />
                ) : (
                    <CirclePlay className="h-8 w-10" color="#1e4b8e" />
                )}
            </button>
        </div>
    );
};

export default Waveform;
