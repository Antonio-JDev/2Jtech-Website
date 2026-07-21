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
        <Link href="#home" className="relative z-10 flex items-center gap-3" aria-label="2J Tech Home">
          <Image
            src="/sigla-2j.png"
            alt="2J Tech"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="hidden text-sm font-semibold tracking-wide text-white sm:inline">
            2J <span className="text-neon">TECH</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/90 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contato" variant="primary">
            Solicitar Orçamento
          </Button>
        </div>

        <button
          type="button"
          className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="glass-strong border-t border-white/10 px-5 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-white/90 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button href="#contato" variant="primary" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Solicitar Orçamento
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
