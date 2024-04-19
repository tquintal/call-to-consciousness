"use client";
import { MdMenu } from "react-icons/md";
import useWindowSize from "../hooks/screenSize";

const Header = () => {
  const windowSize = useWindowSize();

  return (
    <div className="h-28 flex items-center pr-12 pl-12 justify-between bg-[#F3F3F3] border-b border-zinc-500">
      <div className="flex gap-4">
        <div className="rounded-full bg-orange-400 h-7 w-7" />
        <div className="flex flex-col">
          <b>Susana Quintal</b>
          <p className="text-sm">Marketing e comunicação consciente</p>
        </div>
      </div>
      {windowSize !== "sm" && (
        <div className="gap-2 md:flex hidden">
          <span className="cursor-pointer">Percurso</span>
          <span>|</span>
          <span className="cursor-pointer">Serviços</span>
          <span>|</span>
          <span className="cursor-pointer">Contacto</span>
        </div>
      )}
      {windowSize === "sm" && <MdMenu size={32} />}
    </div>
  );
};

export default Header;
