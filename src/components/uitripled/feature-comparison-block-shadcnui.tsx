"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Crown, Rocket, Zap, Cpu } from "lucide-react";
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

interface Plan {
  name: string;
  popular: boolean;
  price: string;
  period: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  features: string[];
}

const PlanCard = ({ plan, t }: { plan: Plan; t: (key: string) => string }) => {
  const Icon = plan.icon;
  return (
    <div className="relative h-full">
      {plan.popular && (
        <div
          className="absolute -inset-2 rounded-[2.5rem] bg-primary/20 blur-2xl transition-opacity group-hover:opacity-40"
          aria-hidden="true"
        />
      )}

      <Card
        className={`group relative h-full overflow-hidden border-2 transition-all duration-500 rounded-[2.5rem] ${
          plan.popular
            ? "border-primary bg-card/50 shadow-2xl shadow-primary/10"
            : "border-border/50 bg-card/30 hover:border-primary/30"
        }`}
      >
        <div className="p-8 md:p-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div
              className={`p-4 rounded-2xl bg-linear-to-br ${plan.gradient} border border-white/5`}
              aria-hidden="true"
            >
              <Icon className={`h-8 w-8 ${plan.iconColor}`} />
            </div>
            {plan.popular && (
              <Badge className="bg-primary text-white font-black   px-3 py-1 uppercase    shadow-lg shadow-primary/20">
                {t("tiers.recommended")}
              </Badge>
            )}
          </div>

          <div className="mb-8 text-left">
            <h3 className="text-3xl font-black   uppercase    mb-2">
              {plan.name}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              {plan.description}
            </p>
          </div>

          <div className="mb-8 text-left">
            <div
              className="flex items-baseline gap-1"
              role="group"
              aria-label={`${plan.price} ${plan.period}`}
            >
              <h3 className="text-5xl font-black mb-2 text-primary-contrast dark:text-primary font-heading">
                {plan.price}
              </h3>
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400   uppercase">
                {plan.period}
              </span>
            </div>
          </div>

          <ul className="mb-10 space-y-4 flex-1">
            {plan.features.map((feature: string) => (
              <li key={feature} className="flex items-center gap-3">
                <Check
                  className={`h-5 w-5 ${plan.iconColor} shrink-0`}
                  aria-hidden="true"
                />
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 lowercase first-letter:uppercase">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Button
            variant={plan.popular ? "default" : "outline"}
            size="xl"
            className={`w-full h-14 rounded-2xl font-black   uppercase transition-all hover:scale-[1.02] active:scale-95 ${
              plan.popular ? "shadow-xl shadow-primary/20" : "border-2"
            }`}
          >
            {plan.popular ? t("tiers.secure") : t("tiers.inquire")}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export function FeatureComparisonBlock() {
  const { t } = useTranslation();

  const plans = [
    {
      name: t("tiers.plans.foundation.name"),
      popular: false,
      price: t("tiers.plans.foundation.price"),
      period: t("tiers.plans.foundation.period"),
      description: t("tiers.plans.foundation.description"),
      icon: Rocket,
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      iconColor: "text-blue-500",
      features: t("tiers.plans.foundation.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      name: t("tiers.plans.specialist.name"),
      popular: true,
      price: t("tiers.plans.specialist.price"),
      period: t("tiers.plans.specialist.period"),
      description: t("tiers.plans.specialist.description"),
      icon: Cpu,
      gradient: "from-primary/20 via-primary/10 to-transparent",
      iconColor: "text-primary",
      features: t("tiers.plans.specialist.features", {
        returnObjects: true,
      }) as string[],
    },
    {
      name: t("tiers.plans.fleet.name"),
      popular: false,
      price: t("tiers.plans.fleet.price"),
      period: t("tiers.plans.fleet.period"),
      description: t("tiers.plans.fleet.description"),
      icon: Crown,
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      iconColor: "text-purple-500",
      features: t("tiers.plans.fleet.features", {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <section
      id="deployment-tiers"
      className="w-full bg-background px-4 py-24 md:py-32"
      aria-labelledby="tiers-title"
      aria-label="Pricing and Plans"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Badge
            className="mb-4 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] bg-primary/10 text-primary border-primary/20"
            variant="outline"
          >
            <Zap className="mr-1.5 h-3 w-3 fill-current" aria-hidden="true" />
            {t("tiers.badge")}
          </Badge>
          <h2
            id="tiers-title"
            className="mb-6 text-4xl font-black    md:text-6xl   uppercase"
          >
            {t("tiers.title_start")}{" "}
            <span className="text-primary">{t("tiers.title_highlight")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium">
            {t("tiers.description")}
          </p>
        </motion.div>

        {/* Pricing Cards - Responsive Layout */}
        <div className="mb-20">
          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="relative"
              >
                <PlanCard plan={plan} t={t} />
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
                {plans.map((plan) => (
                  <CarouselItem
                    key={plan.name}
                    className="pl-4 basis-[85%] sm:basis-[70%]"
                  >
                    <PlanCard plan={plan} t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-between mt-8 px-4">
                <CarouselPagination className="justify-start" />
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-xl" />
                  <CarouselNext className="static translate-y-0 h-10 w-10 rounded-xl" />
                </div>
              </div>
            </Carousel>
          </div>
        </div>

        {/* Feature Comparison Table */}
      </div>
    </section>
  );
}
