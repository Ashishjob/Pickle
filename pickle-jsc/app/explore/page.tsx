"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function ExplorePage() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0">
                <video
                    src="/jwst.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                    style={{ height: '100%' }}
                />
                <ShootingStars />
                <StarsBackground />
            </div>
        </div>
    );
}
