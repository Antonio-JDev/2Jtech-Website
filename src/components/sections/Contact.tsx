"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";
import { CATALOG_PROJECTS } from "@/lib/catalog";
import {
  SITE_ADMIN_EMAIL,
  SITE_EMAIL,
  SITE_LOCATION,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_RAW,
  SITE_SUPPORT_EMAIL,
} from "@/lib/seo";

const DEMAND_OPTIONS = [
  "Sistema Corporativo Sob Medida",
  "APIs & Integrações",
  "Automação & IA Aplicada",
  "Consultoria Técnica / Arquitetura",
  "Portal Institucional B2B",
] as const;

export function Contact() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<string>(DEMAND_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [projectLabel, setProjectLabel] = useState<string | null>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "sent" | "fallback" | "error"
  >("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const applyProject = (projectId: string | null, title: string | null) => {
      if (!projectId && !title) return;
      const match = CATALOG_PROJECTS.find((item) => item.id === projectId);
      const label = match?.title ?? title ?? projectId;
      if (!label) return;
      setProjectLabel(label);
      setMessage(
        `Olá! Analisei o estudo de caso "${label}" no site da 2J Tech e gostaria de solicitar uma avaliação técnica para um projeto sob medida na minha empresa.`,
      );
    };

    const params = new URLSearchParams(window.location.search);
    applyProject(params.get("projeto"), params.get("titulo"));

    const onQuoteEvent = (event: Event) => {
      const custom = event as CustomEvent<{ id?: string; title?: string }>;
      applyProject(custom.detail?.id ?? null, custom.detail?.title ?? null);
    };

    window.addEventListener("2jtech:quote-project", onQuoteEvent);
    return () =>
      window.removeEventListener("2jtech:quote-project", onQuoteEvent);
  }, []);

  const buildWhatsAppHref = () => {
    const lines = [
      "Olá! Gostaria de falar com a equipe da 2J Tech Softwares.",
      name ? `Nome: ${name}` : null,
      company ? `Empresa: ${company}` : null,
      email ? `E-mail: ${email}` : null,
      `Demanda: ${subject}`,
      projectLabel ? `Case analisado: ${projectLabel}` : null,
      message ? `Contexto: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    return `https://wa.me/${SITE_PHONE_RAW}?text=${encodeURIComponent(lines)}`;
  };

  const buildMailtoHref = () => {
    const mailSubject = `[Proposta 2J Tech] ${subject} — ${company || name || "Contato"}`;
    const mailBody = [
      `Nome: ${name || "-"}`,
      `Empresa: ${company || "-"}`,
      `E-mail: ${email || "-"}`,
      `Telefone: ${phone || "-"}`,
      projectLabel ? `Referência: ${projectLabel}` : null,
      "",
      message || "Olá, gostaria de conversar sobre um projeto.",
    ]
      .filter(Boolean)
      .join("\n");

    return `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
      mailSubject,
    )}&body=${encodeURIComponent(mailBody)}`;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          subject,
          message,
          projectReference: projectLabel,
          lgpdConsent,
          website,
        }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        code?: string;
        error?: string;
      };

      if (res.ok && data.ok) {
        setStatus("sent");
        setFeedback(
          `Solicitação enviada para ${SITE_EMAIL}. Retornaremos em horário comercial.`,
        );
        return;
      }

      if (data.code === "TRANSPORT_NOT_CONFIGURED") {
        setStatus("fallback");
        setFeedback(
          "O disparo automático por servidor ainda está em habilitação neste ambiente. Conclua em um clique pelo WhatsApp ou por e-mail mantendo sua mensagem preenchida.",
        );
        return;
      }

      setStatus("error");
      setFeedback(
        data.error ||
          "Não foi possível enviar sua mensagem agora. Utilize os canais diretos ao lado.",
      );
    } catch {
      setStatus("error");
      setFeedback(
        "Falha de conexão ao enviar. Utilize o WhatsApp ou e-mail direto.",
      );
    }
  };

  return (
    <section id="contato" className="section-padding">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contato Comercial"
            title="Converse com nossa equipe de software sobre o seu projeto"
            description="Compartilhe contexto, prazo e objetivo operacional. Retornamos com análise técnica objetiva e proposta formal."
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <Reveal>
            <div className="panel space-y-6 rounded-[16px] p-6 sm:p-7">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Canais Diretos da 2J Tech
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#cbd5e1]">
                  Atendimento transparente por e-mail corporativo ou WhatsApp
                  comercial.
                </p>
              </div>

              <div className="space-y-4 border-t border-white/[0.08] pt-5 text-sm">
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="flex items-start gap-3 rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-3.5 transition-colors hover:border-accent/40"
                >
                  <Mail size={17} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Comercial &amp; Orçamentos
                    </span>
                    <span className="mt-0.5 block font-semibold text-foreground">
                      {SITE_EMAIL}
                    </span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${SITE_PHONE_RAW}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-3.5 transition-colors hover:border-accent/40"
                >
                  <Phone size={17} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      WhatsApp / Telefone
                    </span>
                    <span className="mt-0.5 block font-semibold text-foreground">
                      {SITE_PHONE_DISPLAY}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${SITE_SUPPORT_EMAIL}`}
                  className="flex items-start gap-3 rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-3.5 transition-colors hover:border-accent/40"
                >
                  <MessageSquare
                    size={17}
                    className="mt-0.5 shrink-0 text-accent"
                  />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Suporte Técnico
                    </span>
                    <span className="mt-0.5 block font-semibold text-foreground">
                      {SITE_SUPPORT_EMAIL}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 rounded-[12px] border border-white/[0.07] bg-white/[0.02] p-3.5">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-muted">
                      Sede &amp; Atuação
                    </span>
                    <span className="mt-0.5 block font-medium text-foreground">
                      {SITE_LOCATION}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      Atendimento consultivo nacional
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      Administração &amp; Privacidade: {SITE_ADMIN_EMAIL}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="panel-elevated grid gap-4 rounded-[16px] p-6 sm:p-8 md:grid-cols-2"
            >
              {projectLabel ? (
                <div className="flex items-center justify-between gap-3 rounded-[12px] border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground md:col-span-2">
                  <span>
                    Referência selecionada:{" "}
                    <strong className="font-semibold text-accent">
                      {projectLabel}
                    </strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setProjectLabel(null)}
                    className="cursor-pointer text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Remover
                  </button>
                </div>
              ) : null}

              {/* Anti-spam honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </label>
              </div>

              <label className="block text-sm font-medium text-foreground/95">
                Nome completo *
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  placeholder="Seu nome"
                />
              </label>

              <label className="block text-sm font-medium text-foreground/95">
                Empresa
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-2 w-full rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  placeholder="Nome da empresa"
                />
              </label>

              <label className="block text-sm font-medium text-foreground/95">
                E-mail corporativo *
                <input
                  required
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  placeholder="voce@empresa.com.br"
                />
              </label>

              <label className="block text-sm font-medium text-foreground/95">
                Telefone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  placeholder="(47) 99999-9999"
                />
              </label>

              <label className="block text-sm font-medium text-foreground/95 md:col-span-2">
                Tipo de demanda *
                <select
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-2 w-full cursor-pointer rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent"
                >
                  {DEMAND_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-foreground/95 md:col-span-2">
                Contexto do projeto *
                <textarea
                  required
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 w-full resize-y rounded-[10px] border border-white/15 bg-[#07090d] px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
                  placeholder="Descreva o problema operacional, sistemas envolvidos, prazo desejado e objetivos..."
                />
              </label>

              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#cbd5e1]">
                  <input
                    required
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-white/25 bg-[#07090d] accent-[#22d3ee]"
                  />
                  <span>
                    Concordo com o tratamento dos dados informados exclusivamente
                    para atendimento comercial pela 2J Tech, conforme a{" "}
                    <Link
                      href="/privacidade"
                      className="font-semibold text-accent underline-offset-2 hover:underline"
                    >
                      Política de Privacidade (LGPD)
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {feedback ? (
                <div
                  role="status"
                  className={`rounded-[12px] border p-4 text-sm md:col-span-2 ${
                    status === "sent"
                      ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-200"
                      : status === "fallback"
                        ? "border-accent/35 bg-accent/10 text-foreground"
                        : "border-red-400/35 bg-red-500/10 text-red-200"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {status === "sent" ? (
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />
                    ) : null}
                    <p className="leading-relaxed">{feedback}</p>
                  </div>

                  {status === "fallback" || status === "error" ? (
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      <a
                        href={buildWhatsAppHref()}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-[10px] bg-accent px-4 py-2 text-xs font-semibold text-[#061018] transition-colors hover:bg-[#38dcf4]"
                      >
                        Enviar via WhatsApp
                      </a>
                      <a
                        href={buildMailtoHref()}
                        className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-white/35"
                      >
                        Abrir no aplicativo de e-mail
                      </a>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 md:col-span-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={status === "submitting"}
                >
                  <Send size={15} />
                  {status === "submitting"
                    ? "Enviando..."
                    : "Enviar Solicitação"}
                </Button>

                <a
                  href={buildWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#cbd5e1] underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  Preferir conversar direto pelo WhatsApp ({SITE_PHONE_DISPLAY})
                </a>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
