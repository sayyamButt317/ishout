import { Textarea } from "@/components/ui/textarea";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function CompetitorComponent({
  guidedQuestion,
  setMultipleFields,
}: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Are there any competitors, words, or themes influencers should avoid?
      </h3>
      <Textarea
        placeholder="List any restrictions, competitors to avoid, or sensitive topics..."
        className="min-h-[120px]"
        value={guidedQuestion.restrictions}
        onChange={(e) => setMultipleFields({ restrictions: e.target.value })}
      />
    </div>
  );
}
