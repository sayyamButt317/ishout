
import { ChangePasswordRequestProps } from "@/src/types/Compnay/password-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyResetPasswordApi } from "../company.routes";
import { useRouter } from "next/navigation";
import { useForgotPasswordStore } from "@/src/store/User/forgot-password.store";

export default function ResetPasswordHook() {
    const { reset_all_fields } = useForgotPasswordStore();
    const router = useRouter();
    return useMutation({
        mutationFn: (password: ChangePasswordRequestProps) => CompanyResetPasswordApi(password),
        onSuccess: () => {
            toast.success("Password reset successful");
            reset_all_fields();
            router.replace('/auth/login');

        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string, error: { message: string } }>;
            toast.error('Failed to reset password', {
                description:
                    axiosError.response?.data?.error?.message,
            });
        },
    });
}