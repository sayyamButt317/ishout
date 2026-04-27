import { toast } from "sonner";
import { CompanyForgotPasswordApi } from "../company.routes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function SendEmailForgotPasswordHook() {
    const router = useRouter();
    return useMutation({
        mutationFn: (email: string) => CompanyForgotPasswordApi(email),
        onSuccess: ({ message }: { message: string }) => {
            toast.success(message);
            router.push('/auth/verify-otp');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to forgot password', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}