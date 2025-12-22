import { Badge } from "@/components/ui/badge";
import { PLATFORM_CONFIG } from "@/src/constant/platform";
import { PlatformType } from "@/src/types/readymadeinfluencers-type";

export default function PlatformBadge({
  platform,
}: {
  platform: PlatformType | PlatformType[];
}) {
  const platforms = Array.isArray(platform) ? platform : [platform];

  return (
    <Badge className="flex flex-wrap items-center gap-3 px-3 py-1 text-xs bg-transparent border">
      {platforms.map((platform) => {
        const normalized =
          platform.toLowerCase() as keyof typeof PLATFORM_CONFIG;
        const config = PLATFORM_CONFIG[normalized];
        if (!config) return null;
        return (
          <span
            key={platform}
            className={`flex items-center gap-1 ${config.color}`}
          >
            {config.icon}
            <span className="capitalize">{normalized}</span>
          </span>
        );
      })}
    </Badge>
  );
}
