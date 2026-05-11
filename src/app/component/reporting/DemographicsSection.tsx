'use client';

import { Page, Text, View, Image } from '@react-pdf/renderer';
import { pdfProxyImageSrc } from '@/src/helper/pdf-proxy-image-src';
import { styles } from './reporty_style';

interface DemographicsItem {
    image_url?: string;
    content_type?: string;
}

interface DemographicsSectionProps {
    summaryData?: {
        demographics?: DemographicsItem[];
    };
}

export default function DemographicsSection({
    summaryData,
}: DemographicsSectionProps) {
    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Demographics Preview</Text>
                    {(summaryData?.demographics ?? []).length ? (
                        <View style={styles.demoGrid}>
                            {summaryData?.demographics!.map((item, i: number) => {
                                const raw =
                                    typeof item.image_url === 'string'
                                        ? item.image_url.trim()
                                        : '';
                                const imgSrc = raw ? pdfProxyImageSrc(raw) : undefined;
                                return (
                                    <View key={i}>
                                        {imgSrc ? (
                                            // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image
                                            <Image
                                                src={imgSrc}
                                                style={styles.demoThumb}
                                                cache={false}
                                            />
                                        ) : null}

                                        <Text style={styles.demoLabel}>
                                            {item.content_type}
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    ) : (
                        <Text style={styles.text}>
                            No demographics media.
                        </Text>
                    )}
                </View>
            </View>
        </Page>
    );
}