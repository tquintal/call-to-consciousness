"use client";

import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

import { Button, Divider, Input, Layout, TextArea, Title } from "./Elements";
import { useState } from "react";
import { PortfolioType, ServiceType } from "@/types/Services";
import { fileToBase64 } from "@/utils/utils";

type ServiceFormSchemaType = {
  services: ServiceType[];
};

type PortfolioFormSchemaType = {
  portfolios: PortfolioType[];
};

const EditServices = ({ services, portfolio }: { services: ServiceType[]; portfolio: PortfolioType[] }) => {
  // ! TER A CERTEZA QUE services E portfolio CHEGAM
  const [servicesImages, setServicesImages] = useState<string[]>(services.map((el) => el.image));
  const [portfolioImages, setPortfolioImages] = useState<string[]>(portfolio.map((el) => el.image));

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

  const onSubmit = async (data: ServiceFormSchemaType & PortfolioFormSchemaType) => {
    console.log(data);
    console.log(servicesImages, portfolioImages);
  };

  const handleFileChange = async ({ e, forServices }: { e: React.ChangeEvent<HTMLInputElement>; forServices?: boolean }) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(`O ficheiro é demasiado grande. Por favor, seleciona um ficheiro menor que ${2}MB.`);
        e.target.value = "";
        return;
      }
      const image = await fileToBase64(e.target.files || new FileList());
      if (forServices) {
        setServicesImages((prev) => (prev ? [...prev, image] : [image]));
      } else {
        setPortfolioImages((prev) => (prev ? [...prev, image] : [image]));
      }
    }
  };

  return (
    <Layout>
      <Title>Serviços</Title>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {serviceFields.map((service, index) => (
          <div key={service.id} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col gap-4 sm:min-w-96">
                <Input type="text" placeholder="Título" {...register(`services.${index}.title` as const)} required />
                <Input type="text" placeholder="Subtítulo" {...register(`services.${index}.subTitle` as const)} />
                <TextArea placeholder="Conteúdo" {...register(`services.${index}.content` as const)} required />
                <Input placeholder="Link" {...register(`services.${index}.link` as const)} className="text-blue-600" />
                <Input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  {...register(`services.${index}.image` as const)}
                  onChange={(e) => handleFileChange({ e, forServices: true })}
                />
              </div>
              {servicesImages && servicesImages[index] && (
                <Image
                  src={servicesImages[index]}
                  alt={service.title}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="h-72 w-full md:max-w-96 shadow-lg object-cover"
                />
              )}
            </div>
            <div className="flex gap-2 justify-end sm:justify-start">
              {serviceFields.length > 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => {
                      removeService(index);
                      setServicesImages((prev) => prev?.filter((_, i) => i !== index));
                    },
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
              {portfolioImages && portfolioImages[index] && (
                <Image
                  src={portfolioImages[index]}
                  alt={portfolio.title}
                  loading="lazy"
                  width={400}
                  height={400}
                  className="h-72 w-full md:max-w-96 shadow-lg object-cover"
                />
              )}
              <div className="flex flex-col gap-4 sm:min-w-96">
                <Input type="text" placeholder="Título" {...register(`portfolios.${index}.title` as const)} />
                <Input type="text" placeholder="Link" {...register(`portfolios.${index}.link` as const)} className="text-blue-600" />
                <Input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  {...register(`portfolios.${index}.image` as const)}
                  onChange={(e) => handleFileChange({ e })}
                />
                <div className="flex gap-2 justify-end sm:justify-start"></div>
              </div>
            </div>
            <div className="flex gap-2 justify-end sm:justify-start">
              {portfolioFields.length > 1 && (
                <Button
                  props={{
                    type: "button",
                    onClick: () => {
                      removePortfolio(index);
                      setPortfolioImages((prev) => prev?.filter((_, i) => i !== index));
                    },
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
        <div className="flex justify-end gap-2">
          <Button props={{ type: "button", className: "text-red-500" }}>Cancelar</Button>
          <Button props={{ type: "submit", className: "text-green-500" }}>Guardar alterações</Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditServices;
