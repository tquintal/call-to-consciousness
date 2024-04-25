"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Template({ children }: { children: React.ReactNode }) {
  const paths = ["/", "/path", "/services", "/contact"];
  const key = usePathname();
  const is404 = !paths.find((el) => el === key);

  if (is404) return <>{children}</>;

  return (
    <div className="relative">
      <Header />
      <motion.div key={key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: "easeInOut", duration: 0.8 }}>
        <main>{children}</main>
      </motion.div>
      <Footer />
    </div>
  );
}
