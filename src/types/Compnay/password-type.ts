interface VerifyOtpRequestProps {
    otp: string;
}
interface ChangePasswordRequestProps {
    email: string;
    token: string;
    new_password: string;
    confirm_password: string;
}
interface ChangePasswordResponseProps {
    message: string;
}

interface VerifyOtpResponseProps {
    message: string;
    reset_token: string;
}

export type { VerifyOtpRequestProps, VerifyOtpResponseProps, ChangePasswordRequestProps, ChangePasswordResponseProps };