import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Instagram } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070707]/90 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Link href="#home" className="inline-flex items-center gap-3">
            <Image
              src="/sigla-2j.png"
              alt="2J Tech"
              width={42}
              height={42}
              className="h-10 w-10 object-contain"
            />
            <span className="text-sm font-semibold tracking-wide text-white">
              2J <span className="text-neon">TECH</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/90">
            Softwares, Consultoria & Gestão. Construímos soluções digitais premium
            para empresas que buscam inovação com autoridade.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-muted transition hover:border-neon/40 hover:text-neon"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-muted transition hover:border-neon/40 hover:text-neon"
            >
              <Github size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 text-muted transition hover:border-neon/40 hover:text-neon"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Menu</p>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/90 transition hover:text-neon">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Contato</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/90">
            <li>
              <a href="mailto:contato@2jtech.com.br" className="transition hover:text-neon">
                contato@2jtech.com.br
              </a>
            </li>
            <li>Brasil</li>
            <li>Atendimento comercial sob demanda</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {year} 2J Tech Softwares, Consultoria & Gestão. Todos os direitos reservados.</p>
          <p>Feito com engenharia e design premium.</p>
        </div>
      </div>
    </footer>
  );
}
