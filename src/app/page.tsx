import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CTA } from "@/components/landing/CTA";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Nav } from "@/components/landing/Nav";
import { Paas } from "@/components/landing/Paas";
import { ReadingPathDiagram } from "@/components/landing/ReadingPathDiagram";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />

      <section id="hero" className="px-4 pt-20 pb-24 text-center sm:pt-28">
        <Hero
          minTitle="AI-powered reading paths"
          title="Master any topic,"
          accent="in the right order."
          description="Stop guessing what to read next. We curate the journey from beginner to expert."
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base">
            <a href="/auth">
              Build my reading path
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Join 1,000+ learners
          </span>
        </div>

        <ReadingPathDiagram />
      </section>

      <section id="how-works" className="px-4 py-20 sm:py-24">
        <HowItWorks />
      </section>

      <section id="why">
        <Paas />
      </section>

      <section id="cta" className="py-24 sm:py-28">
        <CTA />
      </section>

      <Footer />
    </main>
  );
}
