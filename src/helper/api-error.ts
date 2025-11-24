"use client";

import type { AxiosError } from "axios";

type ApiErrorPayload = {
    detail?: string;
    message?: string;
    status_code?: number;
    error?: {
        message?: string;
        status_code?: number;
    };
};

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

export class ApiError extends Error {
    statusCode?: number;

    private constructor(message: string, statusCode?: number) {
        super(message || FALLBACK_MESSAGE);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }

    static fromUnknown(error: unknown): ApiError {
        if (error instanceof ApiError) {
            return error;
        }

        if (ApiError.isAxiosError(error)) {
            const payload = error.response?.data;
            const status = error.response?.status ?? payload?.status_code ?? payload?.error?.status_code;
            const message =
                ApiError.extractMessage(payload) ||
                error.response?.statusText ||
                error.message ||
                FALLBACK_MESSAGE;

            return new ApiError(message, status);
        }

        if (error instanceof Error) {
            return new ApiError(error.message);
        }

        return new ApiError(FALLBACK_MESSAGE);
    }

    static extractMessage(payload?: ApiErrorPayload): string | undefined {
        if (!payload) return undefined;
        return (
            ApiError.sanitizeMessage(payload.error?.message) ||
            ApiError.sanitizeMessage(payload.detail) ||
            ApiError.sanitizeMessage(payload.message)
        );
    }

    private static sanitizeMessage(message?: string): string | undefined {
        if (!message) return undefined;
        const stripped = message.replace(/^(?:\s*\d+\s*:\s*)+/, "").trim();
        return stripped || message.trim();
    }

    private static isAxiosError(error: unknown): error is AxiosError<ApiErrorPayload> {
        return typeof error === "object" && error !== null && "isAxiosError" in error;
    }
}

export default ApiError;

