import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-t p-8 sm:p-12 border-zinc-500 min-h-40 lg:gap-0 gap-8 flex flex-col lg:flex-row justify-between bg-[#F3F3F3]">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Telefone</span>
        <span>+351 936 262 589</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">E-mail</span>
        <a href="mailto:raiseyourvoicearoundtheworld@gmail.com" className="break-all text-pretty">
          raiseyourvoicearoundtheworld@gmail.com
        </a>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Saber mais</span>
        <a href="https://www.linkedin.com/in/susana-quintal" rel="noopener noreferrer" target="_blank">
          <FaLinkedinIn size={22} />
        </a>
      </div>
      <div className="text-xs flex flex-col gap-1">
        <span>Política de Cookies</span>
        <span>Política de Privacidade</span>
        <span>© {year} por Raise your voice</span>
      </div>
    </div>
  );
};

export default Footer;
