import { useFieldArray, useForm } from "react-hook-form";

import { usePath } from "@/app/api/pathApi";
import { PathFormSchemaType, PathSchemaType } from "@/types/Path";

import { Divider } from "./Elements";

export const EditPathContent = ({ data }: { data: PathSchemaType[] }) => {
  const { updatePath } = usePath();
  const { control, handleSubmit, register } = useForm<PathFormSchemaType>({
    defaultValues: { paths: data },
  });

  const {
    fields: pathFields,
    append: appendPath,
    remove: removePath,
  } = useFieldArray({
    control,
    name: "paths",
  });

  return (
    <form onSubmit={handleSubmit((data: PathFormSchemaType) => updatePath(data))}>
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
                  X
                </button>
                <input
                  {...register(`paths.${pathIndex}.pathTitle`)}
                  defaultValue={path.pathTitle}
                  className="font-semibold text-2xl p-2 w-full h-fit outline-none border border-black"
                />
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
              pathTitle: "Título",
              items: [
                {
                  date: "Data",
                  title: "Título",
                  subTitle: "Sub-título",
                  content: "Conteúdo",
                },
              ],
            })
          }
          className="self-end border p-3 bg-white border-black text-green-500"
        >
          Novo percurso
        </button>
        <button
          type="submit"
          className="self-end border p-3 border-black text-green-500 bg-white fixed bottom-4 right-4 xl:bottom-8 xl:right-8 shadow-xl"
        >
          Guardar alterações
        </button>
      </div>
    </form>
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
        <div key={item.id} className="grid gap-4 grid-flow-row xl:grid-flow-col xl:grid-cols-8">
          <input
            {...register(`paths.${nestIndex}.items.${itemIndex}.date`)}
            defaultValue={item.date ?? ""}
            className="xl:col-span-1 font-light h-fit p-2 outline-none border border-black"
          />
          <div className="xl:col-span-7 gap-4 flex flex-col">
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.title`)}
              defaultValue={item.title ?? ""}
              className="h-fit w-full font-semibold text-xl p-2 outline-none border border-black"
            />
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.subTitle`)}
              defaultValue={item.subTitle ?? ""}
              className="h-fit w-full font-semibold p-2 outline-none border border-black"
            />
            <textarea
              {...register(`paths.${nestIndex}.items.${itemIndex}.content`)}
              defaultValue={item.content}
              className="min-h-52 w-full outline-none border border-black p-2"
            ></textarea>
            <button
              type="button"
              onClick={() => removeItem(itemIndex)}
              className="self-end border p-3 bg-white border-black text-red-500"
            >
              Eliminar
            </button>
            {itemIndex + 1 == itemFields.length && (
              <button
                type="button"
                onClick={() => appendItem({ date: "Data", title: "Título", subTitle: "Sub-título", content: "Conteúdo" })}
                className="self-end border p-3 bg-white border-black text-green-500"
              >
                Novo item
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};
