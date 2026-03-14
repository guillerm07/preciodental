import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-bold text-primary-700">
              🦷 Admin
            </Link>
            <div className="flex gap-1">
              <Link
                href="/admin"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/prices"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Precios
              </Link>
              <Link
                href="/admin/articles"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                Artículos
              </Link>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Ver sitio &rarr;
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
