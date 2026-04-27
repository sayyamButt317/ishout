import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyUpdateProfileApi } from "../company.routes";
import { UpdateProfileResponseProps } from "@/src/types/Compnay/profile-type";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { CompanyProfileFormValidator } from "@/src/validators/Company/profileschema-validation";

export default function CompanyUpdateProfileHook(user_id: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CompanyProfileFormValidator) => CompanyUpdateProfileApi(user_id, data),
        onSuccess: async (data: UpdateProfileResponseProps) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ['company-profile-details', user_id] });
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to update profile', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}