"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

const motionProps = {
  initial: {
    x: 20,
  },
  whileInView: {
    x: 0,
    transition: {
      duration: 0.8,
    },
  },
  viewport: { once: true },
};

export const Motion = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div {...motionProps} className={className ?? ""}>
      {children}
    </motion.div>
  );
};
