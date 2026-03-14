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
    <footer className="border-t border-accent-900 bg-accent-950 text-white relative overflow-hidden">
      {/* Subtle glow in footer */}
      <div className="absolute top-0 right-0 p-32 opacity-20 blur-[100px] rounded-full bg-gradient-to-br from-primary-600 to-teal-800 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 border-b md:border-b-0 border-accent-800 pb-10 lg:pb-0">
             <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-primary">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-white" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-1.5 0-3 1-3.5 2.5C8 7 7 8 5.5 8.5 4 9 3 10.5 3 12c0 2 1 3.5 2 4.5 1 1 1.5 2.5 2 4 .5 1.5 1.5 2.5 3 2.5.8 0 1.3-.3 2-.8.7.5 1.2.8 2 .8 1.5 0 2.5-1 3-2.5.5-1.5 1-3 2-4 1-1 2-2.5 2-4.5 0-1.5-1-3-2.5-3.5C17 8 16 7 15.5 5.5 15 4 13.5 3 12 3Z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Precio<span className="text-primary-400">Dental</span>
              </span>
            </div>
            <p className="text-sm text-accent-400 font-medium leading-relaxed text-pretty">
              Transparencia clínica en los precios de los tratamientos odontológicos en España.
            </p>
          </div>

          {/* Nav Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="lg:ml-auto">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-accent-400 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary-500/0 group-hover:bg-primary-500 transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-accent-800/60 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-sm font-medium text-accent-500">
              &copy; {new Date().getFullYear()} PrecioDental.net
            </p>
            <p className="text-center text-sm font-medium text-accent-600">
              Todos los precios listados son estimaciones informativas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
