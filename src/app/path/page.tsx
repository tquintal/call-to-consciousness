import { PathContent } from "@/components/PathContent";
import { api } from "@/trpc/server";

export default async function Path() {
  const content = await api.path.get();

  return (
    <div className="flex flex-col pb-8 bg-[#F3F3F3] pt-28">
      <PathContent content={content} />
    </div>
  );
}
