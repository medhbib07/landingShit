"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  Cpu,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function FooterBlock() {
  const { t } = useTranslation();

  const footerLinks = [
    {
      title: t("footer.sections.platform"),
      links: t("footer.links.platform", { returnObjects: true }) as string[],
    },
    {
      title: t("footer.sections.enterprise"),
      links: t("footer.links.enterprise", { returnObjects: true }) as string[],
    },
    {
      title: t("footer.sections.resources"),
      links: t("footer.links.resources", { returnObjects: true }) as string[],
    },
    {
      title: t("footer.sections.legal"),
      links: t("footer.links.legal", { returnObjects: true }) as string[],
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const shouldReduceMotion = useReducedMotion();

  return (
    <footer
      aria-labelledby="footer-heading"
      className="relative w-full overflow-hidden border-t border-primary/10 bg-card/90 backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <motion.div
          className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.05, 0.95] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -bottom-36 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[200px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.1, 0.25, 0.1], rotate: [0, 25, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 16, repeat: Infinity, ease: "linear" }
          }
        />
      </div>
      <h2 id="footer-heading" className="sr-only">
        {t("footer.sections.legal")}
      </h2>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="mb-6 inline-flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
                  <Cpu size={20} />
                </div>
                <span className="text-2xl font-black tracking-tight   uppercase">
                  Bati<span className="text-primary">x</span>
                </span>
              </div>
              <Badge
                variant="outline"
                className="text-[10px] uppercase font-black tracking-widest border-primary/20 bg-primary/5 text-primary"
              >
                {t("footer.badge")}
              </Badge>
            </motion.div>
            <p className="mb-8 max-w-sm text-sm font-medium text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>

            {/* Newsletter */}
            <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-primary">
                {t("footer.newsletter_title")}
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("footer.newsletter_placeholder")}
                  className="h-10 rounded-xl border-primary/20 bg-background/60 backdrop-blur placeholder:text-muted-foreground font-bold"
                />
                <Button
                  size="sm"
                  className="h-10 w-10 p-0 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                  aria-label="Subscribe"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                className="flex items-center gap-3"
              >
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{t("contact.hq.value")}</span>
              </motion.div>
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { x: 5 }}
                className="flex items-center gap-3"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="lowercase">deploy@batix.ai</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <h3 className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary/80  ">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: linkIndex * 0.05 }}
                  >
                    <motion.a
                      href="#"
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : { x: 5, color: "hsl(var(--primary))" }
                      }
                      className="text-sm font-bold text-muted-foreground transition-all hover:text-foreground"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-12 h-px bg-primary/10"
          aria-hidden="true"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.6 + index * 0.05,
                }}
              >
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-10 w-10 rounded-xl border border-primary/10 bg-primary/5 text-muted-foreground transition-all hover:bg-primary/20 hover:text-primary hover:border-primary/30"
                  aria-label={social.label}
                >
                  <motion.div
                    transition={{ duration: shouldReduceMotion ? 0.25 : 0.3 }}
                    aria-hidden="true"
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest  "
          >
            <span>{t("footer.copyright")}</span>
            <Badge
              variant="outline"
              className="text-[10px] font-black border-primary/20 text-primary/60"
            >
              v4.2.0-stable
            </Badge>
          </motion.div>

          {/* Scroll to Top */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors group"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -3, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { repeat: Infinity, duration: 1.5 }
                }
                aria-hidden="true"
              >
                <ArrowUp className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
