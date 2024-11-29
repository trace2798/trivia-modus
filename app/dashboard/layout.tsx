import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { ApolloWrapper } from '@/lib/apollo-wrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full overflow-x-hidden">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ApolloWrapper>
  );
}
