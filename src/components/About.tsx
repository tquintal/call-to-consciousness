"use client";

import { api } from "@/trpc/react";
import { About as AboutType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";

export const About = ({ data }: { data: AboutType | null }) => {
  const router = useRouter();
  const [content, setContent] = useState(data);
  const [isEdit, setIsEdit] = useState(false);

  const update = api.about.update.useMutation({
    onSuccess: () => {
      setIsEdit(false);
      router.refresh();
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <BiEdit size={24} className="cursor-pointer" onClick={() => setIsEdit(!isEdit)} />
        {isEdit ? (
          <input
            type="text"
            defaultValue={data?.title}
            onChange={(e) => {
              if (content) setContent({ ...content, title: e.target.value });
            }}
            className="p-2 w-56 font-bold text-8xl outline-none border border-black"
          />
        ) : (
          <h1 className="text-8xl font-bold max-sm:w-full text-center sm:text-left">{data?.title}</h1>
        )}
        <div className="sm:h-32 sm:w-32 h-24 w-24 bg-zinc-300 rounded-full max-sm:hidden" />
      </div>
      <div className="flex flex-col gap-4">
        {isEdit ? (
          <>
            <input
              type="text"
              defaultValue={data?.subTitle}
              onChange={(e) => {
                if (content) setContent({ ...content, subTitle: e.target.value });
              }}
              className="p-2 font-semibold text-xl outline-none border border-black"
            />
            <div className="flex flex-col gap-2 pt-2">
              <textarea
                defaultValue={data?.content}
                onChange={(e) => {
                  if (content) setContent({ ...content, content: e.target.value });
                }}
                className="p-6 min-h-96 outline-none border border-black"
              />
              <button
                className="border p-3 bg-zinc-300"
                onClick={() =>
                  update.mutate({
                    title: content?.title ?? "Olá",
                    subTitle: content?.subTitle ?? "Sobre mim",
                    content: content?.content ?? "...",
                  })
                }
              >
                Guardar
              </button>
            </div>
          </>
        ) : (
          <h2 className="font-semibold text-xl -mb-4">{data?.subTitle}</h2>
        )}
        {!isEdit && <>{data?.content}</>}
      </div>
    </>
  );
};
