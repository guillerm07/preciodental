interface AllInclusiveCalloutProps {
  treatmentName: string;
  shouldInclude: string[];
  potentialSavings?: string;
}

export function AllInclusiveCallout({
  treatmentName,
  shouldInclude,
  potentialSavings,
}: AllInclusiveCalloutProps) {
  return (
    <div className="rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5">
      <div className="flex items-start gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 shrink-0 text-amber-600 mt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <div>
          <p className="font-semibold text-zinc-900 text-sm">
            Consejo: pregunta si el precio de {treatmentName.toLowerCase()} es
            &ldquo;todo incluido&rdquo;
          </p>
          <p className="mt-1.5 text-sm text-zinc-600 text-pretty">
            Al pedir presupuesto, verifica que incluye todos los conceptos
            necesarios. Un precio &ldquo;todo incluido&rdquo; evita sorpresas y
            facilita la comparación entre clínicas.
          </p>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Un presupuesto completo debería incluir:
            </p>
            <ul className="mt-2 space-y-1">
              {shouldInclude.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-zinc-600"
                >
                  <svg
                    className="h-3.5 w-3.5 shrink-0 text-amber-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {potentialSavings && (
            <p className="mt-3 text-xs text-amber-700 font-medium text-pretty">
              {potentialSavings}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
