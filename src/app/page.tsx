import Image from "next/image";
import Link from "next/link";

import { EditAbout } from "@/components/EditAbout";
import { prisma } from "@/server/db";

import avatar from "../../public/avatar.jpg";
import call_to_consciousness from "../../public/call-to-consciousness.png";

export default async function Home() {
  const data = await prisma.about.findFirst();
  if (!data) return <div className="p-8 bg-[#E3E1DF] pt-36">Loading...</div>;

  return (
    <div className="p-8 bg-[#E3E1DF] pt-36 flex gap-8 justify-center lg:items-center max-sm:items-center items-start lg:flex-row flex-col">
      <Image
        src={call_to_consciousness}
        alt="Call to consciousness"
        priority
        loading="eager"
        className="rounded-full sm:h-96 sm:w-96 bg-zinc-300"
      />
      <div className="lg:max-w-[420px] flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-8xl font-bold max-sm:w-full">{data.title}</h1>
          <Image
            src={avatar}
            alt="Avatar"
            priority
            loading="eager"
            className="sm:h-32 sm:w-32 h-24 w-24 rounded-full max-sm:hidden object-cover bg-zinc-300"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-xl -mb-4">{data.subTitle}</h2>
          <EditAbout content={data.content} />
        </div>
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
