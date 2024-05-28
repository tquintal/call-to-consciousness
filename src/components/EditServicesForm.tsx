"use client";

import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

import { useServices } from "@/app/api/servicesApi";
import { useViewModeContext } from "@/context/PreviewMode";
import { PortfolioType, ServiceType } from "@/types/Services";
import { processImage } from "@/utils/utils";

import { Button, Divider, Input, Layout, TextArea, Title } from "./Elements";

type ServiceFormSchemaType = {
  services: ServiceType[];
};

type PortfolioFormSchemaType = {
  portfolios: PortfolioType[];
};

const EditServices = ({ services, portfolio }: { services: ServiceType[]; portfolio: PortfolioType[] }) => {
  const { setIsViewMode } = useViewModeContext();
  const { updateServices } = useServices();
  const { control, handleSubmit, register } = useForm<ServiceFormSchemaType & PortfolioFormSchemaType>({
    defaultValues: {
      services: services,
      portfolios: portfolio,
    },
  });

  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: portfolioFields,
    append: appendPortfolio,
    remove: removePortfolio,
  } = useFieldArray({
    control,
    name: "portfolios",
  });

  async function onSubmit(data: ServiceFormSchemaType & PortfolioFormSchemaType) {
    try {
      const updatedServices = await Promise.all(
        data.services.map(async (el) => {
          const result = await processImage(el.image);
          return {
            ...el,
            image: result,
          };
        })
      );

      const updatedPortfolio = await Promise.all(
        data.portfolios.map(async (el) => {
          const result = await processImage(el.image);
          return {
            ...el,
            image: result,
          };
        })
      );

      const result = {
        services: [...updatedServices],
        portfolios: [...updatedPortfolio],
      };

      updateServices(result);
    } catch (error) {
      console.error("Error updating services and portfolio:", error);
    }
  }

  return (
    <Layout>
      <Title>Serviços</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {serviceFields.map((service, index) => (
          <div key={service.id} className="flex flex-col gap-4">
            <div className="flex flex-col sm:justify-between sm:flex-row gap-4">
              <div className="flex flex-col gap-4 sm:min-w-96">
                <Input type="text" placeholder="Título" {...register(`services.${index}.title` as const)} required />
                <Input type="text" placeholder="Subtítulo" {...register(`services.${index}.subTitle` as const)} />
                <TextArea placeholder="Conteúdo" {...register(`services.${index}.content` as const)} required />
                <Input placeholder="Link" {...register(`services.${index}.link` as const)} className="text-blue-600" />
                <Input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  {...register(`services.${index}.image` as const)}
                  required={!!!service.image}
                />
              </div>
              {service.image && (
                <Image
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  width={0}
                  height={0}
                  className="h-72 w-full sm:w-96 shadow-lg object-cover"
                />
              )}
              {!service.image && <div className="h-72 w-full bg-slate-200 md:max-w-96 shadow-lg object-cover" />}
            </div>
            <div className="flex gap-2 justify-end sm:justify-start">
              {serviceFields.length > 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => removeService(index),
                    className: "text-red-500",
                  }}
                >
                  <IoTrashBinOutline />
                </Button>
              )}
              {index === serviceFields.length - 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => appendService({ title: "", subTitle: "", content: "", link: "", image: "" }),
                    className: "text-green-500",
                  }}
                >
                  <IoAddOutline />
                </Button>
              )}
            </div>
            {index + 1 < serviceFields.length && <Divider />}
          </div>
        ))}
        <Divider />
        <Title>Portfólio</Title>
        {portfolioFields.map((portfolio, index) => (
          <div key={portfolio.id} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {portfolio.image && (
                <Image
                  src={portfolio.image}
                  alt={portfolio.title}
                  loading="lazy"
                  width={0}
                  height={0}
                  className="h-72 w-full sm:w-96 shadow-lg object-cover"
                />
              )}
              {!portfolio.image && <div className="h-72 w-full bg-slate-200 md:max-w-96 shadow-lg object-cover" />}
              <div className="flex flex-col gap-4 sm:min-w-96">
                <Input type="text" placeholder="Título" {...register(`portfolios.${index}.title` as const)} required />
                <Input type="text" placeholder="Link" {...register(`portfolios.${index}.link` as const)} className="text-blue-600" />
                <Input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  {...register(`portfolios.${index}.image` as const)}
                  required={!!!portfolio.image}
                />
                <div className="flex gap-2 justify-end sm:justify-start"></div>
              </div>
            </div>
            <div className="flex gap-2 justify-end sm:justify-start">
              {portfolioFields.length > 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => removePortfolio(index),
                    className: "text-red-500",
                  }}
                >
                  <IoTrashBinOutline />
                </Button>
              )}
              {index === portfolioFields.length - 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => appendPortfolio({ title: "", link: "", image: "" }),
                    className: "text-green-500",
                  }}
                >
                  <IoAddOutline />
                </Button>
              )}
            </div>
            {index < portfolioFields.length && <Divider />}
          </div>
        ))}
        <div className="flex justify-between max-sm:border-t max-sm:border-black max-sm:p-3 sm:justify-end gap-2 max-sm:bg-white w-full max-sm:left-0 fixed bottom-0 sm:bottom-10 sm:right-10">
          <Button props={{ type: "button", className: "text-red-500 shadow-md max-sm:w-full", onClick: () => setIsViewMode(true) }}>
            Cancelar
          </Button>
          <Button props={{ type: "submit", className: "text-green-500 shadow-md max-sm:w-full" }}>Guardar alterações</Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditServices;
