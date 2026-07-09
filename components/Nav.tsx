"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "about", n: "01" },
  { href: "#experience", label: "experience", n: "02" },
  { href: "#skills", label: "skills", n: "03" },
  { href: "#education", label: "education", n: "04" },
  { href: "#contact", label: "contact", n: "05" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { offset: -70 });
    } else {
      (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="nav-logo" onClick={(e) => go(e, "#top")}>
        TM<em>.</em>
      </a>
      <nav className="nav-links" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            <span>{l.n}</span>
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
