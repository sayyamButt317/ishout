import { ReadyMadeInfluencerResponse } from '@/src/types/readymadeinfluencers-type';
import { ReadyMadeResultGroup } from '@/src/types/readymadeinfluencers-type';
import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';

interface InfluencerCardProps {
  influencer_username?: string;
  name?: string;
  bio?: string;
  country?: string;
  followers?: number;
  engagement_rate?: string;
  pic: string;
  external_link: string;
}

const InfluencerCard = ({ influencer_username, name, bio, country, followers, engagement_rate, pic, external_link }: InfluencerCardProps) => {
  return (  
    <div>InfluencerCard
        (
          <div className="space-y-10">
            {results.results.map((group: ReadyMadeResultGroup, idx: number) => (
              <section key={`${group.platform}-${group.followers_display}-${idx}`} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{group.platform} Influencers</h2>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs">
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">Category: {group.category}</span>
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">Followers: {group.followers_display}</span>
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-slate-700">Total: {group.count}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {group.data.map((inf: ReadyMadeInfluencerResponse, i: number) => (
                    <article
                      key={`${influencer_username}-${i}`}
                      className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={pic || "/assets/avatar.png"}
                          alt={influencer_username || "influencer"}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-full border object-cover ring-1 ring-slate-200"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate">{inf.name || "No name available"}</p>
                          <a
                            href={external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-slate-500 underline underline-offset-2 hover:text-blue-600 truncate"
                          >
                            @{influencer_username || "username"}
                          </a>
                          {country && (
                            <div className="mt-1 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                              {country}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-slate-700 line-clamp-3">{inf.bio || "No bio available"}</p>

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <div className="flex gap-2">
                          <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-slate-700">
                            {(followers || 0).toLocaleString()} followers
                          </span>
                          <span className="inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-emerald-700">
                            Engagement: {engagement_rate || "N/A"}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="h-8 px-3">Accept</Button>
                          <Button variant="outline" className="h-8 px-3">Reject</Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )
    </div>
  )
}

export default InfluencerCard
