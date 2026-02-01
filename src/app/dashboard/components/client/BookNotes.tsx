"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Note } from "@/domain/entities/models/models";
import { useState } from "react";
import NotesDisplay from "../NotesDisplay";
import { useAddNote } from "@/hooks/querys/use-add-note";
import { toast } from "sonner";
import { NoteContentScheme } from "@/domain/schemes/maps/notecontent-scheme";

interface BookNotesProps {
  item_id: string;
  initialNotes: Note[];
}

export function BookNotes({ initialNotes, item_id }: BookNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteContent, setNoteContent] = useState("");
  const { addNote, isPending } = useAddNote();
  const maxCharacters = 250;
  const charactersLeft = maxCharacters - noteContent.length;

  async function handleNote() {
    const validContent = NoteContentScheme.safeParse({ content: noteContent });

    if (!validContent.success) {
      const errorMessage = validContent.error.issues[0]?.message;
      toast.error(errorMessage || "Invalid note content");
      return;
    }
    addNote(
      { content: noteContent, item_id },
      {
        onSuccess: (newNote) => {
          setNoteContent("");
          setNotes((prevNotes) => [...prevNotes, newNote]);
          toast.success("Note added successfully!");
        },
        onError: (error) => {
          toast.error(`Failed to add note: ${error.message}`);
        },
      },
    );
  }

  return (
    <div className="border-t border-border/50 bg-secondary/30 p-6 gap-4 flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-4 w-4 text-primary" />
        <label className="text-sm font-semibold">
          Personal Notes & Takeaways
        </label>
      </div>
      <textarea
        className="w-full min-h-30 rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all overflow-hidden resize-none"
        placeholder="Add your thoughts, key takeaways, memorable quotes, or reflections..."
        onChange={(e) => setNoteContent(e.currentTarget.value)}
        value={noteContent}
        maxLength={maxCharacters}
      />

      <div className="flex flex-row gap-3 justify-baseline items-center mt-3">
        <Button
          disabled={
            isPending || noteContent.trim() === "" || charactersLeft === 0
          }
          onClick={handleNote}
          size="sm"
          className={`shadow-sm ${charactersLeft === 0 ? "opacity-50 cursor-not-allowed bg-red-800 text-gray-500 " : ""}`}
        >
          Save Note
        </Button>
        <p className="text-[15px] font-bold">
          Characters Left:{" "}
          <span className={`${charactersLeft === 0 ? "text-red-800" : ""}`}>
            {charactersLeft}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-x-10">
        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground mb-4">
            You have no notes for this book yet. Start adding your thoughts
            below!
          </p>
        ) : (
          <>
            {notes.map((note, index) => (
              <NotesDisplay
                key={note.id}
                content={note.content}
                createdAt={note.created_at}
                index={index + 1}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
