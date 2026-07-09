"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-big .line > span", {
        yPercent: 108,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".contact-inner", start: "top 75%" },
      });
      gsap.from([".contact-sub", ".contact-actions", ".contact-meta", ".langs"], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-inner", start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const magnet = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.25,
      y: (e.clientY - r.top - r.height / 2) * 0.35,
      duration: 0.4,
    });
  };
  const demagnet = (e: React.PointerEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <section className="section contact" id="contact" ref={rootRef}>
      <div className="container contact-inner">
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          05 / contact
        </p>
        <h2 className="contact-big">
          <span className="line">
            <span>Let&apos;s build</span>
          </span>
          <span className="line">
            <span className="stroke">something</span>
          </span>
          <span className="line">
            <span>together.</span>
          </span>
        </h2>
        <p className="contact-sub">
          Looking for a junior engineer who can take an idea from prompt to
          production? My inbox is open.
        </p>
        <div className="contact-actions">
          <a
            className="btn primary"
            href="mailto:tibo.meulders@icloud.com"
            onPointerMove={magnet}
            onPointerLeave={demagnet}
          >
            tibo.meulders@icloud.com
          </a>
          <a
            className="btn"
            href="tel:+32474739389"
            onPointerMove={magnet}
            onPointerLeave={demagnet}
          >
            +32 474 73 93 89
          </a>
        </div>
        <div className="contact-meta">
          <span>Lembeek, Belgium</span>
          <a href="https://github.com/TiboMeulders" target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a href="https://linkedin.com/in/tibo-meulders-626301331" target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
        </div>
        <div className="langs">
          <span>
            <b>NL</b> native
          </span>
          <span>
            <b>EN</b> fluent
          </span>
          <span>
            <b>FR</b> professional
          </span>
        </div>
      </div>
      <footer className="footer">
        <span>
          © 2026 Tibo Meulders · designed &amp; built by me
        </span>
        <span>
          <span className="amber">stack:</span> next.js · typescript · gsap ·
          lenis
        </span>
      </footer>
    </section>
  );
}
