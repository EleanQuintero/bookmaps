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
  ImageIcon,
  Library,
  List,
  PlusSquare,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

function MyMaps() {
  const myMaps = [
    {
      id: "1",
      topic: "Stoic Philosophy",
      progress: 35,
      totalBooks: 3,
      completedBooks: 1,
      lastActive: "2 days ago",
      status: "in-progress",
      books: [
        {
          title: "Meditations",
          author: "Marcus Aurelius",
          coverPlaceholder: true,
        },
        {
          title: "Letters from a Stoic",
          author: "Seneca",
          coverPlaceholder: true,
        },
        {
          title: "Discourses",
          author: "Epictetus",
          coverPlaceholder: true,
        },
      ],
    },
    {
      id: "2",
      topic: "React Performance",
      progress: 0,
      totalBooks: 5,
      completedBooks: 0,
      lastActive: "1 week ago",
      status: "not-started",
      books: [
        {
          title: "React Performance",
          author: "Various",
          coverPlaceholder: true,
        },
        {
          title: "Advanced React",
          author: "Various",
          coverPlaceholder: true,
        },
        {
          title: "React Patterns",
          author: "Various",
          coverPlaceholder: true,
        },
      ],
    },
    {
      id: "3",
      topic: "Financial Literacy",
      progress: 80,
      totalBooks: 4,
      completedBooks: 3,
      lastActive: "Yesterday",
      status: "in-progress",
      books: [
        {
          title: "Rich Dad Poor Dad",
          author: "Robert Kiyosaki",
          coverPlaceholder: true,
        },
        {
          title: "The Intelligent Investor",
          author: "Benjamin Graham",
          coverPlaceholder: true,
        },
        {
          title: "Think and Grow Rich",
          author: "Napoleon Hill",
          coverPlaceholder: true,
        },
      ],
    },
    {
      id: "4",
      topic: "History of Rome",
      progress: 100,
      totalBooks: 6,
      completedBooks: 6,
      lastActive: "2 weeks ago",
      status: "completed",
      books: [
        {
          title: "SPQR",
          author: "Mary Beard",
          coverPlaceholder: true,
        },
        {
          title: "The Roman Empire",
          author: "Various",
          coverPlaceholder: true,
        },
        {
          title: "Caesar",
          author: "Adrian Goldsworthy",
          coverPlaceholder: true,
        },
      ],
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto p-6 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Learning Paths
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your reading progress
            </p>
          </div>
        </div>
        <Button className="gap-2">
          <PlusSquare className="h-4 w-4" />
          Create New
        </Button>
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
        {myMaps.map((map) => (
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
                {map.books.slice(0, 3).map((book, idx) => (
                  <div
                    key={idx}
                    className="relative flex-shrink-0 w-16 h-20 rounded-md bg-gradient-to-br from-secondary to-secondary/50 border border-border/50 flex items-center justify-center group-hover:scale-105 transition-transform"
                    title={`${book.title} by ${book.author}`}
                  >
                    <ImageIcon className="h-6 w-6 text-muted-foreground/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-md" />
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
        ))}
      </div>
    </div>
  );
}

export default MyMaps;
