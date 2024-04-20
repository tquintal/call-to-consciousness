"use client";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="h-28 flex items-center pl-8 pr-8 sm:pr-12 sm:pl-12 gap-4 justify-between bg-[#F3F3F3] border-b border-zinc-500">
      <Link className="flex gap-4" href="/">
        <div className="rounded-full bg-orange-400 h-7 w-7" />
        <div className="flex flex-col">
          <b>Susana Quintal</b>
          <p className="text-sm">Marketing e comunicação consciente</p>
        </div>
      </Link>
      <div className="gap-2 hidden sm:flex">
        <Link href="/">Início</Link>
        <span>|</span>
        <Link href="/path">Percurso</Link>
        <span>|</span>
        <Link href="/services">Serviços</Link>
        <span>|</span>
        <Link href="/contact">Contacto</Link>
      </div>
      <MdMenu size={32} onClick={() => setIsMenuVisible(true)} cursor="pointer" className="sm:hidden" />
      {isMenuVisible && (
        <div className="h-full fixed w-full z-50 bg-[#F3F3F3] top-0 left-0 p-6">
          <MdClose size={32} onClick={() => setIsMenuVisible(false)} cursor="pointer" className="right-8 top-10 absolute" />
          <div className="flex text-xl items-center justify-center h-full">
            <div className="flex flex-col gap-8">
              <Link href="/" onClick={() => setIsMenuVisible(false)}>
                Início
              </Link>
              <Link href="/path" onClick={() => setIsMenuVisible(false)}>
                Percurso
              </Link>
              <Link href="/services" onClick={() => setIsMenuVisible(false)}>
                Serviços
              </Link>
              <Link href="/contact" onClick={() => setIsMenuVisible(false)}>
                Contacto
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
