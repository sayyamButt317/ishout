import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatInput({
  enabled,
  value,
  onChange,
  onSend,
}: {
  enabled: boolean;
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-[#202c33] border-t border-white/10">
      <Input
        disabled={!enabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          enabled ? "Type a message…" : "Enable admin takeover to send messages"
        }
        className="bg-[#2a3942] text-white border-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") onSend();
        }}
      />
      <Button
        disabled={!enabled || !value.trim()}
        onClick={onSend}
        className="bg-green-600 hover:bg-green-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
