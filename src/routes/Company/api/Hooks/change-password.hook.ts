
import { ChangePasswordRequestProps, ChangePasswordResponseProps } from "@/src/types/Compnay/password-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyChangePasswordApi } from "../company.routes";

export default function ChangePasswordHook() {
    return useMutation({
        mutationFn: (password: ChangePasswordRequestProps) => CompanyChangePasswordApi(password),
        onSuccess: ({ data }: { data: ChangePasswordResponseProps }) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to change password', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}