"use client";

import { useViewModeContext } from "@/context/PreviewMode";
import ContactForm from "./ContactForm";
import { CustomLink } from "./CustomLink";
import EditServices from "./EditServicesForm";
import { Layout, Title, SubTitle, SmallerTitle, Divider } from "./Elements";
import { LinkCard } from "./LinkCard";
import { Motion } from "./Motion";
import Image from "next/image";
import { PortfolioType, ServiceType } from "@/types/Services";

const ServicesContent = ({ services, portfolio }: { services: ServiceType[]; portfolio: PortfolioType[] }) => {
  const { isViewMode } = useViewModeContext();
  if (isViewMode)
    return (
      <Layout>
        <div className="flex flex-col gap-4">
          <Motion>
            <Title>Serviços</Title>
          </Motion>
          {services.map((el, i) => (
            <Motion key={i} className="flex flex-col gap-4 lg:flex-row justify-between">
              <div>
                <SubTitle>{el.title}</SubTitle>
                <SmallerTitle>{el.subTitle}</SmallerTitle>
                <span className="whitespace-pre-line">{el.content}</span>
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
            {portfolio.map((el, i) => (
              <LinkCard key={i} src={el.image} description={el.title} link={el.link} />
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

  return <EditServices services={services} portfolio={portfolio} />;
};

export default ServicesContent;
