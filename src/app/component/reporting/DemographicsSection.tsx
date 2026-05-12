'use client';

import { Page, Text, View, Image } from '@react-pdf/renderer';
import { pdfProxyImageSrc } from '@/src/helper/pdf-proxy-image-src';
import { styles } from './reporty_style';
import type {
  InfluencerSummary,
  CampaignDemographicPreview,
} from '@/src/types/Admin-Type/Campaign-type';

function formatCount(n: number | null | undefined): string {
  if (n == null) return '—';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

interface DemographicsSectionProps {
  summaryData?: {
    influencers?: InfluencerSummary[];
    demographics?: CampaignDemographicPreview[];
  };
}

/** API may use alternate keys; keep PDF section working. */
function pickInfluencerList(
  summaryData: DemographicsSectionProps['summaryData'],
): InfluencerSummary[] {
  if (!summaryData) return [];
  const { influencers } = summaryData;
  if (Array.isArray(influencers) && influencers.length > 0) return influencers;
  const bag = summaryData as unknown as Record<string, unknown>;
  const alt = bag.influencers ?? bag.Influencers;
  return Array.isArray(alt) ? (alt as InfluencerSummary[]) : [];
}

function pickLegacyDemographics(
  summaryData: DemographicsSectionProps['summaryData'],
): CampaignDemographicPreview[] {
  if (!summaryData) return [];
  const { demographics } = summaryData;
  if (Array.isArray(demographics) && demographics.length > 0) return demographics;
  const bag = summaryData as unknown as Record<string, unknown>;
  const alt = bag.demographics ?? bag.Demographics;
  return Array.isArray(alt) ? (alt as CampaignDemographicPreview[]) : [];
}

function AnalyticsStatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.demoAnalyticsRow}>
      <Text style={styles.demoAnalyticsLabel}>{label}</Text>
      <Text style={styles.demoAnalyticsValue}>{value}</Text>
    </View>
  );
}

/** First page: title, avatar (proxied URL), Analytics block. Further pages: demographics images, 3 per page, centered. */
function InfluencerPages({ inf }: { inf: InfluencerSummary }) {
  const profileSrc = pdfProxyImageSrc(inf.profile_image);
  const analytics = inf.analytics;
  const demos = (inf.demographics ?? []).filter((d) => d.image_url?.trim());
  const demoChunks = chunkArray(demos, 3);

  const displayName = inf.profile_name?.trim() || inf.username;

  return (
    <>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.fullWidth, styles.content]}>
          <View style={styles.section}>
            <Text style={styles.demoTitle}>{displayName}</Text>
            <Text style={styles.demoSubtitle}>@{inf.username}</Text>

            <View style={styles.demoProfileColumn}>
              {profileSrc ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image src={profileSrc} style={styles.demoProfileImage} cache={false} />
              ) : (
                <View style={styles.demoProfilePlaceholder} />
              )}
            </View>

            {inf.followers != null && (
              <Text
                style={[
                  styles.text,
                  { textAlign: 'center', marginTop: 10, marginBottom: 4 },
                ]}
              >
                {formatCount(inf.followers)} Followers
              </Text>
            )}

            <Text style={styles.demoAnalyticsHeading}>Analytics</Text>
            <View style={styles.demoAnalyticsColumn}>
              <AnalyticsStatRow label="Likes" value={formatCount(analytics?.likes)} />
              <AnalyticsStatRow
                label="Comments"
                value={formatCount(analytics?.comments)}
              />
              <AnalyticsStatRow
                label="Interactions"
                value={formatCount(analytics?.interaction)}
              />
            </View>

            {demoChunks.length === 0 && (
              <Text style={[styles.text, { textAlign: 'center', marginTop: 16 }]}>
                No campaign demographics images for this influencer.
              </Text>
            )}
          </View>
        </View>
      </Page>

      {demoChunks.map((chunk, pageIdx) => (
        <Page
          key={`${inf.username}-demographics-${pageIdx}`}
          size="A4"
          orientation="landscape"
          style={styles.page}
        >
          <View style={[styles.fullWidth, styles.demographicsPageFrame]}>
            <View style={styles.sectionDemographicsFull}>
              <Text style={styles.demoGalleryTitle}>Campaign Demographics</Text>
              <Text style={[styles.text, { textAlign: 'center', marginBottom: 8 }]}>
                @{inf.username}
              </Text>
              {demoChunks.length > 1 ? (
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: 'center',
                      marginBottom: 6,
                      fontSize: 9,
                      color: '#5C7C84',
                    },
                  ]}
                >
                  Page {pageIdx + 1} of {demoChunks.length}
                </Text>
              ) : null}
              <View style={styles.demoGalleryBody}>
                <View style={styles.demoGalleryRowCentered}>
                  {chunk.map((d, i) => {
                    const src = pdfProxyImageSrc(d.image_url);
                    if (!src) return null;
                    return (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image
                        key={d.content_id ?? i}
                        src={src}
                        style={styles.demoGalleryImage}
                        cache={false}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </>
  );
}

export default function DemographicsSection({ summaryData }: DemographicsSectionProps) {
  const influencers = pickInfluencerList(summaryData);

  if (influencers.length > 0) {
    return (
      <>
        {influencers.map((inf, idx) => (
          <InfluencerPages key={`${inf.username}-${idx}`} inf={inf} />
        ))}
      </>
    );
  }

  const legacy = pickLegacyDemographics(summaryData).filter((d) => d.image_url?.trim());
  if (legacy.length === 0) {
    return (
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.fullWidth, styles.content]}>
          <View style={styles.section}>
            <Text style={styles.heading}>Campaign Demographics</Text>
            <Text style={styles.text}>No demographics media.</Text>
          </View>
        </View>
      </Page>
    );
  }

  const legacyChunks = chunkArray(legacy, 3);

  return (
    <>
      {legacyChunks.map((chunk, pageIdx) => (
        <Page
          key={`legacy-demographics-${pageIdx}`}
          size="A4"
          orientation="landscape"
          style={styles.page}
        >
          <View style={[styles.fullWidth, styles.demographicsPageFrame]}>
            <View style={styles.sectionDemographicsFull}>
              <Text style={styles.demoGalleryTitle}>Campaign Demographics</Text>
              {legacyChunks.length > 1 ? (
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: 'center',
                      marginBottom: 10,
                      fontSize: 9,
                      color: '#5C7C84',
                    },
                  ]}
                >
                  Page {pageIdx + 1} of {legacyChunks.length}
                </Text>
              ) : null}
              <View style={styles.demoGalleryBody}>
                <View style={styles.demoGalleryRowCentered}>
                  {chunk.map((item, i) => {
                    const src = pdfProxyImageSrc(item.image_url);
                    if (!src) return null;
                    return (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <Image
                        key={item.content_id ?? i}
                        src={src}
                        style={styles.demoGalleryImage}
                        cache={false}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </Page>
      ))}
    </>
  );
}
