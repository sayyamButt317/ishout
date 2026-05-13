'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { OverallCampaignOutcomesResponse } from '@/src/types/Admin-Type/Reports-tyes';

function formatCount(n: number): string {
  if (n == null || !Number.isFinite(n)) return '—';
  return Math.round(n).toLocaleString('en-US');
}

function engagementDisplay(rate: number): string {
  if (rate == null || !Number.isFinite(rate)) return '—';
  return `${Number(rate).toFixed(2)}%`;
}

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    position: 'relative',
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    right: -72,
    top: -52,
    width: 200,
    height: 200,
    border: '1px solid #C4E7E2',
    borderRadius: 100,
  },
  waveInner: {
    position: 'absolute',
    right: -52,
    top: -32,
    width: 160,
    height: 160,
    border: '1px solid #D8EFE9',
    borderRadius: 80,
  },
  headingBand: {
    backgroundColor: '#8BCDBF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 6,
    alignSelf: 'flex-start',
    maxWidth: '92%',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2F3A',
  },
  subtitle: {
    fontSize: 11,
    color: '#0A2F3A',
    marginBottom: 18,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
    width: '100%',
  },
  cell: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minWidth: 0,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#7BBAAF',
  },
  cellHeader: {
    backgroundColor: '#6BB8A8',
    paddingVertical: 7,
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  cellHeaderText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  cellValue: {
    backgroundColor: '#E2F3ED',
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  cellValueText: {
    fontSize: 11,
    fontWeight: 'normal',
    color: '#0A2F3A',
    textAlign: 'center',
  },
  bullets: {
    marginTop: 20,
    paddingRight: 36,
  },
  bullet: {
    fontSize: 10,
    color: '#0A2F3A',
    lineHeight: 1.55,
    marginBottom: 8,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#C62828',
  },
  fallback: {
    fontSize: 11,
    color: '#5A7E85',
    marginTop: 24,
  },
});

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.cell}>
      <View style={s.cellHeader}>
        <Text style={s.cellHeaderText}>{label}</Text>
      </View>
      <View style={s.cellValue}>
        <Text style={s.cellValueText}>{value}</Text>
      </View>
    </View>
  );
}

interface CampaignOverallOutcomesPageProps {
  outcomes?: OverallCampaignOutcomesResponse | null;
  brandLabel?: string;
}

export default function CampaignOverallOutcomesPage({
  outcomes,
  brandLabel,
}: CampaignOverallOutcomesPageProps) {
  const brand = brandLabel?.trim() || 'this campaign';

  if (!outcomes) {
    return (
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.headingBand}>
          <Text style={s.heading}>Key Metrics and Final Results</Text>
        </View>
        <Text style={s.subtitle}>Campaign Outcomes</Text>
        <Text style={s.fallback}>
          Overall campaign outcome metrics are not available for this export.
        </Text>
      </Page>
    );
  }

  const followers = formatCount(outcomes.total_followers);
  const likes = formatCount(outcomes.total_likes);
  const comments = formatCount(outcomes.total_comments);
  const interactions = formatCount(outcomes.total_interactions);
  const engagement = engagementDisplay(outcomes.engagement_rate);
  const influencers = formatCount(outcomes.total_influencers);

  const highlightPhrase =
    outcomes.total_interactions >= 500 || outcomes.engagement_rate >= 3
      ? 'High interaction levels'
      : 'Strong cumulative engagement';

  return (
    <Page size="A4" orientation="landscape" style={s.page} wrap>
      <View style={s.wave} />
      <View style={s.waveInner} />

      <View style={s.headingBand}>
        <Text style={s.heading}>Key Metrics and Final Results</Text>
      </View>
      <Text style={s.subtitle}>Campaign Outcomes</Text>

      <View style={s.metricsRow}>
        <MetricBox label="Followers" value={followers} />
        <MetricBox label="Likes" value={likes} />
        <MetricBox label="Comments" value={comments} />
      </View>
      <View style={s.metricsRow}>
        <MetricBox label="Total Interactions" value={interactions} />
        <MetricBox label="Engagement Rate" value={engagement} />
        <MetricBox label="Total Influencers" value={influencers} />
      </View>

      <View style={s.bullets}>
        <Text style={s.bullet} wrap>
          • Our campaign successfully reached a combined audience of {followers} followers
          across {formatCount(outcomes.total_influencers)} agreed influencer
          {outcomes.total_influencers === 1 ? '' : 's'}, resulting in substantial
          engagement.
        </Text>
        <Text style={s.bullet} wrap>
          • The published content garnered {interactions} total interactions, contributing
          significantly to the overall campaign impact.
        </Text>
        <Text style={s.bullet} wrap>
          • <Text style={s.highlight}>{highlightPhrase}</Text>
          <Text>{` demonstrate the audience's positive response to ${brand}.`}</Text>
        </Text>
      </View>
    </Page>
  );
}
