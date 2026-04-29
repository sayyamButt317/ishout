import CampaignSuccessCard from "@/src/app/component/reporting/CampaignSuccessCard";
import InfluencerCard from "@/src/app/component/reporting/InfluencerCard";

export default function Page() {
  return (
    <div className="space-y-10 p-8">
      <CampaignSuccessCard />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <InfluencerCard
          name="Elena Voss"
          role="Macro Creator"
          avatar="https://..."
          contentImage="https://..."
          engagement="12.4%"
          resonance="High"
          tag="IG Story"
        />
      </div>
    </div>
  );
}