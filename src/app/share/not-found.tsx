import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

// Rendered for private maps AND nonexistent ids alike — no distinguishing signal.
function ShareNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
          <BookOpen className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Map not available</h1>
        <p className="text-muted-foreground mb-6">
          This reading path doesn&apos;t exist or isn&apos;t shared publicly.
        </p>
        <Button asChild>
          <Link href="/">Go to BookMap</Link>
        </Button>
      </div>
    </div>
  );
}

export default ShareNotFound;
