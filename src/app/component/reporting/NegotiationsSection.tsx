'use client';

import { Page, Text, View, Image } from '@react-pdf/renderer';
import { pdfProxyImageSrc } from '@/src/helper/pdf-proxy-image-src';
import { styles } from './reporty_style';
import { AgreedNegotiationResponse } from '@/src/types/Admin-Type/agreed-negotiation-type';

interface NegotiationsSectionProps {
    negotiations?: AgreedNegotiationResponse['negotiations'];
}

export default function NegotiationsSection({
    negotiations,
}: NegotiationsSectionProps) {
    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Negotiations</Text>

                    {negotiations?.map((neg, index) => (
                        <View key={index} style={styles.card}>
                            <View style={styles.row}>
                                {neg.influencer?.picture && (
                                    // eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer Image
                                    <Image
                                        src={
                                            pdfProxyImageSrc(
                                                neg.influencer.picture,
                                            ) ?? neg.influencer.picture
                                        }
                                        style={styles.avatar}
                                    />
                                )}

                                <View>
                                    <Text style={styles.text}>
                                        @{neg.influencer?.username}
                                    </Text>
                                    <Text style={styles.text}>{neg.name}</Text>
                                </View>
                            </View>

                            <Text style={styles.text}>
                                Platform: {neg.influencer?.platform}
                            </Text>

                            <Text style={styles.text}>
                                Country: {neg.influencer?.country}
                            </Text>

                            <Text style={styles.text}>
                                Engagement Rate:{' '}
                                {((neg.influencer?.engagementRate ?? 0) * 100).toFixed(2)}%
                            </Text>

                            <Text style={styles.text}>
                                Brand Approved: {String(neg.Brand_approved ?? 'Pending')}
                            </Text>

                            <Text style={styles.text}>
                                Admin Approved: {String(neg.admin_approved ?? 'Pending')}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    );
}