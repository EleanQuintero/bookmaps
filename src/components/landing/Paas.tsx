import { AlertCircle, CheckCircle, Lightbulb, Zap, Map } from "lucide-react";
import { amplificationSteps } from "@/lib/data/amplificationSteps.json";
import { IllustrationCard } from "../ui/illustrationCard";
import { Card, CardContent } from "../ui/card";

function Problem() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400">
          <AlertCircle className="mr-2 h-4 w-4" />
          The Problem
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Self-learning shouldn&apos;t feel like wandering in the dark.
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            You want to learn something new. You search online. You find 50 blog
            posts, 200 book recommendations, and zero clarity on where to
            actually start.
          </p>
          <p>
            Which book comes first? Which ones can you skip? What&apos;s the
            actual path from beginner to expert?
          </p>
        </div>
      </div>
      <div className="bg-secondary/30 rounded-2xl p-8 border border-border/50 flex items-center justify-center min-h-75">
        <div className="text-center space-y-4 max-w-xs opacity-70">
          <div className="flex justify-center gap-2 mb-4">
            <div className="h-16 w-12 bg-muted rounded shadow-sm -rotate-6"></div>
            <div className="h-16 w-12 bg-muted rounded shadow-sm rotate-3"></div>
            <div className="h-16 w-12 bg-muted rounded shadow-sm -rotate-2"></div>
          </div>
          <p className="font-medium">So many books...</p>
          <p className="text-sm">Where do I even start?</p>
        </div>
      </div>
    </div>
  );
}

function Agitation() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
      <div className="order-2 md:order-1 bg-secondary/30 rounded-2xl p-8 border border-border/50 flex items-center justify-center min-h-75">
        <div className="space-y-3 w-full max-w-xs">
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50 shadow-sm opacity-60">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-24 bg-muted rounded"></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50 shadow-sm opacity-60">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-32 bg-muted rounded"></div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border/50 shadow-sm opacity-60">
            <div className="h-2 w-2 rounded-full bg-red-400"></div>
            <div className="h-2 w-20 bg-muted rounded"></div>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Every topic has a &quot;right&quot; order to learn it.
        </h2>
        <p className="text-lg text-muted-foreground">
          But finding that order means wasting hours researching instead of
          actually learning:
        </p>
        <ul className="space-y-3">
          {[
            "Reading dozens of Reddit threads",
            "Comparing Amazon reviews",
            "Guessing which book assumes what knowledge",
            "Restarting because you picked the wrong book first",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-lg font-medium text-foreground pt-2">
          And when you finally start? You&apos;re never sure if you&apos;re on
          the best path.
        </p>
      </div>
    </div>
  );
}

function Amplification() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-8 py-8">
      <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400">
        <Zap className="mr-2 h-4 w-4" />
        The Vision
      </div>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        Imagine if you could skip all the guesswork.
      </h2>
      <p className="text-xl text-muted-foreground">
        What if, in 30 seconds, you had a complete reading path from beginner to
        advanced?
      </p>

      <div className="grid sm:grid-cols-3 gap-6 pt-8">
        {amplificationSteps.map((step) => (
          <IllustrationCard
            key={step.cardTitle}
            iconName={step.cardIcon}
            cardTitle={step.cardTitle}
            cardDescription={step.cardDescription}
          />
        ))}
      </div>

      <p className="text-lg font-medium pt-4">
        No more &quot;Should I read this one first?&quot; No more analysis
        paralysis.
      </p>
    </div>
  );
}

function Solution() {
  return (
    <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Lightbulb className="mr-2 h-4 w-4" />
            The Solution
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            BookMap is an AI-powered reading guide that builds your learning
            path for you.
          </h2>
          <p className="text-lg text-muted-foreground">
            Enter any topic — Stoic philosophy, backend architecture, Japanese
            language — and get an ordered list of books that takes you from zero
            to mastery.
          </p>
          <div className="space-y-4 pt-2">
            {[
              "Save your roadmap for later",
              "Track your progress as you read",
              "Take notes on each book",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <p className="text-xl font-bold text-primary">
              Simple. Clear. Structured.
            </p>
            <p className="text-lg text-muted-foreground">
              Stop researching. Start learning.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-purple-500/20 rounded-xl blur-xl opacity-50"></div>
          <Card className="relative border-primary/20 shadow-xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Map className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Stoic Philosophy Path</h3>
                  <p className="text-xs text-muted-foreground">
                    Generated by BookMap AI
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "Meditations",
                    author: "Marcus Aurelius",
                    status: "completed",
                  },
                  {
                    title: "Letters from a Stoic",
                    author: "Seneca",
                    status: "current",
                  },
                  {
                    title: "Discourses",
                    author: "Epictetus",
                    status: "locked",
                  },
                ].map((book, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                  >
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center border ${
                        book.status === "completed"
                          ? "bg-green-500 border-green-500 text-white"
                          : book.status === "current"
                          ? "border-primary text-primary"
                          : "border-muted text-muted-foreground"
                      }`}
                    >
                      {book.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium">{i + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{book.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const Paas = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto space-y-24">
        <Problem />
        <Agitation />
        <Amplification />
        <Solution />
      </div>
    </section>
  );
};
