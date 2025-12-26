import { Button } from "../ui/button";

export const CTA = () => {
  const exampleTopics = [
    "Stoic Philosophy",
    "Backend Architecture",
    "Machine Learning Basics",
    "History of Rome",
  ];

  return (
    <section className="py-24 px-4 bg-secondary/20 border-t border-border/40">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to start your journey?
        </h2>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 h-12 text-base"
          >
            Log In
          </Button>
          <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-base">
            Create Account
          </Button>
        </div>

        {/* Example Topics */}
        <div>
          <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
            These and many more are examples of topics you can start generating:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {exampleTopics.map((t) => (
              <div
                key={t}
                className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground shadow-sm cursor-default"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
