import { Layout, Title } from "../components/Elements";

export default function Contact() {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <Title>Contacto</Title>
            <span>Vamos conversar sobre as suas ideias!</span>
          </div>
          <div className="flex flex-col mt-20">
            <span className="font-semibold">Telefone</span>
            <span>+351 936 262 589</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">E-mail</span>
            <span>raiseyourvoicearoundtheworld@gmail.com</span>
          </div>
        </div>
        <form className="grid grid-cols-4 gap-4">
          <div className="col-span-2 flex flex-col">
            <label>Nome:</label>
            <input type="text" id="fname" name="fname" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Apelido:</label>
            <input type="text" id="lname" name="lname" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Email:</label>
            <input type="text" id="email" name="email" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-2 flex flex-col">
            <label>Telefone:</label>
            <input type="text" id="phone" name="phone" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-4 flex flex-col">
            <label>Assunto:</label>
            <input type="text" id="subject" name="subject" className="p-2 border border-black outline-none bg-transparent" />
          </div>
          <div className="col-span-3 flex flex-col">
            <label>Mensagem:</label>
            <textarea
              id="message"
              name="message"
              className="p-2 border min-h-36 w-full resize-none border-black outline-none bg-transparent"
            />
          </div>
          <input
            type="submit"
            value="Enviar"
            className="rounded-full h-28 self-center col-span-1 text-sm cursor-pointer border transition duration-300 w-full hover:bg-slate-400 bg-slate-300 p-2 text-white"
          />
        </form>
      </div>
    </Layout>
  );
}
