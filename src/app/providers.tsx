"use client";

import { ReactNode } from "react";
import { PreviewModeProvider } from "@/context/PreviewMode";
import { TRPCReactProvider } from "@/trpc/react";
import { LoadingProvider } from "@/context/Loading";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <PreviewModeProvider>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </PreviewModeProvider>
    </TRPCReactProvider>
  );
};
