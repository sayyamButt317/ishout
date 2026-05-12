import { useQuery } from "@tanstack/react-query";
import { PostingDetailsApi } from "../API/admin.routes";


export function PostingDetailsHook() {
    return useQuery({
        queryKey: ['posting-details'],
        queryFn: () => PostingDetailsApi(),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}