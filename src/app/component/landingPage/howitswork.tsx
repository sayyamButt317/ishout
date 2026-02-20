import Image from 'next/image';
import CustomButton from '../button';

export default function HowItWorks({ id }: { id: string }) {
  return (
    <section className="overflow-hidden pt-36.75 max-sm:pt-15">
      <div className="container mx-auto max-md:px-2 md:px-28 md:pb-23.75">
        <div className="text-center">
          <h1
            id={id}
            className="italic text-3xl sm:text-4xl md:text-5xl text-center font-extrabold "
          >
            How It Works
          </h1>
          <p className="italic text-xs font-thin sm:text-sm text-center justify-center items-center text-Secondary-text font-sans mt-4">
            Smarter Campaigns, Powered by AI
          </p>
        </div>
        <div className="relative">
          <svg
            className="pointer-events-none absolute top-0 left-13 hidden w-112.25 md:block stroke-white"
            viewBox="0 495 277.77 1600"
            preserveAspectRatio="xMinYMin slice"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0.8"
              opacity="0.25"
              d="M5.53,2.48v1631c0,40.96,20.77,65.73,68.73,68.73h203.25"
              pathLength="1"
              strokeDashoffset="0px"
              strokeDasharray="1px 1px"
            />
          </svg>
          <div className="hidden space-y-14 md:block pb-20">
            <div data-index="0" className="relative">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative flex items-start gap-4">
                  <div className="relative w-12 shrink-0">
                    <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085] max-md:text-[50pt]">
                      1
                    </span>
                  </div>
                  <div className="absolute top-7.5 left-13.75 z-10">
                    <div className="relative flex items-center justify-center">
                      {/* Vertical line (centered behind dot) */}
                      <svg
                        className="absolute left-1/2 -translate-x-1/2"
                        width="2"
                        height="80"
                        viewBox="0 0 2 80"
                        fill="none"
                      >
                        <path
                          d="M1 0v80"
                          stroke="white"
                          strokeWidth="1.2"
                          opacity="0.6"
                        />
                      </svg>

                      {/* Dot (unchanged position) */}
                      <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="mb-3 text-[25pt] font-bold text-white italic">
                      Briefing
                    </h3>
                    <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">
                      Define your campaign goals, audience, and deliverables in minutes.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                    <div className="space-y-6">
                      <Image
                        src="https://ik.imagekit.io/dtdxnyskk/briefing.svg"
                        alt="briefing"
                        unoptimized={true}
                        width={500}
                        height={500}
                        priority
                        className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-index="1" className="relative">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative flex items-start gap-4">
                  <div className="relative w-12 shrink-0">
                    <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085] max-md:text-[50pt]">
                      2
                    </span>
                  </div>
                  <div className="absolute top-7.5 left-13.75 z-10">
                    <div className="relative flex items-center justify-center">
                      <svg
                        className="absolute left-1/2 -translate-x-1/2"
                        width="2"
                        height="80"
                        viewBox="0 0 2 80"
                        fill="none"
                      >
                        <path
                          d="M1 0v80"
                          stroke="white"
                          strokeWidth="1.2"
                          opacity="0.6"
                        />
                      </svg>
                      <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="mb-3 text-[25pt] font-bold text-white italic">
                      AI Matching
                    </h3>
                    <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">
                      Our algorithm identifies the most relevant influencers for your
                      brand — instantly.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="relative float-end flex w-full max-w-94.25 items-center justify-center">
                    <div className="relative z-10 w-full max-w-5xl">
                      <Image
                        src="https://ik.imagekit.io/dtdxnyskk/matching.svg"
                        alt="matching"
                        unoptimized={true}
                        width={500}
                        height={500}
                        priority
                        className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-index="2" className="relative">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative flex items-start gap-4">
                  <div className="relative w-12 shrink-0">
                    <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085] max-md:text-[50pt]">
                      3
                    </span>
                  </div>
                  <div className="absolute top-7.5 left-13.75 z-10">
                    <div className="relative flex items-center justify-center">
                      <svg
                        className="absolute left-1/2 -translate-x-1/2"
                        width="2"
                        height="80"
                        viewBox="0 0 2 80"
                        fill="none"
                      >
                        <path
                          d="M1 0v80"
                          stroke="white"
                          strokeWidth="1.2"
                          opacity="0.6"
                        />
                      </svg>
                      <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="mb-3 text-[25pt] font-bold text-white italic">
                      Approval
                    </h3>
                    <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">
                      Review and confirm partnerships in one streamlined dashboard.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="relative float-end flex w-full max-w-94.25 items-center justify-center">
                    <div className="space-y-2">
                      <Image
                        src="https://ik.imagekit.io/dtdxnyskk/approval.svg"
                        alt="approval"
                        width={500}
                        height={500}
                        priority
                        className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-index="3" className="relative">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative flex items-start gap-4">
                  <div className="relative w-12 shrink-0">
                    <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085] max-md:text-[50pt]">
                      4
                    </span>
                  </div>
                  <div className="absolute top-7.5 left-13.75 z-10">
                    <div className="relative flex items-center justify-center">
                      <svg
                        className="absolute left-1/2 -translate-x-1/2"
                        width="2"
                        height="80"
                        viewBox="0 0 2 80"
                        fill="none"
                      >
                        <path
                          d="M1 0v80"
                          stroke="white"
                          strokeWidth="1.2"
                          opacity="0.6"
                        />
                      </svg>
                      <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="mb-3 text-[25pt] font-bold text-white italic">
                      Campaign Launch
                    </h3>
                    <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">
                      Manage content creation, approvals, and live performance in real
                      time.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                    <Image
                      src="https://ik.imagekit.io/dtdxnyskk/campaign-launch.svg"
                      alt="campaign-launch"
                      unoptimized={true}
                      width={500}
                      height={500}
                      priority
                      className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div data-index="4" className="relative">
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="relative flex items-start gap-4">
                  <div className="relative w-12 shrink-0">
                    <span className="-ml-4 block text-[70pt] leading-none font-extralight text-[#224085] max-md:text-[50pt]">
                      5
                    </span>
                  </div>
                  <div className="absolute top-7.5 left-13.75 z-10">
                    <div className="relative flex items-center justify-center">
                      <svg
                        className="absolute left-1/2 -translate-x-1/2"
                        width="2"
                        height="80"
                        viewBox="0 0 2 80"
                        fill="none"
                      >
                        <path
                          d="M1 0v80"
                          stroke="white"
                          strokeWidth="1.2"
                          opacity="0.6"
                        />
                      </svg>
                      <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50 relative z-10"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-8">
                    <h3 className="mb-3 text-[25pt] font-bold text-white italic">
                      Reporting
                    </h3>
                    <p className="secondry-text text-base leading-relaxed font-light md:text-[13pt]">
                      Access real-time analytics and insights to optimize future
                      campaigns.
                    </p>
                  </div>
                </div>
                <div>
                  <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                    <Image
                      src="https://ik.imagekit.io/dtdxnyskk/reporting.svg"
                      alt="reporting"
                      unoptimized={true}
                      width={500}
                      height={500}
                      priority
                      className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="block space-y-14 md:hidden">
            <div className="space-y-6 pb-16">
              <div data-index="0" className="relative">
                <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white italic">Briefing</h3>
                    </div>
                  </div>
                  <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">
                    Define your campaign goals, audience, and deliverables in minutes.
                  </p>
                  <div className="flex min-h-50 items-center justify-center rounded-xl border border-[#000006] bg-[#000006]">
                    <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                      <div className="space-y-6">
                        <Image
                          src="https://ik.imagekit.io/dtdxnyskk/briefing.svg"
                          alt="briefing"
                          unoptimized={true}
                          width={500}
                          height={500}
                          priority
                          className="object-contain rounded-2xl w-full md:w-auto max-w-96 md:max-w-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-full left-6.25 h-6 w-0.5 bg-linear-to-b from-[#1a1a1a] to-transparent"></div>
              </div>
              <div data-index="1" className="relative">
                <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white italic">AI Matching</h3>
                    </div>
                  </div>
                  <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">
                    Our algorithm identifies the most relevant influencers for your brand
                    — instantly.
                  </p>
                  <div className="flex min-h-50 items-center justify-center rounded-xl border border-[#000006] bg-[#000006]">
                    <div className="relative float-end flex w-full max-w-94.25 items-center justify-center">
                      <div className="relative z-10 w-full max-w-5xl">
                        <Image
                          src="https://ik.imagekit.io/dtdxnyskk/matching.svg"
                          alt="matching"
                          unoptimized={true}
                          width={500}
                          height={500}
                          priority
                          className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-full left-6.25 h-6 w-0.5 bg-linear-to-b from-[#1a1a1a] to-transparent"></div>
              </div>
              <div data-index="2" className="relative">
                <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white italic">Approval</h3>
                    </div>
                  </div>
                  <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">
                    Review and confirm partnerships in one streamlined dashboard.
                  </p>
                  <div className="flex min-h-50 items-center justify-center rounded-xl border border-[#000006] bg-[#000006]">
                    <div className="relative float-end flex w-full max-w-94.25 items-center justify-center">
                      <div className="space-y-2">
                        <Image
                          src="https://ik.imagekit.io/dtdxnyskk/approval.svg"
                          alt="approval"
                          width={500}
                          height={500}
                          priority
                          className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-full left-6.25 h-6 w-0.5 bg-linear-to-b from-[#1a1a1a] to-transparent"></div>
              </div>
              <div data-index="3" className="relative">
                <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white italic">
                        Campaign Launch
                      </h3>
                    </div>
                  </div>
                  <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">
                    Manage content creation, approvals, and live performance in real time.
                  </p>
                  <div className="flex min-h-50 items-center justify-center rounded-xl border border-[#000006] bg-[#000006]">
                    <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                      <Image
                        src="https://ik.imagekit.io/dtdxnyskk/campaign-launch.svg"
                        alt="campaign-launch"
                        unoptimized={true}
                        width={500}
                        height={500}
                        priority
                        className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute top-full left-6.25 h-6 w-0.5 bg-linear-to-b from-[#1a1a1a] to-transparent"></div>
              </div>
              <div data-index="4" className="relative">
                <div className="rounded-3xl border-2 border-[#1a1a1a] bg-[#000006] p-4 shadow-xl">
                  <div className="mb-4 flex items-start gap-4">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white shadow-lg shadow-white/50"></div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white italic">Reporting</h3>
                    </div>
                  </div>
                  <p className="secondry-text mb-6 pl-6 text-sm leading-relaxed">
                    Access real-time analytics and insights to optimize future campaigns.
                  </p>
                  <div className="flex min-h-50 items-center justify-center rounded-xl border border-[#000006] bg-[#000006]">
                    <div className="float-end max-w-94.25 rounded-2xl shadow-2xl md:p-6">
                      <Image
                        src="https://ik.imagekit.io/dtdxnyskk/reporting.svg"
                        alt="reporting"
                        unoptimized={true}
                        width={500}
                        height={500}
                        priority
                        className="object-contain rounded-2xl w-full md:w-auto max-w-75 md:max-w-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative text-center mt-14">
          <div className="flex items-center justify-center">
            <div className="relative container flex w-full items-center justify-center">
              <div className="flex-1"></div>

              <div className="relative z-10">
                {/* REDUCED GLOW: Lowered opacity from 50 to 20 and adjusted blur */}
                <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl"></div>

                {/* Layer 1: Outer Border */}
                <div className="mt-6 p-[6px] border border-white/10 rounded-[22px] inline-block relative z-10">
                  {/* Layer 2: Middle Border */}
                  <div className="p-[8px] border border-white/20 rounded-[20px] inline-block">
                    <CustomButton
                      className="
                /* Background & Subtle Gradient */
                bg-gradient-to-b from-white to-[#f8fafc]
                hover:from-gray-50 hover:to-[#f1f5f9]
                
                /* Typography */
                text-black 
                text-xl 
                font-black 
                italic 
                tracking-tight
                
                /* Sizing & Shape */
                rounded-[14px] 
                h-14 
                px-14 
                
                /* Border instead of Shadow */
                border-b-2 border-gray-200
                
                /* Interactive */
                cursor-pointer
                transition-all 
                duration-150
                active:scale-95
                active:border-b-0
              "
                    >
                      Launch Your Campaign
                    </CustomButton>
                  </div>
                </div>
              </div>

              {/* Side decorative line */}
              <div className="flex-1 bg-gradient-to-l from-transparent via-neutral-700 to-neutral-600 h-[1px] mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
