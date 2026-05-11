'use client';
import { Document, Page, Text } from '@react-pdf/renderer';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { CampaignBriefAndInfluencerStatsResponse } from '@/src/types/Admin-Type/Campaign-type';
import CampaignBriefTimelinePage from '@/src/app/component/reporting/CampaignBriefTimelinePage';
import CampaignContentStrategyPage from '@/src/app/component/reporting/CampaignContentStrategyPage';
import { styles } from './reporty_style';
import CampaignCoverPage from './CampaignCoverPage';
import CampaignSummarySection from './CampaignSummarySection';
import CampaignOverviewSection from './CampaignOverviewPage';
import CampaignTimelineSection from './CampaignTimelineSection';
import DemographicsSection from './DemographicsSection';
import NegotiationsSection from './NegotiationsSection';

interface CampaignReportProps {
  negotiationData: AgreedNegotiationResponse;
  summaryData?: CampaignBriefAndInfluencerStatsResponse;
}

export default function CampaignReport(props: CampaignReportProps) {
  const { negotiationData, summaryData } = props;
  if (!negotiationData) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>No Data Available</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <CampaignCoverPage
        campaign={negotiationData.campaign}
        campaign_brief={negotiationData.campaign_brief}
      />
      <CampaignContentStrategyPage negotiationData={negotiationData} />
      <CampaignBriefTimelinePage negotiationData={negotiationData} />
      <CampaignSummarySection
        summaryData={summaryData}
        campaign_brief={negotiationData.campaign_brief}
      />
      <CampaignOverviewSection summaryData={summaryData} />
      <CampaignTimelineSection summaryData={summaryData} />
      <DemographicsSection summaryData={summaryData} />
    </Document>
  );
}