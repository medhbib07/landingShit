import * as React from "react";
import { useParams, Link } from "react-router-dom";
import {
  IconBuilding,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SettingsDialog } from "@/components/settings-dialog";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";

export function AppSidebar({
  onAccountClick,
  onBillingClick,
  onNotificationsClick,
  onLogoutClick,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  onAccountClick?: () => void;
  onBillingClick?: () => void;
  onNotificationsClick?: () => void;
  onLogoutClick?: () => void;
}) {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";
  const [settingsOpen, setSettingsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);

  const data = {
    user: {
      name: user?.fullName || "Guest User",
      email: user?.email || "guest@example.com",
      avatar: "/avatars/user.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: `/${currentLang}/dashboard/overview`,
        icon: IconDashboard,
      },
      {
        title: "Requests",
        url: `/${currentLang}/dashboard/requests`,
        icon: IconReport,
      },

      {
        title: "Analytics",
        url: `/${currentLang}/dashboard/analytics`,
        icon: IconChartBar,
      },
      {
        title: "Enterprises",
        url: `/${currentLang}/dashboard/enterprises`,
        icon: IconBuilding,
      },
      {
        title: "Team",
        url: `/${currentLang}/dashboard/super-admins`,
        icon: IconUsers,
      },
    ],
    navClouds: [
      {
        title: "Capture",
        icon: IconCamera,
        isActive: true,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Proposal",
        icon: IconFileDescription,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
      {
        title: "Prompts",
        icon: IconFileAi,
        url: "#",
        items: [
          {
            title: "Active Proposals",
            url: "#",
          },
          {
            title: "Archived",
            url: "#",
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: IconSettings,
      },
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
    ],
    documents: [
      {
        name: "Data Library",
        url: "#",
        icon: IconDatabase,
      },
      {
        name: "Reports",
        url: "#",
        icon: IconReport,
      },
      {
        name: "Word Assistant",
        url: "#",
        icon: IconFileWord,
      },
    ],
  };

  // Filter main navigation based on role
  const filteredNavMain = React.useMemo(() => {
    if (user?.role === "SuperAdmin") return data.navMain;
    if (user?.role === "EnterpriseAdmin") {
      return data.navMain
        .filter((item) => item.title === "Dashboard" || item.title === "Team")
        .map((item) =>
          item.title === "Team"
            ? {
              ...item,
              title: "Users",
              url: `/${currentLang}/dashboard/users`,
            }
            : item,
        );
    }
    // Default for other roles (e.g. Client)
    return data.navMain.filter((item) => item.title === "Dashboard");
  }, [user?.role, data.navMain]);

  // Determine if documents section should be visible
  const showDocuments = user?.role === "SuperAdmin";

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to={`/${currentLang}/dashboard/overview`}>
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">BATIX</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {showDocuments && <NavDocuments items={data.documents} />}
        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
          onItemClick={(title) => {
            if (title === "Settings") {
              setSettingsOpen(true);
            }
          }}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={data.user}
          onAccountClick={onAccountClick}
          onBillingClick={onBillingClick}
          onNotificationsClick={onNotificationsClick}
          onLogoutClick={onLogoutClick}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
