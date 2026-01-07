"use client";
import { toast } from "sonner";
import useSound from "use-sound";

let unlocked = false;

export function useNotificationSound() {
    const [play] = useSound("/sounds/message_received.mp3", {
        volume: 0.7,
        interrupt: true,
    });

    const unlockOnce = () => {
        if (!unlocked) {
            try {
                play();
                unlocked = true;
            } catch {
                toast.error("Audio still not enabled. Please refresh the page and try again.");
            }
        }
    };

    const playSound = () => {
        if (!unlocked) return;
        play();
    };

    return { playSound, unlockOnce };
}
