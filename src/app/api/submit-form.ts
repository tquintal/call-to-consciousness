"use server";

import { ContactFormType } from "@/types/ContactFormType";

import transporter from "../../utils/nodemailer";

export default async function sendEmail({ data }: { data: ContactFormType }) {
  try {
    await transporter.sendMail({
      from: data.email,
      to: process.env.SMTP_USER,
      subject: data.subject,
      text: `
      Nova mensagem de: ${data.email}
      ${data.fname ? `Nome: ${data.fname}` : ""}
      ${data.lname ? `Apelido: ${data.lname}` : ""}
      ${data.phone ? `Telefone: ${data.phone}` : ""}
      
      Mensagem: 
      ${data.message}
      `,
    });
    return { ok: true };
  } catch (error) {
    throw new Error("", error ?? "");
  }
}
