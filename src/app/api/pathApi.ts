import { useRouter } from "next/navigation";

import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { PathFormSchemaType } from "@/types/Path";
import { useLoadingContext } from "@/context/Loading";

import { toast } from "react-toastify";

export const usePath = () => {
  const router = useRouter();
  const { setIsViewMode } = useViewModeContext();
  const { setIsLoading } = useLoadingContext();
  const notify = () => toast.success("Wow so easy!");

  // const getPaths = api.path.get.useQuery();
  const updatePath = api.path.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsViewMode(true);
      setIsLoading(false);
      toast.success("Alterações feitas com sucesso!");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error("Erro, verifica todos os campos.");
    },
  });

  const handleUpdatePath = async (path: PathFormSchemaType) => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        updatePath.mutateAsync(path);
      }, 2000); // ! TEMP
      // await updatePath.mutateAsync(path);
    } catch (error) {
      console.error("Failed to update path:", error);
      throw new Error(`Failed to update path: ${error}`);
    }
  };

  return {
    // getPaths: getPaths,
    updatePath: handleUpdatePath,
  };
};
