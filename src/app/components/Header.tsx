"use client";
import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="h-28 flex items-center pr-12 pl-12 gap-4 justify-between bg-[#F3F3F3] border-b border-zinc-500">
      <div className="flex gap-4">
        <div className="rounded-full bg-orange-400 h-7 w-7" />
        <div className="flex flex-col">
          <b>Susana Quintal</b>
          <p className="text-sm">Marketing e comunicação consciente</p>
        </div>
      </div>
      <div className="gap-2 hidden sm:flex">
        <span className="cursor-pointer">Percurso</span>
        <span>|</span>
        <span className="cursor-pointer">Serviços</span>
        <span>|</span>
        <span className="cursor-pointer">Contacto</span>
      </div>
      <MdMenu size={32} onClick={() => setIsMenuVisible(true)} cursor="pointer" className="sm:hidden" />
      {isMenuVisible && (
        <div className="h-full w-full bg-[#F3F3F3] absolute top-0 left-0 p-6">
          <MdClose size={32} onClick={() => setIsMenuVisible(false)} cursor="pointer" className="right-12 top-10 absolute" />
          <div className="flex text-xl items-center justify-center h-full">
            <div className="flex flex-col gap-8">
              <span>Percurso</span>
              <span>Serviços</span>
              <span>Contacto</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
