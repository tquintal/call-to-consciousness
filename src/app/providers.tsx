"use client";

import { AppProps } from "next/app";
import { ReactNode } from "react";
import AuthProvider from "@/context/AuthProvider";
import { LoadingProvider } from "@/context/Loading";
import { PreviewModeProvider } from "@/context/PreviewMode";
import { TRPCReactProvider } from "@/trpc/react";

export const Providers = ({ children, pageProps }: { children: ReactNode; pageProps: AppProps }) => {
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
