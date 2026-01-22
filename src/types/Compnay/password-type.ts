interface VerifyOtpRequestProps {
    otp: string;
}
interface ChangePasswordRequestProps {
    new_password: string;
    confirm_password: string;
}
interface ChangePasswordResponseProps {
    message: string;
}

interface VerifyOtpResponseProps {
    message: string;
}

export type { VerifyOtpRequestProps, VerifyOtpResponseProps, ChangePasswordRequestProps, ChangePasswordResponseProps };