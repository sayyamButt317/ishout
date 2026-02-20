"use client";
import { Button } from "@/components/ui/button";
import CustomButton from "@/src/app/component/button";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import { RefreshCcw, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWhatsAppChatStore } from "@/src/store/Campaign/chat.store";
import DeleteWhatsappChatHook from "@/src/routes/Admin/Hooks/delete-whatsappchat-hook";
import NegotiationStatsHook from "@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook";
import { NegotiationStatsResponse } from "@/src/types/Admin-Type/negotiation.type";

export default function NegotiationPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, refetch, isRefetching } = NegotiationStatsHook(
        currentPage,
        pageSize
    );
    console.log("data", data);

    return (
        <>
            <div className="flex flex-row ">
                <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
                    Influencer Negotiation
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        refetch();
                    }}
                    disabled={isRefetching}
                >
                    <RefreshCcw
                        className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? "animate-spin" : ""
                            }`}
                    />
                </Button>
            </div>
            <p className="italic text-xs text-slate-200 mt-2 mb-2">
                Showing {data?.users?.length} of {data?.total} user sessions
            </p>
            <TableComponent
                header={[
                    "Phone Number",
                    "conversation_mode",
                    "Min Price",
                    "Max Price",
                    "last_offered_price",
                    "intent",
                    "next_action",
                    "Human Takeover",
                    "conversation_mode",
                    "manual_negotiation",
                    "agent_paused"
                ]}
                subheader={data?.negotiation_controls
                    ?.map(
                        (userSession: NegotiationStatsResponse) => [
                            <div key={`user-name-${userSession.thread_id}`} className="truncate">
                                {userSession?.thread_id}
                            </div>,
                            <div
                                key={`user-acknowledgement-${userSession._id}`}
                                className="truncate"
                            >
                                {userSession?.conversation_mode}
                            </div>,
                            <div key={`min-price-${userSession._id}`} className="truncate">
                                {userSession?.min_price}
                            </div>,
                            <div key={`max-price-${userSession._id}`} className="truncate">
                                {userSession?.max_price}
                            </div>,
                            <div key={`last-offered-price-${userSession._id}`} className="truncate">
                                {userSession?.last_offered_price}
                            </div>,
                            <div key={`intent-${userSession._id}`} className="truncate">
                                {userSession?.intent}
                            </div>,
                            // <div key={`next-action-${userSession._id}`} className="truncate">
                            //     {userSession?.analysis?.next_action}
                            // </div>,
                            <div key={`manual-negotiation-${userSession._id}`} className="truncate">
                                {userSession?.manual_negotiation}
                            </div>,
                            <div key={`agent-paused-${userSession._id}`} className="truncate">
                                {userSession?.agent_paused}
                            </div>,
                            <div key={`conversation-mode-${userSession._id}`} className="truncate">
                                {userSession?.conversation_mode}
                            </div>,
                            // <CustomButton
                            //     key={`action-${userSession._id}`}
                            //     onClick={() => {
                            //         router.push(`/Admin/whatsapp-chat/${userSession.thread_id}`);
                            //     }}
                            //     className="relative bg-primaryButton hover:bg-primaryHover text-white"
                            // >
                            //     View Chat
                            //     {unreadMap?.[userSession.thread_id] > 0 && (
                            //         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            //             {unreadMap[userSession.thread_id]}
                            //         </span>
                            //     )}
                            // </CustomButton>,
                            // <div key={`delete-${userSession._id}`} className="truncate">
                            //     <Trash className="w-4 h-4 text-red-300 cursor-pointer"
                            //         onClick={() => {
                            //             deleteWhatsappChatHook.mutate(userSession.thread_id);
                            //         }}
                            //     />
                            // </div>
                        ]
                    )}
                paginationstart={data?.page ?? 1}
                paginationend={data?.total_pages ?? 1}
                onPageChange={(page: number) => {
                    setCurrentPage(page);
                }}
                isLoading={isLoading}
            />
        </>
    );
}
