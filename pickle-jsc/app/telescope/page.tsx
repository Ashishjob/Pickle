import React from "react";
import { Model } from "./Model";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export function ThreeJSScene() {
  return (
    <div className="relative w-full h-screen bg-[#171717] flex flex-row items-center justify-center">
      <div className="w-1/4 text-left mt-8 text-white mr-24 -mt-48">
        <h1 className="text-8xl font-bold mb-4">JWST.</h1>
        <p className="mb-4 text-sm">
          The James Webb Space Telescope, the most powerful in space, unravels the universe's story—from the Big Bang to our solar system—bringing us closer to understanding our origins and the forces that shaped cosmic history.
        </p>
        <a href="https://science.nasa.gov/mission/webb/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 mt-4 text-black bg-white rounded hover:bg-black hover:text-white hover:border hover:border-white">
          Learn More
        </a>
      </div>
      <ShootingStars />
      <StarsBackground />
      <div className="relative w-1/3 h-4/5 bg-no-repeat bg-center bg-contain mt-16" style={{ backgroundImage: "url('/constellation.svg')" }}>
        <div className="relative -bottom-36 left-36 w-full h-full">
          <Model />
        </div>
      </div>
    </div>
  );
}

