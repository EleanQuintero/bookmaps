"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Note } from "@/domain/entities/models/models";
import { useState } from "react";

interface BookNotesProps {
  initialNotes: Note[];
}

export function BookNotes({ initialNotes }: BookNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  return (
    <div className="border-t border-border/50 bg-secondary/30 p-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold">
          Personal Notes & Takeaways
        </label>
      </div>
      <div>
        {notes.length === 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            You have no notes for this book yet. Start adding your thoughts
            below!
          </p>
        )}
      </div>

      <textarea
        className="w-full min-h-30 rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all"
        placeholder="Add your thoughts, key takeaways, memorable quotes, or reflections..."
        defaultValue={""}
      />
      <div className="flex justify-between items-center mt-3">
        <p className="text-xs text-muted-foreground">
          Your notes are saved automatically
        </p>
        <Button size="sm" className="shadow-sm">
          Save Note
        </Button>
      </div>
    </div>
  );
}
