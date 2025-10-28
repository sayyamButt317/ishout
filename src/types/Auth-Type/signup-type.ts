export type SignUpRequestProps = {
    company_name: string;
    contact_person: string;
    phone: string;
    industry: string;
    company_size: string;
    email: string;
    password: string;
}

export type SignUpResponseProps = {
    access_token: string;
    refresh_token: string;
}