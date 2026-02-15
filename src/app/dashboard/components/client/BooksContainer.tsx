"use client";
import { useMapStore } from "@/stores/map-item-store";
import { BookInfo } from "./BookInfo";
import BookCoverCard from "../BookCoverCard";
import { BookNotes } from "./BookNotes";
import { Card, CardContent } from "@/components/ui/card";

export const BooksContainer = () => {
  const { mapData } = useMapStore();
  const { map_items } = mapData;
  if (map_items.length === 0) {
    return <div>No books available.</div>;
  }
  return (
    <div className="flex flex-col gap-8">
      {map_items.map((item, index) => (
        <Card
          className="book-card-item transition-all border-border/50 hover:border-primary/30"
          key={item.id}
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex gap-8">
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
                  <BookNotes item_id={item.id} initialNotes={item.notes} />
                </BookInfo>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
