import Link from "next/link";

const FOOTER_LINKS = {
  Tratamientos: [
    { label: "Implante dental", href: "/tratamientos/implante-dental" },
    { label: "Ortodoncia invisible", href: "/tratamientos/ortodoncia-invisible" },
    { label: "Blanqueamiento dental", href: "/tratamientos/blanqueamiento-dental" },
    { label: "Carillas dentales", href: "/tratamientos/carillas-de-porcelana" },
    { label: "Endodoncia", href: "/tratamientos/endodoncia-unirradicular" },
    { label: "Todos los tratamientos", href: "/tratamientos" },
  ],
  Ciudades: [
    { label: "Madrid", href: "/ciudades/madrid" },
    { label: "Barcelona", href: "/ciudades/barcelona" },
    { label: "Valencia", href: "/ciudades/valencia" },
    { label: "Sevilla", href: "/ciudades/sevilla" },
    { label: "Bilbao", href: "/ciudades/bilbao" },
    { label: "Todas las ciudades", href: "/ciudades" },
  ],
  Recursos: [
    { label: "Seguros dentales", href: "/seguros-dentales" },
    { label: "Comparar precios", href: "/comparar" },
    { label: "Blog", href: "/blog" },
    { label: "Preguntas frecuentes", href: "/faq" },
    { label: "Metodología", href: "/metodologia" },
  ],
  Legal: [
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Política de privacidad", href: "/privacidad" },
    { label: "Aviso legal", href: "/aviso-legal" },
    { label: "Política de cookies", href: "/cookies" },
    { label: "Contacto", href: "/contacto" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🦷</span>
              <span className="text-lg font-bold text-primary-700">
                Precio<span className="text-accent-600">Dental</span>
              </span>
            </div>
            <p className="text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} PrecioDental.net — Comparador de precios dentales en
              España. Los precios son orientativos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
