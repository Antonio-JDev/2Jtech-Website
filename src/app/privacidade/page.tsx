import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import {
  SITE_ADMIN_EMAIL,
  SITE_BRAND_TITLE,
  SITE_LEGAL_NAME,
  SITE_LOCATION,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD)",
  description:
    "Política de Privacidade e proteção de dados pessoais da 2J Tech Softwares em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-[#67e8f9]"
        >
          <ArrowLeft size={16} />
          Voltar para a página inicial
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Política de Privacidade (LGPD)
        </h1>
        <p className="mt-3 text-sm text-muted">
          Última atualização: novembro de 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#cbd5e1] sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              1. Controlador dos Dados
            </h2>
            <p>
              Esta página descreve como a{" "}
              <strong className="text-foreground">{SITE_BRAND_TITLE}</strong>{" "}
              (<strong className="text-foreground">{SITE_LEGAL_NAME}</strong>,
              sediada em {SITE_LOCATION}) trata os dados pessoais coletados por
              meio do site institucional <strong className="text-foreground">www.2jtech.net</strong>,
              em conformidade com a Lei Geral de Proteção de Dados Pessoais
              (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              2. Dados Coletados e Finalidade
            </h2>
            <p>
              No formulário de contato comercial, coletamos apenas os dados
              fornecidos voluntariamente por você: nome completo, empresa
              (opcional), e-mail corporativo, telefone/WhatsApp (opcional), tipo
              de demanda e descrição do projeto.
            </p>
            <p>
              Essas informações são utilizadas exclusivamente para análise de
              escopo, retorno comercial, elaboração de propostas técnicas e
              eventuais procedimentos preliminares relacionados a contrato (art.
              7º, incisos I e V da LGPD). Não comercializamos, alugamos ou
              cedemos seus dados a terceiros para fins de marketing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              3. Armazenamento e Segurança
            </h2>
            <p>
              As solicitações enviadas são encaminhadas diretamente aos canais
              oficiais da empresa mediante transporte criptografado (HTTPS/TLS)
              e acesso restrito aos responsáveis pelo atendimento técnico e
              administrativo. Mantemos os registros apenas pelo tempo necessário
              ao atendimento ou ao cumprimento de obrigações legais.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              4. Direitos do Titular e Encarregado (DPO)
            </h2>
            <p>
              Você pode solicitar a confirmação de tratamento, acesso, correção,
              eliminação de dados ou revogação de consentimento a qualquer
              momento pelo e-mail{" "}
              <a
                href={`mailto:${SITE_ADMIN_EMAIL}`}
                className="font-semibold text-accent underline-offset-2 hover:underline"
              >
                {SITE_ADMIN_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

