import { PlatformType } from "@/src/store/Campaign/ready-made";

interface SeletedItemProps {
  item: PlatformType;
  color: string;
  icon: React.ReactNode;
  isSelected: boolean;
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
          isSelected ? "animate-pulse" : "group-hover:animate-pulse"
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
        <span className="ring-2 ring-green-500 ring-offset-2 ring-offset-white shadow-lg scale-[1.03] pointer-events-none absolute -inset-px rounded-xl border"></span>
      )}
      
    </div>
  );
}
