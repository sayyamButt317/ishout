import { ProfileChangePasswordRequestProps, ChangePasswordResponseProps } from "@/src/types/Compnay/password-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyProfileChangePasswordApi } from "../company.routes";

export default function ProfileChangePasswordHook(user_id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (password: ProfileChangePasswordRequestProps) => CompanyProfileChangePasswordApi(user_id, password),
        onSuccess: async (data: ChangePasswordResponseProps) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ['company-profile-details', user_id] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to change password', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}

