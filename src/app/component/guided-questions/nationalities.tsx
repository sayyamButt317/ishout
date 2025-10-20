import { NATIONALITY_OPTIONS } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function NationalitiesComponent({
  guidedQuestion,
  setMultipleFields,
}: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        What nationalities should the influencers be?
      </h3>
      <p className="text-sm text-gray-600">
        Select all applicable nationalities
      </p>
      <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
        {NATIONALITY_OPTIONS.map((nationality) => (
          <label
            key={nationality}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={guidedQuestion.nationalities.includes(nationality)}
              onChange={(e) => {
                const current = guidedQuestion.nationalities;
                if (e.target.checked) {
                  setMultipleFields({
                    nationalities: [...current, nationality],
                  });
                } else {
                  setMultipleFields({
                    nationalities: current.filter((n) => n !== nationality),
                  });
                }
              }}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">{nationality}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
