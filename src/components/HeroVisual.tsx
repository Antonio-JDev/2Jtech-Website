"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Bot,
  Cloud,
  Database,
  Home,
  Server,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const FLOATING_CARDS = [
  { title: "API Online", value: "99.99%", top: "8%", left: "-4%", for: "API" },
  { title: "Deploy Realizado", value: "✓", top: "18%", right: "-2%", for: "Cloud" },
  { title: "IA Integrada", value: "GPT + Claude", bottom: "22%", left: "-6%", for: "IA" },
  { title: "Database", value: "PostgreSQL", bottom: "10%", right: "0%", for: "DB" },
] as const;

type MenuId = "Home" | "API" | "IA" | "DB" | "Cloud";

type Scene = {
  id: MenuId;
  icon: LucideIcon;
  title: string;
  code: string[];
  latencyBase: number;
  uptimeBase: number;
};

const SCENES: Scene[] = [
  {
    id: "Home",
    icon: Home,
    title: "overview.ts",
    latencyBase: 42,
    uptimeBase: 99.99,
    code: [
      "const product = await build({",
      "  stack: ['Next', 'Nest', 'AI'],",
      "  region: 'sa-east-1',",
      "});",
      "",
      "await deploy(product);",
      "console.log('✓ pipeline ready');",
    ],
  },
  {
    id: "API",
    icon: Server,
    title: "gateway.ts",
    latencyBase: 18,
    uptimeBase: 99.98,
    code: [
      "const res = await api.post('/orders', {",
      "  body: payload,",
      "  headers: { Authorization: token },",
      "});",
      "",
      "// ← 201 Created · webhook queued",
      "return res.json();",
    ],
  },
  {
    id: "IA",
    icon: Bot,
    title: "agent.ts",
    latencyBase: 86,
    uptimeBase: 99.95,
    code: [
      "const reply = await agent.run({",
      "  model: 'gpt-4.1',",
      "  tools: ['crm', 'sql', 'mcp'],",
      "  stream: true,",
      "});",
      "",
      "for await (const chunk of reply) {",
      "  write(chunk);",
      "}",
    ],
  },
  {
    id: "DB",
    icon: Database,
    title: "query.sql",
    latencyBase: 9,
    uptimeBase: 99.97,
    code: [
      "SELECT id, status, latency",
      "FROM metrics",
      "WHERE status = 'ok'",
      "  AND created_at > NOW() - INTERVAL '1h'",
      "ORDER BY latency ASC",
      "LIMIT 128;",
      "",
      "-- ✓ 128 rows · cache hit 94%",
    ],
  },
  {
    id: "Cloud",
    icon: Cloud,
    title: "deploy.yml",
    latencyBase: 31,
    uptimeBase: 99.99,
    code: [
      "pipeline:",
      "  env: production",
      "  replicas: 3",
      "  image: 2jtech/app:v2.4.1",
      "",
      "$ kubectl rollout status deploy/app",
      "# ✓ release v2.4.1 live · nodes 6/6",
    ],
  },
];

type Phase = "typing" | "dwell" | "moving" | "hover" | "click";

function jitter(base: number, amp: number, t: number, seed: number) {
  return (
    base +
    Math.sin(t * 1.7 + seed) * amp +
    Math.sin(t * 3.1 + seed * 2.1) * (amp * 0.45) +
    Math.sin(t * 0.6 + seed * 0.7) * (amp * 0.25)
  );
}

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [displayCode, setDisplayCode] = useState("");
  const [latency, setLatency] = useState(42);
  const [uptime, setUptime] = useState(99.99);
  const [bars, setBars] = useState([40, 55, 48, 70, 52, 80, 65]);
  const [barWidth, setBarWidth] = useState(72);
  const [toast, setToast] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 48, y: 28 });
  const [lineFlash, setLineFlash] = useState(false);

  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const phaseRef = useRef<Phase>("typing");
  const charIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const cancelledRef = useRef(false);
  const [paused, setPaused] = useState(false);

  const active = SCENES[activeIndex];

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const measureCursor = useCallback((index: number) => {
    const nav = navRef.current;
    const btn = itemRefs.current[index];
    if (!nav || !btn) return;
    const navBox = nav.getBoundingClientRect();
    const btnBox = btn.getBoundingClientRect();
    setCursorPos({
      x: btnBox.left - navBox.left + btnBox.width * 0.68,
      y: btnBox.top - navBox.top + btnBox.height * 0.58,
    });
  }, []);

  useEffect(() => {
    measureCursor(cursorIndex);
  }, [cursorIndex, measureCursor]);

  // Live metrics — always moving
  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const t = frame / 40;
      const scene = SCENES[activeRef.current];
      const lat = Math.max(
        4,
        jitter(scene.latencyBase, scene.latencyBase * 0.28, t, 1.2),
      );
      const up = Math.min(
        100,
        Math.max(99.9, jitter(scene.uptimeBase, 0.035, t, 4.4)),
      );
      setLatency(Math.round(lat * 10) / 10);
      setUptime(Math.round(up * 1000) / 1000);
      setBarWidth(Math.min(98, Math.max(35, 50 + (lat / scene.latencyBase) * 28)));
      setBars((prev) =>
        prev.map((h, i) => {
          const next = jitter(h, 12, t + i * 0.4, i + 2);
          return Math.min(95, Math.max(18, next));
        }),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  // Character-by-character typing + auto menu navigation
  useEffect(() => {
    if (reduceMotion) {
      setDisplayCode(SCENES[0].code.join("\n"));
      return;
    }
    if (paused) return;

    cancelledRef.current = false;
    let alive = true;
    const timers: { id: number; resolve: () => void }[] = [];

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          const idx = timers.findIndex((t) => t.id === id);
          if (idx >= 0) timers.splice(idx, 1);
          resolve();
        }, ms);
        timers.push({ id, resolve });
      });

    const typeScene = async (index: number) => {
      const scene = SCENES[index];
      const text = scene.code.join("\n");
      activeRef.current = index;
      setActiveIndex(index);
      setCursorIndex(index);
      measureCursor(index);
      charIndexRef.current = 0;
      setDisplayCode("");
      setPhaseSafe("typing");
      setToast(`editando ${scene.title}`);

      for (let i = 0; i <= text.length; i++) {
        if (!alive || cancelledRef.current || pausedRef.current) return false;
        charIndexRef.current = i;
        setDisplayCode(text.slice(0, i));

        requestAnimationFrame(() => {
          const el = terminalRef.current;
          if (el) el.scrollTop = el.scrollHeight;
        });

        if (text[i] === "\n") {
          setLineFlash(true);
          window.setTimeout(() => setLineFlash(false), 90);
          await sleep(120 + Math.random() * 80);
        } else if (text[i] === " ") {
          await sleep(28 + Math.random() * 30);
        } else {
          const hesitate = Math.random() < 0.04 ? 180 : 0;
          await sleep(18 + Math.random() * 28 + hesitate);
        }
      }

      setToast(`${scene.id} · sync ok`);
      setPhaseSafe("dwell");
      await sleep(1600);
      setToast(null);
      return true;
    };

    const moveAndClick = async (next: number) => {
      if (!alive || cancelledRef.current) return false;

      setPhaseSafe("moving");
      setCursorIndex(next);
      requestAnimationFrame(() => measureCursor(next));
      await sleep(680);
      if (!alive || cancelledRef.current) return false;

      setPhaseSafe("hover");
      await sleep(320);
      if (!alive || cancelledRef.current) return false;

      setPhaseSafe("click");
      setToast(`abrir ${SCENES[next].id}`);
      await sleep(220);
      if (!alive || cancelledRef.current) return false;

      return typeScene(next);
    };

    const loop = async () => {
      await typeScene(activeRef.current);
      while (alive && !cancelledRef.current && !pausedRef.current) {
        const next = (activeRef.current + 1) % SCENES.length;
        const ok = await moveAndClick(next);
        if (!ok) break;
      }
    };

    void loop();

    return () => {
      alive = false;
      cancelledRef.current = true;
      timers.forEach(({ id, resolve }) => {
        window.clearTimeout(id);
        resolve();
      });
      timers.length = 0;
    };
  }, [paused, reduceMotion, measureCursor, setPhaseSafe]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  async function selectMenu(index: number) {
    if (index === activeIndex && phase === "typing") return;
    setPaused(true);
    cancelledRef.current = true;
    pausedRef.current = true;

    // brief manual interaction
    setCursorIndex(index);
    measureCursor(index);
    setPhaseSafe("moving");
    await new Promise((r) => setTimeout(r, 500));
    setPhaseSafe("hover");
    await new Promise((r) => setTimeout(r, 200));
    setPhaseSafe("click");
    await new Promise((r) => setTimeout(r, 180));

    activeRef.current = index;
    setActiveIndex(index);
    const text = SCENES[index].code.join("\n");
    setDisplayCode("");
    setPhaseSafe("typing");
    setToast(`editando ${SCENES[index].title}`);

    for (let i = 0; i <= text.length; i++) {
      setDisplayCode(text.slice(0, i));
      requestAnimationFrame(() => {
        const el = terminalRef.current;
        if (el) el.scrollTop = el.scrollHeight;
      });
      await new Promise((r) =>
        setTimeout(r, text[i] === "\n" ? 100 : 16 + Math.random() * 22),
      );
    }

    setToast(`${SCENES[index].id} · sync ok`);
    setPhaseSafe("dwell");
    await new Promise((r) => setTimeout(r, 900));
    setToast(null);
    cancelledRef.current = false;
    pausedRef.current = false;
    setPaused(false);
  }

  const isClicking = phase === "click";
  const latencyLabel =
    latency < 10 ? latency.toFixed(1) : Math.round(latency).toString();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]">
      <div className="absolute inset-[8%] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-transparent glow-neon-soft" />

      <div className="absolute inset-[14%] overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0a0a]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-3 truncate text-[11px] text-white/80">
            2jtech — {active.title}
          </span>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-neon/15 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wide text-neon">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" />
            live
          </span>
        </div>

        <div className="grid h-[calc(100%-42px)] grid-cols-[76px_1fr] gap-3 p-3 sm:grid-cols-[92px_1fr]">
          {/* Menu */}
          <div
            ref={navRef}
            className="relative rounded-[14px] border border-white/8 bg-white/[0.03] p-1.5 sm:p-2"
          >
            {SCENES.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;
              const isHoverTarget =
                index === cursorIndex &&
                (phase === "hover" || phase === "click" || phase === "moving");

              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => void selectMenu(index)}
                  className={`relative mb-1.5 flex w-full items-center gap-1.5 rounded-[10px] px-1.5 py-2 text-left text-[10px] last:mb-0 transition-colors duration-200 sm:px-2 ${
                    isActive
                      ? "bg-neon/15 text-neon shadow-[inset_0_0_0_1px_rgba(0,239,252,0.35)]"
                      : isHoverTarget
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon size={12} className="shrink-0 opacity-90" />
                  <span className="truncate">{item.id}</span>
                </button>
              );
            })}

            {!reduceMotion && (
              <motion.div
                className="pointer-events-none absolute left-0 top-0 z-30"
                initial={false}
                animate={{
                  x: cursorPos.x,
                  y: cursorPos.y,
                  scale: isClicking ? 0.8 : 1,
                }}
                transition={{
                  x: { type: "spring", stiffness: 150, damping: 20, mass: 0.85 },
                  y: { type: "spring", stiffness: 150, damping: 20, mass: 0.85 },
                  scale: { duration: 0.1 },
                }}
                aria-hidden
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]"
                >
                  <path
                    d="M5 3.2 19.2 12.1l-6.4 1.5L10 20.8 5 3.2Z"
                    fill="#fff"
                    stroke="#111"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
                <AnimatePresence>
                  {isClicking && (
                    <motion.span
                      initial={{ scale: 0.3, opacity: 0.8 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute left-0 top-0 h-4 w-4 -translate-x-1 -translate-y-1 rounded-full bg-neon/55"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

          {/* Workspace */}
          <div className="relative flex min-w-0 flex-col gap-2.5 overflow-hidden">
            <div
              className={`relative min-h-0 flex-1 overflow-hidden rounded-[14px] border bg-[#070707] transition-colors duration-150 ${
                lineFlash ? "border-neon/40" : "border-white/8"
              }`}
            >
              <div className="flex items-center justify-between border-b border-white/5 px-2.5 py-1.5">
                <span className="font-mono text-[9px] text-white/45">{active.title}</span>
                <span className="font-mono text-[9px] text-white/35">
                  {phase === "typing" ? "writing…" : "saved"}
                </span>
              </div>

              <div
                ref={terminalRef}
                className="h-[calc(100%-28px)] overflow-y-auto px-2.5 py-2 font-mono text-[10px] leading-[1.55] text-white/85 sm:text-[11px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <CodeTyping text={displayCode} typing={phase === "typing"} />
              </div>
            </div>

            {/* Live metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[12px] border border-white/8 bg-white/[0.03] p-2.5">
                <p className="text-[10px] text-white/65">Latency</p>
                <p className="mt-0.5 tabular-nums text-sm font-semibold text-white">
                  {latencyLabel}
                  <span className="text-[10px] font-normal text-white/50">ms</span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-neon/80 transition-[width] duration-300 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
              <div className="rounded-[12px] border border-white/8 bg-white/[0.03] p-2.5">
                <p className="text-[10px] text-white/65">Uptime</p>
                <p className="mt-0.5 tabular-nums text-sm font-semibold text-white">
                  {uptime.toFixed(2)}
                  <span className="text-[10px] font-normal text-white/50">%</span>
                </p>
                <div className="mt-2 flex h-[14px] items-end gap-1">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-neon/55 transition-[height] duration-300 ease-out"
                      style={{ height: `${Math.max(3, h * 0.14)}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="pointer-events-none absolute bottom-[72px] left-1 right-1 z-20 mx-auto max-w-[92%] rounded-lg border border-neon/25 bg-[#0c1214]/92 px-2 py-1 text-center font-mono text-[9px] text-neon backdrop-blur"
                >
                  {toast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {FLOATING_CARDS.map((card, index) => {
        const highlighted = card.for === active.id;
        return (
          <motion.div
            key={card.title}
            className={`glass absolute z-10 min-w-[118px] rounded-[16px] px-3 py-2.5 ${
              index % 2 === 0 ? "animate-float-a" : "animate-float-b"
            }`}
            animate={{
              opacity: highlighted ? 1 : 0.5,
              scale: highlighted ? 1.05 : 1,
            }}
            transition={{ duration: 0.35 }}
            style={{
              top: "top" in card ? card.top : undefined,
              left: "left" in card ? card.left : undefined,
              right: "right" in card ? card.right : undefined,
              bottom: "bottom" in card ? card.bottom : undefined,
            }}
          >
            <p className="text-[10px] uppercase tracking-wider text-white/75">{card.title}</p>
            <p className="mt-1 text-sm font-semibold text-white">{card.value}</p>
          </motion.div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 rounded-full border border-neon/10" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/5" />
    </div>
  );
}

function CodeTyping({ text, typing }: { text: string; typing: boolean }) {
  const lines = text.split("\n");

  return (
    <pre className="whitespace-pre-wrap break-words">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1;
        return (
          <div key={i} className="min-h-[1.55em]">
            <span className="mr-2 inline-block w-4 select-none text-right text-white/25">
              {i + 1}
            </span>
            <ColoredLine line={line} />
            {isLast && typing && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.65 }}
                className="ml-0.5 text-neon"
              >
                ▌
              </motion.span>
            )}
          </div>
        );
      })}
    </pre>
  );
}

function ColoredLine({ line }: { line: string }) {
  // lightweight syntax coloring without heavy parsers
  if (!line) return null;

  if (line.trimStart().startsWith("//") || line.trimStart().startsWith("#") || line.trimStart().startsWith("--")) {
    return <span className="text-white/40">{line}</span>;
  }

  if (line.trimStart().startsWith("$")) {
    return <span className="text-neon">{line}</span>;
  }

  const parts = line.split(
    /(\bconst\b|\bawait\b|\breturn\b|\bfor\b|\bof\b|\btrue\b|\bfalse\b|['"][^'"]*['"]|\d+)/g,
  );

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (/^(const|await|return|for|of)$/.test(part)) {
          return (
            <span key={i} className="text-neon">
              {part}
            </span>
          );
        }
        if (/^(true|false)$/.test(part)) {
          return (
            <span key={i} className="text-amber-300/90">
              {part}
            </span>
          );
        }
        if (/^['"]/.test(part)) {
          return (
            <span key={i} className="text-emerald-300/90">
              {part}
            </span>
          );
        }
        if (/^\d+$/.test(part)) {
          return (
            <span key={i} className="text-sky-300/90">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
