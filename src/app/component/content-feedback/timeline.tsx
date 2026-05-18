
import { TooltipProvider } from "@/components/ui/tooltip";
import TimelineMarker from "./TimelineMarker";

interface TimelineProps {
    comments: {
        text: string;
        timestamp: number;
        snapshot: string;
    }[];
    duration: number;
    onClick: (timestamp: number) => void;
}
export default function Timeline({ comments, duration, onClick }: TimelineProps) {
    return (
        <TooltipProvider>
            <div className="relative w-full h-2 bg-gray-700 rounded">
                {comments.map((comment, i) => (
                    <TimelineMarker
                        key={i}
                        comment={{
                            id: `legacy-${i}`,
                            text: comment.text,
                            timestamp: comment.timestamp,
                            snapshot: comment.snapshot,
                        }}
                        duration={duration}
                        onClick={(c) => onClick(c.timestamp)}
                    />
                ))}
            </div>
        </TooltipProvider>
    );
}