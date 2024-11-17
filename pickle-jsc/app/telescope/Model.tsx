import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function Model() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number }>({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 5, 5).normalize();
    scene.add(directionalLight);

    // Raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Load GLTF model
    const loader = new GLTFLoader();
    let model: THREE.Object3D;
    loader.load("/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.position.set(1, -1, 0);
      scene.add(model);

      // Assign names to each mesh
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.name = child.name || "Unnamed Part"; // Example naming
        }
      });
    });

    // Camera position
    camera.position.z = 25;

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Handle mouse move
    const onMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update tooltip position
      setTooltip((prev) => ({
        ...prev,
        x: event.clientX + 10,
        y: event.clientY + 10,
      }));

      // Perform raycasting
      if (model) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(model.children, true);

        if (intersects.length > 0) {
          const intersected = intersects[0].object;
          setTooltip({
            visible: true,
            content: intersected.name || "Unknown Part",
            x: event.clientX + 10,
            y: event.clientY + 10,
          });
        } else {
          setTooltip((prev) => ({ ...prev, visible: false }));
        }
      }
    };

    // Add event listener for mouse move
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.0025;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            top: tooltip.y,
            left: tooltip.x,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            padding: "5px",
            borderRadius: "5px",
            pointerEvents: "none",
            fontSize: "12px",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
