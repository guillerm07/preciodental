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

      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">Blog</h1>
      <p className="mt-2 text-zinc-500 text-pretty">
        Guías, comparativas y consejos sobre precios dentales en España.
      </p>

      {publishedArticles.length > 0 ? (
        <div className="mt-8 divide-y divide-zinc-100">
          {publishedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block py-6 first:pt-0 press-scale"
            >
              <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-primary-700 transition-colors text-balance">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-500 text-pretty">{article.excerpt}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400">
                {article.publishedAt && (
                  <span>{formatDate(article.publishedAt)}</span>
                )}
                <span>{article.readingTime} min de lectura</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-zinc-200/60 bg-zinc-50 p-8 text-center shadow-soft">
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
