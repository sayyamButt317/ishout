import { Badge } from "@/components/ui/badge";

type StatusType = "reject" | "pending" | "shortlisted" | "Completed" | string;

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  const getStatusStyles = (status: StatusType) => {
    switch (status) {
      case "reject":
        return "capitalize bg-red-100 text-red-800";
      case "pending":
        return "capitalize bg-gray-100 text-gray-800";
      case "approved":
        return "capitalize bg-green-100 text-green-800";
      case "processing":
        return "capitalize bg-yellow-100 text-yellow-800";
      case "rejected":
        return "capitalize bg-red-100 text-red-800";
      default:
        return "capitalize bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge className={`capitalize ${getStatusStyles(status)} ${className}`}>
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
