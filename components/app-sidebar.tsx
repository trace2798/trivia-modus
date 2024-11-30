import {
  Clapperboard,
  Dices,
  Film,
  LayoutDashboard,
  TrendingUpDownIcon,
} from 'lucide-react';
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
} from '@/components/ui/sidebar';
import { SignOutButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Separator } from './ui/separator';
import UserButton from './user-button';
import Link from 'next/link';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Trivia',
    url: '/dashboard/movie',
    icon: Film,
  },
  {
    title: 'Recommend',
    url: '/recommend',
    icon: Clapperboard,
  },
  {
    title: 'Your Stats',
    url: '/dashboard/stats',
    icon: TrendingUpDownIcon,
  },
];

export async function AppSidebar() {
  const { userId, redirectToSignIn } = await auth();
  console.log('USER ID Side bar', userId);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link href="/">
            <SidebarGroupLabel className="text-3xl text-primary font-semibold">
              Rec & Triv
            </SidebarGroupLabel>
          </Link>
          <Separator className="w-full my-3" />
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
            <SidebarMenuButton asChild>
              <SignOutButton />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
