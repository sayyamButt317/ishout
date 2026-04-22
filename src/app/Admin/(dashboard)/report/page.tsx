import { ComingSoon } from "@/src/app/component/comingsoon";

export default function ContentReportGeneration() {
  return (
    <div>ContentReportGeneration

      <div className='flex flex-row item-center justify-center '>
      <ComingSoon
          enabled={true}
          title="Report Generation"
          message="AI-powered report generation is on its way. This feature will be available shortly."
          badge="Coming Soon"
        >
    
        </ComingSoon>
        </div>
        </div>
  )
}