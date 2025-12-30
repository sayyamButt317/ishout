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

export function UserStatus({ status, updateStatus }: StatusProps) {
  const [selectedStatus, setSelectedStatus] = React.useState(status);
  React.useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    updateStatus(value);
  };
  const getButtonStyle = () => {
    switch (selectedStatus) {
      // case "inactive":
      //   return "bg-[#f3004020] text-[#fa1c57]";
      case "active":
        return "bg-[#25e76620] text-[#25e766]";
      case "suspended":
        return "bg-[#e2c11b20] text-[#e2a513]";
      default:
        return "bg-gray-100 text-gray-800 border-gray-400";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={`capitalize ${getButtonStyle()} w-full cursor-pointer text-xs sm:text-sm`}
        >
          {selectedStatus || "select status"}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30 sm:w-56 bg-amber-50 backdrop-blur">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedStatus}
          onValueChange={handleStatusChange}
        >
          <DropdownMenuRadioItem
            className="text-[#25e766] border-green-400 text-xs sm:text-sm"
            value="active"
          >
            Active
          </DropdownMenuRadioItem>
          {/* <DropdownMenuRadioItem
            className="text-[#fa1c57] border-red-400 text-xs sm:text-sm"
            value="inactive"
          >
            Inactive
          </DropdownMenuRadioItem> */}
          <DropdownMenuRadioItem
            className="text-[#e2a513] border-yellow-400 text-xs sm:text-sm"
            value="suspended"
          >
            Suspended
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
