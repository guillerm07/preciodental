import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc, ne, and } from "drizzle-orm";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { markdownToHtml } from "@/lib/utils/markdown";
import { formatDate } from "@/lib/utils/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });
  if (!article) return {};
  return generatePageMetadata({
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = await db.query.articles.findFirst({
    where: eq(articles.slug, slug),
  });
  if (!article) notFound();

  const contentHtml = await markdownToHtml(article.content);
  const faqItems = (article.faq as { question: string; answer: string }[]) || [];
  const tocItems = (article.tableOfContents as { id: string; title: string; level: number }[]) || [];

  const relatedArticles = await db.query.articles.findMany({
    where: and(
      ne(articles.slug, slug),
      eq(articles.status, "published")
    ),
    orderBy: desc(articles.publishedAt),
    limit: 3,
    columns: {
      slug: true,
      title: true,
      excerpt: true,
      publishedAt: true,
      readingTime: true,
    },
  });

  return (
    <>
      <ReadingProgress />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: article.title, href: `/blog/${article.slug}` },
          ]}
        />

        <div className="mt-6 lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          {/* Main content */}
          <article className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance sm:text-4xl">
              {article.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-2 text-sm text-zinc-400">
              <span className="font-medium text-zinc-600">Equipo PrecioDental</span>
              <span aria-hidden="true">&middot;</span>
              {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
              <span aria-hidden="true">&middot;</span>
              <span>{article.readingTime} min de lectura</span>
            </div>

            <div
              className="prose prose-zinc mt-10 max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-li:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {faqItems.length > 0 && (
              <FAQSection items={faqItems} className="mt-12" />
            )}

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-16 border-t border-zinc-200 pt-10">
                <h2 className="text-xl font-bold tracking-tight text-zinc-900">
                  Artículos relacionados
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group rounded-lg border border-zinc-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/30"
                    >
                      <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-primary-700">
                        {related.title}
                      </h3>
                      {related.excerpt && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500">
                          {related.excerpt}
                        </p>
                      )}
                      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400">
                        {related.publishedAt && (
                          <span>{formatDate(related.publishedAt)}</span>
                        )}
                        {related.readingTime && (
                          <>
                            <span aria-hidden="true">&middot;</span>
                            <span>{related.readingTime} min</span>
                          </>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sticky sidebar ToC */}
          {tocItems.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents items={tocItems} />
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
