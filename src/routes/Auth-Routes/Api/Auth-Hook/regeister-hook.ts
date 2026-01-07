import { setAuthTokenProvider } from "@/src/provider/auth-provide";
import { SignUpMutationApi } from "@/src/routes/Auth-Routes/Api/auth.routes";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { SignUpRequestProps, SignUpResponseProps } from "@/src/types/Auth-Type/signup-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterMutation() {
    const router = useRouter();
    const { setIsAuthenticated, } = useAuthStore();
    return useMutation({
        mutationFn: (data: SignUpRequestProps) => SignUpMutationApi(data),
        onSuccess: (data: SignUpResponseProps) => {
            setIsAuthenticated(true);
            setAuthTokenProvider(data.access_token, data.user.role);
            toast.success('Registration successful');
            router.replace('/client/choose-campaign');
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to register', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during registration.',
            });
        },
    });
}