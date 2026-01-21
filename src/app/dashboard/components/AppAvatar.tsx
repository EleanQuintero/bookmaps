import { BookOpen } from "lucide-react";
interface AppAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showLabel?: boolean;
}
export function AppAvatar({
  size = "md",
  className = "",
  showLabel = false,
}: AppAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };
  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-8 w-8",
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl bg-primary/10 flex items-center justify-center text-primary`}
      >
        <BookOpen className={iconSizes[size]} />
      </div>
      {showLabel && (
        <span className="font-bold text-lg text-primary">BookMap</span>
      )}
    </div>
  );
}
