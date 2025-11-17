// "use client";
// import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
// import { useRouter } from "next/navigation";
// import { AddedInfluencersStore } from "@/src/store/Campaign/added-influencers.store";
// import InfluencerCard from "@/src/app/component/Ready-made/influencer-card";
// import CustomButton from "@/src/app/component/button";
// import ApprovedInfluencersHook from "@/src/routes/Admin/Hooks/updateinfluencerstatus-hook";
// import Spinner from "@/src/app/component/custom-component/spinner";
// import {
//   ReadyMadeInfluencerResponse,
//   ReadyMadeInfluencersApiResponse,
// } from "@/src/types/readymadeinfluencers-type";

// export default function ReadyMadeInfluencersPage() {
//   const router = useRouter();
//   const { clearTemplate, getField, setResults, results } =
//     useReadyMadeTemplateStore();
//   const data = results as ReadyMadeInfluencersApiResponse;
//   const { mutateAsync: approvedInfluencers, isPending: isApprovedLoading } =
//     ApprovedInfluencersHook();
//   const { addInfluencers, getInfluencers, clearAddedInfluencers } =
//     AddedInfluencersStore();

//   const influencers = getInfluencers();
//   // console.log("campaign_id", results?.campaign?.campaign_id);
//   const handleApprovedInfluencers = async () => {
//     if (!influencers.length) return;
//     if (influencers.length) {
//       await approvedInfluencers({
//         campaign_id: getField("campaign_id"),
//         influencers: influencers.map((influencer) => ({
//           influencer_id: influencer._id,
//           platform: influencer.platform,
//         })),
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f]">
//       <div className="relative border-b border-slate-200 bg-white/80 backdrop-blur">
//         <div className="pointer-events-none absolute inset-0 overflow-hidden">
//           <div className="hidden sm:block absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
//           <div className="hidden sm:block absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
//         </div>
//         <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
//           <div className="text-center">
//             <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
//               AI Recommended Influencers
//             </h1>
//             <p className="mt-2 text-slate-600 max-w-2xl mx-auto px-2">
//               Curated results based on your selected platform, category, and
//               follower range.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
//         {data?.influencers?.length ? (
//           <div className="space-y-8">
//             <section className="bg-gradient-to-r from-[#0c0c22]  via-[#3c69bb] to-[#1a1a3f] rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
//               <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold text-white">
//                     AI Recommended Influencers
//                   </h2>
//                   <div className="mt-1 flex flex-wrap gap-2 text-[11px] sm:text-xs">
//                     {data?.notes && (
//                       <>
//                         <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
//                           Requested Influencers: {data?.notes?.requested}
//                         </span>
//                         <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
//                           Returned Influencers: {data?.notes?.returned}
//                         </span>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
//                 {data?.influencers?.map(
//                   (influencer: ReadyMadeInfluencerResponse, i: number) => (
//                     <InfluencerCard
//                       key={`${influencer?.influencer_username}-${i}`}
//                       influencer={influencer}
//                       onAccept={() => {
//                         addInfluencers([influencer]);
//                       }}
//                       onReject={() => {
//                         if (!data) return;
//                         const updatedInfluencers = data.influencers.filter(
//                           (influencer: ReadyMadeInfluencerResponse) =>
//                             influencer._id !== influencer._id
//                         );
//                         setResults({
//                           ...data,
//                           influencers: updatedInfluencers,
//                         });
//                       }}
//                     />
//                   )
//                 )}
//               </div>
//             </section>
//           </div>
//         ) : (
//           <div className="text-center text-slate-600 border border-dashed border-slate-300 rounded-xl p-10">
//             No influencers found yet. Launch a search from the previous page.
//           </div>
//         )}
//       </div>
//       <div className="flex justify-center mt-4 px-4 sm:px-0 gap-3">
//         <CustomButton
//           className=" sm:w-auto bg-secondaryButton hover:bg-secondaryHover text-white"
//           onClick={() => {
//             router.push("/ready-made");
//             clearTemplate();
//             clearAddedInfluencers();
//           }}
//         >
//           New Campaign
//         </CustomButton>
//         <CustomButton
//           className=" sm:w-auto bg-primaryButton hover:bg-primaryHover text-white"
//           disabled={isApprovedLoading}
//           loading={isApprovedLoading}
//           onClick={async () => {
//             await handleApprovedInfluencers();
//           }}
//         >
//           {isApprovedLoading ? (
//             <Spinner size="sm" />
//           ) : (
//             "Add Approved Influencers"
//           )}
//         </CustomButton>
//       </div>
//     </div>
//   );
// }
