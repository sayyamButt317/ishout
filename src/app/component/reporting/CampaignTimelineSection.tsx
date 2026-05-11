'use client';

import { Text, View } from '@react-pdf/renderer';
import { styles } from './reporty_style';

interface CampaignTimelineSectionProps {
    summaryData?: {
        timeline?: string[];
    };
}

export default function CampaignTimelineSection({
    summaryData,
}: CampaignTimelineSectionProps) {
    return (
        <View style={styles.section}>
            <Text style={styles.heading}>Timeline</Text>

            {(summaryData?.timeline ?? []).length ? (
                summaryData?.timeline!.map((item: string, i: number) => (
                    <Text key={i} style={styles.listItem}>
                        • {item}
                    </Text>
                ))
            ) : (
                <Text style={styles.text}>
                    No timeline available.
                </Text>
            )}
        </View>
    );
}
