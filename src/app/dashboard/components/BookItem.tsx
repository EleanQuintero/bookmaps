import { Image as ImageIcon } from "lucide-react";
import { BookStatus } from "@/domain/entities/models/models";
import { BookInfo } from "./client/BookInfo";
import { BookNotes } from "./client/BookNotes";

export interface BookItemProps {
  isbn: string;
  title: string;
  author: string | null;
  coverurl: string | null;
  status: BookStatus;
  description: string | null;
  position: number;
}

type BookCoverCardProps = Omit<
  BookItemProps,
  "status" | "description" | "position" | "notes" | "isbn"
> & {
  size: "sm" | "md" | "lg";
};

function BookItem({
  title,
  author,
  coverurl,
  description,
  position,
  status,
  isbn,
}: BookItemProps) {
  return (
    <div className="flex flex-row gap-x-3.5">
      <BookCoverCard
        author={author}
        title={title}
        coverurl={coverurl}
        size="lg"
      />
      <BookInfo
        isbn={isbn}
        author={author}
        description={description}
        position={position}
        status={status}
        title={title}
      >
        <BookNotes initialNotes={[]} />
      </BookInfo>
    </div>
  );
}

function BookCoverCard({ title, author, coverurl, size }: BookCoverCardProps) {
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
            {coverurl ? (
              <img src={coverurl} alt="" className=" w-52 h-52  " />
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
