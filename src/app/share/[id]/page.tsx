import { cache, type ReactNode } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, CheckCircle2, Circle, Clock, FileText, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getPublicMap } from "@/services/maps/mapService";
import { BookStatus } from "@/domain/entities/models/models";

interface SharePageProps {
  params: Promise<{ id: string }>;
}

// React.cache dedupes the query across generateMetadata + page body (one request, one fetch).
const loadPublicMap = cache((id: string) => getPublicMap(id));

const STATUS_ICON: Record<BookStatus, ReactNode> = {
  completed: <CheckCircle2 className="h-6 w-6 text-green-500" />,
  reading: <Clock className="h-6 w-6 text-orange-500" />,
  to_read: <Circle className="h-6 w-6 text-muted-foreground" />,
};

const STATUS_LABEL: Record<BookStatus, string> = {
  completed: "Completed",
  reading: "Reading Now",
  to_read: "Pending",
};

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await loadPublicMap(id);

  if (!data) {
    return { title: "Map not found — BookMap" };
  }

  return {
    title: `${data.title} — BookMap`,
    description: data.description ?? undefined,
  };
}

// Public, read-only route. Reachable by anonymous visitors and non-owners.
// Deliberately does NOT import any client mutation component (status toggle,
// notes, delete, visibility) — this is a security boundary, not a DRY target.
async function SharePage({ params }: SharePageProps) {
  const { id } = await params;
  const { data, error } = await loadPublicMap(id);

  // Private and nonexistent maps must be indistinguishable — always notFound().
  if (error || !data) {
    notFound();
  }

  const { title, description, map_items } = data;
  const completedCount = map_items.filter((item) => item.status === "completed").length;
  const progress = map_items.length > 0 ? Math.round((completedCount / map_items.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl text-foreground font-bold">{title}</h1>
            <div className="text-right shrink-0">
              <div className="text-3xl font-bold text-primary">{progress}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {description && (
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-2">About This Path</h2>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl text-foreground font-bold">Reading List</h2>
            <Badge variant="secondary" className="ml-2">
              {completedCount} of {map_items.length} completed
            </Badge>
          </div>

          <div className="flex flex-col gap-8">
            {map_items.map((item) => (
              <Card
                key={item.id}
                className="book-card-item border-border/50"
              >
                <CardContent className="p-0">
                  <div className="p-6 flex gap-8">
                    <div className="shrink-0">
                      <div className="book-cover relative w-32 h-44 bg-linear-to-br from-secondary to-secondary/50 border border-border/50 shadow-md shadow-black/20">
                        {item.books.cover_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.books.cover_url}
                            alt={`Cover of ${item.books.title} by ${item.books.author}`}
                            className="absolute inset-0 w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        {STATUS_ICON[item.status]}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Step {item.position}
                            </span>
                            {item.status === "reading" && (
                              <Badge variant="warning" className="text-xs">
                                {STATUS_LABEL.reading}
                              </Badge>
                            )}
                            {item.status === "completed" && (
                              <Badge variant="success" className="text-xs">
                                {STATUS_LABEL.completed}
                              </Badge>
                            )}
                          </div>
                          <h3
                            className={`font-bold text-xl mb-1 ${item.status === "completed" ? "text-muted-foreground" : ""}`}
                          >
                            {item.books.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">by {item.books.author}</p>
                        </div>
                      </div>

                      {item.books.description && (
                        <div className="border-l-2 border-primary/30 pl-4">
                          <p className="book-prose italic line-clamp-3">{item.books.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SharePage;
