import { useQuery } from "@tanstack/react-query"
import { AdminUserManagementApi } from "../API/admin.routes"


export default function AllUsersHook(page: number = 1) {
    return useQuery({
        queryKey: ['all-users', page],
        queryFn: () => AdminUserManagementApi(page),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    })
}