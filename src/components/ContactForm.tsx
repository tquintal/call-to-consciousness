"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;

    setSubmitting(true);

    setTimeout(() => {
      form.reset();
      setFormData(undefined);
      setSubmitting(false);
    }, 5000);
  };

  return (
    <form
      target="_blank"
      action="https://formsubmit.co/call.to.consciousness@gmail.com"
      method="POST"
      onSubmit={handleSubmit}
      className="grid grid-cols-4 gap-4"
    >
      <input type="hidden" name="_template" value="box" />
      <input type="hidden" name="_next" value="https://www.call-to-consciousness.com" />
      <input type="hidden" name="_subject" value={formData?.subject ?? "Nova mensagem em call-to-consciousness.com"} />
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Nome</label>
        <input
          type="text"
          id="fname"
          name="Nome"
          className="p-2 border border-black outline-none bg-transparent rounded-none"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Apelido</label>
        <input
          type="text"
          id="lname"
          name="Apelido"
          className="p-2 border border-black outline-none bg-transparent rounded-none"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>E-mail*</label>
        <input
          type="email"
          id="email"
          name="E-mail"
          required
          className="p-2 border border-black outline-none bg-transparent rounded-none"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-2 flex flex-col">
        <label>Telefone</label>
        <input
          type="text"
          id="phone"
          name="Telefone"
          className="p-2 border border-black outline-none bg-transparent rounded-none"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 flex flex-col">
        <label>Assunto*</label>
        <input
          type="text"
          id="subject"
          name="Assunto"
          required
          className="p-2 border border-black outline-none bg-transparent rounded-none"
          onChange={handleChange}
        />
      </div>
      <div className="col-span-4 sm:col-span-3 flex flex-col">
        <label>Mensagem*</label>
        <textarea
          id="message"
          name="Mensagem"
          required
          className="h-28 p-2 border w-full resize-none border-black outline-none bg-transparent rounded-none"
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
