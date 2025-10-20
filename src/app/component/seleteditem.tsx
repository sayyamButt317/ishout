import { PlatformType } from "@/src/types/readymadeinfluencers-type";
import { Check } from "lucide-react";

interface SeletedItemProps {
  item: PlatformType;
  color: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  onClick: () => void;
}
export default function SeletedItem({
  item,
  color,
  icon,
  isSelected,
  onClick,
}: SeletedItemProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      className={`relative group flex flex-col items-center justify-center rounded-xl p-4 cursor-pointer select-none transition-all duration-300 ${color}`}
    >
      <div
        className={`mb-1 ${
          isSelected
            ? "animate-pulse bg-secondaryButton"
            : "group-hover:animate-pulse"
        }`}
      >
        {icon}
      </div>
      <span
        className={`font-semibold text-xs tracking-wide ${
          isSelected ? "underline" : ""
        }`}
      >
        {item}
      </span>
      {isSelected && (
        <span className="bg-secondaryButton w-full h-full absolute -inset-px rounded-xl animate-pulse">
          <Check size="sm" />
        </span>
      )}
    </div>
  );
}
