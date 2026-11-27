"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  // Scrollspy: highlight the nav link of the section crossing the upper third.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector<HTMLElement>(link.href),
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActiveHref(href);
          else setActiveHref((current) => (current === href ? null : current));
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "glass-strong border-b border-white/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="#home"
          className="relative z-10 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 rounded-lg"
          aria-label="2J Tech Softwares — Início"
        >
          <Image
            src="/sigla-2j.png"
            alt="2J Tech"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <div className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-wide text-foreground">
              2J <span className="text-accent">TECH</span>
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Softwares &amp; Consultoria
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? "true" : undefined}
              className={`relative py-1 text-sm font-medium transition-colors duration-200 hover:text-foreground ${
                activeHref === link.href ? "text-foreground" : "text-[#a8b4c4]"
              }`}
            >
              {link.label}
              <span
                aria-hidden
                className={`absolute -bottom-0.5 left-0 right-0 h-px origin-center bg-accent transition-transform duration-300 ease-out ${
                  activeHref === link.href ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contato" variant="primary" className="px-4 py-2.5">
            Solicitar Proposta
          </Button>
        </div>

        <div className="relative z-10 flex items-center gap-2 lg:hidden">
          <Button
            href="#contato"
            variant="primary"
            className="h-10 px-3.5! py-0! text-[13px]! tracking-normal!"
            onClick={() => setOpen(false)}
          >
            Solicitar Proposta
          </Button>
          <button
            type="button"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] border border-white/15 text-foreground transition-colors hover:border-white/30"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="glass-strong border-t border-white/10 px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[#cbd5e1] transition-colors hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              href="#contato"
              variant="primary"
              className="mt-2 w-full"
              onClick={() => setOpen(false)}
            >
              Solicitar Proposta
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
