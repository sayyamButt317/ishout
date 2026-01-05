import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AdminTakeoverToggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <Switch checked={enabled} onCheckedChange={onChange} />
      <Label className="text-sm text-white">
        Admin Takeover {enabled ? "ON" : "OFF"}
      </Label>
    </div>
  );
}
