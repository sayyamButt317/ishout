"use client";

import React from "react";
import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  description: string;
}

interface CampaignStepsProps {
  currentStep: number;
}

export const steps: Step[] = [
  // { number: 1, title: "Campaign Brief", description: "Describe your campaign goals" },
  { number: 1, title: "Platform", description: "Select relevant platform" },
  { number: 2, title: "Categories", description: "Select relevant categories" },
  { number: 3, title: "Influencers", description: "Choose follower range" },
  { number: 4, title: "Number", description: "Number of influencers" },
];

export function CampaignSteps({ currentStep }: CampaignStepsProps) {
  return (
    <div className="w-full bg-white/60 backdrop-blur border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Mobile Scrollable Steps */}
        <div className="flex sm:hidden overflow-x-auto no-scrollbar space-x-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center flex-shrink-0 text-center min-w-[80px] px-2 py-1 rounded-lg transition-all duration-300 ${
                currentStep === step.number
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              <div
                className={`w-7 h-7 flex items-center justify-center rounded-full font-semibold text-sm mb-1 ${
                  currentStep >= step.number
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <p className="text-xs font-medium">{step.title}</p>
            </div>
          ))}
        </div>

        {/* Desktop Steps */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center w-full">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center text-center w-full">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm mb-2 transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-emerald-500 text-white"
                      : currentStep === step.number
                      ? "bg-emerald-100 text-emerald-700 ring-2 ring-emerald-300"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>

                {/* Step Title */}
                <div className="text-center">
                  <p
                    className={`text-sm font-medium transition-colors ${
                      currentStep >= step.number
                        ? "text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-slate-500">{step.description}</p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    currentStep > step.number
                      ? "bg-emerald-500"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
