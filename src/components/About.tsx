"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useLoadingContext } from "@/context/Loading";
import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { About as AboutType } from "@prisma/client";

import avatar from "../../public/avatar.jpg";
import { toast } from "react-toastify";

export const About = ({ data }: { data: AboutType | null }) => {
  const router = useRouter();
  const [content, setContent] = useState(data);
  const { isViewMode, setIsViewMode } = useViewModeContext();
  const { setIsLoading } = useLoadingContext();

  const update = api.about.update.useMutation({
    onSuccess: () => {
      router.refresh();
      setIsViewMode(true);
      setIsLoading(false);
      toast.success("Alterações efetuadas com sucesso!");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Erro.");
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        {!isViewMode ? (
          <input
            type="text"
            defaultValue={data?.title}
            onChange={(e) => {
              if (content) setContent({ ...content, title: e.target.value });
            }}
            className="p-2 w-52 font-bold text-8xl outline-none border border-black"
          />
        ) : (
          <h1 className="text-8xl font-bold">{data?.title}</h1>
        )}
        <Image
          src={avatar}
          alt="Avatar"
          loading="eager"
          className="sm:h-32 sm:w-32 h-24 w-24 rounded-full max-sm:hidden object-cover bg-zinc-300"
        />
      </div>
      <div className="flex flex-col gap-4">
        {!isViewMode ? (
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
                className="p-6 h-[485px] outline-none border border-black"
              />
              <div className="flex flex-col sm:flex-row gap-2">
                <button onClick={() => setIsViewMode(true)} className="w-full border border-black p-3 bg-white text-red-500">
                  Cancelar
                </button>
                <button
                  className="border border-black w-full p-3 bg-white text-green-500"
                  onClick={() => {
                    setIsLoading(true);
                    update.mutate({
                      title: content?.title ?? "Olá",
                      subTitle: content?.subTitle ?? "Sobre mim",
                      content: content?.content ?? "...",
                    });
                  }}
                >
                  Guardar alterações
                </button>
              </div>
            </div>
          </>
        ) : (
          <h2 className="font-semibold text-xl -mb-4">{data?.subTitle}</h2>
        )}
        {isViewMode && <span className="whitespace-pre-line">{data?.content}</span>}
      </div>
    </>
  );
};
