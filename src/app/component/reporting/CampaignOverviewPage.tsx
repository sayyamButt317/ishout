'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface SummaryShape {
  campaign_overview?: string[];
}

const embedded = StyleSheet.create({
  listItem: {
    fontSize: 10,
    color: '#133A44',
    lineHeight: 1.45,
    marginBottom: 3,
    marginLeft: 6,
  },
  text: {
    fontSize: 10,
    color: '#133A44',
    lineHeight: 1.45,
    marginBottom: 4,
  },
});

export function pickCampaignOverviewLines(summaryData?: SummaryShape | null): string[] {
  if (!summaryData) return [];
  const direct = summaryData.campaign_overview;
  if (Array.isArray(direct) && direct.length > 0) return direct;
  const bag = summaryData as unknown as Record<string, unknown>;
  const alt = bag.campaign_overview ?? bag.campaignOverview;
  return Array.isArray(alt) ? (alt as string[]).filter((s) => typeof s === 'string') : [];
}

/** Overview body for the mint “brief” card (no outer Page). Uses API overview, else optional negotiation brief. */
export function CampaignOverviewEmbedded({
  summaryData,
  negotiationBriefFallback,
}: {
  summaryData?: SummaryShape;
  negotiationBriefFallback?: string;
}) {
  const lines = pickCampaignOverviewLines(summaryData);
  if (lines.length > 0) {
    return (
      <View wrap>
        {lines.map((item: string, i: number) => (
          <Text key={i} style={embedded.listItem} wrap>
            • {item}
          </Text>
        ))}
      </View>
    );
  }
  if (negotiationBriefFallback?.trim()) {
    return (
      <Text style={embedded.text} wrap>
        {negotiationBriefFallback.trim()}
      </Text>
    );
  }
  return (
    <Text style={embedded.text} wrap>
      No overview available.
    </Text>
  );
}

interface CampaignOverViewSectionProps {
  summaryData?: SummaryShape;
}

export default function CampaignOverviewSection({ summaryData }: CampaignOverViewSectionProps) {
  return (
    <Page size="A4" orientation="landscape" style={styles.page} wrap>
      <View style={[styles.fullWidth, styles.content]}>
        <View style={styles.section} wrap>
          <Text style={styles.heading}>Campaign Overview</Text>
          <CampaignOverviewEmbedded summaryData={summaryData} />
        </View>
      </View>
    </Page>
  );
}
