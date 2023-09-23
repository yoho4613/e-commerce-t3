import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import Image from "next/image";
import { MAX_FILE_SIZE } from "~/constant/config";
import { BiStar } from "react-icons/bi";

// interface ProductFormProps {}

type Form = {
  title: string;
  description: string;
  type: string;
  rrp: string;
  price: string;
  stock: number;
  categoryId: string;
  subcategoryId: string;
  saleId: string;
  delivery: number;
  imgUrl: string[];
};

const initialForm = {
  title: "",
  description: "",
  type: "",
  rrp: "",
  price: "",
  stock: 0,
  categoryId: "",
  subcategoryId: "",
  saleId: "",
  delivery: 0,
  imgUrl: [],
};

// const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

const ProductForm: FC = ({}) => {
  const {
    data: categories,
    isLoading,
    refetch,
  } = api.category.getAllCategories.useQuery();
  const { data: sales } = api.sale.getAllSales.useQuery();
  const { mutateAsync: createPresignedUrl } =
    api.product.createPresignedUrl.useMutation();
  const { mutate: addProduct } = api.product.addProduct.useMutation({
    onSuccess: () => {
      refetch()
        .then((res) => res)
        .catch((err) => console.log(err));
      setForm(initialForm);
      toast.success("sucessfully added Product");
      setError("");
      setPhotos([]);
      setPreviews([]);
    },
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [form, setForm] = useState<Form>(initialForm);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [openSale, setOpenSale] = useState(false);
  const [attributes, setAttributes] = useState<
    {
      title: string;
      options: string[];
    }[]
  >([]);

  console.log(attributes);

  useEffect(() => {
    if (!photos.length) return;
    // create the preview
    const objectUrl = photos?.map((img) => URL.createObjectURL(img));
    setPreviews([...objectUrl]);

    // clean up the preview
    () => objectUrl.map((img) => URL.revokeObjectURL(img)) || "";
  }, [photos]);

  const handleImageUpload = () => {
    if (!photos || !photos.length) return;

    const images = photos.map(async (img) => {
      const { fields, key, url } = (await createPresignedUrl({
        fileType: img.type,
      })) as { fields: string[]; key: string; url: string };

      const data = {
        ...fields,
        "Content-Type": img.type,
        file: img,
      };

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });

      await fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      return key;
    });

    return images;
  };

  const addNewProduct = async () => {
    const {
      title,
      description,
      type,
      rrp,
      price,
      delivery,
      stock,
      categoryId,
    } = form;
    if (
      categoryId ||
      title ||
      description ||
      type ||
      rrp ||
      price ||
      delivery ||
      stock
    ) {
      setError("Missing Information");
    }
    const key = handleImageUpload();
    if (!key) throw new Error("No key");

    addProduct({
      title,
      description,
      type,
      rrp,
      price,
      delivery,
      stock,
      categoryId,
      subcategoryId: form.subcategoryId || "",
      imgUrl: ["key"],
      saleId: "",
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return setError("No File Selected");
    if (e.target.files[0].size > MAX_FILE_SIZE) {
      return setError("File size is too big");
    }

    setPhotos((prev) => [...prev, e.target.files![0]!]);
  };

  const AttributeForm = ({ index }: { index: number }) => {
    const [attribute, setAttribute] = useState<{
      title: string;
      options: string[];
    }>({ title: "", options: [] });
    useEffect(() => {
      if (attributes) {
        setAttribute(attributes[index]!);
      }
    }, [index]);
    const [input, setInput] = useState("");
    return (
      <div className="flex h-24 items-start">
        <div className="flex flex-col items-center">
          <label>Title</label>
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200 p-1"
            type="text"
            placeholder="name"
            onChange={(e) => {
              setAttribute((prev) => ({ ...prev, title: e.target.value }));
            }}
            value={attribute.title}
          />
        </div>
        <div className="flex h-full flex-col items-center">
          <h4>Options</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAttribute((prev) => ({
                ...prev,
                options: [...prev.options, input],
              }));
              setAttributes((prev) =>
                prev.map((att, i) =>
                  i === index
                    ? {
                        title: attribute.title,
                        options: [...att.options, input],
                      }
                    : att,
                ),
              );
              setInput("");
            }}
          >
            <input
              name="name"
              className="rounded-sm border-2 p-1"
              type="text"
              placeholder="name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button className="h-full w-12 bg-buttonGreen">Add</button>
          </form>
          <p className="h-full w-full border-2">
            {attribute.options.map((option) => (
              <button>{option}</button>
            ))}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="p-6">
        <div className="mx-auto flex max-w-xl flex-col gap-2">
          <label>Title</label>
          <input
            name="name"
            className="h-12 rounded-sm border-none bg-gray-200 p-1"
            type="text"
            placeholder="name"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            value={form.title}
          />
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center rounded-sm">
              <label>Category</label>
              <select
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, categoryId: e.target.value }))
                }
                defaultValue=""
                className="h-12 bg-gray-200 p-1"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {categories?.find((category) => category.id === form.categoryId)
              ?.subcategory.length ? (
              <div className="flex flex-col items-center">
                <label>Subcategory</label>
                <select
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      subcategoryId: e.target.value,
                    }))
                  }
                  defaultValue=""
                  className="h-12 bg-gray-200 p-1"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories
                    ?.find((category) => category.id === form.categoryId)
                    ?.subcategory?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              ""
            )}
            <div className="flex flex-col items-center">
              <label>Type</label>
              <input
                name="name"
                className="h-12 rounded-sm border-none bg-gray-200 p-1"
                type="text"
                placeholder="type"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, type: e.target.value }))
                }
                value={form.type}
              />
            </div>
          </div>

          <label>Description</label>
          <textarea
            className="rounded-sm border-none bg-gray-200 p-1"
            rows={6}
            placeholder="description..."
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            value={form.description}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center rounded-sm">
              <label>RRP</label>
              <input
                className="h-12 rounded-sm border-none bg-gray-200 p-1"
                type="number"
                placeholder="price for original"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rrp: e.target.value }))
                }
                value={form.rrp}
              />
            </div>
            <div className="flex flex-col items-center rounded-sm">
              <label>Price</label>
              <input
                className="h-12 rounded-sm border-none bg-gray-200 p-1"
                type="number"
                placeholder="Actual Price to Sell"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: e.target.value }))
                }
                value={form.price}
              />
            </div>
            <div className="flex flex-col items-center rounded-sm">
              <label>Stock</label>
              <input
                className="h-12 rounded-sm border-none bg-gray-200 p-1"
                type="number"
                placeholder="Available Stocks"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    stock: Number(e.target.value),
                  }))
                }
                value={form.stock}
              />
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row ${
              !openSale ? "sm:justify-start" : "sm:justify-between"
            }`}
          >
            <div className="flex flex-col items-center rounded-sm">
              <label>Delivery Price</label>
              <input
                className="h-12 rounded-sm border-none bg-gray-200 p-1"
                type="number"
                placeholder="price for original"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    delivery: Number(e.target.value),
                  }))
                }
                value={form.delivery}
              />
            </div>

            <div className="flex flex-col items-center justify-center justify-self-start rounded-sm">
              <button
                onClick={() => setOpenSale((prev) => !prev)}
                className={`rounded-md ${
                  !openSale
                    ? "ml-6 mt-4 bg-green-300 hover:bg-buttonGreen"
                    : "bg-red-500 hover:bg-redPrimary"
                } px-4 py-1.5 `}
              >
                {!openSale ? (
                  <span>Make it on Sale </span>
                ) : (
                  <span> Remove Sale</span>
                )}
              </button>
            </div>

            {openSale ? (
              <div className="flex flex-col items-center rounded-sm">
                <label>Available Sales</label>
                <select
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      saleId: e.target.value,
                    }))
                  }
                  defaultValue=""
                  className="h-12 bg-gray-200 p-1"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {sales?.map((sale) => (
                    <option key={sale.id} value={sale.id}>
                      {sale.title}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-sm"></div>
            )}
          </div>

          <h4>Optional Attributes</h4>
          <button
            onClick={() =>
              setAttributes((prev) => [...prev, { title: "", options: [] }])
            }
            className="self-end rounded-md bg-buttonGreen px-4 py-2"
          >
            Add Attribute
          </button>
          {attributes.length
            ? attributes.map((att, i) => (
                <>
                  <div key={i} className="flex items-start justify-between">
                    <AttributeForm index={i} />
                    <div>
                      <h4 className="text-center">Action</h4>
                      <button
                        onClick={() =>
                          setAttributes((prev) => {
                            const attributes = [...prev];
                            attributes.splice(i, 1);
                            return attributes;
                          })
                        }
                        className="btn--red px-4 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              ))
            : ""}

          <label
            htmlFor="file"
            className="relative flex h-12 cursor-pointer items-center justify-center rounded-sm bg-gray-200 font-medium text-indigo-600 focus-within:outline-none"
          >
            <span>Select image</span>
            <input
              name="file"
              id="file"
              onChange={handleFileSelect}
              accept="image/jpeg image/png image/jpg"
              type="file"
              className="sr-only"
            />
          </label>
          {previews.length ? (
            <div>
              <span className="sr-only">File input</span>
              <div className="flex h-full items-center justify-center">
                <div className="relative flex h-3/4 w-full flex-wrap justify-evenly gap-4 border-2">
                  {previews.map((img, i) => (
                    <div key={i} className="relative">
                      <Image
                        className="w-32"
                        key={img}
                        alt="preview"
                        style={{ objectFit: "contain" }}
                        width={100}
                        height={100}
                        src={img}
                      />
                      {i === 0 && (
                        <span className="group/item absolute right-2 top-2">
                          <BiStar color="red" />
                          <span className="invisible absolute left-0 top-0 border-2 bg-slate-400 p-1 text-xs text-whitePrimary group-hover/item:visible">
                            This is Main Photo for This Product
                          </span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {error && <p className="text-redPrimary">{error}</p>}
          <button
            className="h-12 rounded-sm bg-gray-200 disabled:cursor-not-allowed"
            // disabled={!formName}
            onClick={() => {
              addNewProduct();
            }}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
