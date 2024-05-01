import Image from 'next/image';
import Link from 'next/link';

import { About } from '@/components/About';
import { api } from '@/trpc/server';

import avatar from '../../public/avatar.jpg';
import call_to_consciousness from '../../public/call-to-consciousness.png';

export default async function Home() {
  const data = await api.about.get();
  if (!data) return <Loading />;

  return (
    <div className="p-8 bg-[#faf1e7] pt-36 flex gap-8 justify-center lg:items-center max-sm:items-center items-start lg:flex-row flex-col">
      <Image
        src={call_to_consciousness}
        alt="Call to consciousness"
        priority
        loading="eager"
        className="rounded-full sm:h-96 sm:w-96 bg-zinc-300"
      />
      <div className="lg:max-w-[420px] flex flex-col gap-8">
        <About data={data} />
        <div className="flex gap-4 sm:text-lg text-sm">
          <Link
            href="/path"
            className="sm:h-32 sm:w-32 h-24 w-24 rounded-full flex items-center justify-center font-semibold bg-[#F3E1BA] border border-[#D6BE91] hover:bg-white hover:border-black transition-all duration-500"
          >
            Percurso
          </Link>
          <Link
            href="/services"
            className="sm:h-32 sm:w-32 h-24 w-24 rounded-full flex items-center justify-center font-semibold cursor-pointer bg-[#BFA898] border border-[#A69275] hover:bg-white hover:border-black transition-all duration-500"
          >
            Serviços
          </Link>
          <Link
            href="/contact"
            className="sm:h-32 sm:w-32 h-24 w-24 rounded-full flex items-center justify-center font-semibold cursor-pointer bg-[#D0E0DE] border border-[#ADCFCD] hover:bg-white hover:border-black transition-all duration-500"
          >
            Contacto
          </Link>
        </div>
        <Image src={avatar} alt="Avatar" loading="eager" className="rounded-full w-72 h-72 sm:hidden object-cover bg-zinc-300" />
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="p-8 bg-[#E3E1DF] pt-36 h-[95vh] flex items-center justify-center animate-pulse font-light">A carregar...</div>
  );
};
