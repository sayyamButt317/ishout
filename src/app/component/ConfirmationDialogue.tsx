import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogueProps{
    heading?:string,
    subheading?:string,
    onConfirm?:()=>void,
    open: boolean;
    onClose?: () => void;
}

export const ConfirmationDialogue = ({
  heading,
  subheading,
  onConfirm,
  open,
  onClose,
}: DialogueProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold mb-4">{heading}</h2>

          <p className="text-sm text-gray-500 mb-6">{subheading}</p>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button
              className="bg-red-400 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};