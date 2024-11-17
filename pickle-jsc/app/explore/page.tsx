"use client";
import React, { useEffect, useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function ExplorePage() {
    return (
        <div className="relative w-full h-screen overflow-x-auto">
            <div className="flex w-max">
                <img
                    src="/panoramic.svg"
                    alt="Panoramic View"
                    className="h-screen"
                />
                <ShootingStars />
                <StarsBackground />
            </div>
        </div>
    );
}