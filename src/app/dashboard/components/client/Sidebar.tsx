"use client";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  Map,
  BarChart3,
  Settings,
  User2,
  LogOut,
  Home,
  MapPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SidbarProps {
  username: string | null;
  logout: () => void;
}

const platformItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "New Map",
    url: "/dashboard/create",
    icon: MapPlus,
  },
  {
    title: "My maps",
    url: "/dashboard/maps",
    icon: Map,
  },
  {
    title: "Stats",
    url: "/dashboard/stats",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar({ username, logout }: SidbarProps) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className="w-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  tooltip="Bookmaps"
                >
                  <BookOpen className="h-5 w-5 group-data-[collapsible=sidebar]:hidden" />
                  <div className="flex flex-col items-start flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold truncate">Bookmaps</span>
                    <span className="text-xs text-muted-foreground truncate">
                      Learning Platform
                    </span>
                  </div>
                  <ChevronDown className="ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Workspace 1</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Workspace 2</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span className="text-[0.85rem]">{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50 group-data-[collapsible=icon]:hidden" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Usuario"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  <User2 className="h-5 w-5" />
                  <span>{username}</span>
                  <ChevronDown className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Mi Cuenta</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <Button
                    onClick={() => logout()}
                    size={"sm"}
                    variant="ghost"
                    className="p-0 h-1 text-start"
                  >
                    <span>Cerrar sesión</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
