import { ExtractInsightsApi } from '@/src/routes/Admin/API/admin.routes';
import type { ReportInsightsByUsername } from '@/src/app/component/reporting/reportinsights';
import type { CampaignReportInfluencer } from '@/src/types/Admin-Type/Reports-tyes';
import { mapStoredInsightsToOcrResponse } from '@/src/types/Admin-Type/demographics-ocr-type';

export function resolveReportInfluencerId(inf: CampaignReportInfluencer): string {
  return inf.influencer_id?.trim() || inf.data?.influencer_id?.trim() || '';
}

export function hasSavedInsights(inf: CampaignReportInfluencer): boolean {
  return (
    inf.data?.demographics === true || inf.demographics === true || inf.data?.insights === true
  );
}

export async function fetchReportInsightsByUsername(
  campaignId: string,
  influencers: CampaignReportInfluencer[],
): Promise<ReportInsightsByUsername> {
  if (!campaignId) return {};

  const result: ReportInsightsByUsername = {};

  await Promise.all(
    influencers.filter(hasSavedInsights).map(async (inf) => {
      const influencerId = resolveReportInfluencerId(inf);
      const username = inf.username?.trim() || inf.data?.profile?.username?.trim();
      if (!influencerId || !username) return;

      try {
        const record = await ExtractInsightsApi(campaignId, influencerId);
        const mapped = mapStoredInsightsToOcrResponse(record);
        if (mapped) result[username] = mapped;
      } catch {
        // Skip failed insight loads for PDF
      }
    }),
  );

  return result;
}
