"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Globe from "@/components/ui/globe";

export default function Globes() {
  return (
    <div className="relative w-full h-fit">
      <div className="absolute inset-0 w-full h-[700px] overflow-hidden">
        <ShootingStars />
        <StarsBackground />
        <Globe className="w-full h-full object-cover transform -translate-y-[-50%]" />
      </div>
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}