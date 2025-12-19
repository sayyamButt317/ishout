export interface UpdateProfileRequestProps {
    company_name: string;
    contact_person: string;
    phone: string;
    email: string;
}

export interface UpdateProfileResponseProps {
    status_code: number;
    message: string;
    user: {
        company_name: string;
        contact_person: string;
        phone: string;
        email: string;
    }
}

export interface CompanyProfileDetailsResponseProps {
    status_code: number;
    message: string;
    user: {
        company_name: string;
        contact_person: string;
        phone: string;
        email: string;
    }
}