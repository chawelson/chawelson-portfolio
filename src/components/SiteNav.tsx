"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const links = useMemo(
    () => [
      { href: "/#about", label: "About", sectionId: "about" },
      { href: "/#experience", label: "Experience", sectionId: "experience" },
      { href: "/#work", label: "Work", sectionId: "work" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Hire Me", accent: true },
    ],
    []
  );

  useEffect(() => {
    if (pathname === "/") {
      setActiveSection(null);
      return;
    }
    if (pathname?.startsWith("/blog")) {
      setActiveSection("/blog");
      return;
    }
    if (pathname === "/contact") {
      setActiveSection("/contact");
      return;
    }
    setActiveSection(null);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = links.map((link) => link.sectionId).filter(Boolean) as string[];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top?.target?.id) setActiveSection(top.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links, pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (link: { href: string; sectionId?: string }) => {
    if (link.sectionId) {
      return pathname === "/" && activeSection === link.sectionId;
    }
    if (link.href === "/blog") return pathname?.startsWith("/blog");
    if (link.href === "/contact") return pathname === "/contact";
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link href="/" className="text-xl font-black italic tracking-tighter uppercase">
          CHAWELSON.
        </Link>
        <div className="hidden md:flex gap-8 text-xs font-mono uppercase tracking-widest text-slate-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link)
                  ? link.accent
                    ? "text-blue-400"
                    : "text-white"
                  : link.accent
                    ? "hover:text-blue-400 transition text-blue-500"
                    : "hover:text-white transition"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-xs font-mono uppercase tracking-widest text-slate-300 border border-white/10 px-3 py-2 rounded-lg hover:text-white hover:border-white/30 transition"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      <div
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        className={`md:hidden fixed top-20 right-0 h-[calc(100vh-5rem)] w-72 max-w-[80vw] bg-black/95 border-l border-white/5 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-6 py-6">
          <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-slate-300">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={
                  isActive(link)
                    ? link.accent
                      ? "text-blue-400"
                      : "text-white"
                    : link.accent
                      ? "hover:text-blue-400 transition text-blue-500"
                      : "hover:text-white transition"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
