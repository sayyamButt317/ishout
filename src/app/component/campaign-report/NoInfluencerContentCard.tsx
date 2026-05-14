import Link from 'next/link';
import { BarChart3 } from 'lucide-react';


export default function NoInfluencerContentCard() {
  return (
    <div className="flex w-full min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-10">
      <div
        className="mx-auto w-full max-w-lg rounded-3xl border border-border bg-card/90 px-6 py-14 text-center shadow-sm sm:px-10 dark:border-white/10 dark:bg-linear-to-b dark:from-white/3 dark:to-transparent dark:shadow-none"
        role="status"
        aria-live="polite"
      >
        <div className="flex flex-col items-center gap-6">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted/60 dark:border-white/10 dark:bg-white/5"
            aria-hidden
          >
            <BarChart3 className="h-8 w-8 text-muted-foreground dark:text-white/45" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground dark:text-white">
              No influencer content to report yet
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/50">
              Once influencers submit approved content for this campaign, you will see
              demographics, engagement metrics, and downloadable reports on this page.
            </p>
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row sm:justify-center">
            <Link
              href="/Admin/content"
              className="inline-flex h-10 items-center justify-center rounded-xl bg-primaryButton px-4 text-sm font-semibold text-white shadow-md shadow-primaryButton/20 transition hover:bg-primaryHover"
            >
              Go to content
            </Link>
            <Link
              href="/Admin/campaign-report"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-muted/50 px-4 text-sm font-semibold text-foreground transition hover:bg-muted dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
            >
              All campaigns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
