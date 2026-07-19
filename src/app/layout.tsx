import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono, Lora } from "next/font/google";
import "./globals.css";
import TanStackProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

// Display — grotesca con carácter (títulos, hero)
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Body / UI
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Mono — eyebrows, labels, números de paso
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// Book prose — descripciones de libros
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookMap — AI-Generated Reading Paths",
  description:
    "Turn any topic into an ordered reading path of real, verified books, then track your progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bricolage.variable} ${inter.variable} ${plexMono.variable} ${lora.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <TanStackProvider>{children}</TanStackProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
