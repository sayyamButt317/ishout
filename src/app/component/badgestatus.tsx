import { Badge } from "lucide-react";

export default function BadgeStatus({ status }: { status: string }) {
  switch (status) {
    case "reject":
      return (
        <Badge className="capitalize bg-red-100 text-red-800">{status}</Badge>
      );
    case "pending":
      return (
        <Badge className="capitalize bg-yellow-100 text-[#f7941D]">
          {status}
        </Badge>
      );
    case "approved":
      return (
        <Badge className="capitalize bg-green-100 text-green-800">
          {status}
        </Badge>
      );
    default:
      return (
        <Badge className="capitalize bg-gray-100 text-gray-800">{status}</Badge>
      );
  }
}
