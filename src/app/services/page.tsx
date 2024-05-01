import { Divider, Layout, SmallerTitle, SubTitle, Title } from "../../components/Elements";
import data from "../../data/services.json";
import { Motion } from "../../components/Motion";
import ContactForm from "@/components/ContactForm";

type ServicesType = {
  title: string;
  description?: string;
  content: string[];
};

export default function Services() {
  const content: ServicesType[] = data;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Title>Serviços</Title>
        {content.map((el, i) => (
          <Motion key={i} className="flex flex-col gap-4 lg:flex-row justify-between">
            <div>
              <SubTitle>{el.title}</SubTitle>
              <SmallerTitle>{el.description}</SmallerTitle>
              {el.content.map((el, i) => (
                <ul key={i}>
                  <li>- {el}</li>
                </ul>
              ))}
            </div>
            <div className="h-72 w-full md:max-w-96 bg-slate-300" />
          </Motion>
        ))}
        <Divider className="mt-4 mb-4" />
        <div>
          <span className="font-light">Ver mais:</span>
          <Title>Portfólio</Title>
        </div>
        <Motion className="flex flex-wrap gap-4 justify-between">
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
          <LinkCard link="https://google.com/" description="Hello world" />
        </Motion>
        <Divider className="mt-4 mb-4" />
        <Motion className="flex flex-col gap-4 w-full lg:items-center">
          <ContactForm />
        </Motion>
      </div>
    </Layout>
  );
}

const LinkCard = ({ link, description }: { link: string; description?: string }) => {
  return (
    <a
      href={link}
      rel="noopener noreferrer"
      target="_blank"
      className="h-72 w-96 group transition duration-300 bg-slate-300 hover:bg-slate-400 flex items-center justify-center text-white font-semibold text-lg"
    >
      <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">{description && description}</span>
    </a>
  );
};
