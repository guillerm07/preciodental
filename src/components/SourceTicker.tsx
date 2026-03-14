"use client";

interface SourceTickerProps {
  sources: string[];
  className?: string;
}

export default function SourceTicker({
  sources,
  className = "",
}: SourceTickerProps) {
  const items = sources.join(" · ");

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    >
      <div className="group flex w-max hover:[animation-play-state:paused]">
        <div className="animate-ticker flex shrink-0 items-center">
          <span className="px-4 text-sm text-zinc-400 font-[family-name:var(--font-geist-sans)]">
            {items}
          </span>
        </div>
        <div className="animate-ticker flex shrink-0 items-center">
          <span className="px-4 text-sm text-zinc-400 font-[family-name:var(--font-geist-sans)]">
            {items}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-ticker {
          animation: ticker 40s linear infinite;
        }
        .group:hover .animate-ticker {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
