import { useQuery } from "@tanstack/react-query";
import { CompanyProfileDetailsApi } from "../company.routes";


export default function CompanyProfileDetailsHook(user_id: string) {
    return useQuery({
        queryKey: ['company-profile-details', user_id],
        queryFn: () => CompanyProfileDetailsApi(user_id),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 60 * 24,
        gcTime: 1000 * 60 * 60 * 24,
        retry: 1,
        retryDelay: 1000,
    });
}