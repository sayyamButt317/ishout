'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResetPasswordHook from "@/src/routes/Company/api/Hooks/reset-password.hook";
import { useForgotPasswordStore } from "@/src/store/User/forgot-password.store";
import { ShieldCheck, LockKeyhole } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const {
        new_password,
        confirm_password,
        setNewPassword,
        setConfirmPassword,
        reset_token,
        email,

    } = useForgotPasswordStore();
    const resetPasswordMutation = ResetPasswordHook();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (new_password !== confirm_password) {
            toast.error('Passwords do not match!');
            return;
        }
        resetPasswordMutation.mutate({
            email: email,
            token: reset_token,
            new_password: new_password,
            confirm_password: confirm_password,
        });
    }
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
                <div className="text-center space-y-2 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white italic">
                        Change Password
                    </h1>
                    <p className="text-sm text-slate-400">
                        Enter your new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <LockKeyhole
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            value={new_password}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="pl-10 py-2 w-full border rounded-xl text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>

                    <div className="relative">
                        <ShieldCheck
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="pl-10 py-2 w-full border rounded-xl text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <Button type="submit" className="w-full bg-primaryButton hover:bg-primaryHover italic cursor-pointer text-white" disabled={false}>
                        Change Password
                    </Button>
                </form>
            </div>
        </div>
    );
}