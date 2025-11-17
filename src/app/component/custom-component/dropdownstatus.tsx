"use client";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface StatusProps {
  status: string;
  updateStatus: (status: string) => void;
}

export function DropDownCustomStatus({ status, updateStatus }: StatusProps) {
  const [selectedStatus, setSelectedStatus] = React.useState(status);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    updateStatus(value);
  };
  const getButtonStyle = () => {
    switch (selectedStatus) {
      case "rejected":
        return "bg-red-100 text-red-800 border-red-400";
      case "approved":
        return "bg-green-100 text-green-800 border-green-400";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-400";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={`capitalize ${getButtonStyle()} w-full cursor-pointer`}
        >
          {selectedStatus}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-amber-50 backdrop-blur">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedStatus}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem
            className=" text-green-800 border-green-400"
            value="approved"
          >
            Approved
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className=" text-red-800 border-red-400"
            value="rejected"
          >
            Rejected
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className=" text-yellow-800 border-yellow-400"
            value="processing"
          >
            Processing
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className=" text-gray-800 border-gray-400"
            value="pending"
          >
            Pending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
