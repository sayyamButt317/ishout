import Link from "next/link";
import React from "react";

export function CampaignType() {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">
          Choose your campaign type
        </h2>
        <p className="mt-2 text-slate-600 text-center max-w-2xl mx-auto">
          Pick a quick template or answer guided questions to tailor results.
          You can switch anytime.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Link
            href={{ pathname: "/ready-made" }}
            className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all ring-1 ring-transparent hover:ring-emerald-200"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-md bg-emerald-500" />
              <div>
                <h3 className="text-lg font-semibold">Ready-made Templates</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Start fast with presets like skin, fashion, fitness, health.
                  Set followers, countries and budget in seconds.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href={{ pathname: "/guided-questions" }}
            className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all ring-1 ring-transparent hover:ring-sky-200"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-md bg-sky-500" />
              <div>
                <h3 className="text-lg font-semibold">Guided Questions</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Answer a few focused questions about goals, platforms,
                  follower range, demographics and timeline.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
