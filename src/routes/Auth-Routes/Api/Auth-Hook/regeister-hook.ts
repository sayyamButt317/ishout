import { SignUpMutationApi } from "@/src/routes/Auth-Routes/Api/auth.routes";
import { SignUpRequestProps, SignUpResponseProps } from "@/src/types/Auth-Type/signup-type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignUpRequestProps) => SignUpMutationApi(data),

    onSuccess: (data: SignUpResponseProps) => {
      toast.success(data.message);
      router.replace("/auth/login");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<{
        error: { status_code: number; message: string };
      }>;
      toast.error("Registration Failed", {
        description: axiosError.response?.data?.error?.message,
      });
    },
  });
}
