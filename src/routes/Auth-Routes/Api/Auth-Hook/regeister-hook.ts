import { SignUpMutationApi } from "@/src/routes/Auth-Routes/Api/auth.routes";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { SignUpFormValidator } from "@/src/validators/Auth-Validator/signUp-Validators";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterMutation() {
    const router = useRouter();
    const { setIsAuthenticated, setRole, setAccessToken, setRefreshToken } = useAuthStore();
    return useMutation({
        mutationFn: (data: SignUpFormValidator) => SignUpMutationApi(data),
        onSuccess: (data) => {
            setIsAuthenticated(true);
            setRole("client");
            setAccessToken(data.access_token);
            toast.success('Registration successful', {
                description: 'You can now login to your account',
            });
            router.push('/client/dashboard');
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