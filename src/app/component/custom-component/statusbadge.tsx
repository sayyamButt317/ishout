"use client";
import { Badge } from "@/components/ui/badge";

type StatusType = "reject" | "pending" | "shortlisted" | "Completed" | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const getStatusStyles = (status: StatusType) => {
    switch (status.toLowerCase()) {
      case "reject":
      case "rejected":
        return "capitalize bg-white/10 text-red-400 border border-red-400/20";
      case "pending":
        return "capitalize bg-white/10 text-white/80 border border-white/20";
      case "approved":
        return "capitalize bg-white/10 text-green-400 border border-green-400/20";
      case "processing":
        return "capitalize bg-white/10 text-yellow-400 border border-yellow-400/20";
      default:
        return "capitalize bg-white/10 text-white/80 border border-white/20";
    }
  };

  return (
    <Badge className={`capitalize rounded-md px-2.5 py-1 text-xs font-medium ${getStatusStyles(status)} ${className}`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;

export function PlatformBadgeStatus({ platform }: { platform: string }) {
  switch (platform) {
    case "instagram":
      return (
        <Badge className="capitalize bg-blue-100 text-blue-800">
          Instagram
        </Badge>
      );
    case "tiktok":
      return (
        <Badge className="capitalize bg-red-100 text-gray-400">TikTok</Badge>
      );
    case "youtube":
      return (
        <Badge className="capitalize bg-red-100 text-red-500">YouTube</Badge>
      );
    default:
      return (
        <Badge className="capitalize bg-gray-100 text-gray-800">Unknown</Badge>
      );
  }
}
