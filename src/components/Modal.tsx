import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "./Elements";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 lg:p-44"
    >
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <motion.div
        style={{ maxWidth: "1920px" }}
        className="relative bg-white shadow-lg p-10 z-10 border border-black max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button className="absolute top-4 right-4 text-2xl transition-all text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onConfirm: () => void;
};

export const ConfirmationModal = ({ isOpen, onClose, text, onConfirm }: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <span className="font-semibold">Tens a certeza?</span>
        <span>{text}</span>
        <div className="flex gap-2 mt-2 justify-end">
          <Button props={{ type: "button", className: "text-red-500 shadow-md max-sm:w-full", onClick: onClose }}>Não</Button>
          <Button props={{ type: "button", className: "text-green-500 shadow-md max-sm:w-full", onClick: onConfirm }}>Sim</Button>
        </div>
      </div>
    </Modal>
  );
};
