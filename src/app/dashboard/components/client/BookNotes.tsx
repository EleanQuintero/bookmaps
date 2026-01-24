"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Note } from "@/domain/entities/models/models";
import { useState } from "react";
import NotesDisplay from "../NotesDisplay";

interface BookNotesProps {
  item_id: string;
  initialNotes: Note[];
}

export function BookNotes({ initialNotes, item_id }: BookNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  console.log(item_id);

  return (
    <div className="border-t border-border/50 bg-secondary/30 p-6 gap-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold">
          Personal Notes & Takeaways
        </label>
      </div>

      <textarea
        className="w-full min-h-30 rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all"
        placeholder="Add your thoughts, key takeaways, memorable quotes, or reflections..."
        defaultValue={""}
      />
      <div className="flex justify-baseline items-center mt-3">
        <Button size="sm" className="shadow-sm">
          Save Note
        </Button>
      </div>

      <div className="flex flex-col gap-x-10">
        {notes.length === 0 ? (
          <>
            <NotesDisplay />
            <NotesDisplay />
            <NotesDisplay />
            <NotesDisplay />
            <NotesDisplay />
            <NotesDisplay />
          </>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            You have no notes for this book yet. Start adding your thoughts
            below!
          </p>
        )}
      </div>
    </div>
  );
}
