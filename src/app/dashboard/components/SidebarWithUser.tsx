import { AppSidebar } from "@/app/dashboard/components/client/Sidebar";
import { signOut, getUser } from "@/app/actions/auth/auth";

export async function SidebarWithUser() {
  const user = await getUser();

  return <AppSidebar username={user?.username} logout={signOut} />;
}
