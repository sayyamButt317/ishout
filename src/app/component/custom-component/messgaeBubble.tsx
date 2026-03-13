'use client';
import { FiFileText } from 'react-icons/fi';

interface MessageBubbleProps {
  message: string;
  sender: 'AI' | 'USER' | 'ADMIN' | 'SYSTEM';
  timestamp: string;
   isPdf?: boolean;
}

export function MessageBubble({ message, sender, timestamp }: MessageBubbleProps) {
  const isRight = sender === 'AI' || sender === 'SYSTEM' || sender === 'ADMIN';

  // Simple PDF detection
  const isPdf = message.toLowerCase().endsWith('.pdf');
  
  return (
    <div className={`flex w-full mb-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-md
          ${
            sender === 'AI'
              ? 'bg-white text-gray-900 rounded-bl-none'
              : sender === 'ADMIN'
                ? 'bg-[#e73347] text-white rounded-br-none'
                : sender === 'USER'
                  ? 'bg-secondaryButton text-white rounded-bl-none'
                  : 'bg-slate-500 text-white rounded-br-none'
          }`}
      >
        {isPdf ? (
          <a
            href={message}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg hover:brightness-90 transition"
          >
            <FiFileText className="text-3xl" />
            <div className="flex flex-col truncate">
              <span className="font-semibold truncate">campaign-brief.pdf</span>
              <span className="text-xs opacity-70">PDF Document</span>
            </div>
          </a>
        ) : (
          <p className="whitespace-pre-line">{message}</p>
        )}

        <div className="mt-1 text-[10px] opacity-70 text-right">
          {sender === 'ADMIN' && 'Admin · '}
          {new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
