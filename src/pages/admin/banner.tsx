import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { MultiValue } from "react-select";
import { MAX_FILE_SIZE } from "~/constant/config";
// import { MAX_FILE_SIZE } from "~/constants/config";
// import { selectOptions } from "~/utils/helpers";
import { api } from "~/utils/api";

const initialInput = {
  name: "",
  price: 0,
  categories: [],
  file: undefined,
};

const Menu: FC = ({}) => {
  const [input, setInput] = useState(initialInput);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<string>("");

  // tRPC
  const { mutateAsync: createPresignedUrl } =
    api.product.createPresignedUrl.useMutation();
  // const { mutateAsync: addItem } = api.admin.addMenuItem.useMutation();
  const { data: banners, refetch } = api.banner.getAllBanners.useQuery();
  // const { mutateAsync: deleteMenuItem } =
  //   api.admin.deleteMenuItem.useMutation();

  useEffect(() => {
    if (!input.file) return;

    // create the preview
    const objectUrl = URL.createObjectURL(input.file);
    setPreview(objectUrl);

    // clean up the preview
    return () => URL.revokeObjectURL(objectUrl);
  }, [input.file]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No File Selected");
    if (e.target.files[0].size > MAX_FILE_SIZE)
      return setError("File size is too big");
    // setInput((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  const handleImageUpload = async () => {
    const { file } = input;
    if (!file) return;

    // const { fields, key, url } = await createPresignedUrl({
    //   fileType: file.type,
    // });
    // const { fields, key, url } = (await createPresignedUrl({
    //   fileType: file.type,
    // })) as { fields: string[]; key: string; url: string };

    // const data = {
    //   ...fields,
    //   "Content-Type": file.type,
    //   file,
    // };

    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value as string | Blob);
    // });

    // await fetch(url, {
    //   method: "POST",
    //   body: formData,
    // });

    // return key;
  };

  const addMenuItem = async () => {
    // const key = await handleImageUpload();
    // if (!key) throw new Error("No key");

    // await addItem({
    //   name: input.name,
    //   imageKey: key,
    //   categories: input.categories.map((c) => c.value) as Exclude<
    //     ["breakfast", "lunch", "dinner"],
    //     "all"
    //   >,
    //   price: input.price,
    // });

    // refetch()
    //   .then((res) => res)
    //   .catch((err: Error) => console.log(err));

    // Reset input
    setInput(initialInput);
    setPreview("");
  };

  const handleDelete = async (imageKey: string, id: string) => {
    // await deleteMenuItem({ id, imageKey });
    // refetch()
    //   .then((res) => res)
    //   .catch((err: Error) => console.log(err));
  };

  return (
    <>
      <div className="p-6">
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="text"
            placeholder="name"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, name: e.target.value }))
            }
            value={input.name}
          />

          <input
            name="price"
            className="h-12 rounded-sm border-none bg-gray-200"
            type="number"
            placeholder="price"
            onChange={(e) =>
              setInput((prev) => ({ ...prev, price: Number(e.target.value) }))
            }
            value={input.price}
          />

          <select
            // onChange={(e) =>
            //   setForm((prev) => ({ ...prev, categoryId: e.target.value }))
            // }
            // defaultValue={product.categoryId ?? ""}
            className="h-12 bg-gray-200 p-1"
          >
            <option value="" disabled>
              Select Category
            </option>
            {/* {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))} */}
          </select>
          {/* <DynamicSelect
            value={input.categories}
            onChange={(e) =>
              setInput((prev) => ({ ...prev, categories: e } as Input))
            }
            isMulti
            className="h-12"
            // options={selectOptions}
          /> */}

          <label
            htmlFor="file"
            className="relative h-12 cursor-pointer rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none"
          >
            <span className="sr-only">File input</span>
            <div className="flex h-full items-center justify-center">
              {preview ? (
                <div className="relative h-3/4 w-full">
                  <Image
                    alt="preview"
                    style={{ objectFit: "contain" }}
                    fill
                    src={preview}
                  />
                </div>
              ) : (
                <span>Select image</span>
              )}
            </div>
            <input
              name="file"
              id="file"
              onChange={handleFileSelect}
              accept="image/jpeg image/png image/jpg"
              type="file"
              className="sr-only"
            />
          </label>

          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            disabled={!input.file || !input.name}
            onClick={() => {
              addMenuItem()
                .then((res) => res)
                .catch((err: Error) => console.log(err));
            }}
          >
            Add menu item
          </button>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}

        <div className="mx-auto mt-12 max-w-7xl">
          <p className="text-lg font-medium">Your Banners:</p>
          <div className="space-y-4">
            {banners?.map((banner) => (
              <div
                key={banner.id}
                className="flex flex-col items-center justify-between border-2 sm:flex-row"
              >
                <div className="flex gap-4">
                  <div className="relative h-40 w-40">
                    {banner.position !== "advertise" && (
                      <Image priority fill alt={banner.title} src={banner.imgUrl} />
                    )}
                  </div>
                  <div className="flex h-40 flex-col justify-between">
                    <h3 className="font-bold">
                      Title: <span className="font-normal">{banner.title}</span>
                    </h3>
                    <p className="font-bold">
                      Description:
                      <span className="font-normal">{banner.description}</span>
                    </p>
                    <p className="font-bold">
                      Position:
                      <span className="font-normal">{banner.position}</span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      handleDelete(banner.imgUrl, banner.id)
                        .then((res) => res)
                        .catch((err: Error) => console.log(err));
                    }}
                    className="text-sm bg-gray-400 rounded-md text-whitePrimary px-4 py-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(banner.imgUrl, banner.id)
                        .then((res) => res)
                        .catch((err: Error) => console.log(err));
                    }}
                    className="text-sm btn--red px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
