import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2J Tech | Softwares, Consultoria & Gestão",
  description:
    "Desenvolvemos sistemas web, plataformas, APIs, Inteligência Artificial, integrações e soluções sob medida para empresas que desejam crescer com tecnologia.",
  keywords: [
    "software house",
    "desenvolvimento sob medida",
    "APIs",
    "inteligência artificial",
    "consultoria tecnológica",
    "2J Tech",
  ],
  authors: [{ name: "2J Tech" }],
  openGraph: {
    title: "2J Tech | Softwares, Consultoria & Gestão",
    description:
      "Transformamos desafios em soluções digitais. Software house premium com foco em inovação e autoridade técnica.",
    type: "website",
    locale: "pt_BR",
    siteName: "2J Tech",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/sigla-2j.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${plusJakarta.variable} antialiased`}>{children}</body>
    </html>
  );
}
