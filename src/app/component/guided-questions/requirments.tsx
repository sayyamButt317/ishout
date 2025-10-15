import { Textarea } from "@/components/ui/textarea";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function RequirmentsComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            What are your key requirements for the influencers?
          </h3>
          <p className="text-sm text-gray-600">
            Describe content type, key messages, and any specific requirements
          </p>
          <Textarea
            placeholder="e.g., Must create authentic content, mention product benefits, include call-to-action..."
            className="min-h-[120px]"
            value={guidedQuestion.keyRequirements}
            onChange={(e) =>
              setMultipleFields({ keyRequirements: e.target.value })
            }
          />
        </div>
      );
}