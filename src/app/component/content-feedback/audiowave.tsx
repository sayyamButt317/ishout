'use client';

import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CirclePause, CirclePlay } from 'lucide-react';
import { AudioDurationFormat } from '@/src/utils/video-duration';

interface WaveformProps {
    recordedVoiceURL: string;
    seconds?: number;
    onReady?: () => void;
}


export const Waveform: React.FC<WaveformProps> = ({ recordedVoiceURL = '', onReady }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const [duration, setDuration] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
    const activeWavesurfers = useRef(new Map<string, WaveSurfer>());


    const togglePlayback = () => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        // If another audio is playing, stop it first
        if (currentlyPlayingId && currentlyPlayingId !== recordedVoiceURL) {
            const currentWavesurfer = activeWavesurfers.current.get(currentlyPlayingId);
            if (currentWavesurfer) {
                currentWavesurfer.pause();
            }
            setCurrentlyPlayingId(recordedVoiceURL);
        }

        ws.playPause();
    };


    useEffect(() => {
        if (!recordedVoiceURL || !waveformRef.current) return;

        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
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

        wavesurferRef.current = wavesurfer;
        wavesurfer.on('ready', (duration) => {
            setDuration(duration);
            setCurrentTime(0);
            onReady?.();
        });
        wavesurfer.on('timeupdate', (t) => setCurrentTime(t));
        wavesurfer.on('seeking', (t) => setCurrentTime(t));
        wavesurfer.on('play', () => setPlaying(true));
        wavesurfer.on('pause', () => setPlaying(false));
        wavesurfer.on('finish', () => {
            setPlaying(false);
        });
        wavesurfer.on('error', () => {
            setHasError(true);
            setPlaying(false);
        });

        return () => {
            wavesurfer.destroy();
            wavesurferRef.current = null;
        };
    }, [recordedVoiceURL, onReady]);


    const timeLabel =
        duration > 0 ? `${AudioDurationFormat(currentTime)} / ${AudioDurationFormat(duration)}` : '00:00';

    return (
        <div className="flex w-full min-w-[min(100%,360px)] max-w-full items-center gap-3">
            <div
                ref={waveformRef}
                className="relative block h-12 min-h-12 min-w-[200px] w-full flex-1 rounded-sm bg-black/5"
            />
            <span className="shrink-0 text-center text-xs text-[#1e4b8e] tabular-nums">{timeLabel}</span>
            <button
                type="button"
                onClick={togglePlayback}
                className="shrink-0 p-1 disabled:cursor-not-allowed disabled:opacity-40"
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
