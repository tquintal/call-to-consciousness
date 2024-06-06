import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useLoadingContext } from "@/context/Loading";
import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { PathFormSchemaType } from "@/types/Path";

export const usePath = () => {
  const router = useRouter();
  const { setIsViewMode } = useViewModeContext();
  const { setIsLoading } = useLoadingContext();

  const updatePath = api.path.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsViewMode(true);
      setIsLoading(false);
      toast.success("Alterações efetuadas com sucesso!");
    },
    onError: (error) => {
      setIsLoading(false);
      if (error.message === "UNAUTHORIZED") {
        toast.error("Sem sessão iniciada.");
        return;
      }
      toast.error("Erro, verifica todos os campos.");
    },
  });

  const handleUpdatePath = async (path: PathFormSchemaType) => {
    setIsLoading(true);
    try {
      await updatePath.mutateAsync(path);
    } catch (error) {
      console.error("Failed to update path:", error);
      throw new Error(`Failed to update path: ${error}`);
    }
  };

  return {
    updatePath: handleUpdatePath,
  };
};
