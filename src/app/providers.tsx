"use client";

import { ReactNode } from "react";
import { PreviewModeProvider } from "@/context/PreviewMode";
import { TRPCReactProvider } from "@/trpc/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <PreviewModeProvider>
        {children}
      </PreviewModeProvider>
    </TRPCReactProvider>
  );
};
