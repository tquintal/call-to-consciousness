import { MdClose, MdMenu } from "react-icons/md";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useViewModeContext } from "@/context/PreviewMode";

const FHeader = () => {
  const { isViewMode, setIsViewMode } = useViewModeContext();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const pathname = usePathname();

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  return (
    <div className="z-50 px-8 sm:px-12 bg-[#F3F3F3] border-b flex justify-center border-zinc-500 fixed w-full">
      <div style={{ maxWidth: "1920px" }} className="flex h-28 items-center gap-4 justify-between w-full">
        <Link className="flex gap-2 sm:gap-4" href="/">
          <div className="rounded-full bg-orange-400 h-6 w-6 sm:h-7 sm:w-7" />
          <div className="flex flex-col">
            <b>Susana Quintal</b>
            <p className="text-sm">Marketing e comunicação consciente</p>
          </div>
        </Link>
        <div className="gap-2 hidden sm:flex">
          <Link href="/" className={pathname === "/" ? "text-orange-600" : ""}>
            Início
          </Link>
          <span>|</span>
          <Link href="/path" className={pathname === "/path" ? "text-orange-600" : ""}>
            Percurso
          </Link>
          <span>|</span>
          <Link href="/services" className={pathname === "/services" ? "text-orange-600" : ""}>
            Serviços
          </Link>
          <span>|</span>
          <Link href="/contact" className={pathname === "/contact" ? "text-orange-600" : ""}>
            Contacto
          </Link>
          <span className="text-zinc-400">|</span>
          <span
            className="text-zinc-400"
            onClick={() => {
              setIsViewMode(!isViewMode);
              setIsMenuVisible(false);
            }}
          >
            {isViewMode ? "Editar" : "Previsualizar"}
          </span>
          <span className="text-zinc-400">|</span>
          <span className="text-zinc-400">Terminar sessão</span>
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
                <Link href="/" onClick={handleMenuClose} className={pathname === "/" ? "text-orange-600" : ""}>
                  Início
                </Link>
                <Link href="/path" onClick={handleMenuClose} className={pathname === "/path" ? "text-orange-600" : ""}>
                  Percurso
                </Link>
                <Link href="/services" onClick={handleMenuClose} className={pathname === "/services" ? "text-orange-600" : ""}>
                  Serviços
                </Link>
                <Link href="/contact" onClick={handleMenuClose} className={pathname === "/contact" ? "text-orange-600" : ""}>
                  Contacto
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FHeader;
