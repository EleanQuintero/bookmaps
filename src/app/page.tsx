import { CTA } from "@/components/landing/CTA";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Paas } from "@/components/landing/Paas";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-background text-primary">
      <section
        id="hero"
        className="flex flex-col items-center justify-center px-4 pt-20 pb-16 text-center"
      >
        <Hero />
      </section>
      <section id="how-works" className="px-4 py-16 border-b border-border/40">
        <HowItWorks />
      </section>
      <section id="purpose" className="px-4">
        <Paas />
      </section>
      <section id="cta" className="">
        <CTA />
      </section>
      <section
        id="footer"
        className="px-4 py-8 text-center text-sm text-muted-foreground"
      >
        <Footer />
      </section>
    </main>
  );
}
