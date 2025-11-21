"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CaseStudiesVideos } from "@/src/helper/videoUrls";

interface VideoCarouselProps {
  videos?: typeof CaseStudiesVideos;
  initialScroll?: number;
  heading?: string;
}

export default function VideoCarousel({
  videos = CaseStudiesVideos,
  initialScroll = 0,
  heading = "3x engagment in 2 weeks",
}: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full">
      {heading && (
        <h1 className="italic text-center md:text-md font-thin text-3xl text-neutral-800 dark:text-neutral-200 font-sans">
          {heading}
        </h1>
      )}
      <div
        className="flex w-full overflow-x-auto overscroll-x-contain scroll-smooth pt-6 pb-10 md:pt-10 md:pb-20 [scrollbar-width:none] snap-x snap-mandatory"
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
                  autoPlay
                  loop
                  preload="auto"
                  crossOrigin="anonymous"
                  playsInline
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
