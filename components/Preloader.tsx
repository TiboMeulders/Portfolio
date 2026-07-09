"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const LINES = [
  "> tibo@portfolio:~$ ./boot",
  "> loading modules: next.js · gsap · lenis",
  "> compiling experience: kpmg · hogent · ai systems",
  "> access granted. welcome",
];

function markBooted() {
  document.documentElement.dataset.booted = "1";
  window.dispatchEvent(new Event("site:booted"));
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      markBooted();
      setDone(true);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          markBooted();
          setDone(true);
        },
      });
      tl.to(".ln", { opacity: 1, duration: 0.06, stagger: 0.34, ease: "none" })
        .to(rootRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.35,
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-term">
        {LINES.map((l, i) => (
          <span key={i} className={`ln${i === LINES.length - 1 ? " ok" : ""}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
