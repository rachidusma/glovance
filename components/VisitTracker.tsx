"use client";

import { useEffect, useRef } from "react";

export default function VisitTracker() {
  const isTracked = useRef(false);

  useEffect(() => {
    // Only run once per session
    if (sessionStorage.getItem("visitTracked") || isTracked.current) {
      return;
    }

    const trackVisit = async () => {
      try {
        await fetch("/api/visits", { method: "POST" });
        sessionStorage.setItem("visitTracked", "true");
        isTracked.current = true;
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    trackVisit();
  }, []);

  return null;
}
