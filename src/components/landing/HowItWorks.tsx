import { Map as MapIcon, Search, Trophy } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const STEPS = [
  {
    n: "01",
    title: "Choose a topic",
    body: "Enter any subject you want to master — History, Coding, Stoic philosophy.",
    Icon: Search,
  },
  {
    n: "02",
    title: "Generate your map",
    body: "Get a personalized, ordered path of real books, each verified against Google Books.",
    Icon: MapIcon,
  },
  {
    n: "03",
    title: "Start learning",
    body: "Follow the path, take notes on each book, and track your progress as you go.",
    Icon: Trophy,
  },
];

export const HowItWorks = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeader label="How it works" title="Three steps to a path" />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="flex flex-col gap-4 bg-background p-8"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-primary">{step.n}</span>
              <step.Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
