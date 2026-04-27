'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { CaseStudiesVideos } from '@/src/constant/videoUrls';

interface VideoCarouselProps {
  videos?: typeof CaseStudiesVideos;
  initialScroll?: number;
  heading?: string;
  id?: string;
}

export default function VideoCarousel({
  videos = CaseStudiesVideos,
  initialScroll = 0,
  heading = '3x engagement in 2 weeks',
  id = 'case-studies',
}: VideoCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
    }
  }, [initialScroll]);

  return (
    <div id={id} className="relative w-full overflow-hidden">
      {heading && (
        <h1 className="italic text-center text-3xl font-thin text-neutral-300 mb-12">
          {heading}
        </h1>
      )}
      <div className="hidden md:block pointer-events-none absolute left-0 top-0 h-full w-120 bg-linear-to-r from-black via-black/80 to-transparent z-20" />
      <div className="hidden md:block pointer-events-none absolute right-0 top-0 h-full w-120 bg-linear-to-l from-black via-black/80 to-transparent z-20" />
      <div
        ref={carouselRef}
        className="flex justify-center overflow-x-auto scroll-smooth snap-x snap-mandatory gap-10 px-16 pb-20 [scrollbar-width:none]"
      >
        {videos.map((video, index) => (
          <motion.div
            key={`video-${index}`}
            className="shrink-0 snap-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                delay: index * 0.15,
                ease: 'easeOut',
              },
            }}
            whileHover={{ scale: 1.06 }}
          >
            <div
              className="relative flex 
              h-88 w-56 
              md:h-82  md:w-48
              overflow-hidden rounded-3xl 
              bg-neutral-900 shadow-xl"
            >
              <video
                src={video.src}
                className="h-full w-full object-cover"
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
  );
}
