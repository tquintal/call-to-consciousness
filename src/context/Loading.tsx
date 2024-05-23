import { ReactNode, createContext, useContext, useState } from "react";

export type LoadingType = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
};

const LoadingContext = createContext<LoadingType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const previewProvider = useLoadingProvider();
  return <LoadingContext.Provider value={previewProvider}>{children}</LoadingContext.Provider>;
};

function useLoadingProvider() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return {
    isLoading,
    setIsLoading,
  };
}

export const useLoadingContext = () => {
  return useContext(LoadingContext) as LoadingType;
};
