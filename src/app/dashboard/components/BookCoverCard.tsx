import { Book } from "@/domain/entities/models/models";
import { ImageIcon } from "lucide-react";

type BookCoverCardProps = Pick<Book, "author" | "title" | "cover_url"> & {
  size: "sm" | "md" | "lg";
};

function BookCoverCard({ title, author, cover_url, size }: BookCoverCardProps) {
  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-24 h-32",
    lg: "w-32 h-44",
  };

  return (
    <div className="shrink-0">
      <div
        className={`
          book-cover relative ${sizeClasses[size]}
          bg-linear-to-br from-secondary to-secondary/50
          border border-border/50
          shadow-md shadow-black/20
          transition-shadow duration-300
          hover:shadow-lg hover:shadow-black/30
        `}
      >
        {cover_url ? (
          <img
            src={cover_url}
            alt={`Cover of ${title} by ${author}`}
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCoverCard;
