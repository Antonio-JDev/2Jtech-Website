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
  title: "Termos de Uso",
  description:
    "Termos de Uso do site institucional da 2J Tech Softwares, Consultoria & Gestão.",
};

export default function TermsPage() {
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
          Termos de Uso
        </h1>
        <p className="mt-3 text-sm text-muted">
          Última atualização: novembro de 2026
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-[#cbd5e1] sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              1. Objeto
            </h2>
            <p>
              O site <strong className="text-foreground">www.2jtech.net</strong>{" "}
              é mantido pela{" "}
              <strong className="text-foreground">{SITE_BRAND_TITLE}</strong>{" "}
              (<strong className="text-foreground">{SITE_LEGAL_NAME}</strong>,{" "}
              {SITE_LOCATION}) com finalidade exclusivamente institucional e de
              apresentação de serviços de desenvolvimento de software e consultoria.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              2. Propostas e Contratação
            </h2>
            <p>
              As informações apresentadas neste site têm caráter informativo e
              não constituem oferta vinculante automática. Todo projeto de
              desenvolvimento ou consultoria é formalizado mediante análise
              técnica, definição de escopo, cronograma e instrumento contratual
              próprio firmado entre as partes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              3. Propriedade Intelectual
            </h2>
            <p>
              A marca 2J Tech, textos institucionais, identidade visual e código
              deste website são protegidos pela legislação aplicável. Os estudos
              de caso e capturas exibidos referem-se a projetos reais
              desenvolvidos pela empresa, respeitando a titularidade das marcas
              dos respectivos clientes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">
              4. Contato Administrativo
            </h2>
            <p>
              Dúvidas sobre estes Termos podem ser encaminhadas para{" "}
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

