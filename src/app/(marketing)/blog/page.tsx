import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card } from "@/components/ui/Card";
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

      <h1 className="text-3xl font-bold text-gray-900">Blog</h1>
      <p className="mt-2 text-gray-600">
        Guías, comparativas y consejos sobre precios dentales en España.
      </p>

      {publishedArticles.length > 0 ? (
        <div className="mt-8 space-y-6">
          {publishedArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block group"
            >
              <Card className="transition-shadow hover:shadow-md group-hover:border-primary-300">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600">{article.excerpt}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                  {article.publishedAt && (
                    <span>{formatDate(article.publishedAt)}</span>
                  )}
                  <span>{article.readingTime} min de lectura</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mt-8 text-center">
          <p className="text-gray-600">
            Estamos preparando artículos sobre precios dentales.
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Pronto publicaremos guías completas por tratamiento y ciudad.
          </p>
        </Card>
      )}
    </div>
  );
}
