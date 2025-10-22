import { Check } from "lucide-react";

interface SeletedItemProps {
  item: string;
  color: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}
export default function SeletedItem({
  color,
  icon,
  isSelected = false,
  onClick,
}: SeletedItemProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center rounded-xl p-2 sm:p-3 md:p-4 cursor-pointer select-none transition-all duration-300 font-medium text-slate-700 group-hover:text-slate-900 ${color}`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <Check className="w-4 h-4 text-primaryButton" />
        </div>
      )}

      <div className="mb-1">{icon}</div>
      <span
        className={`text-sm font-medium ${
          isSelected
            ? "text-Primary-text"
            : "text-slate-700 group-hover:text-slate-900"
        } truncate`}
      ></span>
    </div>
  );
}
