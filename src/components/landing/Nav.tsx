import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";

export const Nav = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-foreground"
        >
          BookMap
        </a>

        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:flex">
          <a href="#how-works" className="transition-colors hover:text-foreground">
            How it works
          </a>
          <a href="#why" className="transition-colors hover:text-foreground">
            Why
          </a>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full">
            <a href="/auth">Sign in</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
