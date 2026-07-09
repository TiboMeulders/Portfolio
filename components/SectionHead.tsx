"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function SectionHead({
  eyebrow,
  lines,
}: {
  eyebrow: string;
  lines: string[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".eyebrow", {
        opacity: 0,
        x: -24,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%" },
      });
      gsap.from(".section-title .line > span", {
        yPercent: 108,
        duration: 0.9,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="section-head" ref={rootRef}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">
        {lines.map((l, i) => (
          <span className="line" key={i}>
            <span>{l}</span>
          </span>
        ))}
      </h2>
    </div>
  );
}
