
import { TooltipProvider } from "@/components/ui/tooltip";
import Marker from "./TimelineMarker";

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
                    <Marker
                        key={i}
                        comment={comment}
                        duration={duration}
                        onClick={(comment) => onClick(comment.timestamp)}
                    />
                ))}
            </div>
        </TooltipProvider>
    );
}