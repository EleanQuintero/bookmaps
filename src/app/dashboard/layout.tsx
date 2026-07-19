import { Suspense } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarWithUser } from "@/app/dashboard/components/SidebarWithUser";
import { SidebarSkeleton } from "@/app/dashboard/components/SidebarSkeleton";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<SidebarSkeleton />}>
        <SidebarWithUser />
      </Suspense>
      <main className="flex-1 w-full min-h-screen bg-background">
        <div className="flex items-center justify-between p-4">
          <SidebarTrigger />
          <ThemeToggle />
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}
