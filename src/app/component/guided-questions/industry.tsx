import { INDUSTRY_OPTIONS } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function IndustryComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {

    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Which industry or niche does your campaign belong to?</h3>
          <p className="text-sm text-gray-600">Choose the category that best fits your brand</p>
          <div className="grid grid-cols-2 gap-3">
            {INDUSTRY_OPTIONS.map((industry) => (
              <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="industry"
                  value={industry}
                  checked={guidedQuestion.industry === industry}
                  onChange={() => setMultipleFields({ industry })}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{industry}</span>
              </label>
            ))}
          </div>
        </div>
      );
}