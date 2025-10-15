"use client";
import { ReadyMadeInfluencersResponse } from "@/src/types/readymadeinfluencers-type";
import Image from "next/image";
import { useReadyMadeTemplateStore } from "@/src/store/Campaign/ready-made";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AddedInfluencersStore } from "@/src/store/Campaign/added-influencers.store";

export default function ReadyMadeInfluencersPage() {
  const router = useRouter();
  const results = useReadyMadeTemplateStore(
    (s) => s.results
  ) as ReadyMadeInfluencersResponse;
  console.log(results);
  const addedInfluencers = AddedInfluencersStore((s) => s.influencers);
  const { clearTemplate } = useReadyMadeTemplateStore();

  return (
    <div className="min-h-screen bg-white">
      <div className="relative border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-200/30 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Recommended Influencers
            </h1>
            <p className="mt-2 text-slate-600 max-w-2xl mx-auto">
              Curated results based on your selected platform, category, and
              follower range.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto px-6 py-10">
        {results?.influencers?.length ? (
          <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {results?.platform} Influencers
                </h2>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                    Category: {results?.category}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                    Followers Range: {results?.followers?.range}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                    Total Influencers: {results?.count}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                    Country: {results?.country}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {results.influencers.map((inf, i) => (
                <article
                  key={`${inf?.influencer_username}-${i}`}
                  className="group rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-col sm:flex-row text-center sm:text-left">
                    <Image
                      src={inf?.pic || "/assets/avatar.png"}
                      alt={inf?.influencer_username || "influencer"}
                      width={64}
                      height={64}
                      className="h-16 w-16 sm:h-14 sm:w-14 rounded-full border object-cover ring-1 ring-slate-200"
                    />
                    <div className="min-w-0 w-full">
                      <p className="font-semibold text-slate-900 truncate text-base sm:text-sm">
                        {inf?.name || "No name available"}
                      </p>
                      <a
                        href={inf?.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-xs text-slate-500 underline underline-offset-2 hover:text-blue-600 truncate max-w-full inline-block"
                      >
                        @{inf?.influencer_username}
                      </a>
                      {inf?.country && (
                        <div className="mt-2 sm:mt-1 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700 max-w-full truncate">
                          {inf?.country}
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-700 line-clamp-2 sm:line-clamp-3">
                    {inf.bio}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs gap-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-slate-700 whitespace-nowrap">
                        {inf.followers.toLocaleString()} followers
                      </span>
                      <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-emerald-700 whitespace-nowrap">
                        Engagement: {inf?.engagement_rate || "N/A"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="h-9 px-3 w-full sm:w-auto"
                        onClick={() => {
                          addedInfluencers.push(inf);
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 px-3 w-full sm:w-auto"
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center text-slate-600 border border-dashed border-slate-300 rounded-xl p-10">
            No influencers found yet. Launch a search from the previous page.
          </div>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          className="h-8 px-3"
          onClick={() => {
            router.push("/ready-made");
            clearTemplate();
          }}
        >
          New Campaign
        </Button>
      </div>
    </div>
  );
}
