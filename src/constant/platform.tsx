import { SiTiktok, SiInstagram, SiYoutube } from "react-icons/si";

export const Platforms = [
  {
    name: "TikTok",
    color: "bg-gradient-to-tr from-gray-800 to-black text-white",
    icon: <SiTiktok className="text-xl"
    />,
  },
  {
    name: "Instagram",
    color: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white",
    icon: <SiInstagram className="text-xl" />,
  },
  {
    name: "YouTube",
    color: "bg-red-600 text-white",
    icon: <SiYoutube className="text-xl" />,
  },
];