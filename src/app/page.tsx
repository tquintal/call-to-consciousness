import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="p-8 bg-[#e3e1df] flex gap-8 justify-center items-center">
        <div className="rounded-full h-96 w-96 bg-zinc-300" />
        <div className="max-w-[420px] flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-8xl font-bold">Olá!</h1>
            <div className="h-32 w-32 bg-zinc-300 rounded-full" />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-xl -mb-4">Sobre mim</h2>
            <p>
              Viso potenciar projetos com e sem fins lucrativos, de empreendedorismo social, desenvolvimento pessoal e de bem-estar.
            </p>
            <p>
              Identifico-me com uma vida em maior equidade e equanimidade, e no crescimento contínuo de todos.
              <br />
              Acredito no potencial do trabalho para uma maior consciência individual, como para com as interdependências globais.
            </p>
            <p>
              Para isso, proponho uma Comunicação Visual e Estratégica que apoie iniciativas que promovam o desenvolvimento sustentável
              dos mundos individuais e coletivos, para que as leve ao cumprimento dos seus objetivos e crescimento através os canais
              mais adequados.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="h-32 w-32 bg-zinc-300 rounded-full flex items-center justify-center font-semibold text-lg">Percurso</div>
            <div className="h-32 w-32 bg-zinc-300 rounded-full flex items-center justify-center font-semibold text-lg">Serviços</div>
            <div className="h-32 w-32 bg-zinc-300 rounded-full flex items-center justify-center font-semibold text-lg">Contacto</div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
