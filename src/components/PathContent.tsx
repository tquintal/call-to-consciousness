"use client";

import { useViewModeContext } from "@/context/PreviewMode";
import { api } from "@/trpc/react";
import { Path, PathItem } from "@prisma/client";

import { CustomLink } from "./CustomLink";
import { Divider, SmallerTitle, SubTitle, Title } from "./Elements";
import { Motion } from "./Motion";
import { useRouter } from "next/navigation";
import { usePath } from "@/app/api/pathApi";

type PathType = Path & { items: PathItem[] };

export const PathContent = ({ content }: { content: PathType[] }) => {
  const { isViewMode } = useViewModeContext();

  if (isViewMode)
    return (
      <>
        <video playsInline controls={false} autoPlay loop muted className="w-full h-44 bg-slate-300 object-cover">
          <source src="/video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="flex flex-col gap-8 2xl:pr-52 2xl:pl-52 p-8">
          {content.map((el, i) => (
            <div key={i} className="flex flex-col gap-8">
              <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-8">
                <Motion>
                  <Title>{el.pathTitle}</Title>
                </Motion>
                <div className="xl:col-span-6">
                  {el.items.map((item, i) => (
                    <Motion key={i} className="pt-4 grid grid-flow-row xl:grid-flow-col xl:grid-cols-8 xl:pt-0">
                      <span className="xl:col-span-1 font-light">{item.date}</span>
                      <div className="xl:col-span-7">
                        <CustomLink link={item.titleLink} className="underline">
                          <SubTitle>{item.title}</SubTitle>
                        </CustomLink>
                        <CustomLink link={item.subTitleLink} className="underline">
                          <SmallerTitle>{item.subTitle}</SmallerTitle>
                        </CustomLink>
                        <span className="whitespace-pre-line">{item.content}</span>
                      </div>
                    </Motion>
                  ))}
                </div>
              </div>
              {i <= el.items.length && <Divider />}
            </div>
          ))}
        </div>
      </>
    );

  return <EditPathContent content={content} />;
};

const EditPathContent = ({ content }: { content: PathType[] }) => {
  const { addPath, updatePath, deletePath, deleteItem } = usePath();

  const addTest = {
    pathTitle: "Exemplo de Caminho",
    items: [
      {
        date: "2021-2022",
        title: "Título do Item 1",
        subTitle: "Subtítulo do Item 1",
        content: "Conteúdo do Item 1",
      },
      {
        date: "2019-2021",
        title: "Título do Item 2",
        subTitle: "Subtítulo do Item 2",
        content: "Conteúdo do Item 2",
      },
    ],
  };

  const updateTest = {
    pathTitle: "Exemplo de Caminho 2 Updated",
    items: [
      {
        date: "2021-2022",
        title: "Título do Item 3 Updated",
        subTitle: "Subtítulo do Item 3",
        content: "Conteúdo do Item 3",
      },
      {
        date: "2018-2021",
        title: "Título do Item 4 Updated",
        subTitle: "Subtítulo do Item 4",
        content: "Conteúdo do Item 4",
      },
    ],
  };

  return (
    <>
      <div className="w-full h-44 bg-slate-300" />
      <div className="flex flex-col gap-4 2xl:pr-52 2xl:pl-52 p-8">
        {content.map((el, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-10 gap-4">
              <div className="flex gap-1 xl:col-span-3">
                <button className="border p-3 h-fit bg-white border-black text-red-500" onClick={() => deletePath(el.id)}>
                  X
                </button>
                <input
                  type="text"
                  defaultValue={el.pathTitle}
                  className="font-semibold text-2xl p-2 w-full h-fit outline-none border border-black"
                />
              </div>
              <div className="xl:col-span-7 flex flex-col gap-4">
                {el.items.map((item, i) => (
                  <div key={i} className="grid gap-4 grid-flow-row xl:grid-flow-col xl:grid-cols-8">
                    <input
                      type="text"
                      defaultValue={item.date ?? ""}
                      className="xl:col-span-1 font-light h-fit p-2 outline-none border border-black"
                    />
                    <div className="xl:col-span-7 gap-4 flex flex-col">
                      <input
                        type="text"
                        defaultValue={item.title ?? ""}
                        className="h-fit w-full font-semibold text-xl p-2 outline-none border border-black"
                      />
                      <input
                        type="text"
                        defaultValue={item.subTitle ?? ""}
                        className="h-fit w-full font-semibold p-2 outline-none border border-black"
                      />
                      <textarea
                        defaultValue={item.content}
                        className="min-h-52 w-full outline-none border border-black p-2"
                      ></textarea>
                      <button className="self-end border p-3 bg-white border-black text-red-500" onClick={() => deleteItem(item.id)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <span onClick={() => updatePath(el.id, updateTest)}>guardar</span>
            {i <= el.items.length && <Divider />}
          </div>
        ))}
        <button className="self-end border p-3 bg-white border-black text-green-500" onClick={() => addPath(addTest)}>
          Criar novo
        </button>
        <button className="self-end border p-3 border-black text-green-500 bg-white fixed bottom-4 right-4 xl:bottom-8 xl:right-8 shadow-xl">
          Guardar alterações
        </button>
      </div>
    </>
  );
};
