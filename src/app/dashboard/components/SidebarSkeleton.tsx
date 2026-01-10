import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <div className="p-4">
        <Skeleton className="h-12 w-full" />
      </div>
      <SidebarContent>
        <div className="space-y-4 p-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </SidebarContent>
      <div className="p-4 mt-auto">
        <Skeleton className="h-12 w-full" />
      </div>
    </Sidebar>
  );
}
