import { Badge } from "@/components/ui/badge";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import React from "react";

export default function PlatformBadge({
  platform,
}: {
  platform: PlatformType;
}) {
  return (
    <Badge className=" flex items-center gap-2 bg-transparent border text-xs">
      <Badge
        key={platform}
        className={` flex items-center gap-2 bg-transparent border text-xs ${
          platform === "instagram"
            ? "bg-blue-100 text-blue-800"
            : platform === "tiktok"
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {platform}
      </Badge>
    </Badge>
  );
}
