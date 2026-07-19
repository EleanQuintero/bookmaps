import { cn } from "@/lib/utils";

// Signature element: el reading-path como diagrama blueprint.
// Libros = nodos numerados sobre un eje hairline; el "siguiente" en dorado.
const NODES = [
  { n: "01", label: "Foundations" },
  { n: "02", label: "Core ideas" },
  { n: "03", label: "Applied" },
  { n: "04", label: "Advanced" },
  { n: "05", label: "Mastery" },
];
const ACTIVE = 2;

export const ReadingPathDiagram = () => {
  return (
    <div className="mx-auto mt-16 w-full max-w-3xl">
      <div className="mb-5 flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        <span>Your reading path</span>
        <span className="flex items-center gap-1.5 text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Next up
        </span>
      </div>

      <div className="relative">
        <div
          className="absolute inset-x-0 top-5 h-px bg-border"
          aria-hidden="true"
        />
        <ul className="relative flex items-start justify-between">
          {NODES.map((node, i) => {
            const active = i === ACTIVE;
            return (
              <li
                key={node.n}
                className="flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border bg-background font-mono text-xs",
                    active
                      ? "border-primary text-primary ring-4 ring-primary/15"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {node.n}
                </span>
                <span
                  className={cn(
                    "text-xs sm:text-sm",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {node.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
