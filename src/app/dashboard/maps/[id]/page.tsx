import { getMapById } from "@/services/maps/mapService";
import { Suspense } from "react";
import { MapsSkeleton } from "../page";
import { ArrowLeft, CheckCircle2, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppAvatar } from "@/app/dashboard/components/AppAvatar";
import BookItem from "../../components/BookItem";
import MapStoreProvider from "@/providers/map-store-provider";

interface params {
  params: Promise<{ id: string }>;
}

async function MapPage({ params }: params) {
  const { id } = await params;
  const mapData = await getMapById(id);

  if (!mapData || mapData.error) {
    return <h1>Data not found</h1>;
  }

  return (
    <MapStoreProvider data={mapData.data}>
      <Suspense fallback={<MapsSkeleton />}>
        <MapDisplay params={params} />
      </Suspense>
    </MapStoreProvider>
  );
}

async function MapDisplay({ params }: params) {
  const { id } = await params;
  const mapData = await getMapById(id);

  const { data, error } = mapData;

  if (error) {
    return <h1> {error.message} </h1>;
  }

  const { title, description, map_items } = data;

  console.log(typeof data);

  const completedCount = map_items.filter(
    (book) => book.status === "completed",
  ).length;

  console.log(completedCount);

  const progress = Math.round((completedCount / map_items.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <AppAvatar size="md" />
            <div className="flex-1">
              <h1 className="text-2xl text-white font-bold"> {title} </h1>
              <p className="text-sm text-muted-foreground">Learning Path</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progress}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Map Description */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg mb-2">About This Path</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Books List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl text-white font-bold">Reading List</h2>
            <Badge variant="secondary" className="ml-2">
              {completedCount} of {map_items.length} completed
            </Badge>
          </div>

          <BookItem />
        </div>

        {/* Completion Message */}
        {progress === 100 && (
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-muted-foreground">
                You&apos;ve completed the Stoic Philosophy learning path. Ready
                to start a new journey?
              </p>
              <Button className="mt-4">Explore More Paths</Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default MapPage;
