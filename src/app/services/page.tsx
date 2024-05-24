import Image from "next/image";

import ContactForm from "@/components/ContactForm";
import { LinkCard } from "@/components/LinkCard";

import { Divider, Layout, SmallerTitle, SubTitle, Title } from "../../components/Elements";
import { Motion } from "../../components/Motion";
import portfolioData from "../../data/portfolio.json";
import data from "../../data/services.json";
import { CustomLink } from "@/components/CustomLink";
import { useViewModeContext } from "@/context/PreviewMode";
import EditServices from "@/components/EditServicesForm";
import { api } from "@/trpc/server";
import ServicesContent from "@/components/ServicesContent";

export default async function Services() {
  const services = await api.services.getServices();
  const portfolio = await api.services.getPortfolio();

  return <ServicesContent services={services} portfolio={portfolio} />;
}
