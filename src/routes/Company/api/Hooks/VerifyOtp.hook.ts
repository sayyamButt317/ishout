import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { CompanyVerifyOtpApi } from "../company.routes";
import { VerifyOtpResponseProps } from "@/src/types/Compnay/password-type";


export default function VerifyOtpHook() {
    return useMutation({
        mutationFn: (otp: string) => CompanyVerifyOtpApi(otp),
        onSuccess: ({ data }: { data: VerifyOtpResponseProps }) => {
            toast.success(data.message);
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to verify OTP', {
                description: axiosError.response?.data?.detail as string
            });
        },
    });
}