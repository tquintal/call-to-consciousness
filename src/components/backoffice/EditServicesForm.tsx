"use client";

import Image from "next/image";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

import { useServices } from "@/app/api/servicesApi";
import { useViewModeContext } from "@/context/PreviewMode";
import { PortfolioType, ServiceType } from "@/types/Services";
import { processImage } from "@/utils/utils";

import { Button, Divider, Input, Layout, TextArea, Title } from "../Elements";
import { toast } from "react-toastify";
import { useState } from "react";
import { ConfirmationModal } from "../Modal";

type ServiceFormSchemaType = {
  services: ServiceType[];
};

type PortfolioFormSchemaType = {
  portfolios: PortfolioType[];
};

const EditServices = ({ services, portfolio }: { services: ServiceType[]; portfolio: PortfolioType[] }) => {
  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);
  const { setIsViewMode } = useViewModeContext();
  const { updateServices } = useServices();
  const { control, handleSubmit, register, getValues } = useForm<ServiceFormSchemaType & PortfolioFormSchemaType>({
    defaultValues: {
      services: services,
      portfolios: portfolio,
    },
  });

  const {
    fields: serviceFields,
    update: updateServiceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({
    control,
    name: "services",
  });

  const {
    fields: portfolioFields,
    update: updatePortfolioFields,
    append: appendPortfolio,
    remove: removePortfolio,
  } = useFieldArray({
    control,
    name: "portfolios",
  });

  const handleImageUpload = async (files: FileList, index: number, e: React.ChangeEvent<HTMLInputElement>, isServices?: boolean) => {
    const MAX_IMAGE_SIZE_MB = 1;
    const imgSizeMB = files![0].size / 1024 / 1024;

    if (imgSizeMB > MAX_IMAGE_SIZE_MB) {
      toast.error(`Erro, a imagem excede o tamanho máximo permitido (${MAX_IMAGE_SIZE_MB}mb).`);
      e.target.value = "";
      return;
    } else {
      try {
        const processedImage = await processImage(files);

        if (isServices) {
          const currentValues = getValues(`services.${index}`);
          const updatedServices = { ...currentValues, image: processedImage };
          updateServiceFields(index, updatedServices);
        } else {
          const currentValues = getValues(`portfolios.${index}`);
          const updatedPortfolio = { ...currentValues, image: processedImage };
          updatePortfolioFields(index, updatedPortfolio);
        }
      } catch (error) {
        toast.error(`Error processing image: ${error}`);
      }
    }
  };

  async function onSubmit(data: ServiceFormSchemaType & PortfolioFormSchemaType) {
    updateServices({
      services: data.services,
      portfolios: data.portfolios,
    });
  }

  return (
    <>
      <Layout>
        <Title>Serviços</Title>
        <form className="flex flex-col gap-4">
          {serviceFields.map((service, index) => (
            <div key={service.id} className="flex flex-col gap-4">
              <div className="flex flex-col sm:justify-between sm:flex-row gap-4">
                <div className="flex flex-col gap-4 sm:min-w-96">
                  <Input type="text" placeholder="Título" {...register(`services.${index}.title`)} required />
                  <Input type="text" placeholder="Subtítulo" {...register(`services.${index}.subTitle`)} />
                  <TextArea placeholder="Conteúdo" {...register(`services.${index}.content`)} required />
                  <Input placeholder="Link" {...register(`services.${index}.link`)} className="text-blue-600" />
                  <Controller
                    name={`services.${index}.image`}
                    control={control}
                    render={() => (
                      <Input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files, index, e, true)}
                      />
                    )}
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
                  <Input type="text" placeholder="Título" {...register(`portfolios.${index}.title`)} required />
                  <Input type="text" placeholder="Link" {...register(`portfolios.${index}.link`)} className="text-blue-600" />
                  <Controller
                    name={`portfolios.${index}.image`}
                    control={control}
                    render={() => (
                      <Input
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files, index, e)}
                      />
                    )}
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
            <Button
              props={{
                type: "button",
                className: "text-red-500 shadow-md max-sm:w-full",
                onClick: () => setIsConfirmCancelOpen(true),
              }}
            >
              Cancelar
            </Button>
            <Button
              props={{
                type: "button",
                className: "text-green-500 shadow-md max-sm:w-full",
                onClick: () => setIsConfirmSaveOpen(true),
              }}
            >
              Guardar alterações
            </Button>
          </div>
        </form>
      </Layout>
      <ConfirmationModal
        text="Tens a certeza que desejas descartar as alterações?"
        isOpen={isConfirmCancelOpen}
        onClose={() => setIsConfirmCancelOpen(false)}
        onConfirm={() => setIsViewMode(true)}
      />
      <ConfirmationModal
        text="Tens a certeza que desejas guardar?"
        isOpen={isConfirmSaveOpen}
        onClose={() => setIsConfirmSaveOpen(false)}
        onConfirm={() => {
          setIsConfirmSaveOpen(false);
          handleSubmit(onSubmit)();
        }}
      />
    </>
  );
};

export default EditServices;
