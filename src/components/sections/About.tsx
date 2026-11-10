"use client";

import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import {
  SITE_ADMIN_EMAIL,
  SITE_BRAND_TITLE,
  SITE_EMAIL,
  SITE_GITHUB_URL,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_RAW,
  SITE_SUPPORT_EMAIL,
} from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

export function About() {
  return (
    <section
      id="sobre"
      className="section-padding border-b border-white/[0.06]"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Sobre a Empresa"
              title="Software orientado a resultado, sustentado por engenharia"
            />
            <div className="space-y-4 text-base leading-relaxed text-[#cbd5e1]">
              <p>
                A <strong className="font-semibold text-foreground">{SITE_BRAND_TITLE}</strong>{" "}
                desenvolve sistemas, plataformas e soluções tecnológicas sob medida a
                partir de{" "}
                <strong className="font-semibold text-foreground">Itajaí, Santa Catarina</strong>,
                atendendo empresas em todo o Brasil.
              </p>
              <p>
                Nosso foco é resolver gargalos operacionais reais — automatizando
                processos, integrando ferramentas e estruturando tecnologia que
                acompanha o crescimento do negócio.
              </p>
              <p>
                Por trás de cada entrega está uma base sólida de engenharia de
                software: escopo formalizado, comunicação direta com quem
                projeta o sistema, código versionado e transferência integral de
                propriedade intelectual.
              </p>
              <p className="border-l-2 border-accent pl-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                Do planejamento à entrega, tecnologia com propósito.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <aside className="panel-elevated rounded-[16px] p-6 sm:p-7">
              <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-4">
                <Building2 size={18} className="text-accent" />
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                  Identidade Institucional
                </h3>
              </div>

              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">
                    Marca / Nome Fantasia
                  </dt>
                  <dd className="mt-1 font-semibold text-foreground">
                    {SITE_BRAND_TITLE} · Consultoria &amp; Gestão
                  </dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">
                    Atuação &amp; Abrangência
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">
                    Operação B2B sob medida
                  </dd>
                  <dd className="mt-0.5 text-xs text-[#cbd5e1]">
                    Atendimento consultivo em todo o Brasil
                  </dd>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">
                      Base Operacional
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {SITE_LOCATION}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">
                      Canais Corporativos
                    </dt>
                    <dd className="mt-1 space-y-1 text-xs text-[#cbd5e1]">
                      <div>
                        Comercial:{" "}
                        <a
                          href={`mailto:${SITE_EMAIL}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {SITE_EMAIL}
                        </a>
                      </div>
                      <div>
                        Suporte técnico:{" "}
                        <a
                          href={`mailto:${SITE_SUPPORT_EMAIL}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {SITE_SUPPORT_EMAIL}
                        </a>
                      </div>
                      <div>
                        Administrativo / LGPD:{" "}
                        <a
                          href={`mailto:${SITE_ADMIN_EMAIL}`}
                          className="font-medium text-foreground hover:text-accent"
                        >
                          {SITE_ADMIN_EMAIL}
                        </a>
                      </div>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">
                      Telefone &amp; WhatsApp Comercial
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={`https://wa.me/${SITE_PHONE_RAW}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {SITE_PHONE_DISPLAY}
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-6 border-t border-white/[0.08] pt-4">
                <a
                  href={SITE_GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-[#67e8f9]"
                >
                  GitHub Oficial (github.com/2jtechsoftware)
                  <ExternalLink size={13} />
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

