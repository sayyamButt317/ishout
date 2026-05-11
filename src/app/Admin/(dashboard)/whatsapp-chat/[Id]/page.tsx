'use client';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import useNegotiationMessagesHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiationmessages-hook';
import { MessageBubble } from '@/src/app/component/custom-component/messgaeBubble';
import { AdminTakeoverToggle } from '@/src/app/component/custom-component/admintoggle';
import { ChatInput } from '@/src/app/component/custom-component/inputbar';
import Spinner from '@/src/app/component/custom-component/spinner';

import HumanTakeoverHook from '@/src/routes/Admin/Hooks/Whatsapp/humantakeover-hook';
import ToogleStatusHook from '@/src/routes/Admin/Hooks/Whatsapp/tooglestatus-hook';
import NegotiationHumanTakeoverHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-humantakeover-hook';
import NegotiationTakeoverValueHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-takeover-value-hook';
import NegotiationSendHumanMessageHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-sendhumanmessage-hook';
import { ChatMessage, useWhatsAppChatStore } from '@/src/store/Campaign/chat.store';
import { RefreshCcw } from 'lucide-react';
import { useNotificationSound } from '@/src/helper/notificationSound';
import SendWhatsappMessageHook from '@/src/routes/Admin/Hooks/Whatsapp/sendwhatsappmessage-hook';
import useWhatsAppMessagesHook from '@/src/routes/Admin/Hooks/Whatsapp/whatsappmessages-hook';

type NegotiationHistoryItem = {
  sender_type?: string;
  message?: string;
};

function mapNegotiationSender(senderType?: string): ChatMessage['sender'] {
  // In negotiation UI, everything except USER should appear on the right
  // using the white bubble style.
  return senderType === 'USER' ? 'USER' : 'AI';
}

function isTakeoverActive(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;
  return d.mode === 'HUMAN_TAKEOVER' || d.human_takeover === true || d.enabled === true;
}

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isNegotiation = pathname?.includes('/negotiation-chat');
  const negotiationId = searchParams.get('negotiation_id') ?? Id ?? '';

  const negotiationQuery = useNegotiationMessagesHook(negotiationId);
  const whatsappQuery = useWhatsAppMessagesHook(Id ?? '', 1, 100);
  const data = isNegotiation ? negotiationQuery.data : whatsappQuery.data;
  const isPending = isNegotiation ? negotiationQuery.isPending : whatsappQuery.isPending;
  const isRefetching = isNegotiation
    ? negotiationQuery.isRefetching
    : whatsappQuery.isRefetching;
  const refetch = isNegotiation ? negotiationQuery.refetch : whatsappQuery.refetch;

  const messages = useWhatsAppChatStore((s) => s.chats[Id ?? '']);
  const memoizedMessages = useMemo(() => messages ?? [], [messages]);
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const setMessages = useWhatsAppChatStore((s) => s.setMessages);
  const { playMessageSentSound } = useNotificationSound();

  const sendMessage = isNegotiation ? null : SendWhatsappMessageHook(Id ?? '');
  const negotiationSendMessage = NegotiationSendHumanMessageHook(Id ?? '', negotiationId);
  const humantakeover = HumanTakeoverHook(Id ?? '');
  const toogleStatus = ToogleStatusHook(Id ?? '', !isNegotiation);
  const negotiationHumanTakeover = NegotiationHumanTakeoverHook(Id ?? '');
  const negotiationTakeoverValue = NegotiationTakeoverValueHook(Id ?? '', isNegotiation);

  const [adminTakeover, setAdminTakeover] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [memoizedMessages.length]);

  useEffect(() => {
    const takeoverData = isNegotiation
      ? negotiationTakeoverValue.data
      : toogleStatus.data;
    if (takeoverData === undefined || takeoverData === null) return;
    setAdminTakeover(isTakeoverActive(takeoverData));
  }, [isNegotiation, toogleStatus.data, negotiationTakeoverValue.data]);

  useEffect(() => {
    if (!Id) return;
    if (isNegotiation && data) {
      const history = (data.history as NegotiationHistoryItem[]) || [];
      const mapped: ChatMessage[] = history.map((msg, index) => {
        const sender = mapNegotiationSender(msg.sender_type);
        return {
          _id: `${Id}-${index}`,
          thread_id: Id!,
          sender,
          message: msg.message ?? '',
          timestamp: new Date().toISOString(),
          username: sender === 'USER' ? data.name : undefined,
        };
      });
      setMessages(Id!, mapped);
    } else {
      setMessages(Id, data?.messages ?? []);
    }
  }, [Id, data, setMessages, isNegotiation]);

  const handleAdminToggle = useCallback(
    (enabled: boolean) => {
      setAdminTakeover(enabled);
      if (isNegotiation) {
        negotiationHumanTakeover.mutate(enabled, {
          onError: () => setAdminTakeover((prev) => !prev),
          onSuccess: () => negotiationTakeoverValue.refetch(),
        });
        return;
      }
      humantakeover.mutate(enabled, {
        onError: () => setAdminTakeover((prev) => !prev),
        onSuccess: () => toogleStatus.refetch(),
      });
    },
    [
      humantakeover,
      toogleStatus,
      isNegotiation,
      negotiationHumanTakeover,
      negotiationTakeoverValue,
    ],
  );

  // Send message handler
  const handleSend = useCallback(
    (msg: string) => {
      if (!msg.trim() || !adminTakeover) return;
      const newMessage: ChatMessage = {
        _id: crypto.randomUUID(),
        thread_id: Id!,
        sender: isNegotiation ? 'AI' : 'ADMIN',
        message: msg,
        timestamp: new Date().toISOString(),
      };
      addMessage(Id!, newMessage);
      playMessageSentSound();
      if (isNegotiation) {
        negotiationSendMessage.mutate(msg);
        return;
      }
      if (!sendMessage) return;
      sendMessage.mutate(msg);
    },
    [
      adminTakeover,
      playMessageSentSound,
      Id,
      addMessage,
      sendMessage,
      isNegotiation,
      negotiationSendMessage,
    ],
  );

  const name = isNegotiation
    ? (data?.name ?? '')
    : (memoizedMessages.find((msg) => msg.sender === 'USER')?.username ?? '');

  return (
    <div className="flex flex-col h-[90vh] rounded-xl overflow-hidden bg-[#0b141a] border border-white/10">
      <div className="flex items-center justify-between px-4 py-3 bg-[#202c33]">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-semibold">
              {name
                ?.split(' ')
                .map((n: string) => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>

            <div className="flex flex-col">
              <p className="text-white font-semibold leading-none">
                {name || (isNegotiation ? 'Negotiation User' : 'Whatsapp User')}
              </p>
              <p className="text-xs text-gray-400">
                {adminTakeover ? 'Human takeover active' : 'AI agent active'}
              </p>
            </div>

            {/* Refresh */}
            <RefreshCcw
              className={`ml-2 w-4 h-4 text-primary-text cursor-pointer ${isRefetching ? 'animate-spin' : ''
                }`}
              onClick={() =>
                refetch().then(() => {
                  if (isNegotiation && data) {
                    const history = (data.history as NegotiationHistoryItem[]) || [];
                    const mapped: ChatMessage[] = history.map((msg, index) => {
                      const sender = mapNegotiationSender(msg.sender_type);
                      return {
                        _id: `${Id}-${index}`,
                        thread_id: Id!,
                        sender,
                        message: msg.message ?? '',
                        timestamp: new Date().toISOString(),
                        username: sender === 'USER' ? data.name : undefined,
                      };
                    });
                    setMessages(Id!, mapped);
                  } else {
                    const newMessages = data?.messages ?? [];
                    setMessages(Id!, newMessages);
                  }
                })
              }
            />
          </div>
        </div>
        {adminTakeover === null ? (
          <Spinner />
        ) : (
          <AdminTakeoverToggle
            enabled={adminTakeover}
            onChange={handleAdminToggle}
            disabled={
              isNegotiation
                ? !!(
                  negotiationHumanTakeover.isPending ||
                  negotiationTakeoverValue.isFetching
                )
                : !!(humantakeover.isPending || toogleStatus.isFetching)
            }
          />
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {isPending && memoizedMessages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <Spinner />
          </div>
        ) : (
          memoizedMessages.map((msg) => {
            // Detect PDF links
            const isPdf = msg.message?.toLowerCase().endsWith('.pdf');
            const displaySender = msg.sender === 'ADMIN' ? 'AI' : msg.sender;
            return (
              <MessageBubble
                key={msg._id || `${msg.timestamp}-${msg.sender}`}
                message={msg.message}
                sender={displaySender}
                timestamp={msg.timestamp}
                isPdf={isPdf}
              />
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        enabled={!!adminTakeover && !(humantakeover?.isPending || false)}
        onSend={handleSend}
      />
    </div>
  );
}


// 'use client';
// import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
// import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// import useNegotiationMessagesHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiationmessages-hook';
// import { MessageBubble } from '@/src/app/component/custom-component/messgaeBubble';
// import { AdminTakeoverToggle } from '@/src/app/component/custom-component/admintoggle';
// import { ChatInput } from '@/src/app/component/custom-component/inputbar';
// import Spinner from '@/src/app/component/custom-component/spinner';

// import HumanTakeoverHook from '@/src/routes/Admin/Hooks/Whatsapp/humantakeover-hook';
// import ToogleStatusHook from '@/src/routes/Admin/Hooks/Whatsapp/tooglestatus-hook';
// import NegotiationHumanTakeoverHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-humantakeover-hook';
// import NegotiationTakeoverValueHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-takeover-value-hook';
// import NegotiationSendHumanMessageHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-sendhumanmessage-hook';
// import { ChatMessage, useWhatsAppChatStore } from '@/src/store/Campaign/chat.store';
// import { RefreshCcw } from 'lucide-react';
// import { useNotificationSound } from '@/src/helper/notificationSound';
// import SendWhatsappMessageHook from '@/src/routes/Admin/Hooks/Whatsapp/sendwhatsappmessage-hook';
// import useWhatsAppMessagesHook from '@/src/routes/Admin/Hooks/Whatsapp/whatsappmessages-hook';
// import WhatsappUserSessionHook from '@/src/routes/Admin/Hooks/users/usersession-hook';
// import NegotiationStatsHook from '@/src/routes/Admin/Hooks/Whatsapp/NegotiationStats-hook';

// type NegotiationHistoryItem = {
//   sender_type?: string;
//   message?: string;
// };

// function mapNegotiationSender(senderType?: string): ChatMessage['sender'] {
//   return senderType === 'USER' ? 'USER' : 'AI';
// }

// function isTakeoverActive(data: unknown): boolean {
//   if (!data || typeof data !== 'object') return false;
//   const d = data as Record<string, unknown>;
//   return d.mode === 'HUMAN_TAKEOVER' || d.human_takeover === true || d.enabled === true;
// }

// export default function WhatsAppChatById() {
//   const { Id } = useParams<{ Id: string }>();
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const isNegotiation = pathname?.includes('/negotiation-chat');
//   const negotiationId = searchParams.get('negotiation_id') ?? Id ?? '';

//   const negotiationQuery = useNegotiationMessagesHook(negotiationId);
//   const whatsappQuery = useWhatsAppMessagesHook(Id ?? '', 1, 100);
//   const whatsappSessions = WhatsappUserSessionHook(1, 20);
//   const negotiationSessions = NegotiationStatsHook(1, 20);
//   const data = isNegotiation ? negotiationQuery.data : whatsappQuery.data;
//   const isPending = isNegotiation ? negotiationQuery.isPending : whatsappQuery.isPending;
//   const isRefetching = isNegotiation
//     ? negotiationQuery.isRefetching
//     : whatsappQuery.isRefetching;
//   const refetch = isNegotiation ? negotiationQuery.refetch : whatsappQuery.refetch;

//   const messages = useWhatsAppChatStore((s) => s.chats[Id ?? '']);
//   const memoizedMessages = useMemo(() => messages ?? [], [messages]);
//   const addMessage = useWhatsAppChatStore((s) => s.addMessage);
//   const setMessages = useWhatsAppChatStore((s) => s.setMessages);
//   const { playMessageSentSound } = useNotificationSound();

//   const sendMessage = isNegotiation ? null : SendWhatsappMessageHook(Id ?? '');
//   const negotiationSendMessage = NegotiationSendHumanMessageHook(Id ?? '', negotiationId);
//   const humantakeover = HumanTakeoverHook(Id ?? '');
//   const toogleStatus = ToogleStatusHook(Id ?? '', !isNegotiation);
//   const negotiationHumanTakeover = NegotiationHumanTakeoverHook(Id ?? '');
//   const negotiationTakeoverValue = NegotiationTakeoverValueHook(Id ?? '', isNegotiation);

//   const [adminTakeover, setAdminTakeover] = useState<boolean | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [memoizedMessages.length]);

//   useEffect(() => {
//     const takeoverData = isNegotiation
//       ? negotiationTakeoverValue.data
//       : toogleStatus.data;
//     if (takeoverData === undefined || takeoverData === null) return;
//     setAdminTakeover(isTakeoverActive(takeoverData));
//   }, [isNegotiation, toogleStatus.data, negotiationTakeoverValue.data]);

//   useEffect(() => {
//     if (!Id) return;
//     if (isNegotiation && data) {
//       const history = (data.history as NegotiationHistoryItem[]) || [];
//       const mapped: ChatMessage[] = history.map((msg, index) => {
//         const sender = mapNegotiationSender(msg.sender_type);
//         return {
//           _id: `${Id}-${index}`,
//           thread_id: Id!,
//           sender,
//           message: msg.message ?? '',
//           timestamp: new Date().toISOString(),
//           username: sender === 'USER' ? data.name : undefined,
//         };
//       });
//       setMessages(Id!, mapped);
//     } else {
//       setMessages(Id, data?.messages ?? []);
//     }
//   }, [Id, data, setMessages, isNegotiation]);

//   const handleAdminToggle = useCallback(
//     (enabled: boolean) => {
//       setAdminTakeover(enabled);
//       if (isNegotiation) {
//         negotiationHumanTakeover.mutate(enabled, {
//           onError: () => setAdminTakeover((prev) => !prev),
//           onSuccess: () => negotiationTakeoverValue.refetch(),
//         });
//         return;
//       }
//       humantakeover.mutate(enabled, {
//         onError: () => setAdminTakeover((prev) => !prev),
//         onSuccess: () => toogleStatus.refetch(),
//       });
//     },
//     [
//       humantakeover,
//       toogleStatus,
//       isNegotiation,
//       negotiationHumanTakeover,
//       negotiationTakeoverValue,
//     ],
//   );

//   // Send message handler
//   const handleSend = useCallback(
//     (msg: string) => {
//       if (!msg.trim() || !adminTakeover) return;
//       const newMessage: ChatMessage = {
//         _id: crypto.randomUUID(),
//         thread_id: Id!,
//         sender: isNegotiation ? 'AI' : 'ADMIN',
//         message: msg,
//         timestamp: new Date().toISOString(),
//       };
//       addMessage(Id!, newMessage);
//       playMessageSentSound();
//       if (isNegotiation) {
//         negotiationSendMessage.mutate(msg);
//         return;
//       }
//       if (!sendMessage) return;
//       sendMessage.mutate(msg);
//     },
//     [
//       adminTakeover,
//       playMessageSentSound,
//       Id,
//       addMessage,
//       sendMessage,
//       isNegotiation,
//       negotiationSendMessage,
//     ],
//   );

//   const name = isNegotiation
//     ? (data?.name ?? '')
//     : (memoizedMessages.find((msg) => msg.sender === 'USER')?.username ?? '');

//   const initials = (name || (isNegotiation ? 'Negotiation User' : 'Whatsapp User'))
//     .split(' ')
//     .map((n: string) => n[0])
//     .slice(0, 2)
//     .join('')
//     .toUpperCase();

//   const leftSidebarItems = useMemo(() => {
//     if (isNegotiation) {
//       const items =
//         ((negotiationSessions.data?.negotiation_controls as Array<{
//           _id: string;
//           thread_id: string;
//           name?: string;
//           user_message?: string;
//           intent?: string;
//         }>) ?? []);
//       return items.map((item) => ({
//         id: item.thread_id,
//         name: item.name || 'Negotiation User',
//         subtitle: item.user_message || item.intent || 'Negotiation',
//         active: item.thread_id === Id,
//         onClick: () =>
//           router.push(
//             `/Admin/negotiation-chat/${item.thread_id}?negotiation_id=${item._id}`,
//           ),
//       }));
//     }

//     const items =
//       ((whatsappSessions.data?.users as Array<{
//         thread_id: string;
//         name?: string;
//         last_message?: string;
//       }>) ?? []);
//     return items.map((item) => ({
//       id: item.thread_id,
//       name: item.name || 'WhatsApp User',
//       subtitle: item.last_message || 'No messages yet',
//       active: item.thread_id === Id,
//       onClick: () => router.push(`/Admin/whatsapp-chat/${item.thread_id}`),
//     }));
//   }, [
//     isNegotiation,
//     negotiationSessions.data?.negotiation_controls,
//     whatsappSessions.data?.users,
//     Id,
//     router,
//   ]);

//   const totalMessages = memoizedMessages.length;
//   const userMessageCount = memoizedMessages.filter((m) => m.sender === 'USER').length;
//   const agentMessageCount = memoizedMessages.filter((m) => m.sender !== 'USER').length;

//   return (
//     <div className="h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e0f] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
//       <div className="grid h-full grid-cols-1 lg:grid-cols-[280px_1fr_260px]">
//         <aside className="hidden border-r border-white/10 bg-[#111217] lg:flex lg:flex-col">
//           <div className="border-b border-white/10 px-4 py-4">
//             <h3 className="text-base font-bold text-white">Conversations</h3>
//             <p className="mt-1 text-xs text-white/50">
//               {isNegotiation ? 'Negotiation sessions' : 'WhatsApp sessions'}
//             </p>
//           </div>
//           <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-2">
//             {leftSidebarItems.map((item) => (
//               <button
//                 key={item.id}
//                 type="button"
//                 onClick={item.onClick}
//                 className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
//                   item.active
//                     ? 'border border-violet-400/30 bg-violet-500/15'
//                     : 'border border-transparent hover:bg-white/5'
//                 }`}
//               >
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
//                   {item.name
//                     .split(' ')
//                     .map((n) => n[0])
//                     .slice(0, 2)
//                     .join('')
//                     .toUpperCase()}
//                 </div>
//                 <div className="min-w-0">
//                   <p className="truncate text-sm font-semibold text-white">{item.name}</p>
//                   <p className="truncate text-xs text-white/55">{item.subtitle}</p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </aside>

//         <section className="flex h-full flex-col">
//           <div className="flex items-center justify-between border-b border-white/10 bg-[#131316] px-5 py-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/25 bg-violet-500/20 text-sm font-bold text-violet-100">
//                 {initials}
//               </div>

//               <div className="flex flex-col">
//                 <p className="leading-none font-semibold text-white">
//                   {name || (isNegotiation ? 'Negotiation User' : 'Whatsapp User')}
//                 </p>
//                 <div className="mt-1 flex items-center gap-2">
//                   <span
//                     className={`h-2 w-2 rounded-full ${
//                       adminTakeover ? 'bg-emerald-400' : 'bg-cyan-400'
//                     }`}
//                   />
//                   <p className="text-xs text-white/60">
//                     {adminTakeover ? 'Human takeover active' : 'AI agent active'}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
//                 onClick={() =>
//                   refetch().then(() => {
//                     if (isNegotiation && data) {
//                       const history = (data.history as NegotiationHistoryItem[]) || [];
//                       const mapped: ChatMessage[] = history.map((msg, index) => {
//                         const sender = mapNegotiationSender(msg.sender_type);
//                         return {
//                           _id: `${Id}-${index}`,
//                           thread_id: Id!,
//                           sender,
//                           message: msg.message ?? '',
//                           timestamp: new Date().toISOString(),
//                           username: sender === 'USER' ? data.name : undefined,
//                         };
//                       });
//                       setMessages(Id!, mapped);
//                     } else {
//                       const newMessages = data?.messages ?? [];
//                       setMessages(Id!, newMessages);
//                     }
//                   })
//                 }
//                 aria-label="Refresh messages"
//               >
//                 <RefreshCcw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
//               </button>
//               {adminTakeover === null ? (
//                 <Spinner />
//               ) : (
//                 <AdminTakeoverToggle
//                   enabled={adminTakeover}
//                   onChange={handleAdminToggle}
//                   disabled={
//                     isNegotiation
//                       ? !!(
//                           negotiationHumanTakeover.isPending ||
//                           negotiationTakeoverValue.isFetching
//                         )
//                       : !!(humantakeover.isPending || toogleStatus.isFetching)
//                   }
//                 />
//               )}
//             </div>
//           </div>

//           <div className="relative flex-1 overflow-hidden bg-[#0f1014]">
//             <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.12),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.08),transparent_45%)]" />
//             <div className="relative flex h-full flex-col">
//               <div className="custom-scrollbar flex-1 space-y-2 overflow-y-auto px-4 py-4">
//                 {isPending && memoizedMessages.length === 0 ? (
//                   <div className="flex h-full items-center justify-center">
//                     <Spinner />
//                   </div>
//                 ) : (
//                   memoizedMessages.map((msg) => {
//                     const isPdf = msg.message?.toLowerCase().endsWith('.pdf');
//                     const displaySender = msg.sender === 'ADMIN' ? 'AI' : msg.sender;
//                     return (
//                       <MessageBubble
//                         key={msg._id || `${msg.timestamp}-${msg.sender}`}
//                         message={msg.message}
//                         sender={displaySender}
//                         timestamp={msg.timestamp}
//                         isPdf={isPdf}
//                       />
//                     );
//                   })
//                 )}
//                 <div ref={bottomRef} />
//               </div>

//               <div className="border-t border-white/10 bg-[#121217] p-3">
//                 <div className="rounded-xl border border-white/10 bg-white/3 p-1.5">
//                   <ChatInput
//                     enabled={!!adminTakeover && !(humantakeover?.isPending || false)}
//                     onSend={handleSend}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//         </section>

//         <aside className="hidden border-l border-white/10 bg-[#111217] p-4 lg:flex lg:flex-col">
//           <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-violet-400/35 bg-violet-500/15 text-xl font-bold text-violet-100">
//             {initials}
//           </div>
//           <h4 className="text-center text-base font-bold text-white">
//             {name || (isNegotiation ? 'Negotiation User' : 'WhatsApp User')}
//           </h4>
//           <p className="mt-1 text-center text-xs text-white/50">
//             {isNegotiation ? 'Negotiation Profile' : 'WhatsApp Profile'}
//           </p>

//           <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-3">
//             <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
//               Key Metrics
//             </p>
//             <div className="space-y-2 text-xs">
//               <div className="flex items-center justify-between">
//                 <span className="text-white/55">Total Messages</span>
//                 <span className="font-semibold text-white">{totalMessages}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-white/55">User Messages</span>
//                 <span className="font-semibold text-white">{userMessageCount}</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-white/55">Agent/Admin</span>
//                 <span className="font-semibold text-white">{agentMessageCount}</span>
//               </div>
//             </div>
//           </div>

//           <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
//             <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
//               Workflow
//             </p>
//             <div className="space-y-2 text-xs">
//               <div className="flex items-center justify-between">
//                 <span className="text-white/55">Takeover</span>
//                 <span
//                   className={`rounded-full px-2 py-0.5 font-semibold ${
//                     adminTakeover
//                       ? 'bg-emerald-400/20 text-emerald-200'
//                       : 'bg-cyan-400/20 text-cyan-200'
//                   }`}
//                 >
//                   {adminTakeover ? 'Human' : 'AI'}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-white/55">Thread ID</span>
//                 <span className="max-w-[110px] truncate font-mono text-white/80">{Id}</span>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
