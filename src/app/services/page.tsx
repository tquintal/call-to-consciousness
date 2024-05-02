import Image from "next/image";

import ContactForm from "@/components/ContactForm";
import { LinkCard } from "@/components/LinkCard";
import { Portfolio, ServicesType } from "@/types/Services";

import { Divider, Layout, SmallerTitle, SubTitle, Title } from "../../components/Elements";
import { Motion } from "../../components/Motion";
import portfolioData from "../../data/portfolio.json";
import data from "../../data/services.json";
import { CustomLink } from "@/components/CustomLink";

export default function Services() {
  const content: ServicesType[] = data;
  const porfolio: Portfolio[] = portfolioData;

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Motion>
          <Title>Serviços</Title>
        </Motion>
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
              <CustomLink link={el.link}>
                <Image
                  loading="eager"
                  src={el.image}
                  alt={el.title}
                  width={400}
                  height={400}
                  className="h-72 w-full md:max-w-96 shadow-lg object-cover"
                />
              </CustomLink>
            ) : (
              <div className="w-full h-72 md:max-w-96 bg-slate-300 shadow-lg" />
            )}
          </Motion>
        ))}
        <Divider className="mt-4 mb-4" />
        <Motion>
          <span className="font-light">Ver mais:</span>
          <Title>Portfólio</Title>
        </Motion>
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
