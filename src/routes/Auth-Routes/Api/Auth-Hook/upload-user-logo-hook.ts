import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadUserLogoApi } from "../auth.routes";

export default function UploadUserLogoHook() {
  return useMutation({
    mutationFn: ({ user_id, file }: { user_id: string; file: File }) =>
      uploadUserLogoApi(user_id, file),
    onSuccess: () => {
      toast.success("Logo uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload logo");
    },
  });
}

