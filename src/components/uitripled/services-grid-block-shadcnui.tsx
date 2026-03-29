"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  BarChart3,
  Cpu,
  GanttChartSquare,
  HardHat,
  Wallet,
  Users,
} from "lucide-react";
import { ContactFormSection } from "./contact-form-section-shadcnui";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselPagination,
} from "@/components/ui/carousel";

import { type LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

const FeatureCard = ({ feature }: { feature: Feature }) => {
  const Icon = feature.icon;
  return (
    <Card className="group relative h-full overflow-hidden border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
      {/* Decorative background circle */}
      <div
        className={
          feature.bgColor +
          " absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-50 transition-transform duration-500 group-hover:scale-150"
        }
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-6">
          <div
            className={`w-fit rounded-2xl ${feature.bgColor} p-4 ring-1 ring-inset ring-white/10`}
            aria-hidden="true"
          >
            <Icon className={`h-8 w-8 ${feature.iconColor}`} />
          </div>
        </div>

        {/* Content */}
        <h3 className="mb-3 text-2xl font-black tracking-tight  ">
          {feature.title}
        </h3>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed flex-1">
          {feature.description}
        </p>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 mb-8">
          {feature.features.map((item: string) => (
            <span
              key={item}
              className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted border border-border/50 text-zinc-600 dark:text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default function FeaturesGrid() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Cpu,
      title: t("grid.items.vision.title"),
      description: t("grid.items.vision.description"),
      features: t("grid.items.vision.tags", {
        returnObjects: true,
      }) as string[],
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: GanttChartSquare,
      title: t("grid.items.scheduling.title"),
      description: t("grid.items.scheduling.description"),
      features: t("grid.items.scheduling.tags", {
        returnObjects: true,
      }) as string[],
      iconColor: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: HardHat,
      title: t("grid.items.qhse.title"),
      description: t("grid.items.qhse.description"),
      features: t("grid.items.qhse.tags", { returnObjects: true }) as string[],
      iconColor: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Wallet,
      title: t("grid.items.financial.title"),
      description: t("grid.items.financial.description"),
      features: t("grid.items.financial.tags", {
        returnObjects: true,
      }) as string[],
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: BarChart3,
      title: t("grid.items.predictive.title"),
      description: t("grid.items.predictive.description"),
      features: t("grid.items.predictive.tags", {
        returnObjects: true,
      }) as string[],
      iconColor: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      icon: Users,
      title: t("grid.items.team.title"),
      description: t("grid.items.team.description"),
      features: t("grid.items.team.tags", { returnObjects: true }) as string[],
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <section
      id="features"
      className="w-full bg-background px-4 py-24 md:py-32"
      aria-labelledby="features-grid-title"
      aria-label="Core Capabilities"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge
            className="mb-4 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] bg-primary/10 text-primary-contrast border-primary/20 hover:bg-primary/20 transition-colors"
            variant="outline"
          >
            {t("grid.badge")}
          </Badge>
          <h2
            id="features-grid-title"
            className="mb-6 text-4xl font-black    md:text-6xl   uppercase"
          >
            {t("grid.title_start")}{" "}
            <span className="text-primary-contrast  ">
              {t("grid.title_highlight")}
            </span>{" "}
            {t("grid.title_end")}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-700 dark:text-muted-foreground font-medium">
            {t("grid.description")}
          </p>
        </motion.div>

        {/* Features Content - Responsive Layout */}
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden lg:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
              >
                <FeatureCard feature={feature} />
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="lg:hidden">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {features.map((feature) => (
                  <CarouselItem
                    key={feature.title}
                    className="pl-4 basis-[90%] sm:basis-[70%]"
                  >
                    <FeatureCard feature={feature} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-between mt-8 px-2">
                <CarouselPagination className="justify-start" />
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary transition-all" />
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        {/* Contact Form Section replacing old CTA */}
        <ContactFormSection />
      </div>
    </section>
  );
}
