import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground">
          <Sparkles className="mr-2 h-3.5 w-3.5 text-primary" />
          AI-Powered Learning Paths
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
          Master any topic with <br />
          <span className="text-primary">structured reading paths</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stop guessing what to read next. We curate the perfect journey from
          beginner to expert.
        </p>
      </div>
    </div>
  );
};
