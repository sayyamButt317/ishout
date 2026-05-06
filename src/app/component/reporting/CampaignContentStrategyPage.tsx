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
    marginBottom: 6,
    width: 430,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2F3A',
  },
  subHeading: {
    fontSize: 12,
    color: '#224A54',
    marginBottom: 18,
    marginLeft: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 10,
  },
  statCard: {
    width: 150,
    border: '1px solid #D6E5E3',
    backgroundColor: '#FFFFFF',
  },
  statCardTop: {
    backgroundColor: '#C8E3CB',
    height: 32,
  },
  statBody: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  statValue: {
    fontSize: 34,
    color: '#0B2E39',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#2D4D57',
    textAlign: 'center',
  },
  tagsText: {
    fontSize: 8,
    color: '#2D4D57',
    textAlign: 'center',
    lineHeight: 1.3,
    marginTop: 4,
  },
});

export default function CampaignContentStrategyPage({
  negotiationData,
}: {
  negotiationData: AgreedNegotiationResponse;
}) {
  const influencerCount = negotiationData?.negotiations?.length ?? 0;
  const producedContent = influencerCount;
  const durationMonths = 1;
  const tags = (negotiationData?.campaign?.category ?? [])
    .slice(0, 4)
    .map((c) => `#${String(c).replace(/\s+/g, '')}`);

  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.wave} />
      <View style={styles.headingBand}>
        <Text style={styles.heading}>Campaign Content Strategy UGC</Text>
      </View>
      <Text style={styles.subHeading}>Campaign Outcomes</Text>

      <View style={styles.row}>
        <View style={styles.statCard}>
          <View style={styles.statCardTop} />
          <View style={styles.statBody}>
            <Text style={styles.statValue}>{influencerCount}</Text>
            <Text style={styles.statLabel}>Content Creators</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statCardTop} />
          <View style={styles.statBody}>
            <Text style={styles.statValue}>{producedContent}</Text>
            <Text style={styles.statLabel}>Produced Content</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statCardTop} />
          <View style={styles.statBody}>
            <Text style={styles.statValue}>{durationMonths}</Text>
            <Text style={styles.statLabel}>Month</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <View style={styles.statCardTop} />
          <View style={styles.statBody}>
            <Text style={styles.statValue}>#</Text>
            <Text style={styles.statLabel}>Tags</Text>
            <Text style={styles.tagsText}>{tags.length ? tags.join('\n') : '#Campaign'}</Text>
          </View>
        </View>
      </View>
    </Page>
  );
}
