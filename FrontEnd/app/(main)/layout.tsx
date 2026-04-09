import { BottomNavigation } from "@/components/BottomNavigation";
import { MainSidebar } from "@/components/MainSidebar";
import { AuthGuard } from "@/components/AuthGuard";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-dvh">
        <MainSidebar />
        <div className="min-h-dvh lg:pl-64">{children}</div>
        <BottomNavigation />
      </div>
    </AuthGuard>
  );
}
