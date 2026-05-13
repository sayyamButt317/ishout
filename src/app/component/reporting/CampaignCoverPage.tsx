'use client';

import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface CampaignCoverPageProps {
  campaign?: {
    company_name?: string;
  };
  campaign_brief?: {
    title?: string;
  };
}

export default function CampaignCoverPage({
  campaign,
  campaign_brief,
}: CampaignCoverPageProps) {
  return (
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={[styles.fullWidth, styles.cover]}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoTitle}>iShout</Text>
          <Text style={styles.logoSub}>AI-Powered Influencer Marketing Platform</Text>
        </View>

        <Text style={styles.badge}>Campaign Report</Text>

        <Text style={styles.coverTitleMain}>END OF</Text>
        <Text style={styles.coverTitleMain}>CAMPAIGN</Text>
        <Text style={styles.coverTitleAccent}>REPORT</Text>

        <Text style={styles.coverMeta}>Campaign: {campaign_brief?.title ?? '-'}</Text>

        <Text style={styles.coverMeta}>Company: {campaign?.company_name ?? '-'}</Text>
      </View>
    </Page>
  );
}
