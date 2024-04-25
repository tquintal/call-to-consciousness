import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  return (
    <div className="h-28 z-50 flex items-center pl-8 pr-8 sm:pr-12 sm:pl-12 gap-4 justify-between bg-[#F3F3F3] border-b border-zinc-500 fixed w-full">
      <Link className="flex gap-2 sm:gap-4" href="/">
        <div className="rounded-full bg-orange-400 h-6 w-6 sm:h-7 sm:w-7" />
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
      <AnimatePresence>
        {isMenuVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
            className="h-full fixed w-full bg-[#F3F3F3] top-0 left-0"
          >
            <MdClose size={32} onClick={handleMenuClose} cursor="pointer" className="right-8 top-10 fixed" />
            <div className="flex text-xl items-center flex-col gap-8 justify-center h-full">
              <Link href="/" onClick={handleMenuClose}>
                Início
              </Link>
              <Link href="/path" onClick={handleMenuClose}>
                Percurso
              </Link>
              <Link href="/services" onClick={handleMenuClose}>
                Serviços
              </Link>
              <Link href="/contact" onClick={handleMenuClose}>
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
