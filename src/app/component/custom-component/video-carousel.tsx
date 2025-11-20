"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface VideoItem {
  src: string;
  title?: string;
  poster?: string;
}

interface VideoCarouselProps {
  videos?: VideoItem[];
  initialScroll?: number;
}

const defaultVideos: VideoItem[] = [
  {
    src: "https://ik.imagekit.io/2bm6zmhwk/Ahmad's%20video%20copy.mp4",
  },
  {
    src: "https://ik.imagekit.io/2bm6zmhwk/pavillion.mp4",
  },
  {
    src: "https://ik.imagekit.io/2bm6zmhwk/Jumana's%20video%20copy.MP4",
  },
  {
    src: "https://ik.imagekit.io/2bm6zmhwk/alsaf.MOV",
  },
  {
    src: "https://ik.imagekit.io/2bm6zmhwk/Sukaina%20Final%20Video.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Final%20Draft.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Ahmad%20version%203.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Snapinsta.app_video_121208147_299905039231417_6247490752328145492_n.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Snapins.ai_video_AQPdT4qx_wERTO_ojUxIEPYsPnkAar6GrpZnk1hup0rPzXNJAfabyGxLSb2gNPIxEf5tUkTqwmRD8fBF2fjJ4KbMDXPV9lfyCx4-u1Q.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Bader.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/WhatsApp%20Video%202023-08-25%20at%206.51.54%20PM.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/WhatsApp%20Video%202023-12-14%20at%201.25.54%20PM.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/ssstik.io_@oshabra_1742902096198.mp4",
  },
  {
    src: "https://ik.imagekit.io/t7jlwbkq7/Sukaina%20Final%20Video.mp4",
  },
];

export default function VideoCarousel({
  videos = defaultVideos,
  initialScroll = 0,
}: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full">
      <div>
        <div className="w-full h-full py-20">
          <h2 className="italic text-center max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Case Studies
          </h2>
          <p className="italic mt-4 text-center justify-center items-center text-neutral-600 dark:text-neutral-400 text-base md:text-md font-sans max-w-2xl mx-auto">
            <span className="font-bold">Proven Results at Scale,</span>
            <span className="font-thin justify-center items-center">
              We &apos;ve helped over 600 brands amplify their reach and
              performance with <span className="font-bold">AI-powered </span>
              influencers. marketing
            </span>
          </p>
        </div>
        <h1 className="italic text-center md:text-md font-thin text-3xl text-neutral-800 dark:text-neutral-200 font-sans">
          3x engagment in 2 weeks
        </h1>
      </div>
      <div
        className="flex w-full overflow-x-auto overscroll-x-contain scroll-smooth py-10 [scrollbar-width:none] md:py-20 snap-x snap-mandatory"
        ref={carouselRef}
      >
        <div
          className={cn(
            "flex flex-row justify-start gap-4 px-4 md:px-8",
            "w-full "
          )}
        >
          {videos.map((video, index) => (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                },
              }}
              key={`video-${index}`}
              className="rounded-3xl flex-shrink-0 snap-start"
            >
              <div className="relative z-10 flex h-64 w-[72vw] max-w-xs flex-col items-center justify-center overflow-hidden rounded-3xl bg-gray-100 sm:h-80 sm:w-64 md:h-[40rem] md:w-96 dark:bg-neutral-900">
                <video
                  src={video.src}
                  className="h-full w-full object-cover rounded-3xl"
                  muted
                  // loop
                  controls
                  // autoPlay
                  poster={video.poster}
                  preload="auto"
                  crossOrigin="anonymous"
                  playsInline
                />
                {video.title && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-full bg-gradient-to-b from-transparent via-transparent to-black/50" />
                )}
                {video.title && (
                  <div className="absolute bottom-0 left-0 right-0 z-40 p-8">
                    <p className="text-left font-sans text-sm font-medium text-white md:text-base">
                      {video.title}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
