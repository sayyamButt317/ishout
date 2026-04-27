import { ReactNode } from "react";

export type Mode = 'influencer' | 'brand';

export type ChatMessageItem = {
    _id: string;
    sender: string;
    username?: string;
    message: unknown;
    timestamp: string;
};

export type ChatPanelProps = {
    title?: string;
    unreadText?: string;
    className?: string;

    modeToggle?: {
        value: Mode;
        onChange: (value: Mode) => void;
    };

    messages?: ChatMessageItem[];
    isLoading: boolean;
    messagesAvailable?: boolean;
    messagesUnavailableText?: string;

    isRightMessage: (msg: ChatMessageItem) => boolean;
    messageRoleLabels?: { right: string; left: string };
    onSelectMedia: (url: string, type: 'video' | 'image') => void;
    onSeekToTime?: (time: number) => void;

    sendEnabled: boolean;
    onSend: (payload: string | File) => Promise<void> | void;

    afterComposer?: ReactNode;
    bubbleMaxWidthClassName?: string;
};

export type ChatMessageType = {
    text?: string;
    snapshot?: string;
    timestamp?: number;
    mediaUrl?: string;
};

export type ChatMessageContentProps = {
    message: unknown;
    onSelectMedia: (url: string, type: 'video' | 'image') => void;
    onSeekToTime?: (time: number) => void;
};

export type MessageItem = {
    _id: string;
    sender: string;
    username?: string;
    message: unknown;
    timestamp: string;
};

export type MessageListProps = {
    messages?: MessageItem[];
    isLoading: boolean;
    emptyMessage?: string;
    isRightMessage: (message: MessageItem) => boolean;
    roleLabels?: { right: string; left: string };
    onSelectMedia: (url: string, type: 'video' | 'image') => void;
    onSeekToTime?: (time: number) => void;
    bubbleMaxWidthClassName?: string;
};