import { Input } from "@/components/ui/input";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function NumberofInfluencerComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            How many influencers do you want?
          </h3>
          <Input
            placeholder="e.g., 5, 10, 20"
            value={guidedQuestion.influencerCount}
            onChange={(e) =>
              setMultipleFields({ influencerCount: e.target.value })
            }
          />
        </div>
      );
}