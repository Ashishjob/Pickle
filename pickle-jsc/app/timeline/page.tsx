"use client";

import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const events = [
  { date: "1996", description: "Initiation of the Next Generation Space Telescope project" },
  { date: "2004", description: "Construction started" },
  { date: "2011", description: "Completion of the 18-segment primary mirror" },
  { date: "December 25, 2021", description: "Launched" },
  { date: "July 12, 2022", description: "NASA first images released" },
];

const Timeline = () => {
  return (
    <div className="min-h-screen bg-[#171717] flex flex-col items-center px-4 py-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="relative z-10 w-full max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gray-600 h-full"></div>

        {/* Timeline Events */}
        <div className="space-y-12">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex items-center w-full ${
                index % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              {/* Event Content */}
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "text-right pr-6" : "text-left pl-6"
                }`}
              >
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold">{event.date}</p>
                  <p className="mt-2">{event.description}</p>
                </div>
              </div>

              {/* Star Image */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-32">
                <img src="/star.svg" alt="Star" className="w-full h-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;