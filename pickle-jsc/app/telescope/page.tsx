import React from "react";
import { Model } from "./Model";

export function ThreeJSScene() {
  return (
    <div className="relative w-full h-screen bg-white flex flex-row items-center justify-center">
      {/* Text and Button Section */}
      <div className="w-1/4 text-left mt-8 text-black mr-24 -mt-36">
        <h1 className="text-8xl font-bold mb-4">JWST.</h1>
        <p className="mb-4 text-sm">
          The James Webb Space Telescope, the most powerful in space, unravels the universe's story—from the Big Bang to our solar system—bringing us closer to understanding our origins and the forces that shaped cosmic history.
        </p>
        <a href="https://science.nasa.gov/mission/webb/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 mt-4 text-white bg-black rounded hover:bg-white hover:text-black hover:border hover:border-black">
          Learn More
        </a>
      </div>

      {/* Vertical image card */}
      <div className="relative w-1/3 h-4/5 bg-no-repeat bg-center bg-contain mt-16" style={{ backgroundImage: "url('/constellation.svg')" }}>
        {/* 3D Model */}
        <div className="relative -bottom-36 left-36 w-full h-full">
          <Model />
        </div>
      </div>
    </div>
  );
}

