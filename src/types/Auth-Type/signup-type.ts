export type SignUpRequestProps = {
    company_name: string;
    contact_person: string;
    phone: string;
    // industry: string;
    // company_size: string;
    email: string;
    password: string;
}

export interface User {
    user_id: string;
    company_name: string;
    email: string;
    contact_person: string;
    phone: string;
    industry: string;
    company_size: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}
export type SignUpResponseProps = {
    access_token: string;
    refresh_token: string;
    user: User;
}
