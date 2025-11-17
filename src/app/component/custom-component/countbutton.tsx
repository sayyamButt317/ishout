import { Button } from "@/components/ui/button";

interface CountButtonProps {
  count: number;
}

export default function CountButton({ count }: CountButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-10 flex items-center gap-2 text-white bg-transparent border-2 cursor-pointer"
    >
      {count}
    </Button>
  );
}
