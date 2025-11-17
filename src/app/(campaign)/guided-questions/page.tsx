// "use client";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useGuidedQuestionStore } from "@/src/store/Campaign/guidedQuestion-store";
// import { IndustryComponent } from "@/src/app/component/guided-questions/industry";
// import { MarketComponent } from "@/src/app/component/guided-questions/market";
// import { MainGoalComponent } from "@/src/app/component/guided-questions/goal";
// import { PlatformComponent } from "@/src/app/component/guided-questions/platform";
// import { CampaignDateComponent } from "@/src/app/component/guided-questions/campaigndate";
// import { BudgetComponent } from "@/src/app/component/guided-questions/budget";
// import { NumberofInfluencerComponent } from "@/src/app/component/guided-questions/numberofInfluencer";
// import { InfluencersFollowersComponent } from "@/src/app/component/guided-questions/influencersfollowers";
// import { RequirmentsComponent } from "@/src/app/component/guided-questions/requirments";
// import { NationalitiesComponent } from "@/src/app/component/guided-questions/nationalities";
// import { ContentTypeComponent } from "@/src/app/component/guided-questions/contenttype";
// import { PiecesOfContentComponent } from "@/src/app/component/guided-questions/piecesofContent";
// import { CampaignMessageComponent } from "@/src/app/component/guided-questions/campaignmessage";
// import { CompetitorComponent } from "@/src/app/component/guided-questions/competitor";
// import { UsageRightsComponent } from "@/src/app/component/guided-questions/usagerights";
// import QuestionGuidedhook from "@/src/hooks/questuionguided.hook";
// // import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";

// export default function GuidedQuestionsPage() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const totalSteps = 15;
//   const guidedQuestion = useGuidedQuestionStore((s) => s.guidedQuestion);
//   const setMultipleFields = useGuidedQuestionStore((s) => s.setMultipleFields);
//   // const {clearGuidedQuestion} = useReadyMadeTemplateStore();
//   const { mutateAsync: questionGuided } = QuestionGuidedhook();

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await questionGuided(guidedQuestion);
//     console.log("Campaign Data:", guidedQuestion);
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <MainGoalComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );
//       case 2:
//         return (
//           <IndustryComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );
//       case 3:
//         return (
//           <MarketComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 4:
//         return (
//           <PlatformComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 5:
//         return (
//           <CampaignDateComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 6:
//         return (
//           <BudgetComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 7:
//         return (
//           <NumberofInfluencerComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 8:
//         return (
//           <InfluencersFollowersComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );
//       case 9:
//         return (
//           <RequirmentsComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 10:
//         return (
//           <NationalitiesComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );
//       case 11:
//         return (
//           <ContentTypeComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 12:
//         return (
//           <PiecesOfContentComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 13:
//         return (
//           <CampaignMessageComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 14:
//         return (
//           <CompetitorComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );

//       case 15:
//         return (
//           <UsageRightsComponent
//             guidedQuestion={guidedQuestion}
//             setMultipleFields={setMultipleFields}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-2xl mx-auto px-6">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>
//               Step {currentStep} of {totalSteps}
//             </span>
//             <span>
//               {Math.round((currentStep / totalSteps) * 100)}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-blue-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${(currentStep / totalSteps) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-lg shadow-sm border p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {renderStep()}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-6">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={prevStep}
//                 disabled={currentStep === 1}
//               >
//                 Previous
//               </Button>

//               {currentStep < totalSteps ? (
//                 <Button
//                   className="cursor-pointer"
//                   type="button"
//                   onClick={nextStep}
//                 >
//                   Next
//                 </Button>
//               ) : (
//                 <Button type="submit" className="cursor-pointer">
//                   Launch Campaign
//                 </Button>
//               )}
//             </div>
//             <Button variant="outline" className="cursor-pointer">
//               New Campaign
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
