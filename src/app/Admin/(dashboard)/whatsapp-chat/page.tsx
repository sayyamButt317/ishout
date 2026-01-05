"use client";
import { Button } from "@/components/ui/button";
import CustomButton from "@/src/app/component/button";
import StatusBadge from "@/src/app/component/custom-component/statusbadge";
import TableComponent from "@/src/app/component/CustomTable";
import WhatsappUserSessionHook from "@/src/routes/Admin/Hooks/usersession-hook";
import { WhatsAppUserSessionResponse } from "@/src/types/Admin-Type/whatsapp-type";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WhatsAppChat() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, refetch, isRefetching } = WhatsappUserSessionHook(
    currentPage,
    pageSize
  );

  return (
    <>
      <div className="flex flex-row ">
        <h1 className="italic text-2xl md:text-4xl font-semibold text-white tracking-tight">
          WhatsApp User Sessions
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
            className={`mt-5 w-4 h-4 text-primary-text cursor-pointer ${
              isRefetching ? "animate-spin" : ""
            }`}
          />
        </Button>
      </div>
      <p className="italic text-xs text-slate-200 mt-2 mb-2">
        Showing {data?.users?.length} of {data?.total} user sessions
      </p>
      <TableComponent
        header={[
          "User Name",
          "Phone Number",
          "Acknowledged",
          "Conversation Round",
          "Last Message",
          "Last Active",
          "Campaign Created",
          "Status",
          "Action",
        ]}
        subheader={data?.users?.map(
          (userSession: WhatsAppUserSessionResponse) => [
            <div key={`user-name-${userSession._id}`} className="truncate">
              {userSession?.name}
            </div>,
            <div key={`phone-number-${userSession._id}`} className="truncate">
              {userSession?.thread_id}
            </div>,
            <div
              key={`user-acknowledgement-${userSession._id}`}
              className="truncate"
            >
              {userSession?.acknowledged ? "Yes" : "No"}
            </div>,
            <div key={`user-session-${userSession._id}`} className="truncate">
              {userSession?.conversation_round}
            </div>,
            <div key={`last-message-${userSession._id}`} className="truncate">
              {userSession?.last_message
                ?.toLocaleString()
                .split(" ")[0]
                .slice(0, 5)}
            </div>,
            <div key={`last-active-${userSession._id}`} className="truncate">
              {userSession?.last_active}
            </div>,
            <div
              key={`campaign-created-${userSession._id}`}
              className="truncate"
            >
              {userSession?.campaign_created ? "Yes" : "No"}
            </div>,
            <div key={`status-${userSession._id}`} className="truncate">
              <StatusBadge status={userSession?.status ?? "Pending"} />
            </div>,
            <CustomButton
              key={`action-${userSession._id}`}
              onClick={() => {
                router.push(`/Admin/whatsapp-chat/${userSession.thread_id}`);
              }}
              className="bg-primaryButton hover:bg-primaryHover text-white"
              disabled={false}
              loading={false}
            >
              View Chat
            </CustomButton>,
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
