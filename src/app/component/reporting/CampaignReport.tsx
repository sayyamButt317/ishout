'use client';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { CampaignBriefAndInfluencerStatsResponse } from '@/src/types/Admin-Type/Campaign-type';
import CampaignBriefTimelinePage from '@/src/app/component/reporting/CampaignBriefTimelinePage';
import CampaignContentStrategyPage from '@/src/app/component/reporting/CampaignContentStrategyPage';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F7FBFA',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  fullWidth: {
    width: '100%',
  },
  cover: {
    minHeight: '100%',
    backgroundColor: '#FFFFFF',
    paddingTop: 56,
    paddingRight: 48,
    paddingBottom: 56,
    paddingLeft: 48,
    borderBottom: '6px solid #1AA69A',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  topWave: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 320,
    height: 320,
    border: '2px solid #9ED7CF',
    borderRadius: 180,
  },
  topWaveInner: {
    position: 'absolute',
    top: -90,
    left: -50,
    width: 260,
    height: 260,
    border: '1px solid #BEE7E1',
    borderRadius: 140,
  },
  bottomBlob: {
    position: 'absolute',
    bottom: -110,
    left: -90,
    width: 240,
    height: 240,
    borderRadius: 140,
    backgroundColor: '#DFEFE4',
  },
  bottomRightWave: {
    position: 'absolute',
    right: -80,
    bottom: -90,
    width: 210,
    height: 210,
    border: '1px solid #BEE7E1',
    borderRadius: 120,
  },
  logoWrap: {
    position: 'absolute',
    right: 46,
    top: 34,
    alignItems: 'flex-end',
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1AA69A',
    letterSpacing: 1,
  },
  logoSub: {
    fontSize: 8,
    color: '#5A7E85',
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    fontSize: 10,
    color: '#1AA69A',
    border: '1px solid #CDEEEA',
    backgroundColor: '#F2FBF9',
    paddingTop: 4,
    paddingRight: 10,
    paddingBottom: 4,
    paddingLeft: 10,
    borderRadius: 999,
    marginBottom: 20,
  },
  coverTitleMain: {
    fontSize: 52,
    lineHeight: 1.05,
    color: '#083A46',
    fontWeight: 'bold',
  },
  coverTitleAccent: {
    fontSize: 52,
    lineHeight: 1.05,
    color: '#1AA69A',
    fontWeight: 'bold',
  },
  coverMeta: {
    marginTop: 20,
    fontSize: 12,
    color: '#567981',
  },
  content: {
    paddingTop: 30,
    paddingRight: 28,
    paddingBottom: 30,
    paddingLeft: 28,
  },
  section: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #DDEAE8',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },
  heading: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#0B4956',
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
    color: '#2E5058',
  },
  listItem: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
    color: '#2E5058',
  },
  card: {
    border: '1px solid #DDEAE8',
    backgroundColor: '#FDFEFE',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  summaryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    border: '1px solid #DDEAE8',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#FFFFFF',
  },
  summaryLabel: {
    fontSize: 9,
    color: '#5C7C84',
  },
  summaryValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0B4956',
  },
  demoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  demoThumb: {
    width: 220,
    height: 120,
    objectFit: 'cover',
    borderRadius: 6,
    border: '1px solid #DDEAE8',
  },
  demoLabel: {
    fontSize: 8,
    color: '#5C7C84',
    marginTop: 2,
  },
});

export default function CampaignReport({
  negotiationData,
  summaryData,
}: {
  negotiationData: AgreedNegotiationResponse;
  summaryData?: CampaignBriefAndInfluencerStatsResponse;
}) {
  if (!negotiationData) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No Data Available</Text>
        </Page>
      </Document>
    );
  }

  const { campaign, campaign_brief, negotiations } = negotiationData;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.fullWidth, styles.cover]}>
          <View style={styles.topWave} />
          <View style={styles.topWaveInner} />
          <View style={styles.bottomBlob} />
          <View style={styles.bottomRightWave} />
          <View style={styles.logoWrap}>
            <Text style={styles.logoTitle}>iShout</Text>
            <Text style={styles.logoSub}>AI-Powered Influencer Marketing Platform</Text>
          </View>
          <View>
            <Text style={styles.badge}>Campaign Report</Text>
            <Text style={styles.coverTitleMain}>END OF</Text>
            <Text style={styles.coverTitleMain}>CAMPAIGN</Text>
            <Text style={styles.coverTitleAccent}>REPORT</Text>
          </View>
          <View>
            <Text style={styles.coverMeta}>Campaign: {campaign_brief?.title ?? '-'}</Text>
            <Text style={styles.coverMeta}>Company: {campaign?.company_name ?? '-'}</Text>
            <Text style={styles.coverMeta}>Generated for Admin Dashboard</Text>
          </View>
        </View>
      </Page>

      <CampaignContentStrategyPage negotiationData={negotiationData} />
      <CampaignBriefTimelinePage negotiationData={negotiationData} />

      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.fullWidth, styles.content]}>
          <View style={styles.section}>
            <Text style={styles.heading}>Campaign Summary</Text>
            <Text style={styles.text}>
              Campaign: {summaryData?.campaign_name ?? campaign_brief?.title ?? '-'}
            </Text>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>OnBoard Influencers</Text>
                <Text style={styles.summaryValue}>
                  {summaryData?.['onBoard influencers'] ?? 0}
                </Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Produced Content</Text>
                <Text style={styles.summaryValue}>
                  {summaryData?.influncers_produced__content_count ?? 0}
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
                <Text style={styles.summaryValue}>
                  {summaryData?.timeline?.length ?? 0}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Campaign Overview</Text>
            {(summaryData?.campaign_overview ?? []).length ? (
              (summaryData?.campaign_overview ?? []).map((item, i) => (
                <Text key={`overview-${i}`} style={styles.listItem}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.text}>No overview available.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Timeline</Text>
            {(summaryData?.timeline ?? []).length ? (
              (summaryData?.timeline ?? []).map((item, i) => (
                <Text key={`timeline-${i}`} style={styles.listItem}>
                  • {item}
                </Text>
              ))
            ) : (
              <Text style={styles.text}>No timeline available.</Text>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.heading}>Demographics Preview</Text>
            {(summaryData?.demographics ?? []).length ? (
              <View style={styles.demoGrid}>
                {(summaryData?.demographics ?? []).map((item, i) => (
                  <View key={`demographic-${i}`}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image src={item.image_url} style={styles.demoThumb} />
                    <Text style={styles.demoLabel}>{item.content_type}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.text}>No demographics media.</Text>
            )}
          </View>
        </View>
      </Page>

      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={[styles.fullWidth, styles.content]}>
          <View style={styles.section}>
            <Text style={styles.heading}>Negotiations</Text>
            {negotiations?.map((neg, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.row}>
                  {neg.influencer?.picture ? (
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <Image src={neg.influencer.picture} style={styles.avatar} />
                  ) : null}
                  <View>
                    <Text style={styles.text}>@{neg.influencer?.username}</Text>
                    <Text style={styles.text}>{neg.name}</Text>
                  </View>
                </View>

                <Text style={styles.text}>Platform: {neg.influencer?.platform}</Text>
                <Text style={styles.text}>Country: {neg.influencer?.country}</Text>
                <Text style={styles.text}>
                  Engagement Rate:{' '}
                  {((neg.influencer?.engagementRate ?? 0) * 100).toFixed(2)}%
                </Text>
                <Text style={styles.text}>Brand Approved: {neg.Brand_approved}</Text>
                <Text style={styles.text}>
                  Admin Approved: {neg.admin_approved ?? 'Pending'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
