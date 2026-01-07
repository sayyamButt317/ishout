"use client";

import useSound from "use-sound";
import { useRef } from "react";

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
                console.log("🔓 Audio unlocked");
            } catch {
                console.warn("🔇 Audio still locked");
            }
        }
    };

    const playSound = () => {
        if (!unlocked) return;
        play();
    };

    return { playSound, unlockOnce };
}
