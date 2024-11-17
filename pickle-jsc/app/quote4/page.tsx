"use client";
import React, { useEffect, useState, useRef } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function Quote4() {
  const [opacity, setOpacity] = useState(1);
  const quoteRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (quoteRef.current) {
        const rect = quoteRef.current.getBoundingClientRect();
        const newOpacity = Math.max(1 - (300 - rect.top) / 300, 0);
        setOpacity(newOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-1/2 rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <h2
        ref={quoteRef}
        className="relative z-10 my-56 text-3xl md:text-5xl md:leading-tight max-w-5xl mx-auto text-center text-shadow tracking-tight font-medium text-white"
        style={{ opacity, transition: 'opacity 0.5s' }}
      >
        How does the universe work?
      </h2>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}