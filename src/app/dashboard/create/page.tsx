import { Card, CardContent } from "@/components/ui/card";
import { PlusSquare, Sparkles } from "lucide-react";
import { GenerateForm } from "@/app/dashboard/create/components/form/form";

export default function BookmapCreator() {
  const exampleTopics = [
    "Stoic Philosophy",
    "Backend Architecture",
    "Machine Learning",
    "History of Rome",
    "Quantum Physics",
    "Financial Literacy",
  ];

  return (
    <section className="flex flex-col h-screen items-center justify-center overflow-hidden bg-primary-foreground text-primary ">
      <div className="container max-w-6xl mx-auto p-6 space-y-8">
        <header className="flex flex-col  items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <PlusSquare className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create New BookMap
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate a structured reading path for any topic
            </p>
          </div>
        </header>

        <Card className="border-primary/20 bg-primary/5 shadow-sm max-w-3xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  <Sparkles className="h-5 w-5" />
                  <span>AI-Powered Learning Paths</span>
                </div>
                <h2 className="text-2xl font-bold">
                  What do you want to learn?
                </h2>
                <p className="text-muted-foreground">
                  Enter any topic and get a curated reading list in seconds
                </p>
              </div>

              <GenerateForm />

              <div className="pt-6">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Popular topics:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {exampleTopics.map((t) => (
                    <button
                      key={t}
                      className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors shadow-sm"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
