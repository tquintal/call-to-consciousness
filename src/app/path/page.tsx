import Link from "next/link";
import data from "../data/data.json";

export default function Contact() {
  return (
    <div className="flex flex-col pb-8 bg-[#F3F3F3]">
      <div className="w-full h-44 bg-slate-300" />
      <Path content={data} />
    </div>
  );
}

type ContentType = {
  pathTitle: string;
  items: {
    date?: string;
    title?: string;
    subtitle?: string;
    link?: string;
    content: string[];
  }[];
};

const Path = ({ content }: { content: ContentType[] }) => {
  return (
    <div className="flex flex-col gap-8 2xl:pr-52 2xl:pl-52 p-8">
      {content.map((el, i) => (
        <div key={i} className="flex flex-col gap-8">
          <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-8">
            <h1 className="font-semibold text-2xl xl:col-span-2">{el.pathTitle}</h1>
            <div className="xl:col-span-6">
              {el.items.map((item, i) => (
                <div key={i} className="pt-4 grid grid-flow-row xl:grid-flow-col xl:grid-cols-8 xl:pt-0">
                  <span className="xl:col-span-1 font-light">{item.date}</span>
                  <div className="xl:col-span-7">
                    <h2 className="font-semibold text-xl">{item.title}</h2>
                    {item.link && (
                      <Link href={item.link} className="font-semibold">
                        {item.subtitle}
                      </Link>
                    )}
                    {!item.link && <h3 className="font-semibold">{item.subtitle}</h3>}
                    {item.content && (
                      <ul>
                        {item.content.map((el, i) => (
                          <li key={i}>- {el}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {i < el.items.length && <div className="border border-b-0 border-zinc-400 w-full" />}
        </div>
      ))}
    </div>
  );
};
