import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AdminDeleteUserApi } from "../API/admin.routes";
import { UserManagementResponse } from "@/src/types/Admin-Type/usermanagment.type";


export default function DeleteUserHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user_id: string) => AdminDeleteUserApi(user_id),
        onMutate: async (user_id) => {
            await queryClient.cancelQueries({ queryKey: ['all-users'] });
            const previousData = queryClient.getQueryData(['all-users']);
            queryClient.setQueryData(['all-users'], (oldData: { users: UserManagementResponse[] }) => {
                if (!oldData) return { users: [] };
                return { users: oldData.users.filter((user: UserManagementResponse) => user.user_id !== user_id) };
            });
            return { previousData };
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['all-users'] });
            toast.success('User deleted successfully');
        },
        onError: async (error: AxiosError<{ message: string }>, _, context) => {
            await queryClient.setQueryData(['all-users'], context?.previousData);
            toast.error('Failed to delete user', {
                description: error.response?.data?.message,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['all-users'] });
            toast.success('User deleted successfully');
        },
    });
}