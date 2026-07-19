import { Sparkles } from "lucide-react";

interface heroProps {
  minTitle: string;
  title: string;
  accent?: string;
  description: string;
}

// Hero presentacional y reutilizable (landing + create). El CTA es
// específico de cada página, no vive acá.
export const Hero = ({ minTitle, title, accent, description }: heroProps) => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        {minTitle}
      </span>

      <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-foreground sm:text-6xl md:text-7xl">
        {title}
        {accent ? <span className="text-primary"> {accent}</span> : null}
      </h1>

      <p className="mx-auto max-w-xl text-lg text-muted-foreground sm:text-xl">
        {description}
      </p>
    </div>
  );
};
