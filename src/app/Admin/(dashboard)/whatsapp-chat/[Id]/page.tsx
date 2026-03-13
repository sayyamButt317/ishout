'use client';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import useWhatsAppMessagesHook from '@/src/routes/Admin/Hooks/whatsappmessages-hook';
import useNegotiationMessagesHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiationmessages-hook';
import { MessageBubble } from '@/src/app/component/custom-component/messgaeBubble';
import { AdminTakeoverToggle } from '@/src/app/component/custom-component/admintoggle';
import { ChatInput } from '@/src/app/component/custom-component/inputbar';
import Spinner from '@/src/app/component/custom-component/spinner';
import SendWhatsappMessageHook from '@/src/routes/Admin/Hooks/sendwhatsappmessage-hook';
import HumanTakeoverHook from '@/src/routes/Admin/Hooks/humantakeover-hook';
import ToogleStatusHook from '@/src/routes/Admin/Hooks/tooglestatus-hook';
import { ChatMessage, useWhatsAppChatStore } from '@/src/store/Campaign/chat.store';
import { RefreshCcw } from 'lucide-react';
import { useNotificationSound } from '@/src/helper/notificationSound';

export default function WhatsAppChatById() {
  const { Id } = useParams<{ Id: string }>();
  const pathname = usePathname();
  const isNegotiation = pathname?.includes('/negotiation-chat');

  const useMessagesHook = isNegotiation
    ? useNegotiationMessagesHook
    : useWhatsAppMessagesHook;

  const { data, isPending, isRefetching, refetch } = isNegotiation
    ? useMessagesHook(Id ?? '')
    : useMessagesHook(Id ?? '', 1, 100);

  const messages = useWhatsAppChatStore((s) => s.chats[Id ?? '']);
  const memoizedMessages = useMemo(() => messages ?? [], [messages]);
  const addMessage = useWhatsAppChatStore((s) => s.addMessage);
  const setMessages = useWhatsAppChatStore((s) => s.setMessages);
  const { playMessageSentSound } = useNotificationSound();

  const sendMessage = isNegotiation ? null : SendWhatsappMessageHook(Id ?? '');
  const humantakeover = isNegotiation ? null : HumanTakeoverHook(Id ?? '');
  const toogleStatus = isNegotiation ? null : ToogleStatusHook(Id ?? '');

  const [adminTakeover, setAdminTakeover] = useState<boolean | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [memoizedMessages.length]);

  useEffect(() => {
    if (isNegotiation) {
      setAdminTakeover(false);
      return;
    }
    if (!toogleStatus?.data) return;
    const isHuman = toogleStatus.data.mode === 'HUMAN_TAKEOVER';
    setAdminTakeover(isHuman);
  }, [toogleStatus?.data, isNegotiation]);

  useEffect(() => {
    if (!Id) return;
    if (isNegotiation && data) {
      const messages = (data.history || []).map((msg: any, index: number) => ({
        _id: `${Id}-${index}`,
        thread_id: Id!,
        sender: msg.sender_type === 'AI' ? 'AI' : 'USER',
        message: msg.message,
        timestamp: new Date().toISOString(),
        username: msg.sender_type === 'USER' ? data.name : undefined,
      }));
      setMessages(Id!, messages);
    } else {
      setMessages(Id, data?.messages ?? []);
    }
  }, [Id, data, setMessages, isNegotiation]);

  const handleAdminToggle = useCallback(
    (enabled: boolean) => {
      if (isNegotiation || !humantakeover || !toogleStatus) return;
      setAdminTakeover(enabled);
      humantakeover.mutate(enabled, {
        onError: () => setAdminTakeover((prev) => !prev),
        onSuccess: () => toogleStatus.refetch(),
      });
    },
    [humantakeover, toogleStatus, isNegotiation],
  );

  // Send message handler
  const handleSend = useCallback(
    (msg: string) => {
      if (!msg.trim() || !adminTakeover || !sendMessage || isNegotiation) return;
      const newMessage: ChatMessage = {
        _id: crypto.randomUUID(),
        thread_id: Id!,
        sender: 'ADMIN',
        message: msg,
        timestamp: new Date().toISOString(),
      };
      addMessage(Id!, newMessage);
      playMessageSentSound();
      sendMessage.mutate(msg);
    },
    [adminTakeover, playMessageSentSound, Id, addMessage, sendMessage, isNegotiation],
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
              className={`ml-2 w-4 h-4 text-primary-text cursor-pointer ${
                isRefetching ? 'animate-spin' : ''
              }`}
              onClick={() =>
                refetch().then(() => {
                  if (isNegotiation && data) {
                    const messages = (data.history || []).map(
                      (msg: any, index: number) => ({
                        _id: `${Id}-${index}`,
                        thread_id: Id!,
                        sender: msg.sender_type === 'AI' ? 'AI' : 'USER',
                        message: msg.message,
                        timestamp: new Date().toISOString(),
                        username: msg.sender_type === 'USER' ? data.name : undefined,
                      }),
                    );
                    setMessages(Id!, messages);
                  } else {
                    const newMessages = data?.messages ?? [];
                    setMessages(Id!, newMessages);
                  }
                })
              }
            />
          </div>
        </div>
        {isNegotiation ? null : adminTakeover === null ? (
          <Spinner />
        ) : (
          <AdminTakeoverToggle
            enabled={adminTakeover}
            onChange={handleAdminToggle}
            disabled={!!(humantakeover?.isPending || toogleStatus?.isFetching)}
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
            return (
              <MessageBubble
                key={msg._id || `${msg.timestamp}-${msg.sender}`}
                message={msg.message}
                sender={msg.sender}
                timestamp={msg.timestamp}
                isPdf={isPdf}
              />
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput
        enabled={
          !isNegotiation && !!adminTakeover && !(humantakeover?.isPending || false)
        }
        onSend={handleSend}
      />
    </div>
  );
}
