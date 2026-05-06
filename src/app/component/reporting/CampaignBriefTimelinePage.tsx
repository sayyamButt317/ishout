'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7FBFA',
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    right: -80,
    top: -60,
    width: 220,
    height: 220,
    border: '1px solid #C4E7E2',
    borderRadius: 120,
  },
  headingBand: {
    backgroundColor: '#8BCDBF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 14,
    width: 430,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2F3A',
  },
  row: {
    flexDirection: 'row',
    gap: 18,
  },
  briefCard: {
    flex: 1.35,
    backgroundColor: '#C8E3CB',
    borderRadius: 8,
    padding: 12,
    minHeight: 220,
  },
  timelineCard: {
    flex: 0.85,
    backgroundColor: '#C8E3CB',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    alignSelf: 'flex-start',
  },
  cardTitle: {
    fontSize: 13,
    color: '#133A44',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 11,
    color: '#133A44',
    lineHeight: 1.45,
    marginBottom: 4,
  },
  timelineValue: {
    marginTop: 14,
    fontSize: 20,
    textAlign: 'center',
    color: '#0B2E39',
    fontWeight: 'bold',
  },
});


interface CampaignBriefTimelinePageProps {
  negotiationData: AgreedNegotiationResponse;
}
export default function CampaignBriefTimelinePage({
  negotiationData,
}: CampaignBriefTimelinePageProps) {
  const brief = negotiationData?.campaign_brief?.brand_name_influencer_campaign_brief ?? 'No brief available.';
  const timelineText = negotiationData?.campaign_brief?.timeline?.[0] ?? '1 Month';

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.wave} />
      <View style={styles.headingBand}>
        <Text style={styles.heading}>Campaign Brief & Timeline</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.briefCard}>
          <Text style={styles.cardTitle}>Campaign Brief:</Text>
          <Text style={styles.text}>{brief}</Text>
        </View>

        <View style={styles.timelineCard}>
          <Text style={styles.cardTitle}>Campaign Duration:</Text>
          <Text style={styles.timelineValue}>{timelineText}</Text>
        </View>
      </View>
    </Page>
  );
}
