import { INFLUENCER_TIERS } from "@/src/constant/guided-question";
import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function InfluencersFollowersComponent({
  guidedQuestion,
  setMultipleFields,
}: GuidedQuestionComponentProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Do you prefer nano, micro, macro, or celebrity influencers?
      </h3>
      <p className="text-sm text-gray-600">
        Choose the influencer tier that fits your campaign
      </p>
      <div className="grid grid-cols-1 gap-3">
        {INFLUENCER_TIERS.map((tier) => (
          <label
            key={tier}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input
              type="radio"
              name="influencerTier"
              value={tier}
              checked={guidedQuestion.influencerTier === tier}
              onChange={(e) =>
                setMultipleFields({ influencerTier: e.target.value })
              }
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">{tier}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
