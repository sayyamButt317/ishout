'use client';

import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './reporty_style';
import type { CampaignBrief } from '@/src/types/Admin-Type/agreed-negotiation-type';

interface CampaignSummarySectionProps {
  summaryData?: {
    campaign_name?: string;
    'onBoard influencers'?: number;
    onboard_influencers?: number;
    influncers_produced__content_count?: number;
    influencers_produced_content?: number;
    campaign_overview?: string[];
    timeline?: string[];
  };

  campaign_brief?: CampaignBrief | null;
}

/** White metrics card only — embed on brief page (no Page). */
export function CampaignSummaryMetricsOnly({
  summaryData,
  campaign_brief,
}: CampaignSummarySectionProps) {
  return (
    <View style={styles.section} wrap>
      <Text style={styles.heading} wrap>
        Campaign Summary
      </Text>

      <Text style={styles.text} wrap>
        Campaign: {summaryData?.campaign_name ?? campaign_brief?.title}
      </Text>

      <View style={styles.summaryGrid} wrap>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>OnBoard Influencers</Text>
          <Text style={styles.summaryValue}>
            {summaryData?.onboard_influencers ?? summaryData?.['onBoard influencers'] ?? 0}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Produced Content</Text>
          <Text style={styles.summaryValue}>
            {summaryData?.influencers_produced_content ??
              summaryData?.influncers_produced__content_count ??
              0}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Overview Items</Text>
          <Text style={styles.summaryValue}>
            {summaryData?.campaign_overview?.length ?? 0}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Timeline Items</Text>
          <Text style={styles.summaryValue}>{summaryData?.timeline?.length ?? 0}</Text>
        </View>
      </View>
    </View>
  );
}

/** Standalone page (optional use outside merged brief page). */
export default function CampaignSummarySection({
  summaryData,
  campaign_brief,
}: CampaignSummarySectionProps) {
  return (
    <Page size="A4" orientation="landscape" style={styles.page} wrap>
      <View style={[styles.fullWidth, styles.content]} wrap>
        <CampaignSummaryMetricsOnly summaryData={summaryData} campaign_brief={campaign_brief} />
      </View>
    </Page>
  );
}
