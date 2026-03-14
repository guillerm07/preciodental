"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingElements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "0px 0px -80% 0px",
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveId(id);
      }
    },
    []
  );

  if (items.length === 0) return null;

  return (
    <nav aria-label="Tabla de contenidos">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Contenido
      </h2>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block text-xs leading-relaxed transition-colors ${
                  item.level === 3 ? "pl-4" : ""
                } ${
                  isActive
                    ? "border-l-2 border-primary-500 pl-2 font-bold text-primary-600"
                    : "text-zinc-400 hover:text-zinc-700"
                } ${item.level === 3 && isActive ? "pl-6" : ""}`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
