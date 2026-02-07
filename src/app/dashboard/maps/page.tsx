import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Award,
  BookMarked,
  BookOpen,
  ChevronRight,
  Clock,
  Grid,
  Library,
  List,
  PlusSquare,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getMapsData } from "@/controllers/maps/mapController";
import { Suspense } from "react";
import Link from "next/link";

async function MapsPage() {
  return (
    <Suspense fallback={<MapsSkeleton />}>
      <MyMaps />
    </Suspense>
  );
}

export function MapsSkeleton() {
  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      {/* Header Skeleton */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <Skeleton className="h-10 w-32" />
      </header>

      {/* Search and Filters Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 flex-1 max-w-sm" />
        <Skeleton className="h-10 w-20" />
      </div>

      {/* Maps Grid Skeleton */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Card key={idx} className="border-border/50">
            <CardContent className="p-6">
              {/* Header of card */}
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-11 w-11 rounded-xl" />
              </div>

              {/* Book Covers Preview Skeleton */}
              <div className="mb-4 flex gap-2">
                {Array.from({ length: 3 }).map((_, bookIdx) => (
                  <Skeleton
                    key={bookIdx}
                    className="w-16 h-20 rounded-md flex-shrink-0"
                  />
                ))}
                <Skeleton className="w-16 h-20 rounded-md flex-shrink-0" />
              </div>

              {/* Progress Section Skeleton */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2.5 w-full rounded-full" />
                <div className="flex justify-between items-center pt-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function MyMaps() {
  const maps = await getMapsData();

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl text-muted-foreground  font-bold tracking-tight">
        My Learning Paths
      </h1>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Library className="h-6 w-6" />
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <p className="text-muted-foreground mt-1">
              Manage and track your reading progress
            </p>
          </div>
        </div>
        <Link
          href={"/dashboard/create"}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors  "
        >
          <PlusSquare className="h-4 w-4" />
          Create New
        </Link>
      </header>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search your maps..." className="pl-9" />
        </div>
        <div className="flex items-center border border-input rounded-md p-1 bg-card">
          <Button variant={"ghost"} size="icon" className="h-8 w-8">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={"ghost"} size="icon" className="h-8 w-8">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Maps Grid with Book Covers */}
      <div
        className={`grid gap-6 ${"grid-cols-1 md:grid-cols-2 lg:grid-cols-2"}`}
      >
        {maps.map((map) => (
          <a href={`/dashboard/maps/${map.id}`} key={map.id}>
            <Card
              key={map.id}
              className="group cursor-pointer border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1 flex-1">
                    <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                      {map.topic}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Last active {map.lastActive}
                    </p>
                  </div>
                  <div
                    className={`
                        p-2.5 rounded-xl 
                        ${
                          map.status === "completed"
                            ? "bg-green-500/10 text-green-500"
                            : map.status === "in-progress"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-secondary text-muted-foreground"
                        }
                      `}
                  >
                    {map.status === "completed" ? (
                      <Award className="h-5 w-5" />
                    ) : map.status === "in-progress" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <BookMarked className="h-5 w-5" />
                    )}
                  </div>
                </div>

                {/* Book Covers Preview */}
                <div className="mb-4 flex gap-2 overflow-hidden">
                  {map.books
                    .filter((book) => book.coverURL)
                    .slice(0, 3)
                    .map((book, idx) => (
                      <div
                        key={idx}
                        className="relative flex-shrink-0 w-16 h-20 rounded-md bg-gradient-to-br from-secondary to-secondary/50 border border-border/50 overflow-hidden group-hover:scale-105 transition-transform"
                        title={`${book.title} by ${book.author}`}
                      >
                        {book.coverURL ? (
                          <img
                            src={book.coverURL}
                            alt={`${book.title} cover`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-md" />
                        )}
                      </div>
                    ))}
                  {map.totalBooks > 3 && (
                    <div className="flex-shrink-0 w-16 h-20 rounded-md bg-secondary/30 border border-border/30 border-dashed flex items-center justify-center">
                      <span className="text-xs font-medium text-muted-foreground">
                        +{map.totalBooks - 3}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" />
                      Progress
                    </span>
                    <span className="font-semibold">{map.progress}%</span>
                  </div>
                  <Progress value={map.progress} className="h-2.5" />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {map.completedBooks} of {map.totalBooks} books
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-primary font-medium text-sm">
                      Continue <ChevronRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MapsPage;
