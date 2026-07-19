"use client";

export default function Footer() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border px-4 py-10 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:flex-row">
      <span className="font-display text-base font-extrabold normal-case tracking-tight text-foreground">
        BookMap
      </span>

      <nav className="flex gap-6">
        <a href="#how-works" className="transition-colors hover:text-foreground">
          How it works
        </a>
        <a href="#why" className="transition-colors hover:text-foreground">
          Why
        </a>
        <a href="/auth" className="transition-colors hover:text-foreground">
          Sign in
        </a>
      </nav>

      <span suppressHydrationWarning className="normal-case tracking-normal">
        &copy; {new Date().getFullYear()} BookMap
      </span>
    </div>
  );
}
