import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function CampaignMessageComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do you have specific messaging for the campaign?
            </h3>
            <Textarea
              placeholder="Key messages, talking points, or specific phrases to include..."
              className="min-h-[100px]"
              value={guidedQuestion.messaging}
              onChange={(e) =>
                setMultipleFields({ messaging: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do you have specific hashtags to use?
            </h3>
            <Input
              placeholder="e.g., #YourBrand #Campaign2024 #ProductLaunch"
              value={guidedQuestion.hashtags}
              onChange={(e) =>
                setMultipleFields({ hashtags: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Do you have brand guidelines to follow?
            </h3>
            <Textarea
              placeholder="Brand voice, visual guidelines, do's and don'ts..."
              className="min-h-[100px]"
              value={guidedQuestion.brandGuidelines}
              onChange={(e) =>
                setMultipleFields({ brandGuidelines: e.target.value })
              }
            />
          </div>
        </div>
      );

}