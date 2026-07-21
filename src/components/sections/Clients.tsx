"use client";

import { CLIENTS } from "@/lib/content";
import { Reveal } from "@/lib/reveal";

export function Clients() {
  return (
    <section className="border-y border-white/5 bg-surface/20 py-8 backdrop-blur-[2px] max-[779px]:py-9" aria-label="Clientes">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
            Empresas que confiam na 2J Tech
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {CLIENTS.map((client) => (
              <span
                key={client}
                className="text-lg font-semibold tracking-[0.08em] text-white/90 transition-colors hover:text-white"
              >
                {client}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
