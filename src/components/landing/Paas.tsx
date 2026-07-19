import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const FEATURES = [
  "Ordered from absolute beginner to expert",
  "Save your roadmap and track progress",
  "Take notes on every book you read",
];

const PATH_BOOKS = [
  { title: "Meditations", author: "Marcus Aurelius", status: "done" },
  { title: "Letters from a Stoic", author: "Seneca", status: "current" },
  { title: "Discourses", author: "Epictetus", status: "next" },
] as const;

// Banda de contraste (ritmo light→dark). `bg-foreground text-background`
// invierte con el theme: banda tinta en light, banda clara en dark.
export const Paas = () => {
  return (
    <div className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <SectionHeader
              invert
              label="Why BookMap"
              title="Real books. Verified. In order."
            />
            <p className="max-w-md text-lg text-background/70">
              Every book is checked against Google Books — no hallucinations, no
              dead ends. Just a path that actually exists.
            </p>
            <ul className="space-y-4">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-background/90">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <PathPreviewCard />
        </div>
      </div>
    </div>
  );
};

function PathPreviewCard() {
  return (
    <div className="rounded-xl border border-background/15 bg-background/[0.04] p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-3 border-b border-background/10 pb-4">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Stoic Philosophy
        </span>
        <span className="ml-auto font-mono text-[0.7rem] text-background/50">
          5 books · beginner → expert
        </span>
      </div>

      <ol className="space-y-3">
        {PATH_BOOKS.map((book, i) => (
          <li
            key={book.title}
            className="flex items-center gap-3 rounded-lg bg-background/[0.04] p-3"
          >
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[0.7rem]",
                book.status === "done" &&
                  "border-primary bg-primary text-primary-foreground",
                book.status === "current" &&
                  "border-primary text-primary ring-4 ring-primary/15",
                book.status === "next" && "border-background/25 text-background/50"
              )}
            >
              {book.status === "done" ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                i + 1
              )}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-background">
                {book.title}
              </p>
              <p className="truncate text-xs text-background/50">{book.author}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
