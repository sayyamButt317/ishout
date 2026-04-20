import Image from 'next/image';
import { Bolt, CalendarDays } from 'lucide-react';

interface ContentHeaderProps {
  title: string;
  logo: string;
  description: string;
  category: string;
  endInDays?: number;
  targetReach?: string;
  conversionGoal?: string;
  budgetUtilized?: number;
}

const ContentHeader = ({
  title,
  logo,
  description,
  category,
  endInDays = 14,
  targetReach = '4.2M+',
  conversionGoal = '12.5%',
  budgetUtilized = 68,
}: ContentHeaderProps) => {
  const safeBudget = Math.max(0, Math.min(100, budgetUtilized));

  return (
    <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141414] p-8 md:p-12">
      <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
        <div className="relative shrink-0">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-primaryButton/20 p-1 md:h-64 md:w-64">
            <div className="h-full w-full overflow-hidden rounded-full">
              <Image
                src={logo}
                alt={title}
                width={256}
                height={256}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primaryButton text-white shadow-lg">
            <Bolt className="h-5 w-5" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full bg-primaryButton/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primarytext">
              {category}
            </span>
            <span className="flex items-center gap-2 text-sm text-white/60">
              <CalendarDays className="h-4 w-4" />
              Ends in {endInDays} days
            </span>
          </div>

          <div>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-white/65">{description}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-1">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Target Reach</p>
              <p className="text-2xl font-bold text-[#8f79e8]">{targetReach}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Conversion Goal</p>
              <p className="text-2xl font-bold text-primarytext">{conversionGoal}</p>
            </div>
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-white/40">Budget Utilized</p>
              <div className="flex items-center gap-3">
                <p className="text-2xl font-bold text-white">{safeBudget}%</p>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-linear-to-r from-primaryButton to-primaryHover"
                    style={{ width: `${safeBudget}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primaryButton/10 blur-3xl" />
    </header>
  );
};

export default ContentHeader;
