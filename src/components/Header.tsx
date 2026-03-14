"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Ciudades", href: "/ciudades" },
  { label: "Seguros dentales", href: "/seguros-dentales" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 press-scale group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-glow-primary overflow-hidden">
            <div className="absolute inset-0 bg-white/20 blur-[2px] rounded-xl transform translate-y-[-50%] group-hover:translate-y-[50%] transition-transform duration-500 ease-in-out" />
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white relative z-10" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 1-3.5 2.5C8 7 7 8 5.5 8.5 4 9 3 10.5 3 12c0 2 1 3.5 2 4.5 1 1 1.5 2.5 2 4 .5 1.5 1.5 2.5 3 2.5.8 0 1.3-.3 2-.8.7.5 1.2.8 2 .8 1.5 0 2.5-1 3-2.5.5-1.5 1-3 2-4 1-1 2-2.5 2-4.5 0-1.5-1-3-2.5-3.5C17 8 16 7 15.5 5.5 15 4 13.5 3 12 3Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-accent-900 transition-colors">
            Precio<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Dental</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex bg-white/50 backdrop-blur-md border border-white/60 px-2 py-1.5 rounded-full shadow-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-accent-600 hover:text-primary-700 hover:bg-white/80 transition-all duration-200 press-scale"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/comparar"
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-accent-600 hover:text-accent-900 hover:bg-black/5 transition-all duration-200 press-scale"
          >
            Comparar
          </Link>
          <Link
            href="/reportar-precio"
            className="group relative inline-flex items-center justify-center rounded-xl bg-accent-950 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-accent-900 press-scale overflow-hidden shadow-md"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative">Reportar precio</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2.5 text-accent-600 hover:bg-accent-100 hover:text-accent-900 md:hidden transition-colors press-scale bg-white/50 backdrop-blur-md border border-white/60"
          aria-label="Abrir menú"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full border-b border-accent-100 bg-white/95 backdrop-blur-xl px-4 py-4 md:hidden shadow-lg animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-accent-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-accent-100">
            <Link
              href="/comparar"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-center text-sm font-semibold text-accent-800 press-scale"
            >
              Comparar tratamientos
            </Link>
            <Link
              href="/reportar-precio"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-accent-950 px-4 py-3 text-center text-sm font-semibold text-white shadow-md press-scale"
            >
              Reportar precio
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
