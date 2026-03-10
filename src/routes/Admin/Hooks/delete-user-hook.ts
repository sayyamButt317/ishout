import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { AdminDeleteUserApi } from "../API/admin.routes";

export default function DeleteUserHook() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (user_id: string) => {
      return await AdminDeleteUserApi(user_id);
    },

    onSuccess: () => {
      toast.success("User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["all-users"],
      });
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error("Failed to delete user", {
        description:
          error?.response?.data?.message || "Something went wrong",
      });
    },
  });

  return mutation;
}