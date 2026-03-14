export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils/format";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog — Guías de precios dentales",
  description:
    "Artículos y guías sobre precios de tratamientos dentales en España. Consejos, comparativas y todo lo que necesitas saber.",
  path: "/blog",
});

export default async function BlogPage() {
  const publishedArticles = await db.query.articles.findMany({
    where: eq(articles.status, "published"),
    orderBy: [desc(articles.publishedAt)],
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-zinc-500 text-pretty">
          Guías, comparativas y consejos sobre precios dentales en España.
        </p>
      </div>

      {publishedArticles.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {publishedArticles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={`group flex flex-col rounded-2xl border border-zinc-200/60 bg-white shadow-soft hover:shadow-elevated hover:border-zinc-300/60 transition-all duration-200 press-scale overflow-hidden ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
            >
              {/* Color accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-primary-400 to-primary-600" />

              <div className={`flex flex-col justify-between p-6 ${i === 0 ? "sm:p-8" : ""}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center rounded-md bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                      Guía
                    </span>
                    {article.readingTime && (
                      <span className="text-xs text-zinc-400">
                        {article.readingTime} min de lectura
                      </span>
                    )}
                  </div>
                  <h2
                    className={`mt-3 font-bold text-zinc-900 group-hover:text-primary-700 transition-colors text-balance ${
                      i === 0 ? "text-xl sm:text-2xl" : "text-lg"
                    }`}
                  >
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className={`mt-2 text-zinc-500 text-pretty leading-relaxed ${
                      i === 0 ? "text-base" : "text-sm line-clamp-3"
                    }`}>
                      {article.excerpt}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-600">Equipo PrecioDental</span>
                    {article.publishedAt && (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs font-medium text-primary-600 group-hover:text-primary-700">
                    Leer →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-zinc-200/60 bg-zinc-50 p-8 text-center shadow-soft">
          <p className="text-zinc-500 text-pretty">
            Estamos preparando artículos sobre precios dentales.
          </p>
          <p className="mt-1 text-sm text-zinc-400 text-pretty">
            Pronto publicaremos guías completas por tratamiento y ciudad.
          </p>
        </div>
      )}
    </div>
  );
}
