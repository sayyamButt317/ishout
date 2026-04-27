'use client'

import { useParams, useSearchParams } from 'next/navigation'
import useInfluencerContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/contentdetail-influencer-hook'
import Header from '../../component/header'
import { TimerIcon } from 'lucide-react'

type TimestampItem = {
  time: number
  feedback: string
}

type FeedbackResponse = {
  negotiation_id?: string
  thread_id?: string
  contentType?: string
  contentUrl?: string
  current_version?: number
  revision?: {
    version?: number
    status?: string
    message_id?: string
    timestamps?: TimestampItem[]
  }
}

const formatSeconds = (seconds: number) => {
  const total = Math.floor(seconds)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${String(secs).padStart(2, '0')}`
}

export default function InfluencerfeedbackById() {
  const params = useParams()
  const searchParams = useSearchParams()

  const paramId = params?.Id
  const negotiation_id = Array.isArray(paramId) ? paramId[0] ?? '' : paramId ?? ''
  const message_id = searchParams.get('msg') || ''

  const { data: feedbackData } =
    useInfluencerContentFeedbackHook(negotiation_id, message_id)

  const timestamps = feedbackData?.revision?.timestamps ?? []
  const totalDuration = Math.max(...timestamps.map((item: { time: number }) => item.time), 0)

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-zinc-100">
      <Header />
      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-12 pt-34">
        <section className="space-y-4 lg:col-span-8">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-black shadow-2xl">
            {feedbackData?.contentUrl ? (
              <video
                src={feedbackData?.contentUrl}
                controls
                playsInline
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
                Video URL not available in response
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-zinc-900 p-4">
            <div className="space-y-1 text-right text-xs text-zinc-300">
              <p><strong className="text-zinc-100">Type:</strong> {feedbackData?.contentType ?? '-'}</p>
              <p><strong className="text-zinc-100">Revision:</strong> v{feedbackData?.revision?.version ?? '-'}</p>
              <p><strong className="text-zinc-100">Current:</strong> v{feedbackData?.current_version ?? '-'}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Timeline Inspector
              </h3>
              <span className="text-xs text-zinc-500">
                {timestamps.length} marker{timestamps.length === 1 ? '' : 's'}
              </span>
            </div>
            <div className="relative h-24 overflow-hidden rounded bg-zinc-950">
              <div className="absolute inset-0 flex items-end gap-1 px-2 opacity-25">
                {Array.from({ length: 36 }).map((_, index) => (
                  <div
                    key={`wave-${index}`}
                    className="w-1 rounded-full bg-cyan-300/80"
                    style={{ height: `${20 + ((index * 17) % 70)}%` }}
                  />
                ))}
              </div>
              <div className="absolute inset-0">
                {timestamps.map((item: TimestampItem, index: number) => {
                  const left = totalDuration > 0 ? (item.time / totalDuration) * 100 : 0
                  return (
                    <button
                      key={`${item.time}-${item.feedback}-${index}`}
                      onClick={() => {
                        const video = document.querySelector('video')
                        if (video) {
                          video.currentTime = item.time
                          video.play()
                        }
                      }}
                      className="group absolute top-1 h-20 w-4 -translate-x-1/2"
                      style={{ left: `${left}%` }}
                    >
                      <span className="absolute left-1/2 top-0 h-16 w-[2px] -translate-x-1/2 bg-rose-300 shadow-[0_0_8px_rgba(255,180,171,0.5)]" />
                      <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-white bg-rose-300" />
                      <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded bg-zinc-700 px-2 py-1 text-[10px] text-white group-hover:block">
                        {formatSeconds(item?.time)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-zinc-600">
              <span>0:00</span>
              <span>{formatSeconds(totalDuration * 0.25)}</span>
              <span>{formatSeconds(totalDuration * 0.5)}</span>
              <span>{formatSeconds(totalDuration * 0.75)}</span>
              <span>{formatSeconds(totalDuration)}</span>
            </div>
          </div>
        </section>

        <aside className="h-[calc(100vh-6rem)] lg:col-span-4">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-900">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-100">Feedback Log</h2>
              <span className="rounded bg-violet-500/20 px-2 py-1 text-[10px] font-semibold text-violet-200">
                {timestamps.length} OPEN
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {timestamps.length ? (
                timestamps.map((item: TimestampItem, index: number) => (
                  <div
                    key={`feedback-${item.time}-${index}`}
                    className="rounded-lg border-l-4 border-rose-300 bg-zinc-800 p-3"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-rose-300/20 px-2 py-1 text-[10px] font-semibold text-rose-200">
                          <TimerIcon size={12} className='text-rose-200' /> {item?.time ?? 0}s
                        </span>
                        <span className="text-xs font-semibold text-zinc-100">iShout Review</span>
                      </div>
                      <button
                        onClick={() => {
                          const video = document.querySelector('video')
                          if (video) {
                            video.currentTime = item.time
                            video.play()
                          }
                        }}
                        className="text-[10px] font-semibold text-violet-300 hover:underline"
                      >
                        Jump
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed text-zinc-300">{item?.feedback ?? ''}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-zinc-500">No feedback added</p>
              )}
            </div>

            <div className="border-t border-white/10 bg-zinc-950 p-4">
              <textarea
                className="h-20 w-full resize-none rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-violet-400"
                placeholder="Add feedback..."
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}