"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const STATEMENT = [
  { t: "I like practical, solution-oriented work: " },
  { t: "building things end to end", hl: true },
  { t: " and taking them from RAG systems and AI agents to full-stack web apps. During my internship at " },
  { t: "KPMG in Dubai", hl: true },
  { t: " I shipped an AI-powered risk platform as main developer. Now I'm looking to start my career in " },
  { t: "AI, data or software engineering.", hl: true },
];

const FACTS: [string, string][] = [
  ["Degree", "Bachelor Applied Computer Science"],
  ["School", "HOGENT (2022–2026)"],
  ["Base", "Lembeek, Belgium"],
  ["Languages", "Dutch · English · French"],
  ["Certificate", "Cisco IT Essentials (2021)"],
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // words "stream in" like tokens as you scroll through the paragraph
      gsap.to(".about-copy .w", {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-copy",
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
      gsap.from(".fact", {
        opacity: 0,
        y: 26,
        duration: 0.65,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-facts", start: "top 85%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="about" ref={rootRef}>
      <SectionHead eyebrow="01 / profile" lines={["Who I", "Am"]} />
      <div className="about-grid">
        <p className="about-copy">
          {STATEMENT.map((part, pi) =>
            part.t.split(" ").map((w, wi) =>
              w === "" ? null : (
                <span
                  className={`w${part.hl ? " hl" : ""}`}
                  key={`${pi}-${wi}`}
                >
                  {w}{" "}
                </span>
              )
            )
          )}
        </p>
        <dl className="about-facts">
          {FACTS.map(([k, v]) => (
            <div className="fact" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
