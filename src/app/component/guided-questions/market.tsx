import { Input } from "@/components/ui/input";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function MarketComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps)  {
    return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">What is your target market country?</h3>
            <Input 
              placeholder="e.g., United States, United Kingdom" 
              value={guidedQuestion.targetCountry}
              onChange={(e) => setMultipleFields({ targetCountry: e.target.value })}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">What are your target demographics?</h3>
            <Input 
              placeholder="e.g., 18-35 years old, urban professionals" 
              value={guidedQuestion.targetDemographics}
              onChange={(e) => setMultipleFields({ targetDemographics: e.target.value })}
            />
          </div>
        </div>
      );
}