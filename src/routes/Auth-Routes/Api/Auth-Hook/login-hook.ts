import { setAuthTokenProvider } from "@/src/provider/auth-provide";
import { LoginMutationApi } from "@/src/routes/Auth-Routes/Api/auth.routes";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { LoginRequestProps, LoginResponseProps } from "@/src/types/Auth-Type/login-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginMutation() {
    const router = useRouter();
    const { setIsAuthenticated, setUserId } = useAuthStore();
    return useMutation({
        mutationFn: (data: LoginRequestProps) => LoginMutationApi(data),
        onSuccess: (data: LoginResponseProps) => {
            setIsAuthenticated(true);
            setAuthTokenProvider(data.access_token, data.user.role);
            setUserId(data.user.user_id);
            console.log(data.user.user_id);
            if (data.user.role === "company") {
                router.replace('/client/create-campaign');
                toast.success('Login successful to iShout', {
                    description: 'You are now logged in',
                });
            } if (data.user.role === "admin") {
                router.replace('/Admin/all-campaign');
                toast.success('Login successful to iShout Admin Panel', {
                    description: 'You are now logged in',
                });
            }
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ detail: string }>;
            toast.error('Failed to login', {
                description:
                    axiosError.response?.data?.detail || 'An error occurred during login.',
            });
        },
    });
}