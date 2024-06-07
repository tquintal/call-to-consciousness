import { useFieldArray, useForm } from "react-hook-form";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

import { usePath } from "@/app/api/pathApi";
import { useViewModeContext } from "@/context/PreviewMode";
import { PathFormSchemaType, PathSchemaType } from "@/types/Path";

import { Button, Divider, Input, TextArea } from "../Elements";
import { ConfirmationModal } from "../Modal";
import { useState } from "react";

export const EditPathContent = ({ data }: { data: PathSchemaType[] }) => {
  const { setIsViewMode } = useViewModeContext();

  const [isConfirmCancelOpen, setIsConfirmCancelOpen] = useState(false);
  const [isConfirmSaveOpen, setIsConfirmSaveOpen] = useState(false);

  const { control, handleSubmit, register } = useForm<PathFormSchemaType>({
    defaultValues: { paths: data },
  });

  const { updatePath } = usePath();

  const {
    fields: pathFields,
    append: appendPath,
    remove: removePath,
  } = useFieldArray({
    control,
    name: "paths",
  });

  return (
    <>
      <form>
        <div className="w-full h-44 bg-slate-300" />
        <div className="flex flex-col gap-4 2xl:pr-52 2xl:pl-52 p-8">
          {pathFields.map((path, pathIndex) => (
            <div key={path.id} className="flex flex-col gap-4">
              <div className="grid grid-flow-row xl:grid-flow-col xl:grid-cols-10 gap-4">
                <div className="flex gap-1 xl:col-span-3">
                  <button
                    type="button"
                    onClick={() => removePath(pathIndex)}
                    className="border p-3 h-fit bg-white border-black text-red-500"
                  >
                    <IoTrashBinOutline />
                  </button>
                  <Input required {...register(`paths.${pathIndex}.pathTitle`)} placeholder="Título do percurso" />
                </div>
                <div className="xl:col-span-7 flex flex-col gap-4">
                  <NestedItems nestIndex={pathIndex} control={control} register={register} />
                </div>
              </div>
              {pathIndex + 1 <= pathFields.length && <Divider />}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendPath({
                pathTitle: "",
                items: [
                  {
                    id: null,
                    pathId: null,
                    content: "",
                    date: "",
                    title: "",
                    titleLink: "",
                    subTitle: "",
                    subTitleLink: "",
                  },
                ],
              })
            }
            className="self-end border p-3 bg-white border-black text-green-500"
          >
            Novo percurso
          </button>
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
        </div>
      </form>
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
          handleSubmit((data: PathFormSchemaType) => updatePath(data))();
        }}
      />
    </>
  );
};

type NestedItemsProps = {
  nestIndex: number;
  control: any;
  register: any;
};

const NestedItems = ({ nestIndex, control, register }: NestedItemsProps) => {
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `paths.${nestIndex}.items`,
  });

  return (
    <>
      {itemFields.map((item, itemIndex) => (
        <div key={item.id} className="flex flex-col gap-4">
          <div className="gap-4 flex flex-col">
            <Input {...register(`paths.${nestIndex}.items.${itemIndex}.date`)} placeholder="Duração" />
            <Input {...register(`paths.${nestIndex}.items.${itemIndex}.title`)} placeholder="Título" />
            <Input
              {...register(`paths.${nestIndex}.items.${itemIndex}.titleLink`)}
              placeholder="Link do título"
              className="text-blue-500"
            />
            <Input {...register(`paths.${nestIndex}.items.${itemIndex}.subTitle`)} placeholder="Sub-título" />
            <Input
              {...register(`paths.${nestIndex}.items.${itemIndex}.subTitleLink`)}
              placeholder="Link do sub-título"
              className="text-blue-500"
            />
            <TextArea required {...register(`paths.${nestIndex}.items.${itemIndex}.content`)} placeholder="Conteúdo" />
            <div className="flex gap-2 justify-end">
              {itemFields.length !== 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(itemIndex)}
                  className="self-end border p-3 bg-white border-black text-red-500"
                >
                  <IoTrashBinOutline />
                </button>
              )}
              {itemIndex + 1 == itemFields.length && (
                <button
                  type="button"
                  onClick={() =>
                    appendItem({
                      id: null,
                      pathId: null,
                      content: "",
                      date: "",
                      title: "",
                      titleLink: "",
                      subTitle: "",
                      subTitleLink: "",
                    })
                  }
                  className="self-end border p-3 bg-white border-black text-green-500"
                >
                  <IoAddOutline />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
