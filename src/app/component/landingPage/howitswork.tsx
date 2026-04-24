import Image from 'next/image';
import CustomButton from '../button';
import { CAMPAIGNSTEPS } from '@/src/constant/Data/campaignsteps';

const VerticalConnector = () => (
  <svg className="absolute left-1/2 -translate-x-1/2" width="2" height="80" viewBox="0 0 2 80" fill="none">
    <path d="M1 0v80" stroke="white" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

function DesktopStep({ number, title, description, image }: (typeof CAMPAIGNSTEPS)[0]) {
  return (
    <div className="relative grid items-center gap-8 md:grid-cols-2 rounded-3xl shadow-xl">
      <div className="relative flex items-start gap-5">
        <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085]">{number}</span>
        <div className="absolute top-7.5 left-13.75 z-10 flex items-center justify-center">
          <VerticalConnector />
          <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10" />
        </div>
        <div className="flex-1 pl-9">
          <h3 className="mb-3 text-[25pt] font-bold text-white italic">{title}</h3>
          <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">{description}</p>
        </div>
      </div>
      <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
        <Image src={image} alt={title} unoptimized width={500} height={500} priority className="object-contain rounded-2xl lg:w-140 lg:h-120 md:w-auto max-w-75 md:max-w-none" />
      </div>
    </div>
  );
}

function MobileStep({ title, description, image }: (typeof CAMPAIGNSTEPS)[0]) {
  return (
    <div className="relative">
      <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
        <div className="mb-4 flex items-start gap-4">
          <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50" />
          <h3 className="text-xl font-bold text-white italic">{title}</h3>
        </div>
        <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">{description}</p>
        <div className="flex min-h-50 items-center justify-center rounded-xl bg-[#000006]">
          <Image src={image} alt={title} unoptimized width={500} height={500} priority className="object-contain rounded-2xl w-full max-w-96" />
        </div>
      </div>
      <div className="absolute top-full left-6.25 h-6 w-0.5 bg-linear-to-b from-[#1a1a1a] to-transparent" />
    </div>
  );
}

export default function HowItWorks({ id }: { id: string }) {
  return (
    <section className="overflow-hidden pt-36.75 max-sm:pt-15">
      <div className="container mx-auto max-md:px-2 md:px-28 md:pb-23.75">
        <div className="text-center">
          <h1 id={id} className="italic text-3xl sm:text-4xl md:text-5xl text-center font-extrabold">How It Works</h1>
          <p className="italic text-xs font-thin sm:text-sm text-center text-Secondary-text font-sans mt-4">Smarter Campaigns, Powered by AI</p>
        </div>

        <div className="relative">
          <svg className="pointer-events-none absolute top-0 left-13 hidden w-112.25 md:block stroke-white" viewBox="0 495 277.77 1600" preserveAspectRatio="xMinYMin slice">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8" opacity="0.25" d="M5.53,2.48v1631c0,40.96,20.77,65.73,68.73,68.73h203.25" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px" />
          </svg>

          {/* Desktop */}
          <div className="hidden space-y-14 md:block pb-20">
            {CAMPAIGNSTEPS.map((step) => <DesktopStep key={step.number} {...step} />)}
          </div>

          {/* Mobile */}
          <div className="block space-y-6 pb-16 md:hidden">
            {CAMPAIGNSTEPS.map((step) => <MobileStep key={step.number} {...step} />)}
          </div>
        </div>

        <div className="relative text-center mt-14">
          <div className="flex items-center justify-center">
            <div className="relative container flex w-full items-center justify-center">
              <div className="flex-1" />
              <div className="relative z-10">
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl" />
                <div className="mt-6 p-1.5 border border-white/10 rounded-[22px] inline-block relative z-10">
                  <div className="p-2 border border-white/20 rounded-[20px] inline-block">
                    <CustomButton className="bg-linear-to-b from-white to-[#f8fafc] hover:from-gray-50 hover:to-[#f1f5f9] text-black text-xl font-black italic tracking-tight rounded-[14px] h-14 px-14 border-b-2 border-gray-200 cursor-pointer transition-all duration-150 active:scale-95 active:border-b-0">
                      Launch Your Campaign
                    </CustomButton>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-linear-to-l from-transparent via-neutral-700 to-neutral-600 h-px mt-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}