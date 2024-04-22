import { DocsSidebarNav } from '@/components/sidenav';
import { Text } from '@/components/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { docsSidebar } from '@/lib/sidebar';

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex-1 items-start pb-10 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <DocsSidebarNav items={docsSidebar} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  );
}
