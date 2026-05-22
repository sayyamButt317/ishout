import { BarChart3 } from 'lucide-react';
import EmptyDataCard from '../empty-data-card';

export default function NoInfluencerContentCard() {
  return (
    <EmptyDataCard
      minHeight="min-h-[calc(100dvh-8rem)]"
      icon={BarChart3}
      title="No influencer content to report yet"
      description="Once influencers submit approved content for this campaign, you will see demographics, engagement metrics, and reports on this page."
    />
  );
}
