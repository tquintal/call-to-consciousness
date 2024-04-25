import Link from "next/link";
import data from "../data/path.json";
import { Divider, SmallerTitle, SubTitle, Title } from "../components/Elements";
import { Motion } from "../components/Motion";

type ContentType = {
  pathTitle: string;
  items: {
    date?: string;
    title?: string;
    subtitle?: string;
    link?: string;
    content?: string[];
  }[];
};

export default function Path() {
  const content: ContentType[] = data;

  return (
    <div className="flex flex-col pb-8 bg-[#F3F3F3] pt-28">
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
                      {item.link && (
                        <Link href={item.link} className="font-semibold">
                          {item.subtitle}
                        </Link>
                      )}
                      {!item.link && <SmallerTitle>{item.subtitle}</SmallerTitle>}
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
      </div>
    </div>
  );
}
