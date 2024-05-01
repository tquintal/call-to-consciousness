"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import sendEmail from "@/app/api/submit-form";
import { ContactFormType } from "@/types/ContactFormType";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormType | undefined>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target as HTMLFormElement;

    await toast.promise(sendEmail({ data: formData }), {
      pending: "A enviar mensagem...",
      success: "Obrigado pela sua mensagem, entrarei em contacto em breve!",
      error: "Erro, por favor contacte o e-mail no rodapé",
    });

    form.reset();
    setFormData(undefined);
    setSubmitting(false);
  };

  return (
    <form className="grid grid-cols-4 gap-4" onSubmit={handleSubmit}>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Nome</label>
        <input
          type="text"
          id="fname"
          name="fname"
          className="p-2 border border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Apelido</label>
        <input
          type="text"
          id="lname"
          name="lname"
          className="p-2 border border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>E-mail*</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="p-2 border border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Telefone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          className="p-2 border border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 flex flex-col">
        <label>Assunto*</label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="p-2 border border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-3 flex flex-col">
        <label>Mensagem*</label>
        <textarea
          id="message"
          name="message"
          required
          className="h-28 p-2 border w-full resize-none border-black outline-none bg-transparent"
          onChange={handleChange}
        />
      </div>
      <span className="col-span-4 text-xs font-light text-slate-400 text-end sm:hidden">* Campos obrigatórios</span>
      <div className="col-span-4 sm:col-span-1 justify-end flex">
        <input
          type="submit"
          value="Enviar"
          disabled={submitting}
          className="rounded-full sm:self-end max-w-28 h-28 max-sm:h-20 max-sm:w-20 text-sm cursor-pointer border transition duration-300 w-full hover:bg-slate-400 bg-slate-300 p-2 text-white"
        />
      </div>
      <span className="col-span-4 text-xs font-light text-slate-400 hidden sm:block">* Campos obrigatórios</span>
    </form>
  );
};

export default ContactForm;
