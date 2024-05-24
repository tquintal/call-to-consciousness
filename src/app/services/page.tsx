import ServicesContent from "@/components/ServicesContent";
import { api } from "@/trpc/server";

export default async function Services() {
  const services = await api.services.getServices();
  const portfolio = await api.services.getPortfolio();

  return <ServicesContent services={services} portfolio={portfolio} />;
}
