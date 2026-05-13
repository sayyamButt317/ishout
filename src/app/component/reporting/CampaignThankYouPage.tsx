'use client';

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from './reporty_style';

const THANK_YOU_LOGO = '/api/campaign-brief-image?asset=thank-you-logo';

function thankYouLogoSrc(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}${THANK_YOU_LOGO}`;
  }
  const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (site) return `${site}${THANK_YOU_LOGO}`;
  return THANK_YOU_LOGO;
}

const HALFTONE_COUNT = 28;

function HalftoneCluster({ variant }: { variant: 'tl' | 'br' }) {
  const dots = Array.from({ length: HALFTONE_COUNT });
  const wrapStyle =
    variant === 'tl' ? styles.thankYouHalftoneWrap : styles.thankYouHalftoneWrapBR;
  return (
    <View style={wrapStyle}>
      {dots.map((_, i) => (
        <View key={i} style={styles.thankYouHalftoneDot} />
      ))}
    </View>
  );
}

function CornerDotGrid({ corner }: { corner: 'tr' | 'bl' }) {
  const dots = Array.from({ length: 16 });
  const pos = corner === 'tr' ? styles.thankYouDotGridTR : styles.thankYouDotGridBL;
  return (
    <View style={[styles.thankYouDotGridWrap, pos]}>
      {dots.map((_, i) => (
        <View key={i} style={styles.thankYouBlackMiniDot} />
      ))}
    </View>
  );
}

function ThankYouLogoMark() {
  const src = thankYouLogoSrc();
  return (
    <View style={{ alignItems: 'center' }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image src={src} style={styles.thankYouLogoGif} cache={false} />
      <Text style={styles.thankYouBrandSub}>
        AI-Powered Influencer Marketing Platform
      </Text>
    </View>
  );
}

export default function CampaignThankYouPage() {
  return (
    <Page
      size="A4"
      orientation="landscape"
      style={[styles.page, styles.thankYouPage]}
      wrap={false}
    >
      <View style={styles.thankYouDecorLayer}>
        <View style={[styles.thankYouCornerSquare, styles.thankYouCornerSquareTL]} />
        <View style={[styles.thankYouCornerSquare, styles.thankYouCornerSquareBR]} />
        <View style={styles.thankYouMintBlock} />
        <HalftoneCluster variant="tl" />
        <HalftoneCluster variant="br" />
        <CornerDotGrid corner="tr" />
        <CornerDotGrid corner="bl" />
      </View>

      <View style={styles.thankYouMain}>
        <Text style={styles.thankYouHeading}>Thank You</Text>
        <View style={styles.thankYouRule} />
        <Text style={styles.thankYouSub}>
          LOOKING FORWARD FOR OUR NEXT COLLABORATION!
        </Text>
        <View style={styles.thankYouTealRow}>
          <View style={styles.thankYouTealSpacer} />
          <View style={styles.thankYouTealBar} />
        </View>
      </View>

      <View style={styles.thankYouFooter}>
        <ThankYouLogoMark />
      </View>
    </Page>
  );
}
