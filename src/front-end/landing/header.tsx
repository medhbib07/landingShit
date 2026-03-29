"use client";

import { Logo } from "./logo";
import { Menu, X, Sun, Moon, Languages, ArrowRight, Type } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HeroHeader = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDyslexic, setIsDyslexic] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("dyslexic-font") === "true";
    }
    return false;
  });

  const { scrollY } = useScroll();

  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic scroll-based values
  const navPadding = useTransform(scrollY, [0, 50], ["1.5rem", "0.75rem"]);
  const navWidth = useTransform(scrollY, [0, 50], ["100%", "92%"]);

  // Dyslexic font toggle
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute(
        "data-font",
        isDyslexic ? "dyslexic" : "normal"
      );
      if (isDyslexic) {
        document.body.classList.add("dyslexic-font");
        document.documentElement.classList.add("dyslexic-font");
      } else {
        document.body.classList.remove("dyslexic-font");
        document.documentElement.classList.remove("dyslexic-font");
      }
      localStorage.setItem("dyslexic-font", isDyslexic.toString());
    }
  }, [isDyslexic]);

  const menuItems = [
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.solution"), href: "#solution" },
    { name: t("nav.tiers"), href: "#deployment-tiers" },
    { name: t("nav.about"), href: "#why-batix" },
  ];

  const languages = [
    { code: "en", name: t("common.en") },
    { code: "fr", name: t("common.fr") },
    { code: "ar", name: t("common.ar") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className="fixed top-0 z-50 w-full"
      role="banner"
      aria-label="Global Header"
    >
      <motion.nav
        initial={false}
        animate={isScrolled ? "scrolled" : "top"}
        className="mx-auto flex items-center justify-center px-4 transition-all duration-500"
        aria-label="Main Navigation"
      >
        <motion.div
          style={{ width: navWidth, padding: navPadding }}
          className={cn(
            "relative flex items-center justify-between transition-all duration-500",
            isScrolled &&
              "mt-4 rounded-4xl border border-primary/10 bg-background/60 backdrop-blur-xl shadow-2xl shadow-primary/5 px-8"
          )}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={t("nav.home")}
              className="group flex items-center gap-2 focus-visible:outline-none bg-transparent border-none cursor-pointer p-0"
            >
              <Logo className="transition-transform duration-300 group-hover:scale-110" />
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center gap-2">
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={item.href}
                    className="relative px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary group"
                  >
                    {item.name}
                    <motion.span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Language, Theme, Dyslexic - Desktop */}
            <div className="hidden sm:flex items-center gap-2 mr-2">
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-10 h-10 transition-colors border border-primary/10 bg-primary/5 hover:bg-primary/10 hover:text-primary"
                    aria-label={t("common.switch_language")}
                  >
                    <Languages className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="rounded-2xl border-primary/10 bg-background/80 backdrop-blur-lg"
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={cn(
                        "cursor-pointer rounded-xl font-bold uppercase text-xs tracking-widest transition-colors m-1",
                        i18n.language === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-transparent"
                      )}
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full w-9 h-9 transition-colors relative overflow-hidden hover:bg-transparent hover:text-primary"
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === "dark" ? 0 : 90,
                    scale: theme === "dark" ? 1 : 0,
                    opacity: theme === "dark" ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{
                    rotate: theme === "dark" ? -90 : 0,
                    scale: theme === "dark" ? 0 : 1,
                    opacity: theme === "dark" ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              </Button>

              {/* Dyslexic Font Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDyslexic(!isDyslexic)}
                    className={cn(
                      "rounded-full w-9 h-9 transition-all relative overflow-hidden active:scale-95 group/dyslexic",
                      isDyslexic
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "border border-primary/10 bg-primary/5 hover:bg-primary/10 hover:text-primary"
                    )}
                    aria-label="Toggle Dyslexic Friendly Font"
                  >
                    <div className="flex items-center justify-center relative w-full h-full">
                      <Type
                        className={cn(
                          "h-4 w-4 transition-all duration-300",
                          isDyslexic
                            ? "scale-0 opacity-0"
                            : "scale-100 opacity-100 group-hover/dyslexic:scale-0 group-hover/dyslexic:opacity-0"
                        )}
                      />
                      <span
                        className={cn(
                          "absolute inset-0 flex items-center justify-center text-[10px] font-bold transition-all duration-300 dyslexic-font",
                          isDyslexic
                            ? "scale-100 opacity-100"
                            : "scale-0 opacity-0 group-hover/dyslexic:scale-125 group-hover/dyslexic:opacity-100"
                        )}
                      >
                        Ab
                      </span>
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-primary text-primary-foreground font-bold p-3 rounded-xl border-none shadow-2xl"
                >
                  <p className={isDyslexic ? "" : "dyslexic-font text-sm"}>
                    {isDyslexic
                      ? "Switch to Standard Font"
                      : "Try Dyslexic Friendly Font (Lexend)"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Get Started Button */}
            <Button
              className="relative rounded-full px-6 py-6 font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all group overflow-hidden"
              onClick={onGetStarted}
            >
              <div className="absolute inset-0 bg-linear-to-r from-primary via-primary/80 to-primary opacity-90" />
              <span className="relative flex items-center gap-2 text-primary-foreground min-w-max">
                {t("nav.get_started")}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
              <div className="absolute -inset-1 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
            </Button>

            {/* Mobile Menu */}
            <div className="flex lg:hidden ml-2">
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-primary/10 bg-primary/5 hover:bg-primary/10 active:scale-90 transition-all"
                    aria-label={t("nav.toggle_menu")}
                  >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="top"
                  className="h-[90vh] rounded-b-[3rem] border-primary/10 bg-background/95 backdrop-blur-2xl px-6 py-12"
                >
                  <SheetHeader className="hidden">
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>Mobile navigation</SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col h-full">
                    <div className="w-full space-y-12 text-center mt-8 overflow-y-auto pb-10">
                      <Logo className="mx-auto scale-150 mb-12" />

                      <ul className="flex flex-col gap-6">
                        {menuItems.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <a
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-4xl font-black uppercase text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-4"
                            >
                              {item.name}
                              <ArrowRight size={24} className="text-primary/40" />
                            </a>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 px-4"
                      >
                        <Button
                          size="xl"
                          onClick={() => {
                            setMenuOpen(false);
                            onGetStarted();
                          }}
                          className="w-full h-20 rounded-[1.5rem] bg-primary text-primary-foreground text-xl font-black uppercase tracking-widest shadow-2xl shadow-primary/30 active:scale-95 transition-all"
                        >
                          {t("nav.get_started")}
                          <ArrowRight className="ml-4 h-6 w-6" />
                        </Button>
                      </motion.div>
                    </div>

                    {/* Mobile Footer Controls */}
                    <div className="mt-auto w-full flex items-center justify-between pt-8 border-t border-primary/10">
                      <div className="flex gap-4">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              changeLanguage(lang.code);
                              setMenuOpen(false);
                            }}
                            className={cn(
                              "text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all",
                              i18n.language === lang.code
                                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                                : "border-primary/20 text-muted-foreground"
                            )}
                          >
                            {lang.code.toUpperCase()}
                          </button>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                          className="h-12 w-12 rounded-full border border-primary/10 bg-primary/5"
                        >
                          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsDyslexic(!isDyslexic)}
                          className={cn(
                            "h-12 w-12 rounded-full border border-primary/10 bg-primary/5 transition-all",
                            isDyslexic && "bg-primary text-primary-foreground border-primary"
                          )}
                        >
                          <Type size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </header>
  );
};