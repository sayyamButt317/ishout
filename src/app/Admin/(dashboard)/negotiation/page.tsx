"use client";
import { Button } from "@/components/ui/button";
import TableComponent from "@/src/app/component/CustomTable";
import CustomButton from "@/src/app/component/button";
import { RefreshCcw, Handshake } from "lucide-react";
import PageHeader from "@/src/app/component/PageHeader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NegotiationStatsHook from "@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook";
import { NegotiationStatsResponse } from "@/src/types/Admin-Type/negotiation.type";
import { useWhatsAppChatStore } from "@/src/store/Campaign/chat.store";

export default function NegotiationPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data, isLoading, refetch, isRefetching } = NegotiationStatsHook(
        currentPage,
        pageSize
    );
    const unreadMap = useWhatsAppChatStore((s) => s.unread);
    console.log("data", data);

    return (
        <>
            <PageHeader
                title="Influencer Negotiation"
                description={`Showing ${data?.negotiation_controls?.length ?? 0} of ${data?.total ?? 0} user sessions`}
                icon={<Handshake className="size-5" />}
                actions={
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-white/70 hover:bg-white/10 hover:text-white"
                        onClick={() => refetch()}
                        disabled={isRefetching}
                        aria-label="Refresh list"
                    >
                        <RefreshCcw className={`size-4 ${isRefetching ? "animate-spin" : ""}`} />
                    </Button>
                }
            />
            <TableComponent
                header={[
                    "Phone Number",
                    "Name",
                    "User Message",
                    "Conversation Mode",
                    "Min Price",
                    "Max Price",
                    "Last Offered Price",
                    "User Offer",
                    "Intent",
                    "Next Action",
                    "Negotiation Status",
                    "Negotiation Round",
                    "Negotiation Completed",
                    "Manual Negotiation",
                    "Agent Paused",
                    "Final Reply",
                    "View Chat"
                ]}
                subheader={data?.negotiation_controls
                    ?.map(
                        (userSession: NegotiationStatsResponse) => {
                            const analysisIntent = userSession?.analysis && 'intent' in userSession.analysis ? userSession.analysis.intent : null;
                            const analysisNextAction = userSession?.analysis && 'next_action' in userSession.analysis ? userSession.analysis.next_action : null;
                            
                            return [
                            <div key={`phone-${userSession.thread_id}`} className="truncate">
                                {userSession?.thread_id || "-"}
                            </div>,
                            <div key={`name-${userSession._id}`} className="truncate">
                                {userSession?.name || "-"}
                            </div>,
                            <div key={`user-message-${userSession._id}`} className="truncate max-w-xs" title={userSession?.user_message || ""}>
                                {userSession?.user_message || "-"}
                            </div>,
                            <div key={`conversation-mode-${userSession._id}`} className="truncate">
                                {userSession?.conversation_mode || "-"}
                            </div>,
                            <div key={`min-price-${userSession._id}`} className="truncate">
                                {userSession?.min_price !== null && userSession?.min_price !== undefined 
                                    ? `$${userSession.min_price}` 
                                    : "-"}
                            </div>,
                            <div key={`max-price-${userSession._id}`} className="truncate">
                                {userSession?.max_price !== null && userSession?.max_price !== undefined 
                                    ? `$${userSession.max_price}` 
                                    : "-"}
                            </div>,
                            <div key={`last-offered-price-${userSession._id}`} className="truncate">
                                {userSession?.last_offered_price !== null && userSession?.last_offered_price !== undefined 
                                    ? `$${userSession.last_offered_price}` 
                                    : "-"}
                            </div>,
                            <div key={`user-offer-${userSession._id}`} className="truncate">
                                {userSession?.user_offer !== null && userSession?.user_offer !== undefined 
                                    ? `$${userSession.user_offer}` 
                                    : "-"}
                            </div>,
                            <div key={`intent-${userSession._id}`} className="truncate">
                                {userSession?.intent || analysisIntent || "-"}
                            </div>,
                            <div key={`next-action-${userSession._id}`} className="truncate" title={userSession?.next_action || analysisNextAction || ""}>
                                {userSession?.next_action || analysisNextAction || "-"}
                            </div>,
                            <div key={`negotiation-status-${userSession._id}`} className="truncate">
                                {userSession?.negotiation_status || "-"}
                            </div>,
                            <div key={`negotiation-round-${userSession._id}`} className="truncate">
                                {userSession?.negotiation_round !== null && userSession?.negotiation_round !== undefined 
                                    ? userSession.negotiation_round 
                                    : "-"}
                            </div>,
                            <div key={`negotiation-completed-${userSession._id}`} className="truncate">
                                {userSession?.negotiation_completed !== null && userSession?.negotiation_completed !== undefined 
                                    ? userSession.negotiation_completed ? "Yes" : "No" 
                                    : "-"}
                            </div>,
                            <div key={`manual-negotiation-${userSession._id}`} className="truncate">
                                {userSession?.manual_negotiation !== null && userSession?.manual_negotiation !== undefined 
                                    ? userSession.manual_negotiation ? "Yes" : "No" 
                                    : "-"}
                            </div>,
                            <div key={`agent-paused-${userSession._id}`} className="truncate">
                                {userSession?.agent_paused !== null && userSession?.agent_paused !== undefined 
                                    ? userSession.agent_paused ? "Yes" : "No" 
                                    : "-"}
                            </div>,
                            <div key={`final-reply-${userSession._id}`} className="truncate max-w-xs" title={userSession?.final_reply || ""}>
                                {userSession?.final_reply || "-"}
                            </div>,
                            <CustomButton
                                key={`view-chat-${userSession._id}`}
                                onClick={() => {
                                    router.push(`/Admin/negotiation-chat/${userSession._id}`);
                                }}
                                className="relative bg-primaryButton hover:bg-primaryHover text-white"
                            >
                                View Chat
                                {unreadMap?.[userSession.thread_id] > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {unreadMap[userSession.thread_id]}
                                    </span>
                                )}
                            </CustomButton>
                        ];
                        }
                    )}
                paginationstart={currentPage}
                paginationend={data?.total_pages ?? 1}
                onPageChange={(page: number) => {
                    setCurrentPage(page);
                }}
                isLoading={isLoading}
            />
        </>
    );
}
