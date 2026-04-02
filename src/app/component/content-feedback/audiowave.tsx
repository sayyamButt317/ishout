'use client'
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { CirclePause, CirclePlay } from 'lucide-react';
import AudioStore from '@/src/store/Feedback/audio-store';

interface WaveformProps {
    recordedVoiceURL: string;
    seconds?: number;
    onReady?: () => void;
}


const activeWavesurfers = new Map<string, WaveSurfer>();

const AudioDurationFormat = (totalSeconds: number): string => {
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const Waveform: React.FC<WaveformProps> = ({ recordedVoiceURL = '', onReady }) => {
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const [duration, setDuration] = useState(0);
    const [hasError, setHasError] = useState(false);

    const {
        isPlaying,
        currentlyPlayingId,
        setIsPlaying,
        setCurrentlyPlayingId,
    } = AudioStore();

    useEffect(() => {
        if (!recordedVoiceURL || !waveformRef.current) return;
        setHasError(false);

        const wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            barWidth: 3,
            barRadius: 3,
            barGap: 2,
            cursorWidth: 1,
            cursorColor: 'transparent',
            backend: 'WebAudio',
            height: 40,
            waveColor: '#C4C4C4',
            progressColor: '#1e4b8e',
            url: recordedVoiceURL,
            normalize: true,
        });

        wavesurferRef.current = wavesurfer;
        activeWavesurfers.set(recordedVoiceURL, wavesurfer);

        // Show clip duration
        wavesurfer.on('ready', () => {
            setDuration(wavesurfer.getDuration());
            onReady?.();
        });
        wavesurfer.on('audioprocess', () => {
            setDuration(wavesurfer.getCurrentTime());
        });

        wavesurfer.on('play', () => {
            // Stop all other wavesurfers
            activeWavesurfers.forEach((ws, url) => {
                if (url !== recordedVoiceURL && ws.isPlaying()) {
                    ws.pause();
                }
            });
            setIsPlaying(true);
            setCurrentlyPlayingId(recordedVoiceURL);
        });
        wavesurfer.on('pause', () => {
            setIsPlaying(false);
            setCurrentlyPlayingId(null);
        });
        wavesurfer.on('finish', () => {
            setIsPlaying(false);
            setCurrentlyPlayingId(null);
        });
        wavesurfer.on('error', () => {
            setHasError(true);
            setIsPlaying(false);
            setCurrentlyPlayingId(null);
        });

        return () => {
            wavesurfer.destroy();
            wavesurferRef.current = null;
            activeWavesurfers.delete(recordedVoiceURL);
        };
    }, [recordedVoiceURL, setIsPlaying, setDuration, setCurrentlyPlayingId, onReady]);

    const togglePlayback = () => {
        const ws = wavesurferRef.current;
        if (!ws) return;

        // If another audio is playing, stop it first
        if (currentlyPlayingId && currentlyPlayingId !== recordedVoiceURL) {
            const currentWavesurfer = activeWavesurfers.get(currentlyPlayingId);
            if (currentWavesurfer) {
                currentWavesurfer.pause();
            }
        }

        ws.playPause();
    };

    const isThisAudioPlaying = currentlyPlayingId === recordedVoiceURL && isPlaying;

    if (hasError) {
        return (
            <audio
                src={recordedVoiceURL}
                controls
                preload="metadata"
                className="w-full rounded-lg"
            />
        );
    }

    return (
        <div className="w-full overflow-hidden">
            <div className="flex items-center gap-2 w-full">
                <div ref={waveformRef} className="flex-1 min-w-0" />
                <span className="text-[#1e4b8e] min-w-[50px] text-center">
                    {duration ? AudioDurationFormat(duration) : '00:00'}
                </span>
                <button
                    onClick={togglePlayback}
                    className="p-1"
                    aria-label={isThisAudioPlaying ? 'Pause' : 'Play'}
                >
                    {isThisAudioPlaying ? (
                        <CirclePause className="w-10 h-8" color="#1e4b8e" />
                    ) : (
                        <CirclePlay className="w-10 h-8" color="#1e4b8e" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default Waveform;
