import { getMapById } from "@/services/maps/mapService";
import { Suspense } from "react";
import { MapsSkeleton } from "../page";
import { CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AppAvatar } from "@/app/dashboard/components/AppAvatar";
import BookItem from "../../components/BookItem";
import MapStoreProvider from "@/providers/map-store-provider";
import { DeleteMapButton } from "../../components/client/DeleteMapButton";
import { ShareMapControl } from "../../components/client/ShareMapControl";

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

  const { title, description, map_items, is_public } = data;

  const completedCount = map_items.filter(
    (book) => book.status === "completed",
  ).length;

  const progress = Math.round((completedCount / map_items.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      {/* Bookmap header — identity, about, share, and progress in one section */}
      <header className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
          {/* Identity + share */}
          <div className="flex flex-wrap items-center gap-4">
            <AppAvatar size="md" />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl text-foreground font-bold leading-tight">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">Learning Path</p>
            </div>
            <ShareMapControl mapId={id} isPublic={is_public} />
          </div>

          {/* About */}
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {progress}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2.5" />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
        {/* Books List */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl text-foreground font-bold">Reading List</h2>
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

        {/* Danger Zone */}
        <Card className="border-destructive/20 bg-destructive/5 mt-8">
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="font-semibold text-lg text-destructive mb-1">Danger Zone</h2>
              <p className="text-muted-foreground text-sm">
                Once you delete a map, there is no going back. Please be certain.
              </p>
            </div>
            <DeleteMapButton mapId={id} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default MapPage;
