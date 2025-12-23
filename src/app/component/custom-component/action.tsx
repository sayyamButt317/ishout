import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteCampaignHook from "@/src/routes/Admin/Hooks/deleteCampaign.hook";
import { EllipsisVerticalIcon, Trash } from "lucide-react";
import { WhatsAppShareButton } from "./whatsappshare";

export function DropdownMenuAction({
  campaignId,
  userId,
}: {
  campaignId: string;
  userId: string;
}) {
  const deleteCampaignHook = DeleteCampaignHook();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <EllipsisVerticalIcon className="w-4 h-4 text-primary--text cursor-pointer" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 p-2" align="start">
        <DropdownMenuGroup>
          {/*CHAT ACTION */}
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <WhatsAppShareButton userId={userId} className="w-4 h-4 mr-1" />
            Chat
          </DropdownMenuItem>

          {/*DELETE ACTION */}
          <DropdownMenuItem
            disabled={deleteCampaignHook.isPending}
            className="gap-2 cursor-pointer"
            onClick={() => deleteCampaignHook.mutate(campaignId)}
          >
            <Trash className="w-4 h-4 text-red-300 mr-1" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
