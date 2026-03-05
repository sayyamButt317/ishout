export interface UserManagementResponse {
    user_id: string;
    company_name: string;
    contact_person: string;
    email: string;
    phone: string;
    status: string;
    role: string;
}


export interface UpdateUserStatusRequest {
    user_id: string;
    status: string;
}

export interface UpdateUserStatusResponse {
    message: string;
    status: string;
}