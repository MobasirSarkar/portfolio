"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa6";
import type { IconType } from "react-icons";

import { SfxText } from "@/components/manga/sfx-text";
import { site, profile } from "@/lib/content";
import { useUiStore } from "@/store/ui";

const socialIcons: Record<string, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
};

const listVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  closed: {},
};

const itemVariants = {
  open: { x: 0, opacity: 1 },
  closed: { x: 60, opacity: 0 },
};

export function Nav() {
  const navOpen = useUiStore((s) => s.navOpen);
  const setNavOpen = useUiStore((s) => s.setNavOpen);
  const startTurn = useUiStore((s) => s.startTurn);

  return (
    <>
      {/* floating logo */}
      <Link
        href="/"
        className="group fixed top-4 left-4 z-[70] border-2 border-ink bg-paper px-3 py-1 panel-shadow-sm"
      >
        <SfxText decorative={false} className="text-xl transition-colors group-hover:text-electric">
          {profile.heroName}
          <span className="text-electric">!!</span>
        </SfxText>
      </Link>

      {/* hamburger */}
      <motion.button
        type="button"
        aria-label={navOpen ? "Close menu" : "Open menu"}
        aria-expanded={navOpen}
        onClick={() => setNavOpen(!navOpen)}
        className="fixed top-4 right-4 z-[70] flex size-12 items-center justify-center border-2 border-ink bg-ink text-paper panel-shadow-electric"
        whileHover={{ scale: 1.08, rotate: navOpen ? 0 : -3 }}
        whileTap={{ scale: 0.92 }}
      >
        {navOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </motion.button>

      <AnimatePresence>
        {navOpen && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-ink/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavOpen(false)}
            />

            {/* electric slice behind the panel */}
            <motion.div
              aria-hidden
              className="fixed inset-y-0 right-0 z-[56] w-full max-w-sm -skew-x-3 bg-electric sm:max-w-md"
              initial={{ x: "120%" }}
              animate={{ x: "2.5%" }}
              exit={{ x: "120%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />

            {/* panel */}
            <motion.aside
              className="fixed inset-y-0 right-0 z-[60] flex w-full max-w-sm flex-col border-l-4 border-ink bg-paper sm:max-w-md"
              initial={{ x: "110%" }}
              animate={{ x: 0 }}
              exit={{ x: "110%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div aria-hidden className="halftone absolute top-0 right-0 h-28 w-28 [mask-image:linear-gradient(225deg,black,transparent_75%)]" />
              <SfxText className="absolute top-24 left-4 origin-left text-lg text-electric [writing-mode:vertical-rl]">
                メニュー — MENU!
              </SfxText>

              <motion.nav
                className="mt-28 flex flex-col gap-1 px-12"
                variants={listVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {site.nav.map((item, i) => (
                  <motion.div key={item.href} variants={itemVariants}>
                    <button
                      type="button"
                      onClick={() => startTurn(item.href)}
                      className="group flex w-full items-baseline gap-3 border-b-2 border-ink/10 py-3 text-left font-display text-3xl tracking-wide transition-colors hover:text-electric sm:text-4xl"
                    >
                      <span className="font-display text-sm text-electric">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label.toUpperCase()}
                      <span className="ml-auto -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        »
                      </span>
                    </button>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="mt-auto flex items-center gap-3 border-t-2 border-ink px-12 py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                exit={{ opacity: 0 }}
              >
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.icon === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      aria-label={social.label}
                      className="flex size-10 items-center justify-center border-2 border-ink bg-paper transition-colors hover:bg-electric"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  VOL.1
                </span>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
