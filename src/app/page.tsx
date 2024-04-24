export default function Home() {
  return (
    <div className="p-8 bg-[#E3E1DF] pt-36 flex gap-8 justify-center lg:items-center max-sm:items-center items-start lg:flex-row flex-col">
      <div className="rounded-full w-full max-sm:pb-[100%] sm:h-96 sm:w-96 bg-zinc-300" />
      <div className="lg:max-w-[420px] flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-8xl font-bold">Olá!</h1>
          <div className="sm:h-32 sm:w-32 h-24 w-24 bg-zinc-300 rounded-full max-sm:hidden" />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl -mb-4">Sobre mim</h2>
          <p>Viso potenciar projetos com e sem fins lucrativos, de empreendedorismo social, desenvolvimento pessoal e de bem-estar.</p>
          <p>
            Identifico-me com uma vida em maior equidade e equanimidade, e no crescimento contínuo de todos.
            <br />
            Acredito no potencial do trabalho para uma maior consciência individual, como para com as interdependências globais.
          </p>
          <p>
            Para isso, proponho uma Comunicação Visual e Estratégica que apoie iniciativas que promovam o desenvolvimento sustentável
            dos mundos individuais e coletivos, para que as leve ao cumprimento dos seus objetivos e crescimento através os canais mais
            adequados.
          </p>
        </div>
        <div className="flex gap-4 sm:text-lg text-sm">
          <div className="sm:h-32 sm:w-32 h-24 w-24 bg-zinc-300 rounded-full flex items-center justify-center font-semibold">
            Percurso
          </div>
          <div className="sm:h-32 sm:w-32 h-24 w-24 bg-zinc-300 rounded-full flex items-center justify-center font-semibold">
            Serviços
          </div>
          <div className="sm:h-32 sm:w-32 h-24 w-24 bg-zinc-300 rounded-full flex items-center justify-center font-semibold">
            Contacto
          </div>
        </div>
        <div className="rounded-full bg-zinc-300 w-72 h-72 sm:hidden" />
      </div>
    </div>
  );
}
