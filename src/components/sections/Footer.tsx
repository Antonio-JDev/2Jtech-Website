import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import {
  SITE_ADMIN_EMAIL,
  SITE_EMAIL,
  SITE_GITHUB_URL,
  SITE_LEGAL_NAME,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_RAW,
  SITE_SUPPORT_EMAIL,
} from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#05070a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.35fr_0.85fr_1fr] md:px-8">
        <div>
          <Link href="#home" className="inline-flex items-center gap-3">
            <Image
              src="/sigla-2j.png"
              alt="2J Tech Softwares"
              width={38}
              height={38}
              className="h-9 w-9 object-contain"
            />
            <div>
              <span className="block text-sm font-semibold tracking-wide text-foreground">
                2J <span className="text-accent">TECH</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-muted">
                Softwares, Consultoria &amp; Gestão
              </span>
            </div>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#cbd5e1]">
            Desenvolvimento de software que transforma negócios. Do planejamento à
            entrega, tecnologia com propósito.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={SITE_GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub oficial da 2J Tech Softwares"
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/12 bg-white/[0.02] px-3.5 py-2 text-xs font-medium text-[#cbd5e1] transition-colors hover:border-accent/45 hover:text-accent"
            >
              <Github size={15} />
              <span>github.com/2jtechsoftware</span>
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Navegação &amp; Compliance
          </p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  className="text-sm text-[#cbd5e1] transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/privacidade"
                className="text-sm text-[#cbd5e1] transition-colors hover:text-accent"
              >
                Política de Privacidade (LGPD)
              </Link>
            </li>
            <li>
              <Link
                href="/termos"
                className="text-sm text-[#cbd5e1] transition-colors hover:text-accent"
              >
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Canais Oficiais
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-[#cbd5e1]">
            <li>
              Comercial:{" "}
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="font-medium text-foreground transition-colors hover:text-accent"
              >
                {SITE_EMAIL}
              </a>
            </li>
            <li>
              Suporte:{" "}
              <a
                href={`mailto:${SITE_SUPPORT_EMAIL}`}
                className="font-medium text-foreground transition-colors hover:text-accent"
              >
                {SITE_SUPPORT_EMAIL}
              </a>
            </li>
            <li>
              Administrativo:{" "}
              <a
                href={`mailto:${SITE_ADMIN_EMAIL}`}
                className="font-medium text-foreground transition-colors hover:text-accent"
              >
                {SITE_ADMIN_EMAIL}
              </a>
            </li>
            <li>
              WhatsApp / Tel:{" "}
              <a
                href={`https://wa.me/${SITE_PHONE_RAW}`}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground transition-colors hover:text-accent"
              >
                {SITE_PHONE_DISPLAY}
              </a>
            </li>
            <li className="pt-1 text-xs text-muted">{SITE_LOCATION}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {year} {SITE_LEGAL_NAME}.
          </p>
          <p>{SITE_LOCATION} · Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
