import { motion } from "framer-motion";
import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 lg:p-44">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <motion.div
        style={{ maxWidth: "1920px" }}
        className="relative bg-white shadow-lg p-10 z-10 border border-black max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <button className="absolute top-4 right-4 text-2xl transition-all text-gray-500 hover:text-gray-700" onClick={onClose}>
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
