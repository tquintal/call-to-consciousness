"use server";

import { NextApiRequest, NextApiResponse } from "next";

import { ContactForm } from "@/types/ContactForm";

import transporter from "../../utils/nodemailer";

export default async function sendEmail({ data }: { data: ContactForm }) {
  // const { name, email, message } = formData;

  try {
    await transporter.sendMail({
      from: data.email,
      to: process.env.SMTP_USER,
      subject: data.subject,
      text: `
      Nova mensagem de:
      ${data.fname && `Nome: ${data.fname}`}
      ${data.lname && `Apelido: ${data.lname}`}
      ${data.phone && `Telefone: ${data.phone}`}
      
      Mensagem: 
      ${data.message}
      `,
    });
    return { ok: true };
  } catch (error) {
    console.error("Error:", error ?? "");
    throw new Error("Error", error ?? "");
  }
}
