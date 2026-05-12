'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface SummaryShape {
  timeline?: string[];
}

const embedded = StyleSheet.create({
  subTitle: {
    fontSize: 10,
    color: '#133A44',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
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

export function pickCampaignTimelineItems(summaryData?: SummaryShape | null): string[] {
  if (!summaryData) return [];
  const t = summaryData.timeline;
  if (Array.isArray(t) && t.length > 0) return t;
  const bag = summaryData as unknown as Record<string, unknown>;
  const alt = bag.timeline ?? bag.Timeline;
  return Array.isArray(alt) ? (alt as string[]).filter((s) => typeof s === 'string') : [];
}

/** Timeline bullets for the mint “brief” card (no outer Page). */
export function CampaignTimelineEmbedded({
  summaryData,
}: {
  summaryData?: SummaryShape;
}) {
  const items = pickCampaignTimelineItems(summaryData);
  return (
    <View wrap>
      <Text style={embedded.subTitle} wrap>
        Timeline
      </Text>
      {items.length > 0 ? (
        items.map((item: string, i: number) => (
          <Text key={i} style={embedded.listItem} wrap>
            • {item}
          </Text>
        ))
      ) : (
        <Text style={embedded.text} wrap>
          No timeline available.
        </Text>
      )}
    </View>
  );
}

interface CampaignTimelineSectionProps {
  summaryData?: SummaryShape;
}

export default function CampaignTimelineSection({
  summaryData,
}: CampaignTimelineSectionProps) {
  const items = pickCampaignTimelineItems(summaryData);

  return (
    <Page size="A4" orientation="landscape" style={styles.page} wrap>
      <View style={[styles.fullWidth, styles.content]}>
        <View style={styles.section} wrap>
          <Text style={styles.heading}>Timeline</Text>
          {items.length > 0 ? (
            items.map((item: string, i: number) => (
              <Text key={i} style={styles.listItem} wrap>
                • {item}
              </Text>
            ))
          ) : (
            <Text style={styles.text} wrap>
              No timeline available.
            </Text>
          )}
        </View>
      </View>
    </Page>
  );
}
