import { useFieldArray, useForm } from "react-hook-form";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";

import { usePath } from "@/app/api/pathApi";
import { useViewModeContext } from "@/context/PreviewMode";
import { PathFormSchemaType, PathSchemaType } from "@/types/Path";

import { Divider } from "./Elements";

export const EditPathContent = ({ data }: { data: PathSchemaType[] }) => {
  const { setIsViewMode } = useViewModeContext();
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
                  required
                  {...register(`paths.${pathIndex}.pathTitle`)}
                  placeholder="Título do percurso"
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
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            type="reset"
            onClick={() => setIsViewMode(true)}
            className="self-end border p-3 border-black text-red-500 bg-white xl:bottom-8 xl:right-8 shadow-xl"
          >
            Cancelar
          </button>
          <button type="submit" className="self-end border p-3 border-black text-green-500 bg-white xl:bottom-8 xl:right-8 shadow-xl">
            Guardar alterações
          </button>
        </div>
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
            placeholder="Duração"
            className="xl:col-span-1 font-light h-fit p-2 outline-none border border-black"
          />
          <div className="xl:col-span-7 gap-4 flex flex-col">
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.title`)}
              placeholder="Título"
              className="h-fit w-full font-semibold text-xl p-2 outline-none border border-black"
            />
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.titleLink`)}
              placeholder="Link do título"
              className="h-fit w-full text-blue-500 p-2 outline-none border border-black"
            />
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.subTitle`)}
              placeholder="Sub-título"
              className="h-fit w-full font-semibold p-2 outline-none border border-black"
            />
            <input
              {...register(`paths.${nestIndex}.items.${itemIndex}.subTitleLink`)}
              placeholder="Link do sub-título"
              className="h-fit w-full text-blue-500 p-2 outline-none border border-black"
            />
            <textarea
              required
              {...register(`paths.${nestIndex}.items.${itemIndex}.content`)}
              placeholder="Conteúdo"
              className="min-h-52 w-full outline-none border border-black p-2"
            />
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
