import { Badge } from "@/components/ui/badge";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import React from "react";

export default function PlatformBadge({
  platform,
}: {
  platform: PlatformType | PlatformType[];
}) {
  const platformArray = Array.isArray(platform) ? platform : [platform];
  const isMultiple = platformArray.length > 1;
  const label = platformArray.join(", ");

  const colorClass = isMultiple
    ? "capitalize bg-purple-100 text-purple-800 border-purple-300"
    : platformArray.includes("instagram")
    ? "capitalize bg-blue-100 text-blue-800 border-blue-300"
    : platformArray.includes("tiktok")
    ? "capitalize bg-red-100 text-red-800 border-red-300"
    : platformArray.includes("youtube")
    ? "capitalize bg-green-100 text-green-800 border-green-300"
    : "capitalize bg-gray-100 text-gray-800 border-gray-300";

  return (
    <Badge
      key={label}
      className={`flex items-center gap-2 text-xs ${colorClass}`}
    >
      {label}
    </Badge>
  );
}
