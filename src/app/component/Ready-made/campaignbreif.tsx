// import React from "react";
// import { Textarea } from "@/components/ui/textarea";
// import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";


// export default function CampaignBreif() {
//   const { description, setField } = useReadyMadeTemplateStore();

//   const AddBrief = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setField("description", e.target.value);
//   };
//   return (
//     <div className="space-y-4">
//       <Textarea
//         value={description}
//         onChange={AddBrief}
//         placeholder="Describe your campaign goals, target audience, key messages, and any specific requirements..."
//         className="min-h-48 w-full resize-none border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
//         required
//       />
//       <div className="flex justify-between items-center text-sm text-slate-500">
//         <span>
//           Be specific about your goals and target audience for better results
//         </span>
//         <span>{description.length}/500</span>
//       </div>
      
//       {/* <div className="justify-items-end">
//         <button 
//         className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-md transition-all font-semibold">
//           Add Brief
//         </button>
//       </div> */}
      
//     </div>
//   );
// }
