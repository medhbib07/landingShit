import { Card, CardContent } from "@/components/ui/card";
import { Shield, BarChart3, Users, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SolutionFeatures() {
  const { t } = useTranslation();

  return (
    <section
      id="solution"
      aria-labelledby="solution-title"
      aria-label="Platform Solutions"
      className="bg-primary/5 py-16 md:py-32 dark:bg-transparent"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2
            id="solution-title"
            className="text-3xl md:text-5xl font-black mb-6   text-foreground"
          >
            {t("solution.title")}
          </h2>
          <p className="text-xl text-zinc-700 dark:text-muted-foreground max-w-3xl mx-auto font-medium">
            {t("solution.description")}
          </p>
        </div>
        <div className="relative">
          <div className="relative z-10 grid grid-cols-6 gap-6">
            {/* Main AI Monitoring Card */}
            <Card className="relative col-span-full flex overflow-hidden lg:col-span-2 border-2 border-primary/20 bg-background/50 backdrop-blur-sm shadow-2xl shadow-primary/5">
              <CardContent className="relative m-auto size-fit pt-6 text-center">
                <div
                  className="relative flex h-24 w-56 items-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <span className="mx-auto block w-fit text-5xl font-black text-primary-contrast   relative z-10">
                    {t("solution.vision_accuracy.value")}
                  </span>
                </div>
                <h3 className="text-2xl font-black   mb-2">
                  {t("solution.vision_accuracy.title")}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {t("solution.vision_accuracy.description")}
                </p>
              </CardContent>
            </Card>

            {/* Safety Monitoring */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group shadow-xl">
              <CardContent className="pt-8">
                <div
                  className="relative mx-auto flex aspect-square size-24 rounded-[1.5rem] border-2 border-primary/20 bg-primary/5 items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  <Shield className="size-10 text-primary-contrast" />
                </div>
                <div className="relative z-10 space-y-2 text-center">
                  <h3 className="text-xl font-bold   dark:text-white">
                    {t("solution.safety.title")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t("solution.safety.description")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card className="relative col-span-full overflow-hidden sm:col-span-3 lg:col-span-2 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group shadow-xl">
              <CardContent className="pt-8">
                <div
                  className="relative mx-auto flex aspect-square size-24 rounded-[1.5rem] border-2 border-primary/20 bg-primary/5 items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  <CheckCircle2 className="size-10 text-primary-contrast" />
                </div>
                <div className="relative z-10 space-y-2 text-center">
                  <h3 className="text-xl font-bold   dark:text-white">
                    {t("solution.progress.title")}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {t("solution.progress.description")}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Analytics/Speed Graph Card */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors shadow-xl">
              <CardContent className="grid pt-8 sm:grid-cols-2 items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-6">
                  <div
                    className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20"
                    aria-hidden="true"
                  >
                    <BarChart3 size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black   dark:text-white">
                      {t("solution.predictive.title")}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {t("solution.predictive.description")}
                    </p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label={t("solution.predictive.graph_alt")}
                  className="mt-8 sm:mt-0 sm:ml-8 p-6 bg-primary/5 rounded-3xl border border-primary/10 relative overflow-hidden group"
                >
                  <div className="flex gap-1 mb-4" aria-hidden="true">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/20"
                      />
                    ))}
                  </div>
                  <div className="h-24 flex items-end gap-2" aria-hidden="true">
                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className={
                          i === 3
                            ? "flex-1 bg-destructive rounded-t-lg group-hover:scale-y-110 transition-transform origin-bottom animate-pulse"
                            : "flex-1 bg-primary/40 rounded-t-lg hover:bg-primary transition-colors"
                        }
                      />
                    ))}
                  </div>
                  <div className="absolute top-2 right-4">
                    <span className="text-[10px] font-bold text-destructive animate-bounce uppercase  ">
                      {t("solution.predictive.risk_alert")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team/Collaboration Card */}
            <Card className="relative col-span-full overflow-hidden lg:col-span-3 border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors group shadow-xl">
              <CardContent className="grid h-full pt-8 sm:grid-cols-2 items-center">
                <div className="relative z-10 flex flex-col justify-between space-y-6">
                  <div
                    className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20"
                    aria-hidden="true"
                  >
                    <Users size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black   dark:text-white">
                      {t("solution.collaboration.title")}
                    </h3>
                    <p className="text-muted-foreground">
                      {t("solution.collaboration.description")}
                    </p>
                  </div>
                </div>
                <div className="mt-8 sm:mt-0 sm:ml-8 relative h-32 flex flex-col justify-center space-y-4">
                  <div
                    className="flex -space-x-4 justify-center group-hover:space-x-2 transition-all duration-500"
                    aria-hidden="true"
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-2xl bg-muted border-4 border-background overflow-hidden relative group-hover:rotate-0 transition-transform shadow-lg"
                        style={{
                          transform: `rotate(${i % 2 === 0 ? 5 : -5}deg)`,
                        }}
                      >
                        <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary/40 font-bold">
                          {String.fromCharCode(64 + i)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-primary/10 rounded-full px-4 py-1 text-[10px] font-bold text-primary-contrast mx-auto border border-primary/20 backdrop-blur-md">
                    {t("solution.collaboration.stakeholders")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
