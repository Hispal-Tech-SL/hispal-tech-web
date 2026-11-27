import { useEffect, useState } from "react";

/** Height of the fixed header, so a section's heading never ends up hidden under it. */
export const HEADER_OFFSET = 72;

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly scrolls to a section of the page ("inicio" is the very top). */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = id === "inicio" ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}

/** Event the header listens to, so the mobile menu closes before the page scrolls. */
export const NAVIGATE_EVENT = "hg:navigate";

/**
 * Every in-page link (`href="#..."`) inside the page scrolls smoothly and lands below the header. The mobile menu
 * locks the body's scroll while open, so the lock is released first and the scroll runs on the next frame.
 */
export function useSmoothAnchors(root: HTMLElement | null) {
  useEffect(() => {
    if (!root) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      if (!id || !document.getElementById(id)) return;
      e.preventDefault();
      window.dispatchEvent(new Event(NAVIGATE_EVENT));
      document.body.style.overflow = "";
      requestAnimationFrame(() => scrollToSection(id));
    };
    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [root]);

  // Opening the page with a hash (#packs) lands on that section once the layout is ready.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => scrollToSection(id), 150);
    return () => window.clearTimeout(t);
  }, []);
}

/** The section currently under the header, to highlight it in the menu. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const line = HEADER_OFFSET + 24;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}
