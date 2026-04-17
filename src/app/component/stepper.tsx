"use client";

import { Check } from "lucide-react";

export interface StepperStep {
    key: string;
    label: string;
    letter: string;
}

interface StepperStepState extends StepperStep {
    isActive: boolean;
    isCurrent: boolean;
}

interface StepperProps {
    currentStatus: string;
    steps?: StepperStep[];
    onStepClick?: (step: StepperStepState, stepIndex: number) => void;
    isStepClickable?: (step: StepperStepState, stepIndex: number) => boolean;
}

interface CampaignStepperStatusInput {
    status?: string | null;
    admin_approved?: boolean;
    company_approved?: boolean;
}

export const STATUS_STEPS: StepperStep[] = [
    { key: "pending", label: "Pending", letter: "P" },
    { key: "approved", label: "iShout", letter: "I" },
    { key: "processing", label: "Brand", letter: "B" },
    { key: "completed", label: "Negotiated", letter: "N" },
    { key: "content", label: "Content", letter: "C" },
    { key: "report", label: "Report", letter: "R" },
];

const STATUS_KEYS = new Set(STATUS_STEPS.map((step) => step.key));

export function resolveCampaignStepperStatus({
    status,
    admin_approved,
    company_approved,
}: CampaignStepperStatusInput): string {
    const normalizedStatus = status?.toLowerCase().trim();
    const completedLikeStatuses = new Set(["completed", "content", "report"]);

    if (company_approved) {
        if (normalizedStatus && completedLikeStatuses.has(normalizedStatus)) {
            return normalizedStatus;
        }
        return "processing";
    }

    if (admin_approved) {
        if (normalizedStatus && STATUS_KEYS.has(normalizedStatus) && normalizedStatus !== "pending") {
            return normalizedStatus;
        }
        return "approved";
    }

    if (normalizedStatus && STATUS_KEYS.has(normalizedStatus)) {
        return normalizedStatus;
    }

    return "pending";
}

export function getStatusSteps(currentStatus: string, steps: StepperStep[] = STATUS_STEPS): StepperStepState[] {
    const normalizedStatus = currentStatus.toLowerCase();
    const statusOrder = steps.map((step) => step.key);
    const currentIndex = statusOrder.indexOf(normalizedStatus);

    if (currentIndex === -1) {
        return steps.map((step, index) => ({
            ...step,
            isActive: index === 0,
            isCurrent: index === 0,
        }));
    }

    return steps.map((step, index) => ({
        ...step,
        isActive: index <= currentIndex,
        isCurrent: index === currentIndex,
    }));
}

export default function Stepper({
    currentStatus,
    steps = STATUS_STEPS,
    onStepClick,
    isStepClickable,
}: StepperProps) {
    const statusSteps = getStatusSteps(currentStatus, steps);

    return (
        <div className="flex items-center justify-between min-w-[280px] sm:max-w-2xl">
            {statusSteps.map((step, stepIndex) => {
                const clickable = isStepClickable?.(step, stepIndex) ?? false;

                return (
                    <div key={step.key} className="flex items-center">
                        <button
                            type="button"
                            onClick={() => {
                                if (clickable) {
                                    onStepClick?.(step, stepIndex);
                                }
                            }}
                            className={`flex flex-col justify-center items-center ${clickable ? "cursor-pointer" : "cursor-default"
                                }`}
                        >
                            <div
                                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all ${step.isActive
                                    ? "bg-[#FF3B8D] text-white"
                                    : "bg-white/10 text-white/40 border border-white/20"
                                    } ${clickable ? "hover:bg-[#FF3B8D]/80" : ""}`}
                            >
                                {step.isActive && stepIndex > 0 ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : step.letter}
                            </div>
                            <span
                                className={`text-[8px] sm:text-[10px] mt-1 whitespace-nowrap ${step.isActive ? "text-white/80" : "text-white/40"
                                    } ${clickable ? "hover:text-white" : ""}`}
                            >
                                {step.label}
                            </span>
                        </button>
                        {stepIndex < statusSteps.length - 1 && (
                            <div className={`w-6 sm:w-40 h-0.5 mx-1 sm:mx-2 ${step.isActive ? "bg-[#FF3B8D]" : "bg-white/20"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}