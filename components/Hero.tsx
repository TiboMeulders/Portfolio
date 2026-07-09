"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const PROMPT = 'tibo@meulders:~$ ./introduce --focus="ai · data · web"';

const INTRO =
  "Applied Computer Science graduate with hands-on experience in AI, Python and cybersecurity, built up during an international internship in Dubai. I like building things end to end, from RAG systems and AI agents to full-stack web apps.";

function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span className="w" key={i}>
          {w}{" "}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const promptRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (prefersReducedMotion()) {
      if (promptRef.current) promptRef.current.textContent = PROMPT;
      return;
    }

    let start: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set(".hero-name .ch", { yPercent: 112 });

      // built eagerly (paused) so GSAP resolves targets inside this context;
      // the boot event only presses play
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power4.out" },
      });

      // terminal prompt types itself
      const typed = { i: 0 };
      tl.to(typed, {
        i: PROMPT.length,
        duration: PROMPT.length * 0.028,
        ease: "none",
        onUpdate: () => {
          if (promptRef.current)
            promptRef.current.textContent = PROMPT.slice(0, Math.round(typed.i));
        },
      });

      // name rises out of its clip rows
      tl.to(
        ".hero-name .ch",
        { yPercent: 0, duration: 1.1, stagger: 0.045 },
        "-=0.25"
      );

      // role, streaming intro, cta, scroll cue
      tl.to(".hero-role", { opacity: 1, duration: 0.7 }, "-=0.55");
      tl.to(
        ".hero-intro .w",
        { opacity: 1, duration: 0.25, stagger: 0.022, ease: "none" },
        "-=0.4"
      );
      tl.to(".hero-cta", { opacity: 1, duration: 0.7 }, "-=0.5");
      tl.to(".hero-scroll", { opacity: 1, duration: 0.8 }, "-=0.3");

      start = () => tl.play();

      if (document.documentElement.dataset.booted) {
        start();
      } else {
        window.addEventListener("site:booted", start, { once: true });
      }

      // subtle parallax out on scroll
      gsap.to(".hero-name", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom 30%",
          scrub: true,
        },
      });
    }, root);

    return () => {
      if (start) window.removeEventListener("site:booted", start);
      ctx.revert();
    };
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
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <section className="hero container" id="top" ref={rootRef}>
      <p className="hero-prompt" aria-label={PROMPT}>
        <span className="accent">&gt;</span> <span ref={promptRef} />
        <span className="caret" aria-hidden="true" />
      </p>

      <h1 className="hero-name">
        <span className="row">
          {"TIBO".split("").map((c, i) => (
            <span className="ch" key={i}>
              {c}
            </span>
          ))}
        </span>
        <span className="row">
          {"MEULDERS".split("").map((c, i) => (
            <span className="ch" key={i}>
              {c}
            </span>
          ))}
        </span>
      </h1>

      <p className="hero-role">
        <span className="role">AI &amp; Full-stack Engineer</span>
        <span className="loc">// Lembeek, Belgium · open to relocate</span>
      </p>

      <p className="hero-intro">
        <Words text={INTRO} />
      </p>

      <div className="hero-cta">
        <a
          className="btn primary"
          href="#contact"
          onPointerMove={magnet}
          onPointerLeave={demagnet}
        >
          get in touch ↗
        </a>
        <a
          className="btn"
          href="#experience"
          onPointerMove={magnet}
          onPointerLeave={demagnet}
        >
          view experience
        </a>
      </div>

      <p className="hero-scroll">
        <span className="track" aria-hidden="true" />
        SCROLL
      </p>
    </section>
  );
}
