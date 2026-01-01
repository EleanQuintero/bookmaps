import Footer from "@/components/ui/footer";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {children}
      <Footer />
    </div>
  );
}
