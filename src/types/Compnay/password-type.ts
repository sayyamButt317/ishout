interface VerifyOtpRequestProps {
    new_password: string;
    confirm_password: string;
}

interface VerifyOtpResponseProps {
    message: string;
}

export type { VerifyOtpRequestProps, VerifyOtpResponseProps };