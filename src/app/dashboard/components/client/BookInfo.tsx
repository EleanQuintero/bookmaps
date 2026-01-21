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
import { BookItemProps } from "../BookItem";
import { useState, type ReactNode } from "react";

interface BookInfoProps extends Omit<
  BookItemProps,
  "size" | "coverurl" | "notes"
> {
  children: ReactNode;
}

export function BookInfo({
  title,
  author,
  description,
  status,
  position,
  children,
}: BookInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleNotes() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <button className="focus:outline-none shrink-0 hover:scale-110 transition-transform">
            {status === "completed" ? (
              <CheckCircle2 className="h-7 w-7 text-green-500" />
            ) : status === "reading" ? (
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
              {status === "reading" && (
                <Badge variant="warning" className="text-xs">
                  Reading Now
                </Badge>
              )}
              {status === "completed" && (
                <Badge variant="success" className="text-xs">
                  Completed
                </Badge>
              )}
            </div>
            <h3
              className={`font-bold text-xl mb-1 ${status === "completed" ? "text-muted-foreground" : ""}`}
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
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div
            className={`h-2 w-2 rounded-full ${status === "completed" ? "bg-green-500" : status === "reading" ? "bg-orange-500" : "bg-muted-foreground"}`}
          />
        </div>
      </div>
      <div>{isOpen && children}</div>
    </div>
  );
}
