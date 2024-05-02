import { Divider, Layout, SmallerTitle, SubTitle, Title } from "../../components/Elements";
import data from "../../data/services.json";
import portfolioData from "../../data/portfolio.json";
import { Motion } from "../../components/Motion";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Link from "next/link";

type ServicesType = {
  title: string;
  description?: string;
  content: string[];
  image?: string;
};

type Portfolio = {
  src: string;
  description: string;
  link?: string;
};

export default function Services() {
  const content: ServicesType[] = data;
  const porfolio: Portfolio[] = portfolioData;

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
            {el.image ? (
              <Image
                loading="eager"
                src={el.image}
                alt={el.title}
                width={400}
                height={400}
                className="h-72 w-full md:max-w-96 shadow-lg object-cover"
              />
            ) : (
              <div className="w-full h-72 md:max-w-96 bg-slate-300 shadow-lg" />
            )}
          </Motion>
        ))}
        <Divider className="mt-4 mb-4" />
        <div>
          <span className="font-light">Ver mais:</span>
          <Title>Portfólio</Title>
        </div>
        <Motion className="flex flex-wrap gap-4 justify-between items-center">
          {porfolio.map((el, i) => (
            <LinkCard key={i} src={el.src} description={el.description} link={el.link} />
          ))}
        </Motion>
        <Divider className="mt-4 mb-4" />
        <Motion className="flex flex-col gap-4 w-full lg:items-center">
          <div className="flex flex-col sm:items-center">
            <Title>Orçamentos e dúvidas</Title>
            <span>Por favor insira os seus dados e mensagem</span>
          </div>
          <ContactForm />
        </Motion>
      </div>
    </Layout>
  );
}

const LinkCard = ({ src, description, link }: Portfolio) => {
  return (
    <a href={link ?? "#"} rel="noopener noreferrer" target="_blank" className="flex flex-col gap-2">
      <div className="relative group h-fit cursor-pointer shadow-lg">
        <Image
          src={src}
          alt={description}
          width={350}
          height={350}
          className="w-96 object-contain transition-all duration-300 group-hover:brightness-50"
        />
        <div className="absolute inset-0 bg-black p-6 bg-opacity-20 transition-all flex items-center justify-center opacity-0 duration-300 group-hover:opacity-100">
          <span className="text-white text-lg font-bold">{description}</span>
        </div>
      </div>
      <span className="md:hidden font-semibold">{description}</span>
    </a>
  );
};
