import Image from 'next/image';
import CustomButton from '../button';

const STEPS = [
  { number: 1, title: '  Briefing', classname: 'pl-10', description: 'Define your campaign goals, audience, and deliverables in minutes.', image: 'https://ik.imagekit.io/dtdxnyskk/briefing.svg' },
  { number: 2, title: 'AI Matching', description: 'Our algorithm identifies the most relevant influencers for your brand — instantly.', image: 'https://ik.imagekit.io/dtdxnyskk/matching.svg' },
  { number: 3, title: 'Approval', description: 'Review and confirm partnerships in one streamlined dashboard.', image: 'https://ik.imagekit.io/dtdxnyskk/approval.svg' },
  { number: 4, title: 'Campaign Launch', description: 'Manage content creation, approvals, and live performance in real time.', image: 'https://ik.imagekit.io/dtdxnyskk/campaign-launch.svg' },
  { number: 5, title: 'Reporting', description: 'Access real-time analytics and insights to optimize future campaigns.', image: 'https://ik.imagekit.io/dtdxnyskk/reporting.svg' },
];

const VerticalConnector = () => (
  <svg className="absolute left-1/2 -translate-x-1/2" width="2" height="90" viewBox="0 10 2 50" fill="none">
    <path d="M1 0v80" stroke="white" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

function DesktopStep({ number, title, description, image }: (typeof STEPS)[0]) {
  return (
    <div className="relative grid items-center gap-2 md:grid-cols-2 p-2 rounded-3xl shadow-xl">
      <div className="relative flex items-start gap-5">
        <span className="-ml-4 block text-[60pt] leading-none font-extralight text-[#224085]">{number}</span>
        <div className="absolute top-7.5 left-9 z-10 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10" />
           <VerticalConnector />
        </div>
        <div className="flex-1 pl-9">
          <h3 className="mb-3 text-[20pt] font-bold text-white italic">{title}</h3>
          <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">{description}</p>
        </div>
      </div>
      <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-2">
        <Image src={image} alt={title} unoptimized width={300} height={300} priority className="object-contain rounded-2xl lg:w-100 lg:h-80 md:w-auto max-w-75 md:max-w-none" />
      </div>
    </div>
  );
}

function MobileStep({ title, description, image }: (typeof STEPS)[0]) {
  return (
    <div className="relative">
      <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
        <div className="mb-2 flex items-start gap-4">
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
          <svg className="pointer-events-none absolute top-0 left-10 hidden w-112.25 md:block stroke-white" viewBox="0 495 253 1600" preserveAspectRatio="xMinYMin slice">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9" opacity="0.25" d="M5.53,2.48v1631c0,40.96,20.77,65.73,68.73,68.73h203.25" pathLength="1" strokeDashoffset="0px" strokeDasharray="1px 1px" />
          </svg>

          {/* Desktop */}
          <div className=" space-y-14 md:block pb-10">
            {STEPS.map((step) => <DesktopStep key={step.number} {...step} />)}
          </div>

          {/* Mobile */}
          <div className="block space-y-6 pb-16 md:hidden">
            {STEPS.map((step) => <MobileStep key={step.number} {...step} />)}
          </div>
        </div>

        <div className="relative text-center mt-14">
          <div className="flex items-center justify-center">
            <div className="relative container flex w-full items-center justify-center">
              <div className="flex-1" />
              <div className="relative z-10">
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl" />
                <div className="mt-6  rounded-[22px] inline-block relative z-10">
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