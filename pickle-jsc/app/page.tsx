"use client";
import React from "react";
import { useState } from "react";
import { Home } from "./home/page";
import { ThreeJSScene } from "./telescope/page";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      <Home />
      <ThreeJSScene />
    </div>
  );
}