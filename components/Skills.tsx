"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const GROUPS = [
  {
    idx: "prog",
    name: "Programming",
    items: [
      "Python",
      "Java (Spring Boot)",
      "C# (.NET / Blazor)",
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML & CSS",
    ],
  },
  {
    idx: "web",
    name: "Frameworks & Libraries",
    items: ["React", "Next.js", "FastAPI", "Scrapy", "Blazor", "GSAP"],
  },
  {
    idx: "ai",
    name: "AI & Data",
    items: [
      "RAG systems",
      "AI agents",
      "Prompt engineering",
      "Azure OpenAI",
      "Anthropic",
      "Ollama",
    ],
  },
  {
    idx: "ops",
    name: "Tools & Cloud",
    items: ["Git / GitHub", "Azure", "VS Code", "SAP", "MS Office"],
  },
];

const MARQUEE = [
  "Python",
  "Java",
  "C#",
  "TypeScript",
  "React",
  "Next.js",
  "Blazor",
  "FastAPI",
  "RAG",
  "AI Agents",
  "Azure",
  "Spring Boot",
  "SQL",
  "Anthropic",
  "Ollama",
];

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-card", {
        opacity: 0,
        y: 48,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".skills-grid", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // cards tilt toward the cursor
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * 7,
      rotateX: -py * 7,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2.out",
    });
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="section" id="skills" ref={rootRef}>
      <div className="container">
        <SectionHead eyebrow="03 / skillset" lines={["What I", "Work With"]} />
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="skills-grid">
          {GROUPS.map((g) => (
            <div
              className="skill-card"
              key={g.idx}
              onPointerMove={tilt}
              onPointerLeave={untilt}
            >
              <div className="skill-card-head">
                <h3>{g.name}</h3>
                <span className="idx">[{g.idx}]</span>
              </div>
              <div className="chips">
                {g.items.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
