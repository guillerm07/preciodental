"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQSection({ items, className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="text-xl font-bold text-zinc-900 text-balance">
        Preguntas frecuentes
      </h2>
      <div className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200/60 bg-white shadow-soft overflow-hidden">
        {items.map((item, index) => (
          <div key={index}>
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-zinc-50/50 transition-colors"
            >
              <span className="font-medium text-zinc-900 text-pretty pr-4">
                {item.question}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed text-pretty">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
