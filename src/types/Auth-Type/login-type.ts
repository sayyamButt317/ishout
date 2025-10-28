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
export interface LoginResponseProps {
    message: string;
    access_token: string;
    token_type: string;
    user: User;
}

export interface LoginRequestProps {
    email: string;
    password: string;
}