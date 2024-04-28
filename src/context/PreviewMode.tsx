import { ReactNode, createContext, useContext, useState } from "react";

export type PreviewModeType = {
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
};

const PreviewModeContext = createContext<PreviewModeType | undefined>(undefined);

export const PreviewModeProvider = ({ children }: { children: ReactNode }) => {
  const previewProvider = usePreviewProvider();
  return <PreviewModeContext.Provider value={previewProvider}>{children}</PreviewModeContext.Provider>;
};

function usePreviewProvider() {
  const [previewMode, setPreviewMode] = useState<boolean>(true);

  return {
    previewMode,
    setPreviewMode,
  };
}

export const usePreviewModeContext = () => {
  return useContext(PreviewModeContext) as PreviewModeType;
};
