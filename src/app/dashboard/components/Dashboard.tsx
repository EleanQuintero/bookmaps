import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Library,
  Target,
  TrendingUp,
  Zap,
  Award,
  Star,
  ArrowRight,
} from "lucide-react";

interface DashboardProps {
  username: string;
}

function Dashboard({ username }: DashboardProps) {
  return (
    <section className="flex flex-col h-screen items-center justify-center overflow-hidden bg-primary-foreground text-primary ">
      <main className="">
        <div className="min-h-full flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-4xl space-y-12">
            {/* Header - Centered */}
            <header className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Your Learning Dashboard</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">
                 {`Welcome Back ${username}`}
              </h1>
              <p className="text-muted-foreground text-lg">{}</p>
            </header>

            {/* Stats Cards - Centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <Library className="h-6 w-6" />
                    </div>
                    <Target className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Total Maps
                    </p>
                    <h3 className="text-4xl font-bold">{}</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Learning paths created
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-orange-500/30 hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <Zap className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      In Progress
                    </p>
                    <h3 className="text-4xl font-bold">{}</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Currently reading
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-green-500/30 hover:shadow-lg transition-all group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                      <Award className="h-6 w-6" />
                    </div>
                    <Star className="h-5 w-5 text-muted-foreground/40" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Completed
                    </p>
                    <h3 className="text-4xl font-bold">{}</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Paths finished
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions - Centered */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="text-lg">Create New Map</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Generate a new learning path with AI
                      </p>
                    </div>
                    <ArrowRight className="h-8 w-8 text-primary group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16" />
                <CardContent className="p-8 relative">
                  <div className="flex items-center justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 font-semibold">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                          <Library className="h-5 w-5" />
                        </div>
                        <span className="text-lg">View All Maps</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Manage your learning paths
                      </p>
                    </div>
                    <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Dashboard;
