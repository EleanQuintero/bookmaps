import { Image as ImageIcon } from "lucide-react";
import { Book, MapItem } from "@/domain/entities/models/models";
import { BookInfo } from "./client/BookInfo";
import { BookNotes } from "./client/BookNotes";

export interface BookItemProps {
  map_id: string;
  item: MapItem;
}

type BookCoverCardProps = Pick<Book, "author" | "title" | "cover_url"> & {
  size: "sm" | "md" | "lg";
};

function BookItem({ item }: BookItemProps) {
  return (
    <div key={item.id} className="flex flex-row gap-x-3.5">
      <BookCoverCard
        author={item.books.author}
        title={item.books.title}
        cover_url={item.books.cover_url}
        size="lg"
      />
      <BookInfo
        isbn={item.books.isbn}
        author={item.books.author}
        description={item.books.description}
        position={item.position}
        status={item.status}
        title={item.books.title}
      >
        <BookNotes item_id={item.id} initialNotes={[]} />
      </BookInfo>
    </div>
  );
}

function BookCoverCard({ title, author, cover_url, size }: BookCoverCardProps) {
  const sizeClasses = {
    sm: "w-16 h-20",
    md: "w-24 h-32",
    lg: "w-32 h-40",
  };
  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className="shrink-0">
      <div className="relative group/book">
        <div
          className={`
          relative shrink-0 ${sizeClasses[size]} rounded-md 
          bg-linear-to-br from-secondary to-secondary/50 
          border border-border/50 flex items-center justify-center 
          transition-all duration-300 cursor-pointer
        `}
          title={`${title} by ${author}`}
        >
          <div>
            {cover_url ? (
              <img src={cover_url} alt="" className=" w-52 h-52  " />
            ) : (
              <>
                <ImageIcon
                  className={`${iconSizes[size]} text-muted-foreground/40`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent rounded-md" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
