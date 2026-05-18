import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface DialogueProps {
  heading?: string;
  subheading?: string;
  ondelete?: () => void;
  open: boolean;
  onClose?: () => void;
  isDeleting?: boolean;
}

export const DeleteDialogue = ({
  heading,
  subheading,
  ondelete,
  open,
  onClose,
  isDeleting = false,
}: DialogueProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !isDeleting) onClose?.();
      }}
    >
      <DialogContent>
        <div className="flex flex-col items-center p-6">
          <h2 className="text-2xl font-semibold mb-4">{heading}</h2>

          <p className="mb-6 whitespace-pre-line text-center text-sm text-gray-500">
            {subheading}
          </p>

          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose} disabled={isDeleting}>
              Cancel
            </Button>

            <Button
              className="bg-red-400 text-white hover:bg-red-600 min-w-[88px]"
              onClick={ondelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
