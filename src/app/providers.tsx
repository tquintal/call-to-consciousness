"use client";

import { ReactNode } from "react";

import AuthProvider from "@/context/AuthProvider";
import { LoadingProvider } from "@/context/Loading";
import { PreviewModeProvider } from "@/context/PreviewMode";
import { TRPCReactProvider } from "@/trpc/react";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <TRPCReactProvider>
      <AuthProvider>
        <PreviewModeProvider>
          <LoadingProvider>{children}</LoadingProvider>
        </PreviewModeProvider>
      </AuthProvider>
    </TRPCReactProvider>
  );
};
