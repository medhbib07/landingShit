"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, type Variants } from "framer-motion";
import { Mail, Send, Building2, HardHat } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export function ContactFormSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background px-4 py-16 sm:px-8 md:py-28"
      aria-labelledby="contact-title"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-6 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-primary/3 blur-[130px]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="text-xs font-black uppercase tracking-[0.3em] text-primary/60">
            {t("contact.badge")}
          </span>
          <h2
            id="contact-title"
            className="text-4xl font-black    text-foreground md:text-6xl uppercase  "
          >
            {t("contact.title_start")}{" "}
            <span className="text-primary-contrast">
              {t("contact.title_highlight")}
            </span>
          </h2>
          <p className="max-w-2xl text-muted-foreground font-medium text-lg mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <Card className="group relative w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-primary/20 bg-card/50 backdrop-blur-xl transition-all hover:border-primary/40 hover:shadow-2xl shadow-primary/5">
          <div
            className="absolute inset-0 bg-linear-to-br from-primary/4 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />

          <motion.form
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative grid gap-8 px-4 py-8 md:grid-cols-5 md:px-12 md:py-16 text-left"
            aria-label={t("contact.submit")}
          >
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 space-y-10"
            >
              <motion.div
                variants={iconVariants}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-contrast backdrop-blur"
                aria-hidden="true"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
                {t("contact.audit_status")}
              </motion.div>

              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight text-foreground   uppercase">
                  {t("contact.discovery_title")}
                </h3>
                <p className="text-muted-foreground font-medium leading-relaxed">
                  {t("contact.discovery_desc")}
                </p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-4 group/item hover:bg-primary/10 transition-colors">
                  <div
                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20"
                    aria-hidden="true"
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      {t("contact.hq.label")}
                    </p>
                    <p className="font-bold">{t("contact.hq.value")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-4 group/item hover:bg-primary/10 transition-colors">
                  <div
                    className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20"
                    aria-hidden="true"
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
                      {t("contact.email.label")}
                    </p>
                    <p className="font-bold">deploy@batix.ai</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-primary/5 border border-dashed border-primary/30 relative">
                <HardHat
                  className="absolute -right-4 -bottom-4 size-24 text-primary/10 -rotate-12"
                  aria-hidden="true"
                />
                <p className="text-sm font-bold text-primary-contrast   leading-tight">
                  "{t("contact.quote")}"
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/60 block mt-2">
                  {t("contact.author")}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="md:col-span-3 space-y-8 bg-background/40 p-8 rounded-[2rem] border border-primary/10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1"
                  >
                    {t("contact.labels.name")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={t("contact.placeholders.name")}
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-primary/20 bg-background/50 pl-4 text-sm font-bold focus-visible:ring-primary/30"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1"
                  >
                    {t("contact.labels.email")}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={t("contact.placeholders.email")}
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 rounded-xl border-primary/20 bg-background/50 pl-4 text-sm font-bold focus-visible:ring-primary/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1"
                >
                  {t("contact.labels.phone")}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder={t("contact.placeholders.phone")}
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-primary/20 bg-background/50 pl-4 text-sm font-bold focus-visible:ring-primary/30"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="message"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1"
                >
                  {t("contact.labels.message")}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contact.placeholders.message")}
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[160px] rounded-xl border-primary/20 bg-background/50 p-4 text-sm font-bold focus-visible:ring-primary/30 resize-none"
                  required
                />
              </div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  size="xl"
                  className="group flex w-full items-center justify-center gap-2 h-14 rounded-xl bg-primary text-white font-black   shadow-2xl shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98] border-none"
                >
                  {t("contact.submit")}
                  <Send
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>

              <p className="text-[10px] text-muted-foreground font-medium text-center  ">
                {t("contact.privacy")}{" "}
                <a
                  href="#"
                  className="underline decoration-primary/30 underline-offset-4 hover:text-primary transition-colors"
                >
                  {t("contact.privacy_link")}
                </a>
              </p>
            </motion.div>
          </motion.form>
        </Card>
      </div>
    </section>
  );
}
