import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import React from "react";

export const ChatInput = React.memo(function ChatInput({
  enabled,
  onSend,
}: {
  enabled: boolean;
  onSend: (msg: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center gap-2 p-3 bg-[#202c33] border-t border-white/10">
      <Input
        disabled={!enabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          enabled ? "Type a message…" : "Enable admin takeover to send messages"
        }
        className="bg-[#2a3942] text-white border-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.trim()) {
            onSend(value);
            setValue("");
          }
        }}
      />
      <Button
        disabled={!enabled || !value.trim()}
        onClick={() => {
          onSend(value);
          setValue("");
        }}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
});
