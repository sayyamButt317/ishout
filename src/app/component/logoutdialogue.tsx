"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { clearAuthTokenProvider } from "@/src/provider/auth-provide";
import { useRouter } from "next/navigation";

interface LogoutDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutDialogue({
  open,
  onOpenChange,
}: LogoutDialogueProps) {
  const router = useRouter();
  const handleLogout = () => {
    onOpenChange(false);
    router.replace("/auth/login");
    clearAuthTokenProvider();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-center">Logout?</AlertDialogTitle>
          <hr className="my-4 w-full bg-[#1E4B8E] h-[1px]" />
          <AlertDialogDescription className=" font-open-sans font-normal text-base text-center text-white">
            Are you sure you want to Logout?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center items-center gap-2 w-full">
            <AlertDialogCancel className="bg-[#DCDCDC] font-open-sans font-normal w-40">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button className="font-semibold w-40" onClick={handleLogout}>
                Yes, Logout
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
