import { GuidedQuestionComponentProps } from "@/src/types/guidedquestion-type";

export function UsageRightsComponent({ guidedQuestion, setMultipleFields }: GuidedQuestionComponentProps) {
    return (
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="usageRights"
              checked={guidedQuestion.usageRights}
              onChange={(e) =>
                setMultipleFields({ usageRights: e.target.checked })
              }
              className="w-4 h-4 mt-1"
            />
            <div>
              <label
                htmlFor="usageRights"
                className="text-lg font-semibold cursor-pointer"
              >
                Do you want usage rights to re-use influencer content for your
                own brand ads/pages?
              </label>
              <p className="text-sm text-gray-600 mt-1">
                This allows you to repost, share, or use the influencer&apos;s
                content for your own marketing purposes
              </p>
            </div>
          </div>
        </div>
      );
}