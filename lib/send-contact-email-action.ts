"use server";

import nodemailer from "nodemailer";

type SendContactEmailInput = {
  name: string;
  email: string;
  message: string;
  client?: string;
};

type SendContactEmailResult = {
  ok: boolean;
  message: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const user = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;

  if (!user || !pass) {
    throw new Error("Missing MAIL_USER or MAIL_PASS environment variables");
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure =
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
}

export async function sendContactEmailAction(
  input: SendContactEmailInput,
): Promise<SendContactEmailResult> {
  const user = process.env.MAIL_USER;
  const recipient = process.env.MAIL_TO ?? user;

  if (!user || !recipient) {
    return {
      ok: false,
      message: "Configuración de email incompleta en el servidor.",
    };
  }

  const { name, email, message, client } = input;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      ok: false,
      message: "Faltan campos obligatorios.",
    };
  }

  try {
    const mailer = getTransporter();

    await mailer.sendMail({
      from: `ByXruz Contact <${user}>`,
      to: recipient,
      replyTo: email,
      subject: `Nuevo mensaje de contacto${client ? ` (${client})` : ""}`,
      text: [
        `Nombre: ${name}`,
        `Email: ${email}`,
        `Cliente: ${client ?? "N/A"}`,
        "",
        "Mensaje:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Cliente:</strong> ${client ?? "N/A"}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return { ok: true, message: "Mensaje enviado" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al enviar el mensaje" };
  }
}
