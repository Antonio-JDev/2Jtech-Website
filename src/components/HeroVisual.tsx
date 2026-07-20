"use client";

const FLOATING_CARDS = [
  { title: "API Online", value: "99.99%", top: "8%", left: "-4%" },
  { title: "Deploy Realizado", value: "✓", top: "18%", right: "-2%" },
  { title: "IA Integrada", value: "GPT + Claude", bottom: "22%", left: "-6%" },
  { title: "Database", value: "PostgreSQL", bottom: "10%", right: "0%" },
] as const;

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[8%] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent glow-neon-soft" />
      <div className="absolute inset-[14%] overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-[11px] text-white/80">2jtech — dashboard</span>
        </div>

        <div className="grid h-[calc(100%-42px)] grid-cols-[72px_1fr] gap-3 p-3 sm:grid-cols-[88px_1fr]">
          <div className="rounded-[14px] border border-white/8 bg-white/[0.03] p-2">
            {["Home", "API", "IA", "DB", "Cloud"].map((item) => (
              <div
                key={item}
                className="mb-2 rounded-[10px] px-2 py-2 text-[10px] text-white/75 last:mb-0 hover:bg-white/[0.04]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {["React", "Node", "Next"].map((tech) => (
                <div
                  key={tech}
                  className="rounded-[12px] border border-neon/20 bg-neon/5 px-2 py-2 text-center text-[10px] font-medium text-neon"
                >
                  {tech}
                </div>
              ))}
            </div>

            <div className="flex-1 rounded-[14px] border border-white/8 bg-[#070707] p-3 font-mono text-[10px] leading-relaxed text-white/80 sm:text-[11px]">
              <p>
                <span className="text-neon">const</span> product ={" "}
                <span className="text-white">await</span> build(
              </p>
              <p className="pl-3 text-white/90">{"{ stack: ['Next', 'Nest', 'AI'] }"}</p>
              <p>);</p>
              <p className="mt-2">
                <span className="text-neon">deploy</span>(product);
                <span className="ml-1 animate-pulse text-neon">▌</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[12px] border border-white/8 bg-white/[0.03] p-2.5">
                <p className="text-[10px] text-white/75">Latency</p>
                <p className="mt-1 text-sm font-semibold text-white">42ms</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[72%] rounded-full bg-neon/80" />
                </div>
              </div>
              <div className="rounded-[12px] border border-white/8 bg-white/[0.03] p-2.5">
                <p className="text-[10px] text-white/75">Uptime</p>
                <p className="mt-1 text-sm font-semibold text-white">99.99%</p>
                <div className="mt-2 flex items-end gap-1">
                  {[40, 65, 48, 80, 55, 90, 70].map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-neon/50"
                      style={{ height: `${h * 0.18}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {FLOATING_CARDS.map((card, index) => (
        <div
          key={card.title}
          className={`glass absolute z-10 min-w-[118px] rounded-[16px] px-3 py-2.5 glow-neon-soft ${
            index % 2 === 0 ? "animate-float-a" : "animate-float-b"
          }`}
          style={{
            top: "top" in card ? card.top : undefined,
            left: "left" in card ? card.left : undefined,
            right: "right" in card ? card.right : undefined,
            bottom: "bottom" in card ? card.bottom : undefined,
          }}
        >
          <p className="text-[10px] uppercase tracking-wider text-white/75">{card.title}</p>
          <p className="mt-1 text-sm font-semibold text-white">{card.value}</p>
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 rounded-full border border-neon/10" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/5" />
    </div>
  );
}
