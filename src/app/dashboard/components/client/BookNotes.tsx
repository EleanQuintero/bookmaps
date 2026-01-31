"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Note } from "@/domain/entities/models/models";
import { useState } from "react";
import NotesDisplay from "../NotesDisplay";
import { addItemNote } from "@/app/actions/maps/addItemNote";
import { useParams } from "next/navigation";

interface BookNotesProps {
  item_id: string;
  initialNotes: Note[];
}

export function BookNotes({ initialNotes, item_id }: BookNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteContent, setNoteContent] = useState("");
  const params = useParams();
  const map_id = params.id as string;

  async function handleNote() {
    const { status, data } = await addItemNote(noteContent, item_id, map_id);

    if (!data) return;

    if (status) {
      setNoteContent("");
      const newNote: Note = {
        id: data?.id,
        content: noteContent,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
    }
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
        className="w-full min-h-30 rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary/50 transition-all"
        placeholder="Add your thoughts, key takeaways, memorable quotes, or reflections..."
        onChange={(e) => setNoteContent(e.currentTarget.value)}
        value={noteContent}
      />
      <div className="flex justify-baseline items-center mt-3">
        <Button onClick={handleNote} size="sm" className="shadow-sm">
          Save Note
        </Button>
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
