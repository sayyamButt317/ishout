import Image from "next/image";
export default function HowItWorks({ id }: { id: string }) {
  return (
    <>
      <h1
        id={id}
        className="italic text-3xl sm:text-4xl md:text-5xl text-center font-extrabold "
      >
        How It Works
      </h1>

      <p className="italic text-xs font-thin sm:text-sm text-center justify-center items-center text-Secondary-text font-sans mt-4">
        {" "}
        Smarter Campaigns, Powered by AI
      </p>
      <div className="flex flex-col gap-2 justify-center items-center w-full px-4 sm:px-6 md:px-0">
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:w-1/2">
          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/3">
            <h1 className="italic text-left text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Briefing
            </h1>
            <p className="italic text-xs sm:text-sm text-left font-thin text-Secondary-text font-sans">
              Define your campaign goals, audience and deliverables in minutes.
            </p>
          </div>

          <Image
            src="https://ik.imagekit.io/dtdxnyskk/briefing.svg"
            alt="briefing"
            unoptimized={true}
            width={500}
            height={500}
            priority
            className="object-contain rounded-2xl w-full md:w-auto max-w-[300px] md:max-w-none"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:w-1/2">
          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/3">
            <h1 className="italic text-left text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              AI Matching
            </h1>
            <p className="italic text-xs sm:text-sm text-left font-thin text-Secondary-text font-sans">
              Our algorithm identifies the most relevant influencers for your
              brand - instantly.
            </p>
          </div>

          <Image
            src="https://ik.imagekit.io/dtdxnyskk/matching.svg"
            alt="matching"
            unoptimized={true}
            width={500}
            height={500}
            priority
            className="object-contain rounded-2xl w-full md:w-auto max-w-[300px] md:max-w-none"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:w-1/2">
          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/3">
            <h1 className="italic text-left text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Approval
            </h1>
            <p className="italic text-xs sm:text-sm text-left font-thin text-Secondary-text font-sans">
              Review and confirm partnerships in one steamlined dashboard
            </p>
          </div>

          <Image
            src="https://ik.imagekit.io/dtdxnyskk/approval.svg"
            alt="approval"
            width={500}
            height={500}
            priority
            className="object-contain rounded-2xl w-full md:w-auto max-w-[300px] md:max-w-none"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:w-1/2">
          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/3">
            <h1 className="italic text-left text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Campaign Launch
            </h1>
            <p className="italic text-xs sm:text-sm text-left font-thin text-Secondary-text font-sans">
              Manage workflows,track deliverables, and monitor performance in
              real time
            </p>
          </div>

          <Image
            src="https://ik.imagekit.io/dtdxnyskk/campaign-launch.svg"
            alt="campaign-launch"
            unoptimized={true}
            width={500}
            height={500}
            priority
            className="object-contain rounded-2xl w-full md:w-auto max-w-[300px] md:max-w-none"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center w-full md:w-1/2">
          <div className="flex flex-col gap-2 justify-start items-start w-full md:w-1/3">
            <h1 className="italic text-left text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Reporting
            </h1>
            <p className="italic text-xs sm:text-sm text-left font-thin text-Secondary-text font-sans">
              Comprehensive analytics and insights to measure what matters
            </p>
          </div>

          <Image
            src="https://ik.imagekit.io/dtdxnyskk/reporting.svg"
            alt="reporting"
            unoptimized={true}
            width={500}
            height={500}
            priority
            className="object-contain rounded-2xl w-full md:w-auto max-w-[300px] md:max-w-none"
          />
        </div>
      </div>
    </>
  );
}
