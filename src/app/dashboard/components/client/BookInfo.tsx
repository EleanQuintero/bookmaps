"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Clock,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Book, BookStatus } from "@/domain/entities/models/models";
import { useUpdateBookStatus } from "@/hooks/querys/use-update";
import { useParams } from "next/navigation";

interface BookInfoProps extends Pick<
  Book,
  "title" | "author" | "description" | "isbn"
> {
  children: ReactNode;
  status: BookStatus;
  position: number;
}

export function BookInfo({
  title,
  author,
  description,
  status,
  children,
  isbn,
  position,
}: BookInfoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookStatus, setBookStatus] = useState<BookStatus>(status);
  const { updateStatus, isPending } = useUpdateBookStatus();
  const params = useParams();
  const mapId = params.id as string;

  function handleToggleNotes() {
    setIsOpen(!isOpen);
  }

  function updateBookStatus() {
    const prevState = bookStatus;

    const nextStatusMap: Record<BookStatus, BookStatus> = {
      to_read: "reading",
      reading: "completed",
      completed: "to_read",
    };

    const nextStatus = nextStatusMap[bookStatus];

    updateStatus(
      { id: isbn, status: nextStatus, mapId },
      {
        onError: () => {
          setBookStatus(prevState);
        },
      },
    );
    setBookStatus(nextStatus);
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <button
            onClick={updateBookStatus}
            className="focus:outline-none shrink-0 hover:scale-110 transition-transform"
            disabled={isPending}
          >
            {bookStatus === "completed" ? (
              <CheckCircle2 className="h-7 w-7 text-green-500" />
            ) : bookStatus === "reading" ? (
              <Clock className="h-7 w-7 text-orange-500" />
            ) : (
              <Circle className="h-7 w-7 text-muted-foreground" />
            )}
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Step {position}
              </span>
              {bookStatus === "reading" && (
                <Badge variant="warning" className="text-xs">
                  Reading Now
                </Badge>
              )}
              {bookStatus === "completed" && (
                <Badge variant="success" className="text-xs">
                  Completed
                </Badge>
              )}
            </div>
            <h3
              className={`font-bold text-xl mb-1 ${bookStatus === "completed" ? "text-muted-foreground" : ""}`}
            >
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">by {author}</p>
          </div>
        </div>

        <Button
          onClick={handleToggleNotes}
          variant="ghost"
          size="icon"
          className="shrink-0"
        >
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Book Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Quick Stats */}
      <div className="flex  items-center gap-4 text-xs text-muted-foreground">
        <div className="flex flex-row justify-center items-center gap-1 mb-2 ">
          <div
            className={` flex flex-row h-2 w-2 rounded-full ${bookStatus === "completed" ? "bg-green-500" : bookStatus === "reading" ? "bg-orange-500" : "bg-muted-foreground"}`}
          ></div>
          <span className="capitalize font-bold">
            {bookStatus.replace("-", " ") &&
              bookStatus.replace("to_read", "Pending")}
          </span>
        </div>
      </div>
      <div>{isOpen && children}</div>
    </div>
  );
}
