'use client';

import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface CampaignSummarySectionProps {
    summaryData?: {
        campaign_name?: string;
        'onBoard influencers'?: number;
        influncers_produced__content_count?: number;
        campaign_overview?: string[];
        timeline?: string[];
    };

    campaign_brief?: {
        title?: string;
    };
}

export default function CampaignSummarySection({
    summaryData,
    campaign_brief,
}: CampaignSummarySectionProps) {
    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Campaign Summary</Text>

                    <Text style={styles.text}>
                        Campaign: {summaryData?.campaign_name ?? campaign_brief?.title}
                    </Text>

                    <View style={styles.summaryGrid}>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>
                                OnBoard Influencers
                            </Text>
                            <Text style={styles.summaryValue}>
                                {summaryData?.['onBoard influencers'] ?? 0}
                            </Text>
                        </View>

                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>
                                Produced Content
                            </Text>
                            <Text style={styles.summaryValue}>
                                {summaryData?.influncers_produced__content_count ?? 0}
                            </Text>
                        </View>

                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>
                                Overview Items
                            </Text>
                            <Text style={styles.summaryValue}>
                                {summaryData?.campaign_overview?.length ?? 0}
                            </Text>
                        </View>

                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryLabel}>
                                Timeline Items
                            </Text>
                            <Text style={styles.summaryValue}>
                                {summaryData?.timeline?.length ?? 0}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    );
}