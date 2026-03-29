/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { TextEffect } from "../../components/ui/text-effect";
import { AnimatedGroup } from "../../components/ui/animated-group";
import { HeroHeader } from "./header";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const transitionVariants: any = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection({
  onGetStarted,
  onTryDemo,
}: {
  onGetStarted: () => void;
  onTryDemo: () => void;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative">
      <HeroHeader onGetStarted={onGetStarted} />
      <div className="overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block pointer-events-none"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section aria-labelledby="hero-title" aria-label="Introduction">
          <div className="relative pt-24 md:pt-36">
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 0.2,
                    },
                  },
                },
              }}
              className="mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32 bg-linear-to-b from-primary/5 to-transparent"
              children={undefined}
            ></AnimatedGroup>

            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]"
            />

            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#features"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    <span className="text-zinc-950 dark:text-foreground text-sm font-bold uppercase tracking-tight">
                      {t("hero.badge")}
                    </span>
                    <span
                      className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"
                      aria-hidden="true"
                    ></span>

                    <div
                      className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500"
                      aria-hidden="true"
                    >
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>
                </AnimatedGroup>

                <h1
                  id="hero-title"
                  className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-black md:text-7xl lg:mt-16 xl:text-[5.25rem] tracking-tight text-foreground dark:text-white"
                >
                  <TextEffect
                    key={i18n.language}
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="span"
                  >
                    {t("hero.title")}
                  </TextEffect>
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg md:text-xl text-zinc-700 dark:text-muted-foreground leading-relaxed font-medium">
                  <TextEffect
                    key={i18n.language}
                    per="line"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="span"
                  >
                    {t("hero.description")}
                  </TextEffect>
                </p>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.8,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row"
                >
                  <div
                    key={1}
                    className="bg-primary/20 rounded-[calc(var(--radius-2xl)+4px)] border border-primary/30 p-1"
                  >
                    <Button
                      size="xl"
                      className="rounded-2xl px-8 shadow-2xl shadow-primary/20 focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                      onClick={onTryDemo}
                    >
                      <span className="text-nowrap">{t("hero.cta_demo")}</span>
                    </Button>
                  </div>
                  <Button
                    key={2}
                    asChild
                    size="xl"
                    variant="outline"
                    className="rounded-2xl px-8 border-2 focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <a href="#how-it-works">
                      <span className="text-nowrap">{t("hero.cta_how")}</span>
                    </a>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 1.2,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-16 md:mt-24 px-4"
            >
              <div
                className="relative mx-auto max-w-6xl"
                role="img"
                aria-label={t("hero.dashboard_alt")}
              >
                <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-primary/10 rounded-[2rem] blur-2xl opacity-20 -z-10 animate-pulse"></div>
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative overflow-hidden rounded-[2rem] border-4 border-muted p-2 shadow-2xl ring-1">
                  <div className="bg-linear-to-br from-secondary to-background aspect-video relative flex items-center justify-center rounded-[1.5rem] overflow-hidden border border-border shadow-inner">
                    {mounted ? (
                      <img
                        src={
                          theme === "dark"
                            ? "./dashboard-dark.png"
                            : "./dashboard-light.png"
                        }
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover animate-in fade-in duration-1000"
                        fetchPriority="high"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-4 z-10">
                        <div
                          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary animate-bounce"
                          aria-hidden="true"
                        >
                          <ArrowRight className="-rotate-45" size={40} />
                        </div>
                        <span className="text-primary-contrast dark:text-primary font-black text-3xl tracking-widest   uppercase">
                          {t("hero.dashboard_title")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
        <section
          className="bg-background pb-16 pt-24 md:pb-32"
          aria-label={t("hero.trusted_by")}
        >
          <div className="group relative m-auto max-w-5xl px-6">
            <div
              className="absolute -top-12 left-1/2 -translate-x-1/2 text-sm font-black uppercase tracking-[0.2em] text-foreground/80   px-6 py-2 border border-primary/20 rounded-full bg-background shadow-xl z-20"
              aria-hidden="true"
            >
              {t("hero.trusted_by")}
            </div>
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <a
                href="#customers"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm shadow-xl hover:scale-110 transition-transform flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <span>{t("hero.customers_cta")}</span>
                <ChevronRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div
              className="group-hover:blur-sm mx-auto mt-12 grid max-w-2xl grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-8 transition-all duration-700 group-hover:opacity-30 sm:gap-x-16 sm:gap-y-14 grayscale brightness-50 dark:brightness-100 dark:opacity-90"
              role="list"
              aria-label={t("hero.trusted_partners")}
            >
              {[
                { name: "Nvidia", weight: "font-black" },
                { name: "Column", weight: "font-bold" },
                { name: "GitHub", weight: "font-black" },
                { name: "Nike", weight: "font-black" },
                { name: "LemonSqueezy", weight: "font-bold" },
                { name: "Laravel", weight: "font-medium" },
                { name: "Lilly", weight: "font-black" },
                { name: "OpenAI", weight: "font-black" },
              ].map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center h-8"
                  role="listitem"
                >
                  <span
                    className={cn(
                      "text-xl      text-foreground lowercase",
                      logo.weight,
                    )}
                    aria-label={logo.name}
                  >
                    {logo.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
