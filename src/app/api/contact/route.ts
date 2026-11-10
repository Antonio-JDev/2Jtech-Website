import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
  projectReference?: unknown;
  lgpdConsent?: unknown;
  website?: unknown;
};

function asTrimmedString(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido." },
      { status: 400 },
    );
  }

  // Honeypot anti-spam trap: silently accept bot submissions without sending.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const name = asTrimmedString(body.name, 120);
  const company = asTrimmedString(body.company, 120);
  const email = asTrimmedString(body.email, 180);
  const phone = asTrimmedString(body.phone, 40);
  const subject = asTrimmedString(body.subject, 100) || "Proposta Técnica";
  const message = asTrimmedString(body.message, 4000);
  const projectReference = asTrimmedString(body.projectReference, 120);
  const lgpdConsent = body.lgpdConsent === true;

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Informe seu nome completo." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Informe um e-mail válido." },
      { status: 400 },
    );
  }

  if (message.length < 10) {
    return NextResponse.json(
      {
        ok: false,
        error: "Descreva brevemente o contexto da sua demanda (mínimo 10 caracteres).",
      },
      { status: 400 },
    );
  }

  if (!lgpdConsent) {
    return NextResponse.json(
      {
        ok: false,
        error: "É necessário concordar com a Política de Privacidade para enviar.",
      },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || "contato@2jtech.net";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() ||
    "2J Tech Softwares <contato@2jtech.net>";

  if (!resendApiKey && !webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        code: "TRANSPORT_NOT_CONFIGURED",
        error:
          "O disparo automático de e-mail não está configurado neste ambiente.",
      },
      { status: 503 },
    );
  }

  const emailSubject = `[2J Tech Site] ${subject} — ${company || name}`;
  const textBody = [
    "Nova solicitação comercial via www.2jtech.net",
    "",
    `Nome: ${name}`,
    `Empresa: ${company || "Não informado"}`,
    `E-mail: ${email}`,
    `Telefone / WhatsApp: ${phone || "Não informado"}`,
    `Tipo de demanda: ${subject}`,
    projectReference ? `Case de referência: ${projectReference}` : null,
    "",
    "Mensagem:",
    message,
    "",
    "Consentimento LGPD: Confirmado pelo remetente.",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    if (resendApiKey) {
      const htmlBody = `
        <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#0f172a;">
          <h2 style="margin:0 0 12px;">Nova solicitação comercial — 2J Tech Softwares</h2>
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Empresa:</strong> ${escapeHtml(company || "Não informado")}</p>
          <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
          <p><strong>Telefone / WhatsApp:</strong> ${escapeHtml(phone || "Não informado")}</p>
          <p><strong>Demanda:</strong> ${escapeHtml(subject)}</p>
          ${
            projectReference
              ? `<p><strong>Case de referência:</strong> ${escapeHtml(projectReference)}</p>`
              : ""
          }
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
          <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
          <p style="font-size:12px;color:#64748b;margin-top:20px;">
            Consentimento LGPD registrado no formulário de contato em www.2jtech.net.
          </p>
        </div>
      `;

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: emailSubject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        console.error("[contact/resend] delivery failed:", res.status, detail);
        return NextResponse.json(
          {
            ok: false,
            error:
              "Não foi possível concluir o envio automático agora. Utilize o WhatsApp ou e-mail direto abaixo.",
          },
          { status: 502 },
        );
      }
    }

    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "2jtech-website",
          createdAt: new Date().toISOString(),
          name,
          company: company || null,
          email,
          phone: phone || null,
          subject,
          projectReference: projectReference || null,
          message,
          lgpdConsent: true,
        }),
      });

      if (!webhookRes.ok && !resendApiKey) {
        console.error(
          "[contact/webhook] delivery failed:",
          webhookRes.status,
        );
        return NextResponse.json(
          {
            ok: false,
            error:
              "Não foi possível encaminhar sua solicitação automaticamente. Utilize o WhatsApp ou e-mail direto abaixo.",
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Erro de comunicação ao enviar. Você pode concluir o contato pelo WhatsApp ou e-mail direto.",
      },
      { status: 500 },
    );
  }
}

