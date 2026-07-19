import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const EXAMPLE_TOPICS = [
  "Systems design",
  "Stoic philosophy",
  "Machine learning",
  "History of Rome",
];

export const CTA = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
        Start your path
      </p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        What do you want to master?
      </h2>

      <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
        <Input
          placeholder="e.g. Backend architecture"
          aria-label="Topic to master"
          className="h-12 flex-1 rounded-full px-5 text-base"
        />
        <Button asChild size="lg" className="h-12 rounded-full px-8 text-base">
          <a href="/auth">
            Generate
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {EXAMPLE_TOPICS.map((topic) => (
          <span
            key={topic}
            className="rounded-full border border-border px-4 py-1.5 font-mono text-xs text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};
