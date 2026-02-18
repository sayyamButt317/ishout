import Image from 'next/image';

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
            <path d="M5.53,541v30.12" strokeWidth="0.60" fill="none" />
            <path d="M5.53,719v30.12" strokeWidth="0.60" fill="none" />
            <path d="M5.53,890v30.12" strokeWidth="0.60" fill="none" />
            <path d="M5.53,1063v30.12" strokeWidth="0.60" fill="none" />
            <path d="M5.53,1241v30.12" strokeWidth="0.60" fill="none" />
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
                    <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"></div>
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
                    <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"></div>
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
                    <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"></div>
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
                    <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"></div>
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
                    <div className="h-3 w-3 rounded-full bg-white shadow-lg shadow-white/50"></div>
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
        <div className="relative text-center mt-20">
          <div className="flex items-center justify-center">
            <div className="relative container flex w-full items-center justify-center">
              <div className="flex-1"></div>
              <div className="relative z-10">
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-neutral-500 via-[#CCCCCD] to-neutral-500 opacity-50 blur-xl"></div>
                <button className="group relative">
                  <div className="absolute inset-0 rounded-full from-gray-400 via-[#CCCCCD] to-gray-400 opacity-40 blur-md transition-opacity duration-300 group-hover:bg-linear-to-r group-hover:opacity-40"></div>
                  <div className="rounded-3xl border border-white/15 p-[5.5px]">
                    <div className="rounded-3xl border border-white/40 p-1.5">
                      <div className="relative transform cursor-pointer rounded-2xl bg-linear-to-r from-gray-300 via-gray-50 to-gray-300 px-8 py-2.5 shadow-2xl transition-all duration-300 group-hover:shadow-white/20">
                        <span className="dark-text font-extrabold tracking-tight md:text-[15pt]">
                          Launch Your Campaign
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
              <div className="flex-1 bg-linear-to-l from-transparent via-neutral-700 to-neutral-600 p-[0.5px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
