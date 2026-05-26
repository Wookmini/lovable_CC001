import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { StatusBar } from "@/components/StatusBar";
import { GradientBlob } from "@/components/GradientBlob";
import { useAppContext } from "@/context/AppContext";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  const { isLoggedIn } = useAppContext();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden flex flex-col sm:flex-row-reverse">
        <div className="relative z-10 flex-1 flex flex-col h-full overflow-hidden">
          <GradientBlob />
          <div className="sm:hidden">
            <StatusBar />
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24 sm:pb-0 relative z-10">
            <Outlet />
          </div>
        </div>
        <BottomTabBar />
      </div>
    </PhoneFrame>
  );
}
