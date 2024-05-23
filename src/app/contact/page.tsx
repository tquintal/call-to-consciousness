import ContactForm from "@/components/ContactForm";

import { Layout, Title } from "../../components/Elements";

export default function Contact() {
  return (
    <Layout>
      <div className="flex justify-between gap-4 flex-col lg:flex-row">
        <div className="flex flex-col gap-4">
          <div>
            <Title>Contacto</Title>
            <span>Vamos conversar sobre as suas ideias!</span>
          </div>
          <div className="flex flex-col lg:mt-20">
            <span className="font-semibold">Telefone</span>
            <span>+351 936 262 589</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">E-mail</span>
            <a href="mailto:call.to.consciousness@gmail.com" className="break-all text-pretty">
              call.to.consciousness@gmail.com
            </a>
          </div>
        </div>
        <ContactForm />
      </div>
    </Layout>
  );
}
