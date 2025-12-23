import { SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";

export const Platforms = [
  {
    name: "TikTok",
    icon: <SiTiktok className="text-xl" />,
  },
  {
    name: "Instagram",
    icon: <SiInstagram className="text-xl" />,
  },
  {
    name: "YouTube",
    icon: <SiYoutube className="text-xl" />,
  },
];

export const PLATFORM_CONFIG = {
  instagram: {
    icon: <SiInstagram />,
    color: "text-pink-500",
  },
  tiktok: {
    icon: <SiTiktok />,
    color: "text-black dark:text-white",
  },
  youtube: {
    icon: <SiYoutube />,
    color: "text-red-500",
  },
  all: {
    icon: (
      <div className="flex items-center gap-2">
        <SiInstagram className="text-xl" />
        <SiTiktok className="text-xl" />
        <SiYoutube className="text-xl" />
      </div>
    ),
    color: "",
  },
} as const;
