'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { DemographicsOcrResponse } from '@/src/types/Admin-Type/demographics-ocr-type';

export type ReportInsightsByUsername = Record<string, DemographicsOcrResponse>;

const TEAL = '#6BB8A8';
const TEAL_DARK = '#0A2F3A';
const TEAL_MUTED = '#5C7C84';
const BORDER = '#7BBAAF';

const s = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 28,
    position: 'relative',
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
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: TEAL_DARK,
  },
  subtitle: {
    fontSize: 11,
    color: TEAL_DARK,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 6,
  },
  metaPill: {
    fontSize: 9,
    color: TEAL_MUTED,
    backgroundColor: '#E8F5F2',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  heroRow: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  heroCell: {
    flexGrow: 1,
    flexBasis: 0,
    minWidth: 0,
    marginHorizontal: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  heroHeader: {
    backgroundColor: TEAL,
    paddingVertical: 8,
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: TEAL_DARK,
    paddingVertical: 12,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: TEAL_DARK,
    marginBottom: 8,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    marginBottom: 14,
  },
  metricCard: {
    width: '23%',
    marginRight: '2%',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDEAE8',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: '#F7FBFA',
  },
  metricLabel: {
    fontSize: 8,
    color: TEAL_MUTED,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: TEAL_DARK,
  },
  twoCol: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 12,
  },
  col: {
    flex: 1,
    marginHorizontal: 4,
  },
  table: {
    borderWidth: 1,
    borderColor: '#DDEAE8',
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F2EF',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tableLabel: {
    width: '45%',
    fontSize: 9,
    color: TEAL_MUTED,
  },
  tableValue: {
    width: '55%',
    fontSize: 9,
    fontWeight: 'bold',
    color: TEAL_DARK,
  },
  barTrack: {
    height: 8,
    backgroundColor: '#E8F2EF',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: TEAL,
    borderRadius: 4,
  },
  splitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  splitLabel: {
    fontSize: 9,
    color: TEAL_DARK,
    width: '35%',
  },
  splitValue: {
    fontSize: 9,
    fontWeight: 'bold',
    color: TEAL_DARK,
    width: '15%',
    textAlign: 'right',
  },
  splitBarWrap: {
    width: '45%',
  },
});

function formatLabel(key: string): string {
  return key.replace(/_/g, ' ');
}

function isDisplayable(value: unknown): value is string {
  if (value == null) return false;
  const text = String(value).trim();
  return text !== '' && text.toLowerCase() !== 'unknown';
}

function parsePercent(value?: string): number {
  if (!value) return 0;
  const match = String(value).match(/([\d.]+)/);
  if (!match) return 0;
  return Math.min(100, Math.max(0, parseFloat(match[1])));
}

function parseCount(value?: string): number {
  if (!value) return 0;
  const cleaned = String(value).replace(/,/g, '').replace(/[^\d.-]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function resolveEngagement(metrics: Record<string, string | undefined>): string {
  if (isDisplayable(metrics.engagement_rate)) return String(metrics.engagement_rate);
  const views = parseCount(metrics.views);
  const interactions = parseCount(metrics.interactions);
  if (views > 0 && interactions > 0) {
    return `${((interactions / views) * 100).toFixed(2)}%`;
  }
  return '—';
}

function HeroMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.heroCell}>
      <View style={s.heroHeader}>
        <Text style={s.heroLabel}>{label}</Text>
      </View>
      <Text style={s.heroValue}>{value}</Text>
    </View>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.metricCard}>
      <Text style={s.metricLabel}>{label}</Text>
      <Text style={s.metricValue}>{value}</Text>
    </View>
  );
}

function SplitBar({ label, value }: { label: string; value: string }) {
  const pct = parsePercent(value);
  return (
    <View style={s.splitRow}>
      <Text style={s.splitLabel}>{label}</Text>
      <View style={s.splitBarWrap}>
        <View style={s.barTrack}>
          <View style={[s.barFill, { width: `${pct}%` }]} />
        </View>
      </View>
      <Text style={s.splitValue}>{value}</Text>
    </View>
  );
}

function DetailTable({ title, rows }: { title: string; rows: { label: string; value: string }[] }) {
  if (rows.length === 0) return null;
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.table}>
        {rows.map((row, index) => (
          <View
            key={`${row.label}-${index}`}
            style={[s.tableRow, index === rows.length - 1 ? { borderBottomWidth: 0 } : {}]}
          >
            <Text style={s.tableLabel}>{row.label}</Text>
            <Text style={s.tableValue}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export interface InfluencerReportInsightsPageProps {
  username: string;
  displayName: string;
  data: DemographicsOcrResponse;
}

/** Single landscape PDF page — reel insights for one influencer */
export function InfluencerReportInsightsPage({
  username,
  displayName,
  data,
}: InfluencerReportInsightsPageProps) {
  const metrics = data.metrics ?? {};
  const extra = data.extra ?? {};
  const gender = data.demographics?.gender_split;

  const views = isDisplayable(metrics.views) ? String(metrics.views) : '—';
  const likes = isDisplayable(metrics.likes) ? String(metrics.likes) : '—';
  const shares = isDisplayable(metrics.shares) ? String(metrics.shares) : '—';
  const interactions = isDisplayable(metrics.interactions) ? String(metrics.interactions) : '—';
  const engagement = resolveEngagement(metrics);

  const secondaryMetrics = (
    [
      ['Accounts reached', metrics.accounts_reached],
      ['Comments', metrics.comments],
      ['Saves', metrics.saves],
      ['Reposts', metrics.reposts],
      ['Watch time', metrics.watch_time],
      ['Avg watch time', metrics.average_watch_time],
    ] as const
  )
    .filter(([, v]) => isDisplayable(v))
    .map(([label, value]) => ({ label, value: String(value) }));

  const genderRows = gender
    ? Object.entries(gender)
        .filter(([, v]) => isDisplayable(v))
        .map(([key, value]) => ({ label: formatLabel(key), value: String(value) }))
    : [];

  const followerRows = (
    [
      ['Followers', extra.followers_percent ?? metrics.followers_percent],
      ['Non-followers', extra.non_followers_percent ?? metrics.non_followers_percent],
    ] as const
  ).filter(([, v]) => isDisplayable(v));

  const growth = data.demographics?.follower_growth;
  const growthRows: { label: string; value: string }[] = [];
  if (growth?.value && isDisplayable(growth.value)) {
    growthRows.push({ label: 'Growth', value: String(growth.value) });
  }
  if (growth?.change && isDisplayable(growth.change)) {
    growthRows.push({ label: 'Change', value: String(growth.change) });
  }

  const metaParts = [data.platform, data.content_type, data.period ?? data.posted_at].filter(
    isDisplayable,
  );

  return (
    <Page size="A4" orientation="landscape" style={s.page}>
      <View style={s.wave} />
      <View style={s.waveInner} />

      <View style={s.headingBand}>
        <Text style={s.heading}>Reel Insights</Text>
      </View>
      <Text style={s.subtitle}>
        {displayName} · @{username}
      </Text>

      {metaParts.length > 0 ? (
        <View style={s.metaRow}>
          {metaParts.map((part) => (
            <Text key={part} style={s.metaPill}>
              {part}
            </Text>
          ))}
        </View>
      ) : null}

      <View style={s.heroRow}>
        <HeroMetric label="Views" value={views} />
        <HeroMetric label="Likes" value={likes} />
        <HeroMetric label="Shares" value={shares} />
        <HeroMetric label="Engagement" value={engagement} />
      </View>

      {isDisplayable(interactions) ? (
        <Text style={[s.subtitle, { fontSize: 9, color: TEAL_MUTED, marginBottom: 12 }]}>
          Total interactions: {interactions}
        </Text>
      ) : null}

      {secondaryMetrics.length > 0 ? (
        <>
          <Text style={s.sectionTitle}>Performance details</Text>
          <View style={s.metricsGrid}>
            {secondaryMetrics.map((item) => (
              <SmallMetric key={item.label} label={item.label} value={item.value} />
            ))}
          </View>
        </>
      ) : null}

      <View style={s.twoCol}>
        <View style={s.col}>
          {genderRows.length > 0 ? (
            <>
              <Text style={s.sectionTitle}>Audience gender</Text>
              {genderRows.map((row) => (
                <SplitBar key={row.label} label={row.label} value={row.value} />
              ))}
            </>
          ) : null}
        </View>
        <View style={s.col}>
          {followerRows.length > 0 ? (
            <>
              <Text style={s.sectionTitle}>Follower mix</Text>
              {followerRows.map(([label, value]) => (
                <SplitBar key={label} label={label} value={String(value)} />
              ))}
            </>
          ) : null}
        </View>
      </View>

      <DetailTable title="Follower growth" rows={growthRows} />

      <DetailTable
        title="Additional metrics"
        rows={Object.entries({ ...metrics, ...extra })
          .filter(([, v]) => isDisplayable(v))
          .filter(([key]) => !['views', 'likes', 'shares', 'interactions', 'engagement_rate'].includes(key))
          .map(([key, value]) => ({ label: formatLabel(key), value: String(value) }))}
      />
    </Page>
  );
}
