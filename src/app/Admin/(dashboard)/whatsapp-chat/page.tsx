'use client';
import { Button } from '@/components/ui/button';
import CustomButton from '@/src/app/component/button';
import StatusBadge from '@/src/app/component/custom-component/statusbadge';
import TableComponent from '@/src/app/component/CustomTable';
import WhatsappUserSessionHook from '@/src/routes/Admin/Hooks/users/usersession-hook';
import { WhatsAppUserSessionResponse } from '@/src/types/Admin-Type/whatsapp-type';
import { RefreshCcw, Trash } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import PageHeader from '@/src/app/component/PageHeader';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWhatsAppChatStore } from '@/src/store/Campaign/chat.store';
import DeleteWhatsappChatHook from '@/src/routes/Admin/Hooks/Whatsapp/delete-whatsappchat-hook';

export default function WhatsAppChat() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, refetch, isRefetching } = WhatsappUserSessionHook(
    currentPage,
    pageSize,
  );
  const deleteWhatsappChatHook = DeleteWhatsappChatHook();
  const unreadMap = useWhatsAppChatStore((s) => s.unread);

  return (
    <>
      <PageHeader
        title="WhatsApp User Sessions"
        description={`Showing ${data?.users?.length ?? 0} of ${data?.total ?? 0} user sessions`}
        icon={<SiWhatsapp className="size-5" />}
        actions={
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => refetch()}
            disabled={isRefetching}
            aria-label="Refresh list"
          >
            <RefreshCcw className={`size-4 ${isRefetching ? 'animate-spin' : ''}`} />
          </Button>
        }
      />
      <TableComponent
        header={[
          'User Name',
          'Phone Number',
          'Acknowledged',
          'Last Message',
          'Campaign Created',
          'Mode',
          'Human Takeover',
          'Delete',
          'Conversation',
        ]}
        subheader={data?.users?.map((userSession: WhatsAppUserSessionResponse) => [
          <div key={`user-name-${userSession._id}`} className="truncate">
            {userSession?.name}
          </div>,
          <div key={`phone-number-${userSession._id}`} className="truncate">
            {userSession?.thread_id}
          </div>,
          <div key={`user-acknowledgement-${userSession._id}`} className="truncate">
            {userSession?.acknowledged ? 'Yes' : 'No'}
          </div>,
          <div key={`last-message-${userSession._id}`} className="truncate">
            {userSession?.last_message?.toLocaleString().split(' ')[0].slice(0, 5)}
          </div>,

          <div key={`campaign-created-${userSession._id}`} className="truncate">
            {userSession?.campaign_created ? 'Yes' : 'No'}
          </div>,
          <div key={`agent-control-info-${userSession._id}`} className="truncate">
            <StatusBadge
              status={userSession?.agent_paused === false ? 'Agent' : 'Human'}
            />
          </div>,
          <div key={`human-takeover-info-${userSession._id}`} className="truncate">
            <StatusBadge
              status={userSession?.human_takeover === true ? 'Enabled' : 'Disabled'}
            />
          </div>,
          <div key={`delete-${userSession._id}`} className="truncate">
            <Trash
              className="size-5 text-red-300 cursor-pointer"
              onClick={() => {
                deleteWhatsappChatHook.mutate(userSession.thread_id);
              }}
            />
          </div>,
          // <div key={`status-${userSession._id}`} className="truncate">
          //   <StatusBadge status={userSession?.status ?? "Pending"} />
          // </div>,
          <CustomButton
            key={`action-${userSession._id}`}
            onClick={() => {
              router.push(`/Admin/whatsapp-chat/${userSession.thread_id}`);
            }}
            className="relative bg-primaryButton hover:bg-primaryHover text-white"
          >
            View Chat
            {unreadMap?.[userSession.thread_id] > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {unreadMap[userSession.thread_id]}
              </span>
            )}
          </CustomButton>,
        ])}
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
