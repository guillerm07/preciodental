import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSection } from "@/components/FAQSection";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
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

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: article.title, href: `/blog/${article.slug}` },
        ]}
      />

      <article>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 text-balance">{article.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-zinc-400">
          {article.publishedAt && <span>{formatDate(article.publishedAt)}</span>}
          <span>{article.readingTime} min de lectura</span>
          <span className="tabular-nums">{article.wordCount} palabras</span>
        </div>

        <div
          className="prose prose-zinc mt-8 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </article>

      {faqItems.length > 0 && (
        <FAQSection items={faqItems} className="mt-12" />
      )}
    </div>
  );
}
