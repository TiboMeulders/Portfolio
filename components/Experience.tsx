"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const JOBS = [
  {
    year: "2026",
    place: "Dubai, UAE",
    title: "Internship · Digital Trust, Cyber & AI",
    org: "KPMG Lower Gulf",
    points: [
      <>
        Main developer of a <strong>Third Party Risk Management platform</strong>,
        built end to end.
      </>,
      <>
        Used <strong>AI to assess vendor risk</strong> and analyse uploaded
        evidence documents.
      </>,
      <>
        Deep <strong>prompt engineering</strong> work to keep model output
        reliable and consistent.
      </>,
      <>
        Built a <strong>Python backend that flags documents</strong> by how
        sensitive their data is.
      </>,
    ],
    tags: ["Python", "LLM integration", "Prompt engineering", "RAG", "Azure"],
  },
  {
    year: "2022",
    place: "Belgium",
    title: "Internship · IT Helpdesk",
    org: "Inetum-Realdolmen",
    points: [
      <>
        Two-week curriculum internship at a{" "}
        <strong>European digital services company</strong>.
      </>,
      <>
        Responsible for <strong>inventory maintenance</strong> and assisting at
        the helpdesk.
      </>,
    ],
    tags: ["IT support", "Hardware", "Inventory"],
  },
];

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(".xp-rail", {
        "--rail": 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".xp-list",
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.5,
        },
      });
      gsap.utils.toArray<HTMLElement>(".xp-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 56,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="experience" ref={rootRef}>
      <SectionHead eyebrow="02 / experience" lines={["Where I've", "Worked"]} />
      <div className="xp-list">
        <span className="xp-rail" aria-hidden="true" />
        {JOBS.map((job) => (
          <article className="xp-card" key={job.title}>
            <p className="xp-meta">
              <span className="year">{job.year}</span>
              <span>{job.place}</span>
            </p>
            <h3 className="xp-title">{job.title}</h3>
            <p className="xp-org">{job.org}</p>
            <ul className="xp-points">
              {job.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <div className="xp-tags">
              {job.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
