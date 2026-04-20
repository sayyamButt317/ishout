'use client'
import {
  ArrowRight,
  CheckCircle2,
  CirclePlay,
  Clock3,
  History,
  PencilLine,
  Volume2,
} from 'lucide-react';
import Header from '../component/header';
import Image from 'next/image';

const reviewCards = [
  {
    name: 'Marcus Chen',
    role: 'Project Admin',
    time: '0:12',
    message:
      'The color grading in this transition feels a bit too warm compared to the previous scene. Can we pull back the magenta levels by about 15%?',
    badge: 'Action Required',
    badgeClass: 'bg-red-500/10 text-red-300 border-red-400/30',
    ringClass: 'border-pink-300',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqbVGJUfHWU4DERH0SNnans2IIwxhopZD0QGBoJv2tTBOPAOW8NFqHygSoyJwakffjw_OGq2ACO23aULACVEW6AE5GBknW5SqZSYgmh_wUNsv0ko_hPVwVFmovFvBCsMdhBLVd0MaO_IbYUTy6GUU--0rVkaFj_3EjTs04sQaLDIJuag70HRcLdxdjdoBQOHyHx5FLzjWNEO7Fo427RNiSbW-evYOFAlykAxOBCnwlD3cuyxp9mfnaZ0LDudf3W8zWxoyObdLpRA8',
  },
  {
    name: 'Luxury Brand X',
    role: 'Brand Partner',
    time: '0:45',
    message:
      'Logo placement approved. The motion blur on the reveal looks professional and matches our brand guidelines perfectly.',
    badge: 'Fixed & Approved',
    badgeClass: 'bg-indigo-500/10 text-indigo-200 border-indigo-300/30',
    ringClass: 'border-indigo-300',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY4XWaWlRp-pUrokPGDUJwFA72O6PQjlBUDwzVs_bHa49zFg19UORLwUJOa0IYziLSsjNzi4gnGt0YBcrQwYUqX7GC9_DNt84fq4VW4cMo9CWr16nXRMkbqEuhKCKkphhi-KxRBt7yk0UKKtB-g5b4wCnDwfQi8zXMjKnr7KClzFg2G9tXOByPMKnh5MLK9zSPfijrH-gWD-ftlAk0l7agP9LdmPGQ7XTwDDA2NSvMCR6jVABvvEGd4pjxmTeN9vuns51l_sOK_Fc',
  },
  {
    name: 'Sofia Rivera',
    role: 'Senior Reviewer',
    time: '1:12',
    message:
      'Note for the final export: please ensure we use the ProRes 4444 XQ format for the master file to preserve the dynamic range in the shadows.',
    badge: 'Admin Note',
    badgeClass: 'bg-sky-500/10 text-sky-200 border-sky-300/30',
    ringClass: 'border-sky-300',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkv_dFhk_wMOm2zeKSBFl85_SfFN7BaFl-ZocbMxYAYDsCPZS1OzlltX5knDL6yyw91V52FQK9hybjXUqaxLenL3kdAmgBlDDQA6yVlertwDopdrNZ8sTl6NeCWE18iDV7CxF2M1EntP1Myu4ZnqeoJSTH96vRf59_CYk8mxoDD_N2vWIy5GUu3DXtoAcdKvhdLN1_XJ-_izNjGYTZwemv7t6iF2dju9v09eV16QyL8KX_CbZGP8sykVrqa97CIHmysPg-qV3SQU',
  },
];


export default function InfluencerFeedback() {
  return (
    <div className="relative min-h-screen w-full bg-black overflow-hidden text-white">
      <Header />
      <main className="pt-24 w-full">

        <section className="bg-black px-6 py-24 lg:px-10">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="mb-5 text-4xl font-bold text-white">Frame-By-Frame Precision</h2>
              <p className="mb-8 text-lg text-[#e4bdc3]/80">
                Stop guessing. Provide pin-point feedback exactly where it matters. Our synchronized engine ensures the
                whole team sees the same frame, every time.
              </p>
              <div className="space-y-4">
                <div className="rounded-xl border-l-4 border-[#ff4c83] bg-[#28283b] p-4">
                  <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-[#ffb1c0]" />
                    <div>
                      <p className="text-sm font-bold text-white">Instant Sync</p>
                      <p className="text-xs text-[#e4bdc3]/70">Real-time collaboration across timezones.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-4 transition-colors hover:bg-[#1d1e30]/70">
                  <div className="flex items-center gap-3">
                    <PencilLine className="h-5 w-5 text-[#c3c1ff]" />
                    <div>
                      <p className="text-sm font-bold text-white">Visual Annotations</p>
                      <p className="text-xs text-[#e4bdc3]/70">Draw directly on the video canvas.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="relative overflow-hidden rounded-2xl border border-[#5b3f44]/40 bg-[#1d1e30] shadow-2xl">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz4kzW_jGuOLkPcxefllWaX5kMKDEggjzLhoQn2B1YQanc0c0CuRI8Ah05wIZGxjdQJusAnS5M9ugrhdb7659bsgSgw-auT2RRy3Cw-IWQk6BUjXTxbhY1xue_GrvFaA65GFTRKAj4gXXU3ZIG7kuQRRX1_BzIFelFcNxnRwDvj9MZ0y45-kRzyElZIB16mu2ZD5IkS33Gz1dDT1GWhA6QDSAKejCSdfq8z67z6gjYxC-QrkAm_oZBT4ngWeseBbVvWrw0W3h3mJ8"
                  alt="Video Editor UI"
                  unoptimized={true}
                  loading="lazy"
                  width={1000}
                  height={1000}

                  className="aspect-video w-full object-cover opacity-80"
                />
                <div className="absolute left-[30%] top-[20%] rounded-2xl border border-[#ffb1c0]/40 bg-[#1d1e30]/75 p-3 backdrop-blur-xl">
                  <p className="text-[10px] font-bold text-white">0:03 Alex M.</p>
                  <p className="text-[11px] text-[#e1e0f9]">Increase saturation in the neon signs here.</p>
                </div>
                <div className="absolute bottom-[40%] right-[15%] rounded-2xl border border-[#c3c1ff]/40 bg-[#1d1e30]/75 p-3 backdrop-blur-xl">
                  <p className="text-[10px] font-bold text-white">0:12 Sarah K.</p>
                  <p className="text-[11px] text-[#e1e0f9]">Smooth out the camera transition.</p>
                </div>
                <div className="absolute bottom-0 w-full border-t border-[#5b3f44]/30 bg-[#1d1e30]/75 p-5 backdrop-blur-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CirclePlay className="h-4 w-4 text-white" />
                      <ArrowRight className="h-4 w-4 text-white" />
                      <Volume2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-mono text-[#ffb1c0]">00:03:15 / 00:05:00</span>
                  </div>
                  <div className="relative h-1.5 overflow-hidden rounded-full bg-[#323346]">
                    <div className="h-full w-[40%] bg-linear-to-r from-[#ffb1c0] to-[#c3c1ff]" />
                    <div className="absolute left-[30%] top-0 h-full w-1 bg-white" />
                    <div className="absolute left-[65%] top-0 h-full w-1 bg-white/40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#191a2c]/30 px-6 py-28 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-3 text-4xl font-black text-white md:text-5xl">Centralized Review Studio</h2>
              <p className="mx-auto max-w-2xl text-lg text-[#e4bdc3]/75">
                Detailed feedback loops integrated directly into the production timeline.
              </p>
            </div>
            <video src="https://ishout.s3.us-east-2.amazonaws.com/whatsapp-media/video/2026-04-17/936465739226340_f48456f9-60aa-4d90-bf35-305d5805c270.mp4"
              className="w-full h-300 object-cover rounded-2xl object-center"
              controls
              autoPlay
              muted
              loop
              playsInline
              width={1000}
              height={1000}
            />
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-8">
                <div className="rounded-3xl border border-[#5b3f44]/30 bg-[#1d1e30]/70 p-7 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#e4bdc3]/70">Production Timeline</p>
                    <Clock3 className="h-4 w-4 text-[#ffb1c0]" />
                  </div>
                  <div className="relative mb-4 h-24 overflow-hidden rounded-2xl border border-[#5b3f44]/20 bg-[#0c0d1d]">
                    <div className="absolute left-[12%] top-0 h-full w-[2px] bg-[#ffb1c0]" />
                    <div className="absolute left-[45%] top-0 h-full w-[2px] bg-[#c3c1ff]" />
                    <div className="absolute left-[78%] top-0 h-full w-[2px] bg-[#ffb1c0]" />
                    <div className="absolute left-[30%] top-0 h-full w-[3px] bg-white shadow-[0_0_20px_white]" />
                  </div>
                  <div className="flex justify-between px-2 font-mono text-[10px] text-[#e4bdc3]/70">
                    <span>00:00:00</span>
                    <span>00:01:24</span>
                    <span>00:02:48</span>
                    <span>00:04:12</span>
                    <span>00:05:00</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {reviewCards.map((item) => (
                    <article
                      key={item.name + item.time}
                      className="rounded-3xl border border-white/15 bg-[#1d1e30]/75 p-6 backdrop-blur-xl"
                    >
                      <div className="flex gap-4">
                        <div className={`h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 p-0.5 ${item.ringClass}`}>
                          <Image
                            src={item.avatar}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">{item.name}</span>
                              <span className="rounded bg-[#323346] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#e4bdc3]/80">
                                {item.role}
                              </span>
                            </div>
                            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs font-bold text-white">
                              {item.time}
                            </span>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-[#e4bdc3]/80">{item.message}</p>
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${item.badgeClass}`}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="space-y-5 lg:col-span-4">
                <div className="rounded-3xl border border-[#5b3f44]/30 bg-[#1d1e30]/70 p-7 backdrop-blur-xl">
                  <h3 className="mb-6 text-xl font-bold text-white">Review Health</h3>
                  <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#e4bdc3]/75">
                    <span>Resolution Rate</span>
                    <span className="text-white">84%</span>
                  </div>
                  <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-[#323346]">
                    <div className="h-full w-[84%] rounded-full bg-linear-to-r from-[#ffb1c0] to-[#c3c1ff]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-[#28283b]/50 p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#e4bdc3]/70">
                        Total Comments
                      </p>
                      <p className="text-2xl font-black text-white">42</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#28283b]/50 p-4">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#e4bdc3]/70">
                        Avg Resolution
                      </p>
                      <p className="text-2xl font-black text-white">2.4h</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
