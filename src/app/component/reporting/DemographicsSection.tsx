'use client';

import { Page, Text, View, Image } from '@react-pdf/renderer';
import { pdfProxyImageSrc } from '@/src/helper/pdf-proxy-image-src';
import { styles } from './reporty_style';
import type {
    InfluencerSummary,
    CampaignDemographicPreview,
} from '@/src/types/Admin-Type/Campaign-type';

function formatCount(n: number | null | undefined): string {
    if (n == null) return '—';
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

interface DemographicsSectionProps {
    summaryData?: {
        influencers?: InfluencerSummary[];
        demographics?: CampaignDemographicPreview[];
    };
}

function InfluencerDemoPage({ inf }: { inf: InfluencerSummary }) {
    const profileSrc = pdfProxyImageSrc(inf.profile_image);
    const analytics = inf.analytics;
    const demos = inf.demographics ?? [];

    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>
                        Demographics & Analytics — @{inf.username}
                    </Text>

                    <View style={styles.influencerRow}>
                        <View style={styles.influencerProfileCol}>
                            {profileSrc ? (
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <Image
                                    src={profileSrc}
                                    style={styles.influencerAvatar}
                                    cache={false}
                                />
                            ) : (
                                <View
                                    style={[
                                        styles.influencerAvatar,
                                        { backgroundColor: '#DDEAE8' },
                                    ]}
                                />
                            )}

                            {inf.profile_name && (
                                <Text style={styles.influencerName}>
                                    {inf.profile_name}
                                </Text>
                            )}
                            <Text style={styles.influencerHandle}>
                                @{inf.username}
                            </Text>
                            <Text style={styles.influencerFollowers}>
                                {formatCount(inf.followers)} Followers
                            </Text>

                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>Likes</Text>
                                <Text style={styles.statValue}>
                                    {formatCount(analytics?.likes)}
                                </Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>Comments</Text>
                                <Text style={styles.statValue}>
                                    {formatCount(analytics?.comments)}
                                </Text>
                            </View>
                            <View style={styles.statRow}>
                                <Text style={styles.statLabel}>Interactions</Text>
                                <Text style={styles.statValue}>
                                    {formatCount(analytics?.interaction)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.influencerImagesCol}>
                            {demos.map((d, i) => {
                                const src = pdfProxyImageSrc(d.image_url);
                                if (!src) return null;
                                return (
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    <Image
                                        key={i}
                                        src={src}
                                        style={styles.influencerDemoThumb}
                                        cache={false}
                                    />
                                );
                            })}
                            {demos.length === 0 && (
                                <Text style={styles.text}>
                                    No demographics media.
                                </Text>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    );
}

export default function DemographicsSection({
    summaryData,
}: DemographicsSectionProps) {
    const influencers = summaryData?.influencers ?? [];

    if (influencers.length > 0) {
        return (
            <>
                {influencers.map((inf, idx) => (
                    <InfluencerDemoPage key={idx} inf={inf} />
                ))}
            </>
        );
    }

    const legacy = summaryData?.demographics ?? [];
    if (legacy.length === 0) {
        return (
            <Page size="A4" orientation="landscape" style={styles.page}>
                <View style={[styles.fullWidth, styles.content]}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>Demographics Preview</Text>
                        <Text style={styles.text}>No demographics media.</Text>
                    </View>
                </View>
            </Page>
        );
    }

    return (
        <Page size="A4" orientation="landscape" style={styles.page}>
            <View style={[styles.fullWidth, styles.content]}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Demographics Preview</Text>
                    <View style={styles.demoGrid}>
                        {legacy.map((item, i) => {
                            const src = pdfProxyImageSrc(item.image_url);
                            if (!src) return null;
                            return (
                                <View key={i}>
                                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                    <Image
                                        src={src}
                                        style={styles.demoThumb}
                                        cache={false}
                                    />
                                    <Text style={styles.demoLabel}>
                                        {item.content_type}
                                    </Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </Page>
    );
}
