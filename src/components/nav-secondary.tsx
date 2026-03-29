"use client";

import * as React from "react";
import { type Icon } from "@tabler/icons-react";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  items,
  onItemClick,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
    onClick?: () => void;
  }[];
  onItemClick?: (title: string) => void;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const location = useLocation();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  onClick={() => {
                    if (item.onClick) item.onClick();
                    if (onItemClick) onItemClick(item.title);
                  }}
                  className={cn(
                    "transition-all duration-300",
                    isActive &&
                      "bg-primary/10 text-primary font-bold shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)] ring-1 ring-primary/20",
                  )}
                >
                  <Link
                    to={item.url}
                    onClick={(e) => {
                      if (item.title === "Settings" || item.onClick) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <item.icon
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-sidebar-foreground/60",
                      )}
                    />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
