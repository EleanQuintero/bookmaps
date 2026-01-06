import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/dashboard/components/Sidebar";
import { signOut, getUser } from "@/app/auth/actions/auth/auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <SidebarProvider>
      <AppSidebar username={user?.username} logout={signOut} />
      <main className="flex-1 w-full min-h-screen bg-black">
        <div className="p-4">
          <SidebarTrigger />
        </div>

        {children}
      </main>
    </SidebarProvider>
  );
}
