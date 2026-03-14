import Link from "next/link";

const FOOTER_LINKS = {
  Tratamientos: [
    { label: "Implante dental", href: "/tratamientos/implante-dental" },
    { label: "Ortodoncia invisible", href: "/tratamientos/ortodoncia-invisible" },
    { label: "Blanqueamiento", href: "/tratamientos/blanqueamiento-dental" },
    { label: "Carillas", href: "/tratamientos/carillas-de-porcelana" },
    { label: "Todos", href: "/tratamientos" },
  ],
  Ciudades: [
    { label: "Madrid", href: "/ciudades/madrid" },
    { label: "Barcelona", href: "/ciudades/barcelona" },
    { label: "Valencia", href: "/ciudades/valencia" },
    { label: "Sevilla", href: "/ciudades/sevilla" },
    { label: "Todas", href: "/ciudades" },
  ],
  Recursos: [
    { label: "Seguros dentales", href: "/seguros-dentales" },
    { label: "Comparar precios", href: "/comparar" },
    { label: "Blog", href: "/blog" },
    { label: "Metodología", href: "/metodologia" },
    { label: "FAQ", href: "/faq" },
  ],
  Legal: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Aviso legal", href: "/aviso-legal" },
    { label: "Cookies", href: "/cookies" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-zinc-200/60 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {category}
              </h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-zinc-200/60 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 1-3.5 2.5C8 7 7 8 5.5 8.5 4 9 3 10.5 3 12c0 2 1 3.5 2 4.5 1 1 1.5 2.5 2 4 .5 1.5 1.5 2.5 3 2.5.8 0 1.3-.3 2-.8.7.5 1.2.8 2 .8 1.5 0 2.5-1 3-2.5.5-1.5 1-3 2-4 1-1 2-2.5 2-4.5 0-1.5-1-3-2.5-3.5C17 8 16 7 15.5 5.5 15 4 13.5 3 12 3Z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-zinc-900">
                PrecioDental
              </span>
            </div>
            <p className="text-center text-xs text-zinc-400">
              &copy; {new Date().getFullYear()} PrecioDental.net — Comparador de precios dentales en
              España. Los precios son orientativos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
