import Link from "next/link";
import data from "../../data/path.json";
import { Divider, Layout, SmallerTitle, SubTitle, Title } from "../../components/Elements";
import { Motion } from "../../components/Motion";
import { CustomLink } from "@/components/CustomLink";

type ContentType = {
  id: number;
  pathTitle: string;
  items: {
    id: number;
    date?: string;
    title?: string;
    titleLink?: string;
    subtitle?: string;
    subtitleLink?: string;
    content?: string[];
  }[];
};

export default function Path() {
  const content: ContentType[] = data;

  return (
    <div className="flex flex-col pb-8 bg-[#F3F3F3] pt-28">
      <video playsInline controls={false} autoPlay loop muted className="w-full h-44 bg-slate-300 object-cover">
        <source src="/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <Layout noPadding>
        {content.map((el, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-8">
              <Motion className="xl:col-span-2">
                <Title>{el.pathTitle}</Title>
              </Motion>
              <div className="xl:col-span-6 flex flex-col gap-4">
                {el.items.map((item, i) => (
                  <Motion key={i} className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-8 xl:pt-0">
                    <span className="xl:col-span-1 font-light">{item.date}</span>
                    <div className="xl:col-span-7">
                      <CustomLink link={item.titleLink} className="underline">
                        <SubTitle>{item.title}</SubTitle>
                      </CustomLink>
                      <CustomLink link={item.subtitleLink} className="underline">
                        <SmallerTitle>{item.subtitle}</SmallerTitle>
                      </CustomLink>
                      {item.content && (
                        <ul>
                          {item.content.map((el, i) => (
                            <li key={i}>- {el}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Motion>
                ))}
              </div>
            </div>
            {i < el.items.length && <Divider />}
          </div>
        ))}
      </Layout>
    </div>
  );
}
