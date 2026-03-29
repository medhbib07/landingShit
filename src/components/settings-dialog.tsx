import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Monitor, Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    // Update URL to reflect new language if currently in a language route
    const currentPath = location.pathname;
    const parts = currentPath.split("/");
    // Assuming format is /lang/..., parts[1] is the lang
    if (parts.length > 1 && ["en", "fr", "ar"].includes(parts[1])) {
      parts[1] = lang;
      navigate(parts.join("/"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your workspace appearance and language preferences.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className={cn(
                    "h-24 flex-col gap-2",
                    theme === "light" && "border-primary border-2 bg-primary/5",
                  )}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="h-6 w-6" />
                  <span className="font-medium">Light</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "h-24 flex-col gap-2",
                    theme === "dark" && "border-primary border-2 bg-primary/5",
                  )}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="h-6 w-6" />
                  <span className="font-medium">Dark</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "h-24 flex-col gap-2",
                    theme === "system" &&
                      "border-primary border-2 bg-primary/5",
                  )}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="h-6 w-6" />
                  <span className="font-medium">System</span>
                </Button>
              </div>
            </div>

            {/* Enterprise Theme Customization — EnterpriseAdmin only */}
            {(user?.role === "EnterpriseAdmin" ||
              user?.role === "SuperAdmin") && (
              <div className="space-y-2 pt-2 border-t">
                <Label>Enterprise Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Customize your enterprise's colors, fonts, and style.
                </p>
                <Button
                  className="w-full gap-2"
                  onClick={() => {
                    onOpenChange(false);
                    const parts = location.pathname.split("/");
                    const lang =
                      parts.length > 1 && ["en", "fr", "ar"].includes(parts[1])
                        ? parts[1]
                        : i18n.language || "en";
                    navigate(`/${lang}/dashboardDemo`);
                  }}
                >
                  <Palette className="h-4 w-4" />
                  Customize Enterprise Theme
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="language" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Interface Language</Label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { code: "en", label: "English", display: "English" },
                  { code: "fr", label: "French", display: "Français" },
                  { code: "ar", label: "Arabic", display: "العربية" },
                ].map((lang) => (
                  <Button
                    key={lang.code}
                    variant="outline"
                    className={cn(
                      "justify-between px-4 h-12",
                      i18n.language === lang.code &&
                        "border-primary border-2 bg-primary/5",
                    )}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{lang.display}</span>
                    </span>
                    {i18n.language === lang.code && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
