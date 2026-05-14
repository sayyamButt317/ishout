'use client';

import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import type { CampaignBriefAndInfluencerStatsResponse } from '@/src/types/Admin-Type/Campaign-type';
import { CampaignOverviewEmbedded } from '@/src/app/component/reporting/CampaignOverviewPage';
import { CampaignTimelineEmbedded } from '@/src/app/component/reporting/CampaignTimelineSection';
import { CampaignSummaryMetricsOnly } from '@/src/app/component/reporting/CampaignSummarySection';
import { styles as reportStyles } from './reporty_style';

const localStyles = StyleSheet.create({
  page: {
    backgroundColor: '#F7FBFA',
    padding: 18,
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'column',
  },
  pageBody: {
    flexDirection: 'column',
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 380,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0A2F3A',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  briefCard: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: '#C8E3CB',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  timelineCard: {
    width: 152,
    flexGrow: 0,
    flexShrink: 0,
    backgroundColor: '#C8E3CB',
    borderRadius: 8,
    padding: 8,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  cardTitle: {
    fontSize: 11,
    color: '#133A44',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  timelineCardTitle: {
    fontSize: 9,
    color: '#133A44',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineValue: {
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
    color: '#0B2E39',
    fontWeight: 'bold',
    lineHeight: 1.25,
  },
});

interface CampaignBriefTimelinePageProps {
  negotiationData: AgreedNegotiationResponse;
  summaryData?: CampaignBriefAndInfluencerStatsResponse;
}

export default function CampaignBriefTimelinePage({
  negotiationData,
  summaryData,
}: CampaignBriefTimelinePageProps) {
  const briefFallback =
    negotiationData?.campaign_brief?.brand_name_influencer_campaign_brief ?? '';
  const negotiationTimelineFirst =
    negotiationData?.campaign_brief?.timeline?.[0] ?? '1 Month';

  return (
    <Page size="A4" orientation="landscape" style={localStyles.page} wrap>
      <View style={localStyles.wave} />
      <View style={localStyles.pageBody} wrap>
        <View style={localStyles.headingBand}>
          <Text style={localStyles.heading} wrap>
            Campaign Brief & Timeline
          </Text>
        </View>

        <View style={localStyles.row} wrap>
          <View style={localStyles.briefCard} wrap>
            <Text style={localStyles.cardTitle} wrap>
              Campaign overview
            </Text>
            <CampaignOverviewEmbedded
              summaryData={summaryData}
              negotiationBriefFallback={briefFallback}
            />
            <CampaignTimelineEmbedded summaryData={summaryData} />
          </View>

          <View style={localStyles.timelineCard} wrap>
            <Text style={localStyles.timelineCardTitle} wrap>
              Campaign Duration:
            </Text>
            <Text style={localStyles.timelineValue} wrap>
              {negotiationTimelineFirst}
            </Text>
          </View>
        </View>

        <View style={[reportStyles.fullWidth, reportStyles.content]} wrap>
          <CampaignSummaryMetricsOnly
            summaryData={summaryData}
            campaign_brief={negotiationData.campaign_brief}
          />
        </View>
      </View>
    </Page>
  );
}
