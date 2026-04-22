import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface MarkerProps {
    comment: {
        text: string;
        timestamp: number;
        snapshot: string;
    };
    duration: number;
    onClick: (comment: { text: string; timestamp: number; snapshot: string }) => void;
}
export default function Marker({ comment, duration, onClick }: MarkerProps) {
    const position = (comment.timestamp / duration) * 100;

    return (
        <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${position}%` }}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        onClick={() => onClick(comment)}
                        className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-125 transition"
                    />
                </TooltipTrigger>

                <TooltipContent className="w-48 p-2">
                    {comment.snapshot && (
                        <Image
                            src={comment.snapshot}
                            alt="snapshot"
                            width={200}
                            height={100}
                            className="rounded mb-2"
                        />
                    )}
                    <p className="text-xs">{comment.text}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}