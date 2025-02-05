"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/hooks/store/use-store";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useUserStore((state: any) => state.user);

  const navMainWithoutFilter = [
    {
      title: "My Books",
      isActive: true,
      url: "/my-books",
      role: ["ADMIN", "READER"],
    },
    {
      title: "All Books",
      url: "/all-books",
      role: ["ADMIN", "READER"],
    },
    {
      title: "Users",
      url: "/users",
      role: ["ADMIN"],
    },
  ];

  const navMain = navMainWithoutFilter.filter((item) =>
    item.role.includes(user?.role || "READER")
  );
  console.log(user);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center text-xl font-bold">
          Library
        </div>
        <div className="flex flex-col items-center justify-center">
          {user?.username
            ? `Welcome ${user?.username}`
            : "Please login to access your account"}
          {user?.role}
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {navMain.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={item.isActive}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      {/* <SidebarRail /> */}
      <SidebarFooter>
        <div className="flex flex-col items-center justify-center">
          {user?.username
            ? `Welcome ${user?.username}`
            : "Please login to access your account"}
          {user?.role}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
