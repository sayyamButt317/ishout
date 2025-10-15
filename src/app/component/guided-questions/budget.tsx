import { BUDGET_RANGES } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function BudgetComponent({
  guidedQuestion,
  setMultipleFields,
}: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Do you have a budget range in mind?
      </h3>
      <p className="text-sm text-gray-600">
        Select your approximate campaign budget
      </p>
      <div className="grid grid-cols-1 gap-3">
        {BUDGET_RANGES.map((range) => (
          <label
            key={range}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="budgetRange"
              value={range}
              checked={guidedQuestion.budgetRange === range}
              onChange={(e) =>
                setMultipleFields({ budgetRange: e.target.value })
              }
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">{range}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
