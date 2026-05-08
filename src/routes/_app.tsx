import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { StatusBar } from "@/components/StatusBar";
import { GradientBlob } from "@/components/GradientBlob";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

function AppShell() {
  return (
    <PhoneFrame>
      <div className="relative w-full h-full overflow-hidden">
        <GradientBlob />
        <div className="relative z-10 h-full flex flex-col">
          <StatusBar />
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            <Outlet />
          </div>
        </div>
        <BottomTabBar />
      </div>
    </PhoneFrame>
  );
}
