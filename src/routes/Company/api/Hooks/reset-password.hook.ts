
import { ChangePasswordRequestProps, ChangePasswordResponseProps } from "@/src/types/Compnay/password-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyResetPasswordApi } from "../company.routes";
import { useRouter } from "next/navigation";

export default function ResetPasswordHook() {
    const router = useRouter();
    return useMutation({
        mutationFn: (password: ChangePasswordRequestProps) => CompanyResetPasswordApi(password),
        onSuccess: ({ data }: { data: ChangePasswordResponseProps }) => {
            toast.success(data.message);
            router.replace('/auth/login');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to reset password', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}