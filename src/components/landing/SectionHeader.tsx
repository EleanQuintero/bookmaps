import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  invert?: boolean;
  className?: string;
}

// Header de sección estilo X Ads: eyebrow mono dorado + título display.
// `invert` para la banda oscura (texto claro sobre fondo tinta).
export const SectionHeader = ({
  label,
  title,
  invert = false,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
        {label}
      </p>
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight sm:text-4xl",
          invert ? "text-background" : "text-foreground"
        )}
      >
        {title}
      </h2>
    </div>
  );
};
