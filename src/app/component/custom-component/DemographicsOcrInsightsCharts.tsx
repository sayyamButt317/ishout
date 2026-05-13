'use client';

import { useMemo, type ComponentType } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Funnel,
  FunnelChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Activity,
  Eye,
  Filter,
  Gauge,
  PieChart as PieChartIcon,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { DemographicsOcrMetrics, DemographicsOcrResponse } from '@/src/types/Admin-Type/demographics-ocr-type';

const ACCENT = 'hsl(333 85% 58%)';

const CHART_SHELL =
  'rounded-2xl border border-white/10 bg-black/25 p-4 shadow-inner shadow-black/40 ring-1 ring-white/5';

export interface DemographicsOcrInsightsChartsProps {
  data: DemographicsOcrResponse;
  className?: string;
}

function parsePercentValue(value?: string): number {
  if (!value) return 0;
  const m = String(value).match(/([\d.]+)/);
  if (!m) return 0;
  return Math.min(100, Math.max(0, parseFloat(m[1])));
}

function parseCount(s?: string): number {
  if (!s) return 0;
  const cleaned = String(s).replace(/,/g, '').replace(/[^\d.-]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function extractViewSources(extra: Record<string, string>) {
  const prefix = 'Top sources of views - ';
  return Object.entries(extra)
    .filter(([k]) => k.startsWith(prefix))
    .map(([k, v]) => ({
      name: k.slice(prefix.length).trim() || k,
      value: parsePercentValue(v),
      label: v,
    }))
    .filter((d) => d.value > 0 || d.name);
}

function extractSkipRate(extra: Record<string, string>): number {
  const key = Object.keys(extra).find((k) => /skip rate/i.test(k) && /this reel/i.test(k));
  if (key) return parsePercentValue(extra[key]);
  return 0;
}

function ChartSectionTitle({
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

export default function DemographicsOcrInsightsCharts({
  data,
  className,
}: DemographicsOcrInsightsChartsProps) {
  const metrics = useMemo(
    (): DemographicsOcrMetrics => data.metrics ?? {},
    [data.metrics],
  );
  const extra = useMemo(() => data.extra ?? {}, [data.extra]);
  const gender = data.demographics?.gender_split;

  const malePct = parsePercentValue(gender?.male);
  const femalePct = parsePercentValue(gender?.female);
  const followerPct = parsePercentValue(metrics.followers_percent);
  const nonFollowerPct = parsePercentValue(metrics.non_followers_percent);

  const engagementData = useMemo(
    () =>
      [
        { name: 'Likes', value: parseCount(metrics.likes), fill: 'var(--color-likes)' },
        { name: 'Comments', value: parseCount(metrics.comments), fill: 'var(--color-comments)' },
        { name: 'Shares', value: parseCount(metrics.shares), fill: 'var(--color-shares)' },
        { name: 'Saves', value: parseCount(metrics.saves), fill: 'var(--color-saves)' },
        { name: 'Reposts', value: parseCount(metrics.reposts), fill: 'var(--color-reposts)' },
      ].filter((d) => d.value > 0),
    [metrics],
  );

  const engagementConfig = {
    likes: { label: 'Likes', color: ACCENT },
    comments: { label: 'Comments', color: 'hsl(280 70% 58%)' },
    shares: { label: 'Shares', color: 'hsl(200 80% 55%)' },
    saves: { label: 'Saves', color: 'hsl(45 90% 55%)' },
    reposts: { label: 'Reposts', color: 'hsl(160 60% 50%)' },
    value: { label: 'Amount', color: ACCENT },
  } satisfies ChartConfig;

  const viewSources = useMemo(() => extractViewSources(extra), [extra]);
  const viewSourceConfig = {
    value: { label: 'Share of views', color: ACCENT },
  } satisfies ChartConfig;

  const genderData = useMemo(() => {
    const rows: { name: string; value: number; fill: string }[] = [];
    if (malePct > 0) rows.push({ name: 'Male', value: malePct, fill: 'var(--color-male)' });
    if (femalePct > 0) rows.push({ name: 'Female', value: femalePct, fill: 'var(--color-female)' });
    return rows;
  }, [malePct, femalePct]);

  const genderConfig = {
    male: { label: 'Male', color: 'hsl(200 85% 55%)' },
    female: { label: 'Female', color: ACCENT },
    value: { label: 'Share', color: ACCENT },
  } satisfies ChartConfig;

  const followerData = useMemo(() => {
    const rows: { name: string; value: number; fill: string }[] = [];
    if (followerPct > 0)
      rows.push({ name: 'Followers', value: followerPct, fill: 'var(--color-followers)' });
    if (nonFollowerPct > 0)
      rows.push({ name: 'Non-followers', value: nonFollowerPct, fill: 'var(--color-non)' });
    return rows;
  }, [followerPct, nonFollowerPct]);

  const followerConfig = {
    followers: { label: 'Followers', color: ACCENT },
    non: { label: 'Non-followers', color: 'hsl(265 55% 58%)' },
    value: { label: 'Share', color: ACCENT },
  } satisfies ChartConfig;

  const skipRate = useMemo(() => extractSkipRate(extra), [extra]);
  const gaugeData = [{ name: 'skip', value: skipRate, fill: 'var(--color-skip)' }];
  const gaugeConfig = {
    skip: { label: 'Skip rate', color: ACCENT },
  } satisfies ChartConfig;

  const funnelData = useMemo(() => {
    const views = Math.max(parseCount(metrics.views) || parseCount(metrics.accounts_reached), 1);
    const interactions = parseCount(metrics.interactions);
    const profile = parseCount(metrics.profile_activity);
    const follows = parseCount(metrics.follows);

    const iVal = interactions > 0 ? Math.min(interactions, views) : Math.round(views * 0.35);
    const pVal = profile > 0 ? Math.min(profile, iVal) : Math.round(iVal * 0.15);
    const fVal = follows > 0 ? Math.min(follows, pVal) : Math.max(1, Math.round(pVal * 0.2));

    return [
      { name: 'Views / reach', value: views, fill: 'hsl(333 75% 52%)' },
      { name: 'Interactions', value: Math.max(Math.min(iVal, views * 0.95), 1), fill: 'hsl(280 65% 50%)' },
      { name: 'Profile activity', value: Math.max(Math.min(pVal, iVal * 0.9), 1), fill: 'hsl(220 55% 48%)' },
      { name: 'Follows', value: Math.max(Math.min(fVal, pVal), 1), fill: 'hsl(160 50% 45%)' },
    ];
  }, [metrics]);

  const funnelConfig = {
    value: { label: 'Volume', color: ACCENT },
  } satisfies ChartConfig;

  const hasCharts =
    engagementData.length > 0 ||
    viewSources.length > 0 ||
    genderData.length > 0 ||
    followerData.length > 0 ||
    skipRate > 0 ||
    funnelData.length > 1;

  if (!hasCharts) return null;

  return (
    <div className={cn('space-y-8', className)}>
      <div className="grid gap-8 lg:grid-cols-2">
        {engagementData.length > 0 ? (
          <section className={cn(CHART_SHELL, 'min-h-0')}>
            <ChartSectionTitle
              icon={Activity}
              title="Engagement"
              subtitle="Likes, comments, shares, saves, reposts"
            />
            <ChartContainer
              config={engagementConfig}
              className="h-[260px] w-full aspect-auto! max-w-full [&_.recharts-cartesian-axis-tick_text]:fill-white/55"
            >
              <BarChart
                accessibilityLayer
                data={engagementData}
                layout="vertical"
                margin={{ left: 4, right: 16, top: 8, bottom: 8 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
                  {engagementData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </section>
        ) : null}

        {viewSources.length > 0 ? (
          <section className={cn(CHART_SHELL, 'min-h-0')}>
            <ChartSectionTitle icon={Eye} title="View sources" subtitle="Where views came from" />
            <ChartContainer
              config={viewSourceConfig}
              className="h-[260px] w-full aspect-auto! max-w-full [&_.recharts-cartesian-axis-tick_text]:fill-white/55"
            >
              <BarChart
                accessibilityLayer
                data={viewSources}
                layout="vertical"
                margin={{ left: 4, right: 16, top: 8, bottom: 8 }}
              >
                <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value, _n, item) => (
                        <span className="text-white">{item?.payload?.label ?? `${value}%`}</span>
                      )}
                    />
                  }
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20} fill="var(--color-value)" />
              </BarChart>
            </ChartContainer>
          </section>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {genderData.length > 0 ? (
          <section className={CHART_SHELL}>
            <ChartSectionTitle
              icon={Users}
              title="Audience gender"
              subtitle="Estimated split from OCR"
            />
            <ChartContainer
              config={genderConfig}
              className="mx-auto aspect-square h-[260px] max-h-[280px] w-full max-w-[280px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="88%"
                  strokeWidth={2}
                  stroke="hsl(222 15% 12%)"
                />
              </PieChart>
            </ChartContainer>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-white/70">
              {genderData.map((d) => (
                <span key={d.name}>
                  <span className="font-semibold text-white">{d.name}</span> {d.value}%
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {followerData.length > 0 ? (
          <section className={CHART_SHELL}>
            <ChartSectionTitle
              icon={PieChartIcon}
              title="Followers vs non-followers"
              subtitle="Audience relationship mix"
            />
            <ChartContainer
              config={followerConfig}
              className="mx-auto aspect-square h-[260px] max-h-[280px] w-full max-w-[280px]"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name" />} />
                <Pie
                  data={followerData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="88%"
                  strokeWidth={2}
                  stroke="hsl(222 15% 12%)"
                />
              </PieChart>
            </ChartContainer>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-white/70">
              {followerData.map((d) => (
                <span key={d.name}>
                  <span className="font-semibold text-white">{d.name}</span> {d.value}%
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {skipRate > 0 ? (
          <section className={CHART_SHELL}>
            <ChartSectionTitle
              icon={Gauge}
              title="Skip rate"
              subtitle="This reel vs typical (if present)"
            />
            <div className="relative flex flex-col items-center justify-center pt-2">
              <ChartContainer
                config={gaugeConfig}
                className="mx-auto aspect-square h-[220px] w-full max-w-[240px]"
              >
                <RadialBarChart
                  data={gaugeData}
                  startAngle={90}
                  endAngle={-270}
                  innerRadius="72%"
                  outerRadius="100%"
                  barSize={14}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <RadialBar
                    dataKey="value"
                    background={{ fill: 'hsl(220 12% 18%)' }}
                    cornerRadius={8}
                    fill="var(--color-skip)"
                  />
                </RadialBarChart>
              </ChartContainer>
              <p className="-mt-6 text-center text-2xl font-bold tabular-nums text-white">{skipRate}%</p>
              <p className="mt-1 text-center text-xs text-white/45">of viewers skipped early</p>
            </div>
          </section>
        ) : null}

        {funnelData.length > 1 ? (
          <section className={CHART_SHELL}>
            <ChartSectionTitle
              icon={Filter}
              title="Conversion funnel"
              subtitle="Relative flow from reach to follows"
            />
            <ChartContainer
              config={funnelConfig}
              className="h-[280px] w-full aspect-auto! max-w-full"
            >
              <FunnelChart margin={{ top: 16, right: 24, left: 24, bottom: 8 }}>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Funnel dataKey="value" data={funnelData} isAnimationActive />
              </FunnelChart>
            </ChartContainer>
            <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-white/70">
              {funnelData.map((d) => (
                <span key={d.name}>
                  <span className="font-semibold text-white">{d.name}</span>
                  <span className="text-white/50"> · </span>
                  {d.value.toLocaleString()}
                </span>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
