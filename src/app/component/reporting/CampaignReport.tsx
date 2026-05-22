'use client';
import { Document, Page, Text } from '@react-pdf/renderer';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { CampaignBriefAndInfluencerStatsResponse } from '@/src/types/Admin-Type/Campaign-type';
import CampaignBriefTimelinePage from '@/src/app/component/reporting/CampaignBriefTimelinePage';
import { styles } from './reporty_style';
import CampaignCoverPage from './CampaignCoverPage';
import DemographicsSection, { ReportInsightsByUsername } from './DemographicsSection';
import CampaignOverallOutcomesPage from './CampaignOverallOutcomesPage';
import CampaignThankYouPage from './CampaignThankYouPage';
import type { OverallCampaignOutcomesResponse } from '@/src/types/Admin-Type/Reports-tyes';

interface CampaignReportProps {
  negotiationData: AgreedNegotiationResponse;
  summaryData?: CampaignBriefAndInfluencerStatsResponse;
  overallOutcomes?: OverallCampaignOutcomesResponse | null;
  insightsByUsername?: ReportInsightsByUsername;
}

export default function CampaignReport(props: CampaignReportProps) {


  const { negotiationData, summaryData, overallOutcomes, insightsByUsername } = props;
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
      <CampaignBriefTimelinePage
        negotiationData={negotiationData}
        summaryData={summaryData}
      />
      <DemographicsSection
        summaryData={summaryData}
        insightsByUsername={insightsByUsername}
      />
      <CampaignOverallOutcomesPage
        outcomes={overallOutcomes}
        brandLabel={
          negotiationData.campaign_brief?.brand_name_influencer_campaign_brief ??
          negotiationData.campaign?.company_name
        }
      />
      <CampaignThankYouPage />
    </Document>
  );
}
