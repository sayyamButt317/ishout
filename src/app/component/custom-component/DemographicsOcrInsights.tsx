'use client';

import { useMemo, type ComponentType } from 'react';
import { BarChart3, Sparkles, Target, Users } from 'lucide-react';
import type {
  DemographicsOcrDemographicsBlock,
  DemographicsOcrMetrics,
  DemographicsOcrResponse,
} from '@/src/types/Admin-Type/demographics-ocr-type';
import DemographicsOcrInsightsCharts from '@/src/app/component/custom-component/DemographicsOcrInsightsCharts';

export interface DemographicsOcrInsightsProps {
  data: DemographicsOcrResponse;
  className?: string;
}

function formatMetricLabel(key: string): string {
  return key.replace(/_/g, ' ');
}

function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/8 ring-1 ring-white/10">
        <Icon className="h-4 w-4 text-[#FF3B8D]" aria-hidden />
      </div>
      <div>
        <h3 className="text-sm font-bold tracking-tight text-white">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-white/45">{subtitle}</p> : null}
      </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-linear-to-b from-white/8 to-transparent px-4 py-3.5 shadow-sm ring-1 ring-white/5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-1.5 truncate text-base font-bold tabular-nums tracking-tight text-white sm:text-lg">
        {value}
      </p>
    </div>
  );
}

const METADATA_SHELL =
  'rounded-2xl border border-white/10 bg-white/4 p-5 shadow-sm ring-1 ring-white/5';

const METRICS_GRID_SHELL =
  'rounded-2xl border border-white/10 bg-black/25 p-4 shadow-inner shadow-black/40 ring-1 ring-white/5';

export default function DemographicsOcrInsights({
  data,
  className = 'mt-8 space-y-10 border-t border-white/10 pt-8',
}: DemographicsOcrInsightsProps) {
  const metrics = useMemo(
    (): DemographicsOcrMetrics => data.metrics ?? {},
    [data.metrics],
  );
  const extra = useMemo(() => data.extra ?? {}, [data.extra]);

  const kpiItems = useMemo(() => {
    const keys: (keyof DemographicsOcrMetrics)[] = [
      'views',
      'watch_time',
      'interactions',
      'accounts_reached',
      'likes',
    ];
    return keys
      .map((k) => {
        const v = metrics[k];
        if (v == null || String(v).trim() === '') return null;
        return { label: formatMetricLabel(String(k)), value: String(v) };
      })
      .filter(Boolean) as { label: string; value: string }[];
  }, [metrics]);

  const extraEntries = Object.entries(extra).filter(
    ([, v]) => v != null && String(v).trim() !== '',
  );

  return (
    <div className={className}>
      <header className="flex items-center gap-2 text-white">
        <Sparkles className="h-5 w-5 shrink-0 text-[#FF3B8D]" aria-hidden />
        <h2 className="text-lg font-bold tracking-tight">Insights</h2>
      </header>

      <div className={METADATA_SHELL}>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50">
          {data.platform ? (
            <span className="rounded-full bg-[#FF3B8D]/20 px-3 py-1 text-[#ffb3d0]">{data.platform}</span>
          ) : null}
          {data.content_type ? (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">{data.content_type}</span>
          ) : null}
          {data.period ? (
            <span className="rounded-full bg-white/10 px-3 py-1 text-white/80">{data.period}</span>
          ) : null}
          {data.posted_at && !data.period ? (
            <span className="text-white/45">Posted {data.posted_at}</span>
          ) : null}
        </div>
        {data.caption ? (
          <p className="mt-4 text-sm leading-relaxed text-white/80">{data.caption}</p>
        ) : null}
      </div>

      {kpiItems.length > 0 ? (
        <section>
          <SectionTitle icon={Target} title="Main metrics" subtitle="Key performance indicators" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {kpiItems.map((item) => (
              <KpiCard key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </section>
      ) : null}

      <DemographicsOcrInsightsCharts data={data} />

      {Object.keys(metrics).length > kpiItems.length ? (
        <section className={METRICS_GRID_SHELL}>
          <SectionTitle icon={BarChart3} title="All parsed metrics" subtitle="Raw OCR fields" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {Object.entries(metrics)
              .filter(([, v]) => v != null && String(v).trim() !== '')
              .map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-xs"
                >
                  <p className="font-medium text-white/45">{formatMetricLabel(key)}</p>
                  <p className="mt-0.5 font-semibold text-white">{value}</p>
                </div>
              ))}
          </div>
        </section>
      ) : null}

      {extraEntries.length > 0 ? (
        <section>
          <SectionTitle icon={BarChart3} title="Additional details" subtitle="Extended OCR fields" />
          <div className="max-h-[min(40vh,360px)] overflow-y-auto rounded-xl border border-white/10 bg-black/25">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-white/5">
                {extraEntries.map(([key, value]) => (
                  <tr key={key} className="hover:bg-white/3">
                    <th className="w-[40%] px-4 py-2.5 align-top text-xs font-medium text-white/45">
                      {formatMetricLabel(key)}
                    </th>
                    <td className="px-4 py-2.5 text-xs text-white/85">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      <DemographicsAudienceTables demographics={data.demographics} />
    </div>
  );
}

function isDisplayableValue(value: unknown): value is string {
  if (value == null) return false;
  const s = String(value).trim();
  return s !== '' && s.toLowerCase() !== 'unknown';
}

function DemographicsAudienceTables({
  demographics,
}: {
  demographics?: DemographicsOcrDemographicsBlock;
}) {
  if (!demographics) return null;

  const ageRows = demographics.age_groups
    ? Object.entries(demographics.age_groups).filter(([, v]) => isDisplayableValue(v))
    : [];

  const listSections: { title: string; rows: { label: string; value: string }[] }[] = [];

  const mapList = (
    title: string,
    items?: Array<{ name?: string; value?: string; percent?: string } | string>,
  ) => {
    if (!items?.length) return;
    const rows = items
      .map((item, index) => {
        if (typeof item === 'string') {
          return isDisplayableValue(item) ? { label: `Item ${index + 1}`, value: item } : null;
        }
        const label = item.name?.trim() || `Item ${index + 1}`;
        const value = item.percent ?? item.value;
        return isDisplayableValue(value) ? { label, value: String(value) } : null;
      })
      .filter(Boolean) as { label: string; value: string }[];
    if (rows.length) listSections.push({ title, rows });
  };

  mapList('Top countries', demographics.top_countries);
  mapList('Top cities', demographics.top_cities);
  mapList('Top languages', demographics.top_languages);

  const growth = demographics.follower_growth;
  const hasGrowth =
    growth && (isDisplayableValue(growth.value) || isDisplayableValue(growth.change));

  const activeDays = demographics.most_active_times?.days?.filter(isDisplayableValue) ?? [];
  const activeHours = demographics.most_active_times?.hours?.filter(isDisplayableValue) ?? [];

  const hasAny =
    ageRows.length > 0 ||
    listSections.length > 0 ||
    hasGrowth ||
    activeDays.length > 0 ||
    activeHours.length > 0 ||
    isDisplayableValue(demographics.total_followers);

  if (!hasAny) return null;

  return (
    <section className={METRICS_GRID_SHELL}>
      <SectionTitle icon={Users} title="Audience breakdown" subtitle="Demographics from insights" />

      {isDisplayableValue(demographics.total_followers) ? (
        <div className="mb-4">
          <KpiCard label="Total followers" value={String(demographics.total_followers)} />
        </div>
      ) : null}

      {hasGrowth ? (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:max-w-md">
          {isDisplayableValue(growth?.value) ? (
            <KpiCard label="Follower growth" value={String(growth?.value)} />
          ) : null}
          {isDisplayableValue(growth?.change) ? (
            <KpiCard label="Growth change" value={String(growth?.change)} />
          ) : null}
        </div>
      ) : null}

      {ageRows.length > 0 ? (
        <div className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-black/25">
          <p className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            Age groups
          </p>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-white/5">
              {ageRows.map(([label, value]) => (
                <tr key={label} className="hover:bg-white/3">
                  <th className="w-[40%] px-4 py-2.5 text-xs font-medium text-white/45">{label}</th>
                  <td className="px-4 py-2.5 text-xs text-white/85">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {listSections.map((section) => (
        <div
          key={section.title}
          className="mb-6 overflow-hidden rounded-xl border border-white/10 bg-black/25"
        >
          <p className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            {section.title}
          </p>
          <table className="w-full text-left text-sm">
            <tbody className="divide-y divide-white/5">
              {section.rows.map((row) => (
                <tr key={`${section.title}-${row.label}`} className="hover:bg-white/3">
                  <th className="w-[40%] px-4 py-2.5 text-xs font-medium text-white/45">
                    {row.label}
                  </th>
                  <td className="px-4 py-2.5 text-xs text-white/85">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {(activeDays.length > 0 || activeHours.length > 0) && (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/25">
          <p className="border-b border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/50">
            Most active times
          </p>
          <div className="space-y-3 px-4 py-3 text-xs text-white/80">
            {activeDays.length > 0 ? (
              <p>
                <span className="font-medium text-white/50">Days: </span>
                {activeDays.join(', ')}
              </p>
            ) : null}
            {activeHours.length > 0 ? (
              <p>
                <span className="font-medium text-white/50">Hours: </span>
                {activeHours.join(', ')}
              </p>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
