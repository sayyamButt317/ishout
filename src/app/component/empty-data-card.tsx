import type { LucideIcon } from 'lucide-react';
import { LayoutList } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EmptyDataCardProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
  minHeight?: string;
};

export default function EmptyDataCard({
  title,
  description,
  icon: Icon = LayoutList,
  className,
  minHeight = 'min-h-[min(280px,50vh)]',
}: EmptyDataCardProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center px-4 py-10',
        minHeight,
        className,
      )}
    >
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
            <Icon className="h-8 w-8 text-muted-foreground dark:text-white/45" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-foreground dark:text-white">
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/50">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
