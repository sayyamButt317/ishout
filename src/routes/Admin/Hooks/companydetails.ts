import { useQuery } from "@tanstack/react-query";
import { AdminCompanyDetailsByIdApi } from "../API/admin.routes";

export default function CompanyDetailsHook(user_id: string) {
    return useQuery({
        queryKey: ['company-details', user_id],
        queryFn: () => AdminCompanyDetailsByIdApi(user_id),
        enabled: !!user_id,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        // refetchOnMount: (query) => !query.getObserversCount(),
    });
}