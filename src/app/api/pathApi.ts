import { useRouter } from "next/navigation";

import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { PathFormSchemaType } from "@/types/Path";

export const usePath = () => {
  const router = useRouter();
  const { setIsViewMode } = useViewModeContext();

  // const getPaths = api.path.get.useQuery();
  const updatePath = api.path.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsViewMode(true);
    },
  });

  const handleUpdatePath = async (path: PathFormSchemaType) => {
    try {
      await updatePath.mutateAsync(path);
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
