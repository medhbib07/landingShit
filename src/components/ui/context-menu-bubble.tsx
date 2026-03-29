"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoreVertical, X } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  variant?: "primary" | "warning" | "success" | "destructive";
};

type ContextMenuBubbleProps = {
  items: MenuItem[];
};

export function ContextMenuBubble({ items }: ContextMenuBubbleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Safe margins to prevent overflow (radius 75 + button width)
      const safeMargin = 110;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let x = centerX;
      let y = centerY;

      if (centerX + safeMargin > viewportWidth) x = viewportWidth - safeMargin;
      if (centerX - safeMargin < 0) x = safeMargin;
      if (centerY + safeMargin > viewportHeight)
        y = viewportHeight - safeMargin;
      if (centerY - safeMargin < 0) y = safeMargin;

      setPosition({ x, y });
    }
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    updatePosition();
    setIsOpen(!isOpen);
  };

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const handleScroll = () => closeMenu();
    const handleClickOutside = (e: MouseEvent) => {
      const isInsideTrigger = triggerRef.current?.contains(e.target as Node);
      const isInsideMenu = menuRef.current?.contains(e.target as Node);
      if (!isInsideTrigger && !isInsideMenu) closeMenu();
    };

    window.addEventListener("scroll", handleScroll, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  const radius = 75;
  const angleStep = (2 * Math.PI) / items.length;

  return (
    <div className="relative inline-flex items-center justify-center">
      <motion.button
        ref={triggerRef}
        onClick={toggleMenu}
        onContextMenu={toggleMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 shadow-sm border",
          isOpen
            ? "bg-primary text-primary-foreground border-primary rotate-90"
            : "bg-background border-border hover:border-primary/50 text-muted-foreground hover:text-primary",
        )}
      >
        <MoreVertical className="h-4 w-4" />
      </motion.button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999] pointer-events-none">
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black/5 backdrop-blur-[2px] pointer-events-auto cursor-default z-10"
                  />

                  <motion.div
                    ref={menuRef}
                    initial={{ scale: 0, opacity: 0, rotate: -20 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0, opacity: 0, rotate: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="fixed pointer-events-auto flex items-center justify-center z-20"
                    style={{
                      left: position.x - 125,
                      top: position.y - 125,
                      width: 250,
                      height: 250,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-background/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-border/50"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                    />

                    <button
                      onClick={closeMenu}
                      className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 hover:bg-primary/10 transition-colors text-primary"
                    >
                      <X className="h-5 w-5" />
                    </button>

                    {items.map((item, index) => {
                      const angle = index * angleStep - Math.PI / 2;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <motion.div
                          key={item.label}
                          initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                          animate={{ scale: 1, opacity: 1, x, y }}
                          exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 25,
                            delay: index * 0.04,
                          }}
                          className="absolute"
                        >
                          <motion.button
                            whileHover={{ scale: 1.15, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              item.onClick();
                              closeMenu();
                            }}
                            className={cn(
                              "flex h-11 w-11 items-center justify-center rounded-full border bg-background shadow-lg transition-all group relative z-50",
                              item.variant === "destructive" || item.danger
                                ? "hover:bg-destructive hover:text-destructive-foreground hover:border-destructive/50"
                                : item.variant === "warning"
                                  ? "hover:bg-amber-500 hover:text-white hover:border-amber-500/50"
                                  : item.variant === "success"
                                    ? "hover:bg-emerald-500 hover:text-white hover:border-emerald-500/50"
                                    : "hover:bg-primary hover:text-primary-foreground hover:border-primary/50",
                            )}
                          >
                            <span className="relative z-10">{item.icon}</span>
                            <motion.span
                              initial={{ opacity: 0, y: 5 }}
                              whileHover={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-8 bg-foreground/90 text-background text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded pointer-events-none whitespace-nowrap shadow-xl border border-border"
                            >
                              {item.label}
                            </motion.span>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>,
          document.body,
        )}
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
