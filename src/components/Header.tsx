"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Tratamientos", href: "/tratamientos" },
  { label: "Ciudades", href: "/ciudades" },
  { label: "Seguros dentales", href: "/seguros-dentales" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 press-scale">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 1-3.5 2.5C8 7 7 8 5.5 8.5 4 9 3 10.5 3 12c0 2 1 3.5 2 4.5 1 1 1.5 2.5 2 4 .5 1.5 1.5 2.5 3 2.5.8 0 1.3-.3 2-.8.7.5 1.2.8 2 .8 1.5 0 2.5-1 3-2.5.5-1.5 1-3 2-4 1-1 2-2.5 2-4.5 0-1.5-1-3-2.5-3.5C17 8 16 7 15.5 5.5 15 4 13.5 3 12 3Z" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-zinc-900">
            Precio<span className="text-primary-600">Dental</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all duration-150 press-scale"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/comparar"
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all duration-150 press-scale"
          >
            Comparar
          </Link>
          <Link
            href="/reportar-precio"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-all duration-150 press-scale"
          >
            Reportar precio
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 md:hidden transition-colors press-scale"
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
        <nav className="border-t border-zinc-100 bg-white px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex gap-2 border-t border-zinc-100 pt-3">
            <Link
              href="/comparar"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-lg border border-zinc-200 px-4 py-2.5 text-center text-sm font-medium text-zinc-700 press-scale"
            >
              Comparar
            </Link>
            <Link
              href="/reportar-precio"
              onClick={() => setMenuOpen(false)}
              className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-center text-sm font-medium text-white press-scale"
            >
              Reportar precio
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
