"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/lib/reveal";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contato" className="section-padding border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Contato"
            title="Vamos conversar sobre o seu próximo projeto"
            description="Conte um pouco sobre a sua ideia. Retornamos com uma proposta clara e objetiva."
          />
        </Reveal>

        <Reveal>
          <form
            onSubmit={onSubmit}
            className="glass mx-auto grid max-w-3xl gap-4 rounded-[22px] p-6 sm:p-8 md:grid-cols-2"
          >
            <label className="block text-sm text-white/90 md:col-span-1">
              Nome
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                className="mt-2 w-full rounded-[14px] border border-white/15 bg-black/55 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-neon/50"
                placeholder="Seu nome"
              />
            </label>

            <label className="block text-sm text-white/90 md:col-span-1">
              E-mail
              <input
                required
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-[14px] border border-white/15 bg-black/55 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-neon/50"
                placeholder="voce@empresa.com"
              />
            </label>

            <label className="block text-sm text-white/90 md:col-span-2">
              Mensagem
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-y rounded-[14px] border border-white/15 bg-black/55 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-neon/50"
                placeholder="Descreva seu projeto, prazo e objetivos..."
              />
            </label>

            <div className="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <Button type="submit" variant="primary">
                Enviar mensagem
              </Button>
              {sent ? (
                <p className="text-sm text-neon" role="status">
                  Mensagem registrada. Em breve entraremos em contato.
                </p>
              ) : (
                <p className="text-xs text-muted">
                  Ou escreva para{" "}
                  <a
                    className="text-white underline-offset-2 hover:underline"
                    href="mailto:contato@2jtech.com.br"
                  >
                    contato@2jtech.com.br
                  </a>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
