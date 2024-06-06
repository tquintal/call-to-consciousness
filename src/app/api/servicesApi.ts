import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useLoadingContext } from "@/context/Loading";
import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { ServicesPortfolioFormType } from "@/types/Services";

export const useServices = () => {
  const router = useRouter();
  const { setIsViewMode } = useViewModeContext();
  const { setIsLoading } = useLoadingContext();

  const updateServices = api.services.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsViewMode(true);
      setIsLoading(false);
      toast.success("Alterações efetuadas com sucesso!");
    },
    onError: (error) => {
      setIsLoading(false);
      console.clear();
      console.log(error.message);
      if (error.message === "UNAUTHORIZED") {
        toast.error("Sem sessão iniciada.");
        return;
      }
      toast.error("Erro, verifica todos os campos.");
    },
  });

  const handleUpdateServices = async (services: ServicesPortfolioFormType) => {
    setIsLoading(true);
    try {
      await updateServices.mutateAsync(services);
    } catch (error) {
      console.error("Failed to update services/portfolio:", error);
      throw new Error(`Failed to update services/portfolio: ${error}`);
    }
  };

  return {
    updateServices: handleUpdateServices,
  };
};
