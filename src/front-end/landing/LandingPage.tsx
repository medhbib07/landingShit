/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wallet,
  CheckCircle2,
  BarChart3,
  Clock,
  AlertTriangle,
  Eye,
  HardHat,
  Construction,
  Calendar,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import HeroSection from "./hero-section";
import SolutionFeatures from "@/components/features-8";
import FeaturesGrid from "@/components/uitripled/services-grid-block-shadcnui";
import { FeatureComparisonBlock } from "@/components/uitripled/feature-comparison-block-shadcnui";
import { FooterBlock } from "@/components/uitripled/footer-block-shadcnui";
import { useTranslation } from "react-i18next";
import { lazy, Suspense } from "react";

const ThreeBackground = lazy(() => import("@/components/ThreeBackground"));

const MetricCard = ({ item }: { item: any }) => (
  <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/70 backdrop-blur-lg p-8 md:p-10 shadow-xl transition-all hover:shadow-2xl hover:-translate-y-1 group">
    <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <item.icon size={28} />
      </div>
      <h3 className="text-5xl md:text-6xl font-black mb-3 text-foreground tracking-tight">
        {item.val}
      </h3>
      <div className="text-base md:text-lg font-semibold uppercase tracking-wide text-muted-foreground">
        {item.text}
      </div>
    </div>
  </div>
);

export default function LandingPage({
  onGetStarted,
}: {
  onGetStarted: () => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || "en";

  const totalWeeks = 12;
  const tasks = [
    {
      name: t("planning.tasks.site_preparation"),
      resource: t("planning.resources.a"),
      weeks: 2,
      start: 0,
      color: "bg-blue-500",
    },
    {
      name: t("planning.tasks.foundation"),
      resource: t("planning.resources.b"),
      weeks: 3,
      start: 2,
      color: "bg-green-500",
    },
    {
      name: t("planning.tasks.structural_framing"),
      resource: t("planning.resources.c"),
      weeks: 4,
      start: 5,
      color: "bg-yellow-500",
    },
    {
      name: t("planning.tasks.electrical"),
      resource: t("planning.resources.d"),
      weeks: 2,
      start: 8,
      color: "bg-purple-500",
    },
    {
      name: t("planning.tasks.plumbing"),
      resource: t("planning.resources.b"),
      weeks: 2,
      start: 9,
      color: "bg-indigo-500",
    },
    {
      name: t("planning.tasks.finishing"),
      resource: t("planning.resources.a"),
      weeks: 3,
      start: 10,
      color: "bg-pink-500",
    },
  ].map((task) => ({
    ...task,
    left: (task.start / totalWeeks) * 100,
    width: (task.weeks / totalWeeks) * 100,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Animated background */}
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>

      {/* Subtle overlay for better text readability */}
      <div className="fixed inset-0 bg-linear-to-b from-background/60 via-transparent to-background/80 pointer-events-none z-[-1]" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-8 focus:py-4 focus:rounded-full focus:font-bold focus:shadow-xl"
      >
        Skip to content
      </a>

      <div className="relative z-10">
        {/* Hero - assuming HeroSection is already polished */}
        <HeroSection
          onGetStarted={onGetStarted}
          onTryDemo={() => navigate(`/${currentLang}/dashboardDemo`)}
        />

        <main id="main-content" className="pt-8 pb-24">
          {/* Impact Metrics - made more premium */}
          <section id="impact" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16 md:mb-20">
                <Badge
                  variant="outline"
                  className="mb-4 px-5 py-1.5 text-sm font-semibold tracking-wider uppercase border-primary/30 text-primary"
                >
                  {t("impact.badge") || "Proven Impact"}
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  {t("impact.title_start")}{" "}
                  <span className="text-primary bg-clip-text">
                    {t("impact.title_highlight")}
                  </span>{" "}
                  {t("impact.title_end")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {[
                  { val: "30%", text: t("impact.metrics.admin"), icon: Clock },
                  {
                    val: "15-20%",
                    text: t("impact.metrics.cost"),
                    icon: Wallet,
                  },
                  {
                    val: "Zero",
                    text: t("impact.metrics.accidents"),
                    icon: ShieldCheck,
                  },
                  {
                    val: "100%",
                    text: t("impact.metrics.decisions"),
                    icon: BarChart3,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.7 }}
                  >
                    <MetricCard item={item} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Batix - paradigm shift */}
          <section
            id="why-batix"
            className="py-24 md:py-32 bg-linear-to-b from-background to-muted/30"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <Badge className="px-5 py-1.5 bg-destructive/10 text-destructive border-destructive/30 uppercase tracking-widest text-xs font-semibold">
                    {t("why.badge") || "Legacy vs Future"}
                  </Badge>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black    leading-tight">
                    {t("why.line1")} <br />
                    <span className="text-muted-foreground/60 line-through">
                      {t("why.line2_struck")}
                    </span>{" "}
                    <br />
                    <span className="text-primary">{t("why.line3")}</span>
                  </h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                    {t("why.description")}
                  </p>
                </motion.div>

                <div className="grid gap-6">
                  {[
                    {
                      label: t("why.features.predictive.title"),
                      desc: t("why.features.predictive.description"),
                    },
                    {
                      label: t("why.features.ground_truth.title"),
                      desc: t("why.features.ground_truth.description"),
                    },
                    {
                      label: t("why.features.data_mesh.title"),
                      desc: t("why.features.data_mesh.description"),
                    },
                    {
                      label: t("why.features.safety.title"),
                      desc: t("why.features.safety.description"),
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="group relative bg-card/70 backdrop-blur-md p-8 rounded-3xl border border-border/40 hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                            {item.label}
                          </h3>
                          <p className="text-muted-foreground text-lg">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <CheckCircle2 size={20} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Construction Site Safety AI Detection Section */}
          <section
            id="safety-ai"
            className="py-24 md:py-32 bg-linear-to-b from-muted/20 to-background"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="mb-4 px-5 py-1.5 bg-primary/15 text-primary border-primary/30 uppercase tracking-widest text-sm font-semibold">
                  {t("safety_ai.badge")}
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  {t("safety_ai.title_start")}
                  <span className="text-primary">
                    {t("safety_ai.title_highlight")}
                  </span>
                </h2>
                <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t("safety_ai.description")}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left: Image/Dashboard mockup */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden border border-border/40 shadow-2xl bg-card/70 backdrop-blur-lg"
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <img
                    src="https://www.googleapis.com/download/storage/v1/b/kaggle-user-content/o/inbox%2F2163725%2F0e46d95b350ee8bc9c683595ccf5ecb6%2Fconstruction-safety.jpg?generation=1677172246224555&alt=media"
                    alt="Batix Construction Site Safety AI Detection Dashboard"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/90 rounded-full text-sm font-medium">
                      <Eye size={16} /> {t("safety_ai.live_badge")}
                    </div>
                  </div>
                </motion.div>

                {/* Right: Key benefits */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  {[
                    {
                      icon: AlertTriangle,
                      title: t("safety_ai.features.hazard_alerts.title"),
                      desc: t("safety_ai.features.hazard_alerts.description"),
                    },
                    {
                      icon: HardHat,
                      title: t("safety_ai.features.ppe_compliance.title"),
                      desc: t("safety_ai.features.ppe_compliance.description"),
                    },
                    {
                      icon: Construction,
                      title: t("safety_ai.features.zone_prevention.title"),
                      desc: t("safety_ai.features.zone_prevention.description"),
                    },
                    {
                      icon: Eye,
                      title: t("safety_ai.features.risk_prediction.title"),
                      desc: t("safety_ai.features.risk_prediction.description"),
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                        <feature.icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* NEW: Planning Section with Gantt Diagram */}
          <section
            id="planning"
            className="py-24 md:py-32 bg-linear-to-b from-background to-muted/20"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-16">
                <Badge className="mb-4 px-5 py-1.5 bg-primary/15 text-primary border-primary/30 uppercase tracking-widest text-sm font-semibold">
                  <Calendar className="inline mr-2" size={16} />
                  {t("planning.badge")}
                </Badge>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  {t("planning.header")}
                  <span className="text-primary">{t("planning.title")}</span>
                </h2>
                <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t("planning.description")}
                </p>
              </div>

              <div className="bg-card/70 backdrop-blur-md border border-border/40 rounded-3xl p-6 md:p-8 shadow-xl">
                {/* Header with week markers */}
                <div className="flex mb-8 text-sm font-medium text-muted-foreground">
                  <div className="w-1/3 md:w-1/4 pl-2">Task & Resource</div>
                  <div className="flex-1 grid grid-cols-6 gap-0 text-center">
                    {[0, 2, 4, 6, 8, 10].map((week) => (
                      <div key={week}>Wk {week}</div>
                    ))}
                  </div>
                </div>

                {/* Gantt rows */}
                <div className="space-y-4">
                  {tasks.map((task, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0"
                    >
                      {/* Task info */}
                      <div className="md:w-1/3 lg:w-1/4 flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${task.color.replace("bg-", "bg-")}`}
                        />
                        <span className="font-semibold text-foreground">
                          {task.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="ml-auto md:ml-2 text-xs"
                        >
                          <Users size={12} className="mr-1" />
                          {task.resource}
                        </Badge>
                      </div>

                      {/* Gantt bar area */}
                      <div className="flex-1 relative h-12 bg-muted/30 rounded-lg overflow-hidden">
                        {/* Background grid lines (vertical) */}
                        <div className="absolute inset-0 grid grid-cols-6 gap-0 pointer-events-none">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="border-l border-border/20 h-full"
                            />
                          ))}
                        </div>

                        {/* Animated bar */}
                        <motion.div
                          className={`absolute top-1 bottom-1 ${task.color} rounded-md shadow-lg flex items-center justify-end px-2 text-xs text-white font-medium`}
                          style={{
                            left: `${task.left}%`,
                            width: `${task.width}%`,
                            backgroundColor: task.color.replace("bg-", ""),
                          }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${task.width}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
                        >
                          <span className="truncate">{task.weeks} wks</span>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground border-t border-border/40 pt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Crew A (Site, Finishing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Crew B (Foundation, Plumbing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>Crew C (Framing)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Crew D (Electrical)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Existing sections */}
          <SolutionFeatures />
          <FeaturesGrid />
          <FeatureComparisonBlock />

          {/* CTA */}
          <section className="py-32 md:py-40 bg-linear-to-br from-primary to-primary/80 relative overflow-hidden mx-4 md:mx-8 lg:mx-12 rounded-3xl md:rounded-[3rem] mb-12 shadow-2xl">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10 text-primary-foreground">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black    leading-none mb-12">
                  Build Smarter. <br />
                  Safer. <span className="opacity-90">Faster.</span>
                </h2>
                <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
                  Join leading construction teams using Batix to eliminate
                  guesswork and protect lives.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button
                    size="xl"
                    onClick={onGetStarted}
                    className="h-16 md:h-20 px-10 md:px-14 text-xl md:text-2xl font-black bg-background text-primary hover:bg-white hover:scale-105 transition-all shadow-2xl"
                  >
                    Get Early Access
                  </Button>
                  <Button
                    size="xl"
                    variant="outline"
                    className="h-16 md:h-20 px-10 md:px-14 text-xl md:text-2xl font-black border-2 border-white/80 hover:bg-white/10 transition-all"
                    onClick={() => navigate(`/${currentLang}/dashboardDemo`)}
                  >
                    Try the Demo
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <FooterBlock />
      </div>
    </div>
  );
}
