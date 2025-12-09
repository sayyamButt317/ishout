
import { PlatformType } from "../types/readymadeinfluencers-type";

export const redirectToDM = (platform: PlatformType, username: string) => {
    if (platform === "instagram") {
        window.open(`https://ig.me/m/${username}`, "_blank");
    } else if (platform === "tiktok") {
        window.open(`https://www.tiktok.com/@${username}`, "_blank");
    }
};