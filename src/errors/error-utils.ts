import {
    NetworkErrorType,
    ForbiddenErrorType,
    NotFoundErrorType,
    MaintenanceErrorType,
} from "./ErrorBoundary";

export const throwNetworkError = (message?: string): never => {
    throw new NetworkErrorType(message);
};

export const throwForbiddenError = (message?: string): never => {
    throw new ForbiddenErrorType(message);
};

export const throwNotFoundError = (message?: string): never => {
    throw new NotFoundErrorType(message);
};

export const throwMaintenanceError = (message?: string): never => {
    throw new MaintenanceErrorType(message);
};

export const throwErrorByStatus = (status: number, message?: string): never => {
    switch (status) {
        case 403:
            throw new ForbiddenErrorType(message);
        case 404:
            throw new NotFoundErrorType(message);
        case 503:
            throw new MaintenanceErrorType(message);
        case 500:
        case 502:
        case 504:
            throw new Error(message || `Server error: ${status}`);
        default:
            if (status >= 400 && status < 500) {
                throw new Error(message || `Client error: ${status}`);
            }
            throw new Error(message || `Error: ${status}`);
    }
};

export const isNetworkError = (error: unknown): boolean => {
    if (error instanceof NetworkErrorType) return true;
    if (error instanceof Error) {
        const message = error.message.toLowerCase();
        return (
            message.includes("fetch") ||
            message.includes("network") ||
            message.includes("connection") ||
            message.includes("failed to fetch") ||
            error.name === "NetworkError" ||
            error.name === "TypeError"
        );
    }
    return false;
};

