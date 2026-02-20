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
        message?: string;
        error?: { message?: string };
      }>;

      toast.error("Failed to register", {
        description:
          axiosError.response?.data?.message ||
          axiosError.response?.data?.message ||
          "An error occurred during registration.",
      });
    },
  });
}
