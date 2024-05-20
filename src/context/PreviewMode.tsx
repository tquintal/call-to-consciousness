import { ReactNode, createContext, useContext, useState } from "react";

export type ViewModeType = {
  isViewMode: boolean;
  setIsViewMode: (val: boolean) => void;
};

const ViewModeContext = createContext<ViewModeType | undefined>(undefined);

export const PreviewModeProvider = ({ children }: { children: ReactNode }) => {
  const previewProvider = usePreviewProvider();
  return <ViewModeContext.Provider value={previewProvider}>{children}</ViewModeContext.Provider>;
};

function usePreviewProvider() {
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  return {
    isViewMode,
    setIsViewMode,
  };
}

export const useViewModeContext = () => {
  return useContext(ViewModeContext) as ViewModeType;
};
