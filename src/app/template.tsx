"use client";

import "react-toastify/dist/ReactToastify.css";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

import Loading from "@/components/Loading";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  const key = usePathname();
  const paths = ["/", "/path", "/services", "/contact"];
  const is404 = !paths.find((el) => el === key);

  if (is404) return <>{children}</>;

  return (
    <>
      <div className="relative">
        <Header />
        <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.8 }}>
          <main>
            <Loading>{children}</Loading>
          </main>
        </motion.div>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
