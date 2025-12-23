import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AdminUpdateUserStatusApi } from "../API/admin.routes";

export default function UpdateUserStatusHook() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ user_id, status }: { user_id: string, status: string }) => AdminUpdateUserStatusApi(user_id, status),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['all-users'] });
            toast.success('User status updated successfully');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update user status ', {
                description: axiosError.response?.data?.detail as string
            });
        },
    })
}