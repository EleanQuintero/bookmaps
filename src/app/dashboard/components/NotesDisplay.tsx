import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface NoteItemProps {
  id: string;
  content: string;
  createdAt: string | null;
  index: number;
  handleDelete: (noteId: string) => void;
}

function NoteItem({
  content,
  createdAt,
  index,
  handleDelete,
  id,
}: NoteItemProps) {
  if (!createdAt) {
    return null;
  }

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="p-4 border border-border bg-card hover:border-ring/50 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-xs font-semibold text-muted-foreground opacity-60">
              Note {index}
            </span>
            <time className="text-xs text-muted-foreground">
              {formatDate(createdAt)}
            </time>
          </div>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
        <Button
          onClick={() => handleDelete(id)}
          variant={"ghost"}
          className="flex-shrink-0 p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Delete note ${index}`}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

export default NoteItem;
