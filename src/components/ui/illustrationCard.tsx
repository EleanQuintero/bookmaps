import { Search, Map, Trophy, BookOpen, CheckCircle } from "lucide-react";
import { Card, CardContent } from "./card";

interface IllustrationCardProps {
  cardTitle: string;
  cardDescription: string;
  iconName: string;
}

function iconReturner(iconName: string, color?: string) {
  switch (iconName) {
    case "search":
      return <Search className="h-6 w-6 text-blue-500" />;
    case "map":
      return <Map className={`h-6 w-6 text-purple-500`} />;
    case "trophy":
      return <Trophy className="h-6 w-6 text-green-500" />;
    case "map-alt":
      return <Map className="h-5 w-5 text-primary" />;
    case "book-open":
      return <BookOpen className="h-5 w-5 text-primary" />;
    case "check-circle":
      return <CheckCircle className="h-5 w-5 text-primary" />;
    default:
      return null;
  }
}

export function IllustrationCard({
  iconName,
  cardDescription,
  cardTitle,
}: IllustrationCardProps) {
  return (
    <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-colors group">
      <CardContent className="p-6 space-y-4">
        <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
          {iconReturner(iconName)}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{cardTitle}</h3>
          <p className="text-sm text-muted-foreground">{cardDescription}</p>
        </div>
      </CardContent>
    </Card>
  );
}
