import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

type PathItem = {
  date: string | null;
  title: string | null;
  subTitle: string | null;
  content: string;
};

type PathSchema = {
  pathTitle: string;
  items: PathItem[];
};

export const usePath = () => {
  const router = useRouter();

  const add = api.path.add.useMutation({ onSuccess: () => router.refresh() });
  const updatePath = api.path.update.useMutation({ onSuccess: () => router.refresh() });
  const deletePath = api.path.delete.useMutation({ onSuccess: () => router.refresh() });
  const deletePathItem = api.path.deletePathItem.useMutation({ onSuccess: () => router.refresh() });

  const handleAddPath = async (path: PathSchema) => {
    try {
      await add.mutateAsync(path);
    } catch (error) {
      console.error("Failed to add path:", error);
      throw new Error(`Failed to add path: ${error}`);
    }
  };

  const handleUpdatePath = async (id: number, path: PathSchema) => {
    try {
      await updatePath.mutateAsync({ id, data: path });
    } catch (error) {
      console.error("Failed to update path:", error);
      throw new Error(`Failed to update path: ${error}`);
    }
  };

  const handleDeletePath = async (id: number) => {
    try {
      await deletePath.mutateAsync({ id });
    } catch (error) {
      console.error("Failed to delete path:", error);
      throw new Error(`Failed to delete path: ${error}`);
    }
  };

  const handleDeletePathItem = async (id: number) => {
    try {
      await deletePathItem.mutateAsync({ id });
    } catch (error) {
      console.error("Failed to delete path item:", error);
      throw new Error(`Failed to delete path item: ${error}`);
    }
  };

  return {
    addPath: handleAddPath,
    updatePath: handleUpdatePath,
    deletePath: handleDeletePath,
    deleteItem: handleDeletePathItem,
  };
};
