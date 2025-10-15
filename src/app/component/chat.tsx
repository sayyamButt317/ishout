// "use client";
// import React, { useState } from "react";
// import { Input } from "@/src/components/ui/input";
// import { Button } from "@/src/components/ui/button";
// import Image from "next/image";
// import FindInfluencerResponsehook from "../../src/hooks/AIResponse.hook";
// import { IMessage, influencersType } from "../../src/types/influencers-type";
// import ChatStore from "../../src/store/chat.store";

// export default function ChatComponent() {
//   const { isThinking, setIsThinking, setChatHistory, chatHistory } = ChatStore();
//   const [message, setMessage] = useState<string>("");
//   const {
//     mutate: findInfluencer,
//     data,
//     isPending,
//   } = FindInfluencerResponsehook();

//   const handlechatmessage = () => {
//     if (!message.trim()) return;
//     setChatHistory([
//       ...chatHistory,
//       { role: "user", content: message } as IMessage,
//     ]);

//     setMessage("");
//     setIsThinking(true);
//     findInfluencer(
//       { query: message },
//       {
//         onSuccess: (data) => {
//           setChatHistory([...chatHistory, data]);
//           setIsThinking(false);
//         },
//         onError: (error) => {
//           setIsThinking(false);
//           console.error("Error:", error);
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col w-full max-w-4xl mx-auto overflow-y-auto">
//       {data?.data && (
//         <>
//           {/* Chat Mode Response */}
//           {data.data.mode === "chat" && (
//             <div className="mb-4 flex justify-start">
//               <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
//                 AI
//               </div>
//               <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 text-slate-900 shadow-sm">
//                 {data.data.data}
//               </div>
//             </div>
//           )}

//           {/* Influencer Mode Response */}
//           {data.data.mode !== "chat" &&
//             data.data.map((platformData: IMessage, index: number) => (
//               <div key={index} className="mb-4">
//                 <div className="mb-4 flex justify-start">
//                   <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
//                     AI
//                   </div>
//                   <div className="rounded-lg px-3 py-2 leading-relaxed shadow-sm bg-gray-100 text-slate-900 w-full">
//                     <div className="mb-3">
//                       <h3 className="font-semibold text-lg capitalize">
//                         {platformData?.platform ?? "No platform available"}{" "}
//                         Influencers
//                       </h3>
//                     </div>
//                     <div className="grid gap-4 sm:grid-cols-2">
//                       {platformData?.influencers?.map(
//                         (inf: influencersType, idx: number) => (
//                           <div
//                             key={idx}
//                             className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
//                           >
//                             <div className="flex items-center gap-3">
//                               <Image
//                                 src={inf?.pic || "/assets/avatar.png"}
//                                 alt={inf?.username ?? "Instagram profile"}
//                                 className="w-12 h-12 rounded-full border object-cover"
//                                 width={48}
//                                 height={48}
//                               />
//                               <div>
//                                 <p className="font-semibold">
//                                   {inf?.name ?? "No name available"}
//                                 </p>
//                                 <a
//                                   href={`https://www.instagram.com/${
//                                     inf?.username ?? ""
//                                   }`}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="line-clamp-1 text-sm text-slate-500 font-semibold capitalize underline underline-offset-2 cursor-pointer hover:text-blue-600 transition-colors"
//                                 >
//                                   @{inf?.username ?? "No username available"}
//                                 </a>
//                               </div>
//                             </div>
//                             <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
//                               Bio: {inf?.bio ?? "No bio available"}
//                             </p>
//                             <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
//                               {inf?.country ?? "No country available"}
//                             </p>
//                             <div className="text-blue-600 mt-3 flex justify-between text-xs">
//                               <span>
//                                 {inf?.followers?.toLocaleString() ?? 0}{" "}
//                                 followers
//                               </span>
//                               <span className="text-emerald-600">
//                                 Engagement Rate: {inf?.engagementRate ?? 0}
//                               </span>
//                             </div>
//                             <div className="flex flex-row mt-2 text-sm text-slate-600 justify-between">
//                               <Button
//                                 variant="outline"
//                                 className="text-sm text-slate-600 whitespace-pre-line"
//                               >
//                                 Accept
//                               </Button>

//                               <Button
//                                 variant="outline"
//                                 className=" text-sm text-slate-600 whitespace-pre-line"
//                               >
//                                 Reject
//                               </Button>
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                     <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
//                       {platformData?.note ? platformData?.note : ""}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </>
//       )}
//       <div className="flex-1 overflow-y-auto mb-4">
//         {(isThinking || isPending) && (
//           <div className="mb-4 flex justify-start">
//             <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white text-sm font-semibold">
//               AI
//             </div>
//             <div className="max-w-[80%] rounded-lg px-3 py-2 bg-gray-100 text-slate-900 shadow-sm">
//               <div className="inline-flex items-center gap-2">
//                 <span className="inline-flex items-center gap-1">
//                   <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]"></span>
//                   <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]"></span>
//                   <span className="h-1.5 w-1.5 rounded-full bg-slate-400 animate-bounce"></span>
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-row gap-2 ">
//         <Input
//           className="focus-visible:ring-0 focus-visible:ring-offset-0"
//           value={typeof message === "string" ? message : ""}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your Query"
//           onKeyUp={(e) => e.key === "Enter" && handlechatmessage()}
//         />
//         <Button onClick={handlechatmessage} disabled={!message.trim()}>
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// }
