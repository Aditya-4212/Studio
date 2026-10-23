"use client";

import { useEffect } from "react";

// Adds an IntersectionObserver-driven ".in-view" class to any element with
// class="reveal" — a lightweight, dependency-free scroll-animation utility
// used alongside Framer Motion for simple fade-up reveals.
export default function ScrollRevealProvider() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
