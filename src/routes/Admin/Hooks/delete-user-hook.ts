import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AdminDeleteUserApi } from "../API/admin.routes";
import { UserManagementResponse } from "@/src/types/Admin-Type/usermanagment.type";


export default function DeleteUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user_id: string) => AdminDeleteUserApi(user_id),
        onSuccess: (_, user_id) => {
            queryClient.setQueryData(['all-user'], (oldData: { users: UserManagementResponse[] }) => {
                if (!oldData) return { users: [] };
                return { users: oldData.users.filter((user: UserManagementResponse) => user.user_id !== user_id) };
            });
            queryClient.invalidateQueries({ queryKey: ['all-user'] });
            toast.success('User deleted successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error('Failed to delete user', {
                description: error.response?.data?.message,
            });
        },
    });
}