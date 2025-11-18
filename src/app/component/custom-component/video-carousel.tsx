"use client";
import { useEffect, useState, useRef } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
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
];

export default function VideoCarousel({
  videos = defaultVideos,
  initialScroll = 0,
}: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

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
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div
          className={cn(
            "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
          )}
        ></div>

        <div
          className={cn(
            "flex flex-row justify-start gap-4 ",
            "mx-auto max-w-7xl"
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
              className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
            >
              <div className="relative z-10 flex h-80 w-56 flex-col items-center justify-center overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900">
                <video
                  src={video.src}
                  className="h-full w-full object-cover rounded-3xl"
                  muted
                  // loop
                  controls
                  // autoPlay
                  poster={video.poster}
                  preload="auto"
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
      <div className="mr-10 flex justify-end gap-2">
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}
