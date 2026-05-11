'use client';

import { Page, Text, View } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface CampaignOverViewSectionProps {
    summaryData?: {
        campaign_overview?: string[];
    };
}

export default function CampaignOverviewSection({
    summaryData,
}: CampaignOverViewSectionProps) {
    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Campaign Overview</Text>

                    {(summaryData?.campaign_overview ?? []).length ? (
                        summaryData?.campaign_overview!.map((item: string, i: number) => (
                            <Text key={i} style={styles.listItem}>
                                • {item}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.text}>No overview available.</Text>
                    )}
                </View>
            </View>
        </Page>
    );
}