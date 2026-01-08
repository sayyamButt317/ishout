export interface MessageTemplate {
    title: string;
    subtitle: string;
}


export type InstagramUser = {
    id: string;
    username: string;
};

export type InstagramMessage = {
    id: string;
    message?: string;
    created_time: string;

    from?: InstagramUser;

    to?: {
        data?: InstagramUser[];
    };
};

export type InstagramConversation = {
    id: string;
    updated_time: string;
};
