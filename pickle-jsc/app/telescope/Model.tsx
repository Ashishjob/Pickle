import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function Model() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable alpha for transparency
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Reduced intensity for dimmer background
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Increased intensity for brighter model
    directionalLight.position.set(0, 5, 5).normalize();
    scene.add(directionalLight);

    // Load GLTF model
    const loader = new GLTFLoader();
    let model: THREE.Object3D;
    loader.load("/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.position.set(1, -1, 0); // Move model to bottom right
      scene.add(model);
    });

    // Camera position
    camera.position.z = 25; // Start zoomed out more

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable scroll-to-zoom

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += 0.0025; // Rotate model around the Y-axis
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}