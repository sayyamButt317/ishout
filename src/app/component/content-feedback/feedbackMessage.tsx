'use client';

import { formatVideoDuration } from '@/src/utils/video-duration';

type Props = {
    message: string;
    role: 'admin' | 'brand';
    timestamp?: number;
};

export const FeedbackMessage = ({ message, role, timestamp }: Props) => {
    const isAdmin = role === 'admin';

    return (
        <div className="flex items-start gap-3 rounded-xl bg-blackp-4">
            {/* LEFT COLOR BAR */}
            <div
                className={`w-1 rounded-full ${isAdmin ? 'bg-green-500' : 'bg-red-500'
                    }`}
            />
            {/* CONTENT */}
            <div className="flex-1">

                {/* HEADER */}
                <div className="flex items-center gap-3">
                    {/* TIMESTAMP */}
                    {timestamp !== undefined && (
                        <span
                            className={`text-sm font-semibold ${isAdmin ? 'text-green-600' : 'text-red-500'
                                }`}
                        >
                            {formatVideoDuration(timestamp)}
                        </span>
                    )}

                    {/* TITLE */}
                    <h3 className="text-sm font-bold text-slate">
                        {isAdmin ? 'Admin Note' : 'Action Required'}
                    </h3>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-1 text-sm text-white leading-relaxed">
                    {message}
                </p>

                {/* STATUS BADGE */}
                <div className="mt-2">
                    <span
                        className={`inline-block rounded-md px-2 py-1 text-[10px] font-semibold ${isAdmin
                            ? 'bg-primaryButton text-white'
                            : 'bg-red-100 text-red-600'
                            }`}
                    >
                        {isAdmin ? 'ADMIN NOTE' : 'ACTION REQUIRED'}
                    </span>
                </div>
            </div>
        </div>
    );
};