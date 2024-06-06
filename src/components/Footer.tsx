"use client";

import { useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";

import { Modal } from "./Modal";
import { CookiesPolicy, PrivacyPolicy } from "./PrivacyCookiesPolicy";

const Footer = () => {
  const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <>
      <div className="border-t p-8 sm:p-12 border-zinc-500 bg-[#F3F3F3] flex flex-col items-center">
        <div
          style={{ maxWidth: "1920px" }}
          className="lg:gap-0 gap-8 flex flex-col lg:flex-row justify-between lg:items-center w-full"
        >
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Telefone</span>
            <span>+351 936 262 589</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">E-mail</span>
            <a href="mailto:call.to.consciousness@gmail.com" className="break-all text-pretty">
              call.to.consciousness@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Saber mais</span>
            <a href="https://www.linkedin.com/in/susana-quintal" rel="noopener noreferrer" target="_blank">
              <FaLinkedinIn size={22} />
            </a>
          </div>
          <div className="text-xs flex flex-col gap-1">
            <span onClick={() => setIsCookiesModalOpen(true)} className="cursor-pointer">
              Política de Cookies
            </span>
            <span onClick={() => setIsPrivacyModalOpen(true)} className="cursor-pointer">
              Política de Privacidade
            </span>
            <a href="https://github.com/tquintal" rel="noopener noreferrer" target="_blank">
              © {year} por call to consciousness
            </a>
          </div>
        </div>
      </div>
      <Modal isOpen={isCookiesModalOpen} onClose={() => setIsCookiesModalOpen(false)}>
        <CookiesPolicy />
      </Modal>
      <Modal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)}>
        <PrivacyPolicy />
      </Modal>
    </>
  );
};

export default Footer;
