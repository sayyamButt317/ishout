'use client';

import { Check } from 'lucide-react';

// Define the minimal required fields for Stepper compatibility
export interface StepperCompatibleCampaign {
  pending?: boolean;
  ishout_approved?: boolean;
  company_approved?: boolean;
  negotiation?: boolean;
  content?: boolean;
  report?: boolean;
}

export interface StepperStep {
  key: string;
  label: string;
  letter: string;
}

export interface StepperStepState extends StepperStep {
  isActive: boolean;
  isCurrent: boolean;
}

interface StepperProps {
  currentStatus?: string;
  campaign?: StepperCompatibleCampaign;
  steps?: StepperStep[];
  onStepClick?: (step: StepperStepState, stepIndex: number) => void;
  isStepClickable?: (step: StepperStepState, stepIndex: number) => boolean;
}

export const STATUS_STEPS: StepperStep[] = [
  { key: 'pending', label: 'Pending', letter: 'P' },
  { key: 'ishout_approved', label: 'iShout', letter: 'I' },
  { key: 'company_approved', label: 'Brand', letter: 'B' },
  { key: 'negotiation', label: 'Negotiated', letter: 'N' },
  { key: 'content', label: 'Content', letter: 'C' },
  { key: 'report', label: 'Report', letter: 'R' },
];

// Helper to safely get boolean value from campaign
function getBooleanValue(campaign: StepperCompatibleCampaign, key: string): boolean {
  switch (key) {
    case 'pending':
      return Boolean(campaign.pending);
    case 'ishout_approved':
      return Boolean(campaign.ishout_approved);
    case 'company_approved':
      return Boolean(campaign.company_approved);
    case 'negotiation':
      return Boolean(campaign.negotiation);
    case 'content':
      return Boolean(campaign.content);
    case 'report':
      return Boolean(campaign.report);
    default:
      return false;
  }
}

// Compute step states from campaign boolean fields
export function getStepperStateFromBooleans(
  campaign: StepperCompatibleCampaign,
  steps: StepperStep[] = STATUS_STEPS,
): StepperStepState[] {
  const stepStates: StepperStepState[] = steps.map((step) => ({
    ...step,
    isActive: getBooleanValue(campaign, step.key),
    isCurrent: false,
  }));

  // Find the last active step
  let lastActiveIndex = -1;
  for (let i = 0; i < stepStates.length; i++) {
    if (stepStates[i].isActive) {
      lastActiveIndex = i;
    }
  }

  // Set the last active step as current
  if (lastActiveIndex >= 0) {
    stepStates[lastActiveIndex].isCurrent = true;
  } else {
    // Fallback: first step is current and active
    stepStates[0].isCurrent = true;
    stepStates[0].isActive = true;
  }

  return stepStates;
}

// Legacy function for string-based status (fallback)
export function getStatusSteps(
  currentStatus: string,
  steps: StepperStep[] = STATUS_STEPS,
): StepperStepState[] {
  const normalizedStatus = currentStatus.toLowerCase();
  
  // Map legacy status strings to step keys
  const statusToKeyMap: Record<string, string> = {
    'pending': 'pending',
    'approved': 'ishout_approved',
    'processing': 'company_approved',
    'completed': 'negotiation',
    'content': 'content',
    'report': 'report',
    'rejected': 'pending',
  };
  
  const mappedKey = statusToKeyMap[normalizedStatus] || normalizedStatus;
  const statusOrder = steps.map((step) => step.key);
  const currentIndex = statusOrder.indexOf(mappedKey);

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
  campaign,
  steps = STATUS_STEPS,
  onStepClick,
  isStepClickable,
}: StepperProps) {
  // Determine which method to use for calculating step states
  const statusSteps = campaign
    ? getStepperStateFromBooleans(campaign, steps)
    : getStatusSteps(currentStatus ?? '', steps);

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
              className={`flex flex-col justify-center items-center ${
                clickable ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-all ${
                  step.isActive
                    ? 'bg-[#FF3B8D] text-white'
                    : 'bg-white/10 text-white/40 border border-white/20'
                } ${clickable ? 'hover:bg-[#FF3B8D]/80' : ''}`}
              >
                {step.isActive && stepIndex > 0 ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  step.letter
                )}
              </div>
              <span
                className={`text-[8px] sm:text-[10px] mt-1 whitespace-nowrap ${
                  step.isActive ? 'text-white/80' : 'text-white/40'
                } ${clickable ? 'hover:text-white' : ''}`}
              >
                {step.label}
              </span>
            </button>
            {stepIndex < statusSteps.length - 1 && (
              <div
                className={`w-6 sm:w-40 h-0.5 mx-1 sm:mx-2 ${
                  step.isActive ? 'bg-[#FF3B8D]' : 'bg-white/20'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}