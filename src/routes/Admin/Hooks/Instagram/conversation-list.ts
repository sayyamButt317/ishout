import { useQuery } from "@tanstack/react-query";
import { AdminInstaConversationListApi } from "../../API/admin.routes";

export default function InstagramConversationListHook() {
  return useQuery({
    queryKey: ["instagram-conversation-list"],
    queryFn: () => AdminInstaConversationListApi(),
    refetchOnWindowFocus: false,
  });
}
