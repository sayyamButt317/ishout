import { setAuthTokenProvider } from "@/src/provider/auth-provide";
import { LoginMutationApi } from "@/src/routes/Auth-Routes/Api/auth.routes";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { LoginRequestProps, LoginResponseProps } from "@/src/types/Auth-Type/login-type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ApiError from "@/src/helper/api-error";

export default function LoginMutation() {
    const router = useRouter();
    const { setIsAuthenticated, setUserId, setCompanyName } = useAuthStore();
    return useMutation({
        mutationFn: (data: LoginRequestProps) => LoginMutationApi(data),
        onSuccess: (data: LoginResponseProps) => {
            setIsAuthenticated(true);
            setAuthTokenProvider(data.access_token, data.user.role);
            setUserId(data.user.user_id);
            setCompanyName(data.user.company_name);
            if (data.user.role === "company") {
                router.replace('/client/create-campaign');
                toast.success('Login successful to iShout', {
                    description: 'You are now logged in',
                });
            } if (data.user.role === "admin") {
                router.replace('/Admin/all-campaign');
                toast.success('Login successful to iShout Admin Panel ', {
                    description: 'You are now logged in',
                });
            }
        },
        onError: (error) => {
            const apiError = ApiError.fromUnknown(error);
            toast.error('Failed to login', {
                description: apiError.message,
            });
            console.error("Login error:", apiError);
        },
    });
}