import { PLATFORM_OPTIONS } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function PlatformComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Which platforms are you targeting?
          </h3>
          <p className="text-sm text-gray-600">
            Select all platforms you want to use
          </p>
          <div className="grid grid-cols-2 gap-3">
            {PLATFORM_OPTIONS.map((platform) => (
              <label
                key={platform}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={guidedQuestion.platforms.includes(platform)}
                  onChange={(e) => {
                    const current = guidedQuestion.platforms;
                    if (e.target.checked) {
                      setMultipleFields({
                        platforms: [...current, platform],
                      });
                    } else {
                      setMultipleFields({
                        platforms: current.filter((p) => p !== platform),
                      });
                    }
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">{platform}</span>
              </label>
            ))}
          </div>
        </div>
      );
}