"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
};

interface ScrollableMovieListProps {
  movies: Movie[];
}

const ScrollableMovieList: React.FC<ScrollableMovieListProps> = ({
  movies,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll functionality
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    let animationFrameId: number;
    let lastTimestamp = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const scroll = (timestamp: number) => {
      if (!isPaused && scrollContainer) {
        if (timestamp - lastTimestamp >= interval) {
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth - 10
          ) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += scrollStep;
          }
          lastTimestamp = timestamp;
        }
        animationFrameId = requestAnimationFrame(scroll);
      }
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const manualScroll = (direction: "left" | "right"): void => {
    if (scrollContainerRef.current) {
      const scrollAmount = 800;
      const targetScroll =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full bg-neutral-900">
      <button
        onClick={() => manualScroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-r-lg hover:bg-black/70 transition-colors"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 p-4 scroll-smooth hide-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-none w-[200px] cursor-pointer text-center text-white"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg w-full h-[300px] object-cover"
            />
            <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
          </div>
        ))}
      </div>

      <button
        onClick={() => manualScroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-l-lg hover:bg-black/70 transition-colors"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollableMovieList;
