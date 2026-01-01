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
          <a
            href="/auth"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 w-full sm:w-auto px-8 h-12"
          >
            Log In
          </a>
          <a
            href="/auth"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto px-8 h-12"
          >
            Create Account
          </a>
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
