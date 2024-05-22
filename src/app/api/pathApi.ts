import { api } from "@/trpc/react";
import { PathFormSchemaType } from "@/types/Path";
import { useRouter } from "next/navigation";

export const usePath = () => {
  const router = useRouter();

  // const getPaths = api.path.get.useQuery();
  const updatePath = api.path.update.useMutation({ onSuccess: () => router.refresh() });

  const handleUpdatePath = async (path: PathFormSchemaType) => {
    try {
      console.clear();
      console.log(path);
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
