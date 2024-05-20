"use client";

import Link from "next/link";

import { usePreviewModeContext } from "@/context/PreviewMode";
import { PathItem } from "@prisma/client";

import { Divider, SmallerTitle, SubTitle, Title } from "./Elements";
import { Motion } from "./Motion";

type PathType = {
  id: number;
  pathTitle: string;
  items: PathItem[];
}[];

export const PathContent = ({ content }: { content: PathType }) => {
  const { previewMode, setPreviewMode } = usePreviewModeContext();

  if (previewMode)
    return (
      <>
        <div className="w-full h-44 bg-slate-300" />
        <div className="flex flex-col gap-8 2xl:pr-52 2xl:pl-52 p-8">
          {content.map((el, i) => (
            <div key={i} className="flex flex-col gap-8">
              <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-8">
                <Title>{el.pathTitle}</Title>
                <div className="xl:col-span-6">
                  {el.items.map((item, i) => (
                    <Motion key={i} className="pt-4 grid grid-flow-row xl:grid-flow-col xl:grid-cols-8 xl:pt-0">
                      <span className="xl:col-span-1 font-light">{item.date}</span>
                      <div className="xl:col-span-7">
                        <SubTitle>{item.title}</SubTitle>
                        {item.subTitleLink && <Link href={item.subTitleLink} className="font-semibold" />}
                        {!item.subTitleLink && <SmallerTitle>{item.subTitle}</SmallerTitle>}
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

  if (!previewMode) return <EditPathContent content={content} />;
};

const EditPathContent = ({ content }: { content: PathType }) => {
  // const router = useRouter();

  return (
    <>
      <div className="w-full h-44 bg-slate-300" />
      <div className="flex flex-col gap-4 2xl:pr-52 2xl:pl-52 p-8">
        {content.map((el, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-10 gap-4">
              <div className="flex gap-1 xl:col-span-3">
                <button className="border p-3 h-fit bg-white border-black text-red-500">X</button>
                <input
                  type="text"
                  defaultValue={el.pathTitle}
                  className="font-semibold text-2xl p-2 w-full h-fit outline-none border border-black"
                />
              </div>
              <div className="xl:col-span-7 flex flex-col gap-4">
                {el.items.map((item, i) => (
                  <Motion key={i} className="grid gap-4 grid-flow-row xl:grid-flow-col xl:grid-cols-8">
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
                      <button className="self-end border p-3 bg-white border-black text-red-500">Eliminar</button>
                    </div>
                  </Motion>
                ))}
              </div>
            </div>
            {i <= el.items.length && <Divider />}
          </div>
        ))}
        <button className="self-end border p-3 border-black text-green-500 bg-white fixed bottom-4 right-4 xl:bottom-8 xl:right-8 shadow-xl">
          Guardar alterações
        </button>
      </div>
    </>
  );
};