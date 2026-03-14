"use client";

import { useEffect, useState, useCallback } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      setVisible(false);
      return;
    }

    setVisible(scrollTop > 100);
    setProgress(Math.min((scrollTop / docHeight) * 100, 100));
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateProgress]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 z-50 h-0.5 w-full">
      <div
        className="h-full bg-primary-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
