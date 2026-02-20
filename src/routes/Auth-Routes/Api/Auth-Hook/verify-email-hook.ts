import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { verifyEmailApi } from "../auth.routes";

interface VerifyEmailResponse {
  message: string;
}

interface VerifyEmailError {
  detail?: string;
  message?: string;
}

export default function VerifyEmailMutation() {
  const router = useRouter();

  return useMutation<
    VerifyEmailResponse,
    AxiosError<VerifyEmailError>,
    string
  >({
    mutationFn: (token: string) => verifyEmailApi(token),

    onSuccess: (data) => {
      toast.success(data.message || "Email verified successfully!");

      setTimeout(() => {
        router.replace("/auth/login");
      }, 3000);
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Email verification failed."
      );
    },
  });
}