"use client";

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
  SidebarProvider,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React, { useState } from "react";
import type { FilterState } from "./Types";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function Dashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [filter, setFilter] = useState<FilterState>({
    status: "",
    priority: "",
    category: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full ">
        <Sidebar>
          <SidebarHeader>
            <div className="flex flex-col space-y-0 px-2 py-4 sm:px-2 md:px-2 border-b">
              <img
                src="http://res.cloudinary.com/dhq5ewbyu/image/upload/v1736862426/Bit-A_v7_Electric_Blue_cyii64.svg"
                alt="Bit-A Desarrollo Web logo"
                className="w-[5rem] mb-5 pointer-events-none select-none sm:w-[7rem] md:w-[8rem]"
              ></img>
              <h2 className="text-xs font-bold text-muted-foreground">
                Ticket Administration
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Vistas</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link href="/helpdesk-dashboard/overview">
                      <SidebarMenuButton
                        isActive={pathname === "/helpdesk-dashboard/overview"}
                      >
                        Overview
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <Link href="/helpdesk-dashboard/tickets">
                      <SidebarMenuButton
                        isActive={pathname === "/helpdesk-dashboard/tickets"}
                      >
                        Tickets Activos
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/helpdesk-dashboard/locales">
                      <SidebarMenuButton
                        isActive={pathname === "/helpdesk-dashboard/locales"}
                      >
                        Locales
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link href="/helpdesk-dashboard/analytics">
                      <SidebarMenuButton
                        isActive={pathname === "/helpdesk-dashboard/analytics"}
                      >
                        Análisis
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="h-16">
            <SignedIn>
              <div className=" h-full">
                <UserButton
                  appearance={{
                    baseTheme: dark,
                    variables: {
                      colorPrimary: "blue",
                    },
                  }}
                />
              </div>
            </SignedIn>
          </SidebarFooter>
        </Sidebar>
        <div className="w-full p-8 overflow-auto">{children}</div>
      </div>
    </SidebarProvider>
  );
}
