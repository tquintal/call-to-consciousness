import { useLoadingContext } from "@/context/Loading";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Loading = ({ children }: Props) => {
  const { isLoading } = useLoadingContext();
  if (!isLoading) return <>{children}</>;

  return (
    <>
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-4 lg:p-44"
      >
        <div className="fixed inset-0 bg-black opacity-50" />
        <div className="flex space-x-2 animate-bounce">
          <div className="w-3 h-3 bg-white rounded-full" />
          <div className="w-3 h-3 bg-white rounded-full" />
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      </motion.div>
    </>
  );
};

export default Loading;
