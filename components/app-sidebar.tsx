import { LayoutDashboard, LogOutIcon, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import { getClient } from "@/lib/apollo-client";
import { GET_USER_PROFILE } from "@/lib/queries";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export async function AppSidebar() {
  const user = await stackServerApp.getUser();
  console.log("USER", user);
  const { data } = await getClient().query({
    query: GET_USER_PROFILE,
    variables: {
      userId: user?.id,
      email: user?.primaryEmail,
      name: user?.displayName,
    },
  });
  console.log("SIDEBAR", data)
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-3xl">Trivia</SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu className="flex flex-col space-y-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
            <UserButton />
          </SidebarMenuItem>
          <SidebarMenuItem>
            {data.userProfile}
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href={`/handler/sign-out`}>
                <LogOutIcon />
                <span>Sign Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
