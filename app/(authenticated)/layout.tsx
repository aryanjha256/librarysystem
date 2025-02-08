"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserStore } from "@/hooks/store/use-store";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const setUser = useUserStore((state) => state.setUser);
  const userData = sessionStorage.getItem("userData");

  if (userData) {
    setUser(JSON.parse(userData));
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
