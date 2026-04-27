export const AuthENDPOINT = {
    SIGN_UP: `/auth/register`,
    LOGIN: `/auth/login`,
    VERIFY_EMAIL: `/auth/verify-email`,
    UPLOAD_USER_LOGO: (user_id: string) => `/auth/users/${user_id}/upload-logo`,

    // SIGN_UP: `/api/auth/register`,
    // LOGIN: `/api/auth/login`,
}