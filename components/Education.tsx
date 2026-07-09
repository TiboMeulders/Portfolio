"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import SectionHead from "./SectionHead";

const SCHOOLS = [
  {
    years: "2022–2026",
    school: "HOGENT",
    degree: "Bachelor of Applied Computer Sciences",
    note: "degree",
  },
  {
    years: "2020–2022",
    school: "TI Don Bosco Halle",
    degree: "Technical Industrial Computer Techniques",
    note: "secondary",
  },
  {
    years: "2016–2020",
    school: "Sint-Godelieve-Instituut Lennik",
    degree: "Sciences",
    note: "secondary",
  },
  {
    years: "2021",
    school: "Cisco IT Essentials",
    degree: "Certificate",
    note: "certificate",
  },
];

export default function Education() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".edu-row", {
        opacity: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".edu-list", start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section container" id="education" ref={rootRef}>
      <SectionHead eyebrow="04 / education" lines={["Where I", "Learned"]} />
      <div className="edu-list">
        {SCHOOLS.map((s) => (
          <div className="edu-row" key={s.school}>
            <span className="edu-years">{s.years}</span>
            <div>
              <h3 className="edu-school">{s.school}</h3>
              <p className="edu-degree">{s.degree}</p>
            </div>
            <span className="edu-note">{s.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
