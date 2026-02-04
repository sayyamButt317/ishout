import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyVerifyOtpApi } from "../company.routes";
import { VerifyOtpResponseProps } from "@/src/types/Compnay/password-type";
import { useForgotPasswordStore } from "@/src/store/User/forgot-password.store";
import { useRouter } from "next/navigation";


export default function VerifyOtpHook() {
    const { setResetToken } = useForgotPasswordStore();
    const router = useRouter();

    return useMutation({
        mutationFn: ({ otp, email }: { otp: string; email: string }) => CompanyVerifyOtpApi(otp, email),
        onSuccess: (data: VerifyOtpResponseProps) => {
            toast.success(data.message);
            setResetToken(data.reset_token);
            router.replace('/auth/change-password');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string; error: { message: string } }>;
            toast.error('Failed to verify OTP', {
                description:
                    axiosError.response?.data?.error?.message || 'An error occurred during verify OTP.',
            });
        },
    });
}
