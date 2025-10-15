import { CONTENT_TYPES } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function ContentTypeComponent({
  guidedQuestion,
  setMultipleFields,
}: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        What type of content do you want influencers to create?
      </h3>
      <p className="text-sm text-gray-600">Select all content types you want</p>
      <div className="grid grid-cols-2 gap-3">
        {CONTENT_TYPES.map((type) => (
          <label
            key={type}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={guidedQuestion.contentType.includes(type)}
              onChange={(e) => {
                const current = guidedQuestion.contentType;
                if (e.target.checked) {
                  setMultipleFields({ contentType: [...current, type] });
                } else {
                  setMultipleFields({
                    contentType: current.filter((t) => t !== type),
                  });
                }
              }}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
