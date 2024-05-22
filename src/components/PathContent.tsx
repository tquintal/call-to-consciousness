"use client";

import { useViewModeContext } from "@/context/PreviewMode";
import { PathSchemaType } from "@/types/Path";

import { CustomLink } from "./CustomLink";
import { EditPathContent } from "./EditPathContent";
import { Divider, SmallerTitle, SubTitle, Title } from "./Elements";
import { Motion } from "./Motion";

export const PathContent = ({ content }: { content: PathSchemaType[] }) => {
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
              {i + 1 < el.items.length && <Divider />}
            </div>
          ))}
        </div>
      </>
    );

  return <EditPathContent data={content} />;
};
