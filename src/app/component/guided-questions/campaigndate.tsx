import { Input } from "@/components/ui/input";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function CampaignDateComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              When do you want the campaign to start?
            </h3>
            <Input
              type="date"
              value={guidedQuestion.startDate}
              onChange={(e) =>
                setMultipleFields({ startDate: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              When should the campaign end?
            </h3>
            <Input
              type="date"
              value={guidedQuestion.endDate}
              onChange={(e) => setMultipleFields({ endDate: e.target.value })}
            />
          </div>
        </div>
      );
}