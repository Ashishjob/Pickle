"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [49 / 255, 74 / 255, 138 / 255],
  markerColor: [1, 1, 0], // Yellow color for markers
  glowColor: [90 / 255, 147 / 255, 218 / 255],
  markers: [
    // NASA Kennedy Space Center, USA
    { location: [28.5721, -80.648], size: 0.03 },
    // European Space Agency (ESA) Guiana Space Centre, French Guiana
    { location: [5.236, -52.768], size: 0.03 },
    // Baikonur Cosmodrome, Kazakhstan
    { location: [45.92, 63.342], size: 0.03 },
    // JAXA Tanegashima Space Center, Japan
    { location: [30.375, 130.962], size: 0.03 },
    // SpaceX Boca Chica Launch Site, USA
    { location: [25.997, -97.156], size: 0.03 },
    // Indian Space Research Organisation (ISRO) Satish Dhawan Space Centre, India
    { location: [13.731, 80.23], size: 0.03 },
    // China Wenchang Space Launch Site, China
    { location: [19.614, 110.951], size: 0.03 },
    // Russian Vostochny Cosmodrome, Russia
    { location: [51.883, 128.333], size: 0.03 },
    // European Space Operations Centre (ESOC), Germany
    { location: [49.873, 8.622], size: 0.03 },
    // Brazilian Alcântara Launch Center, Brazil
    { location: [-2.37, -44.396], size: 0.03 },
    // Canadian Spaceport Nova Scotia, Canada
    { location: [45.293, -61.077], size: 0.03 },
    // Iranian Imam Khomeini Space Center, Iran
    { location: [35.234, 53.921], size: 0.03 },
    // Australian Woomera Range Complex, Australia
    { location: [-30.949, 136.515], size: 0.03 },
    // SpaceX Vandenberg Space Force Base, USA
    { location: [34.742, -120.573], size: 0.03 },
    // South Korea Naro Space Center, South Korea
    { location: [34.431, 127.535], size: 0.03 },
  ],
};

export default function Globe({
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const satelliteRef = useRef<THREE.Mesh>();

  const updatePointerInteraction = (value: any) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: any) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;

      // Update satellite position
      if (satelliteRef.current) {
        const radius = 1.2; // Distance from the Earth
        const angle = phi * 10; // Adjust orbit speed relative to phi
        satelliteRef.current.position.set(
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          0 // Keep the satellite in the equatorial plane
        );
      }
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    // Create the globe
    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    // Add the orbiting satellite
    const scene = new THREE.Scene();
    const satelliteGeometry = new THREE.SphereGeometry(0.02, 16, 16); // Small sphere for the satellite
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satelliteRef.current = satellite;
    scene.add(satellite);

    setTimeout(() => (canvasRef.current!.style.opacity = "1"));
    return () => globe.destroy();
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#171717]">
      <div className="z-50">
        <ShootingStars />
        <StarsBackground />
      </div>
      <div className="absolute inset-0 w-full h-[200%] overflow-hidden">
        <canvas
          className={cn(
            "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size] bg-transparent"
          )}
          ref={canvasRef}
          onPointerDown={(e) =>
            updatePointerInteraction(
              e.clientX - pointerInteractionMovement.current
            )
          }
          onPointerUp={() => updatePointerInteraction(null)}
          onPointerOut={() => updatePointerInteraction(null)}
          onMouseMove={(e) => updateMovement(e.clientX)}
          onTouchMove={(e) =>
            e.touches[0] && updateMovement(e.touches[0].clientX)
          }
        />
      </div>
      {/* Text overlay at the bottom */}
      <div className="absolute bottom-36 w-full text-center z-20">
        <h1 className="text-white text-lg tracking-[.3em] text-shadow">
          SHOOT FOR THE STARS
        </h1>
      </div>
    </div>
  );
}
