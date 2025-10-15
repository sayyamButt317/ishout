import { Input } from "@/components/ui/input";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function PiecesOfContentComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            How many pieces of content should each influencer produce?
          </h3>
          <Input
            placeholder="e.g., 3 posts, 5 stories, 1 video"
            value={guidedQuestion.contentQuantity}
            onChange={(e) =>
              setMultipleFields({ contentQuantity: e.target.value })
            }
          />
        </div>
      );
}