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
            <span>raiseyourvoicearoundtheworld@gmail.com</span>
          </div>
        </div>
        <form className="grid grid-cols-4 gap-4">
          <div className="col-span-4 sm:col-span-2 flex flex-col">
            <label>Nome</label>
            <input type="text" id="fname" name="fname" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 sm:col-span-2 flex flex-col">
            <label>Apelido</label>
            <input type="text" id="lname" name="lname" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 sm:col-span-2 flex flex-col">
            <label>E-mail*</label>
            <input type="text" id="email" name="email" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 sm:col-span-2 flex flex-col">
            <label>Telefone</label>
            <input type="text" id="phone" name="phone" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 flex flex-col">
            <label>Assunto*</label>
            <input type="text" id="subject" name="subject" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 sm:col-span-3 flex flex-col">
            <label>Mensagem*</label>
            <textarea
              id="message"
              name="message"
              className="h-28 p-2 border w-full resize-none border-black outline-none bg-transparent"
            />
          </div>
          <div className="col-span-4 sm:col-span-1 justify-end flex">
            <input
              type="submit"
              value="Enviar"
              className="rounded-full sm:self-end max-w-28 h-28 max-sm:h-20 max-sm:w-20 text-sm cursor-pointer border transition duration-300 w-full hover:bg-slate-400 bg-slate-300 p-2 text-white"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
