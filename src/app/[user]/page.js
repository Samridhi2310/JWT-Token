"use client";
import { useEffect } from "react";

export default function Page({ params }) {
  useEffect(() => {
    console.log("User page loaded:", params);
  }, [params]); // Dependency added

  return <h1>welcome {params.user}</h1>; // Use correct parameter name
}
