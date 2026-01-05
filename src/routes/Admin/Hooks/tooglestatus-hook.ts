import { useQuery } from "@tanstack/react-query";
import { ToogleStatusApi } from "../API/admin.routes";


export default function ToogleStatusHook(thread_id: string) {
    return useQuery({
        queryKey: ['toogle-status', thread_id],
        queryFn: () => ToogleStatusApi(thread_id),
        enabled: !!thread_id,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
}