import { GOAL_OPTIONS } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function MainGoalComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        What is the main goal of your campaign?
      </h3>
      <p className="text-sm text-gray-600">
        Select the primary objective for your influencer campaign
      </p>
      <div className="grid grid-cols-1 gap-3">
        {GOAL_OPTIONS.map((goal) => (
          <label
            key={goal}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="goal"
              value={goal}
              checked={guidedQuestion.goal === goal}
              onChange={() => setMultipleFields({ goal })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">{goal}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
