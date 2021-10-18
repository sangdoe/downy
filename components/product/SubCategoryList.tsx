import { NextPage } from "next";
import { useRouter } from "next/router";
//import Image from "next/image";

import React, { FormEvent, useState } from "react";

// import {
//   AsyncListData,
//   ListData,
//   useAsyncList,
//   useListData,
// } from "@react-stately/data";
//import { useSubCategory } from "../../lib/UseSubCategory";
//import useUser from "../../lib/useUser";
import { SubCategory, Product, UserLogin, Roles } from "../../shared/types";
import WaitMe from "../WaitMe";
import Input from "../common/inputs/Input";
import Select from "../common/inputs/CustomSelect";
import MainButton from "../common/buttons/MainButton";
import SecondaryButton from "../common/buttons/SecondaryButton";
import Section from "../common/Section";
import TextArea from "../common/inputs/TextArea";
import ExtraButton from "../common/buttons/ExtraButton";
import { useSubCategory } from "../../lib/UseSubCategory";
import { ShowImages } from "./ShowImages";

const initProduct: Product = {
  id: 0,
  buyPrice: 0,
  code: "",
  discount: 0,
  name: "",
  price: 0,
  retailPrice: 0,
  size: "",
  stock: 0,
  subCategoryId: 0,
  unit: "",
  userId: 0,
  descriptions: "",
  spec: "",
};

type PanelLeftProps = {
  subCategories: SubCategory[];
  setTerm: (isChecked: boolean, value: number) => void;
};

const PanelLeft: NextPage<PanelLeftProps> = ({ subCategories, setTerm }) => {
  return (
    <div className="w-full md:w-1/4 pb-4">
      <h4 className="h-10">Kategori</h4>
      <div className="flex flex-row flex-wrap md:flex-col gap-x-4">
        {subCategories.map((item) => (
          <div key={item.id} className="py-1">
            <label>
              <input
                type="checkbox"
                defaultValue={item.id}
                onChange={(e) => setTerm(e.target.checked, +e.target.value)}
              />
              <span className="pl-2">{item.name}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

type PanelRightProps = {
  data: Product[];
  subCategories: SubCategory[];
  term: number[];
  user: UserLogin;
  txtSearch?: string | undefined;
  updateList: (method: string, data: Product) => void;
};

const PanelRight: NextPage<PanelRightProps> = ({
  data,
  term,
  subCategories,
  user,
  txtSearch,
  updateList,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const [producList, setProductList] = useState<Product[]>([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState({
    label: "",
    value: "0",
  });

  React.useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      // if (txtSearch) {
      //   products.items.filter((o) => o.name.includes(txtSearch));
      //} else {
      setProductList(
        term.length === 0
          ? data
          : data.filter((o) => term.indexOf(o.subCategoryId) !== -1)
      );
      // }
    }

    return () => {
      isLoaded = false;
    };
  }, [term, data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (product.id === 0) {
      postProduct("POST");
    } else {
      postProduct("PUT");
    }
  };

  // const products = useListData<Product>({
  //   initialItems: producList,
  //   getKey: (item: Product) => item.id,
  // });

  async function postProduct(method: string) {
    setShowEdit(false);
    setIsSaving(true);
    const url = `/api/products/post/${product.id}`;
    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ product: product }),
    });

    const json = await res.json();
    //console.log(json);

    if (res.status === 200) {
      updateList(method, method === "PUT" ? json : { ...product, id: json.id });
    }

    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  }

  const getCategoryValue = (id: number): { label: string; value: string } => {
    if (id === 0) return { label: "", value: "0" };
    const test = subCategories.filter((o) => o.id === id)[0];
    return { label: test.name, value: test.id.toString() };
  };

  function getCategoryProps() {
    return subCategories.map((o) => ({
      label: o.name,
      value: o.id.toString(),
    }));
  }

  return (
    <div className="w-full h-full">
      <h4>Daftar Produk</h4>
      {showEdit &&
        user.isLoggedIn &&
        (user.role === Roles.ADMIN || user.role === Roles.OWNER) && (
          <div className={`py-4`}>
            <form onSubmit={handleSubmit}>
              <div className="sticky inset-y-0 top-0 h-24 z-50 bg-white">
                <div className="flex-1 flex flex-row py-4 gap-x-2">
                  <MainButton text="Save" type="submit" className={"w-32"} />
                  <SecondaryButton
                    text="Cancel"
                    className={"w-32"}
                    onClick={() => setShowEdit(false)}
                  />
                  {product.id > 0 && (
                    <ExtraButton
                      text="Delete"
                      type={"button"}
                      className={"w-32"}
                      onClick={() => postProduct("DELETE")}
                    />
                  )}
                </div>
                <hr />
              </div>
              <div className="flex flex-col py-4 gap-y-4">
                <Input
                  type="text"
                  label="Barcode"
                  autoFocus
                  value={product.code}
                  onChange={(e) =>
                    setProduct((o) => ({ ...o, code: e.target.value }))
                  }
                />
                <Input
                  type="text"
                  label="Nama Produk"
                  value={product.name}
                  onChange={(e) =>
                    setProduct((o) => ({ ...o, name: e.target.value }))
                  }
                />
                <Select
                  options={getCategoryProps()}
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(getCategoryValue(+e.value));
                    setProduct((o) => ({ ...o, subCategoryId: +e.value }));
                  }}
                  initialLabel={{
                    label: "Kategori",
                    value: "Kategori",
                  }}
                />
                <div className="flex-1 flex flex-row w-full gap-4">
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Ukuran"
                      value={product.size}
                      onChange={(e) =>
                        setProduct((o) => ({ ...o, size: e.target.value }))
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="text"
                      label="Unit"
                      value={product.unit}
                      onChange={(e) =>
                        setProduct((o) => ({ ...o, unit: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <TextArea
                  label="Spec"
                  value={product.spec || ""}
                  onChange={(e) =>
                    setProduct((o) => ({ ...o, spec: e.target.value }))
                  }
                />
                <TextArea
                  label="Keterangan"
                  value={product.descriptions || ""}
                  onChange={(e) =>
                    setProduct((o) => ({ ...o, descriptions: e.target.value }))
                  }
                />
                <div className="flex-1 flex flex-row w-full gap-4">
                  <div className="w-1/2">
                    <Input
                      type="number"
                      label="Harga Modal"
                      value={product.buyPrice}
                      onChange={(e) =>
                        setProduct((o) => ({ ...o, buyPrice: +e.target.value }))
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="number"
                      label="Harga Grosir"
                      value={product.price}
                      onChange={(e) =>
                        setProduct((o) => ({ ...o, price: +e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex-1 flex flex-row w-full gap-4">
                  <div className="w-1/2">
                    <Input
                      type="number"
                      label="Harga Eceran"
                      value={product.retailPrice}
                      onChange={(e) =>
                        setProduct((o) => ({
                          ...o,
                          retailPrice: +e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="w-1/2">
                    <Input
                      type="number"
                      label="Discount"
                      value={product.discount}
                      onChange={(e) =>
                        setProduct((o) => ({ ...o, discount: +e.target.value }))
                      }
                    />
                  </div>
                </div>
                {/* <div className="flex-1 flex flex-row w-full gap-4">
              <div className="w-1/2"></div>
              <div className="w-1/2"></div>
            </div> */}
                <Input
                  type="number"
                  label="Stock"
                  value={product.stock}
                  onChange={(e) =>
                    setProduct((o) => ({ ...o, stock: +e.target.value }))
                  }
                />
              </div>
            </form>
          </div>
        )}

      {user.isLoggedIn &&
        (user.role === Roles.ADMIN || user.role === Roles.OWNER) && (
          <div className="py-4 w-auto md:w-80">
            <MainButton
              text={isSaving ? "Please wait... saving data" : "Produk baru"}
              disable={isSaving}
              type="submit"
              onClick={() => {
                setSelectedCategory(getCategoryValue(0));
                setProduct({ ...initProduct, userId: user.id });
                setShowEdit(!showEdit);
              }}
              className={`${showEdit && "hidden"}`}
            />
          </div>
        )}
      <div className="py-4">
        <hr />
        {producList.map((x) => (
          <div key={x.id}>
            <div className="py-4 flex flex-row">
              <div className="w-1/2">
                <ShowImages images={x.images || []} productId={x.id} />
              </div>
              <div className="w-full">
                <div
                  className="cursor-pointer"
                  key={x.id}
                  onClick={() => {
                    if (
                      user.role === Roles.ADMIN ||
                      user.role === Roles.OWNER
                    ) {
                      setSelectedCategory(getCategoryValue(x.subCategoryId));
                      setProduct(x);
                      setShowEdit(true);
                    }
                  }}
                >
                  {x.name}
                </div>
                <div className="text-gray-400">{x.descriptions}</div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

type SubProductListProps = {
  user: UserLogin;
  txtSearch?: string | undefined;
};

const SubProductList: NextPage<SubProductListProps> = ({ user, txtSearch }) => {
  const router = useRouter();
  const { pid, name: categoryName } = router.query;
  const [txt, setTxt] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const {
    data: subCategories,
    mutate: mutateCategories,
    isLoading,
    error,
  } = useSubCategory(pid ? +pid : 0);

  const [term, setTerm] = useState<number[]>([]);
  //   Object.values(subCategories.map((o: SubCategory) => o.id))
  // );
  //  console.log(url);

  // const subCategories = useAsyncList({
  //   async load({ signal }) {
  //     let res = await fetch("/api/sub-category", { signal });
  //     let json = await res.json();
  //     const test: number[] = Object.values(json.map((o: SubCategory) => o.id));

  //     setTerm(test);
  //     return { items: json };
  //   },
  //   getKey: (item: SubCategory) => item.id,
  // });

  React.useEffect(() => {
    let isLoaded = true;

    const LoadData = async () => {
      const url = `/api/products/${
        user.isLoggedIn ? (user.role === "Owner" ? 0 : user.id) : 0
      }/${pid}`;
      const res = await fetch(url);
      const json = await res.json();
      setProducts(json);
      setTerm([]);
    };

    if (isLoaded) {
      LoadData();
      setTxt(txtSearch);
    }

    return () => {
      isLoaded = false;
    };
  }, [txtSearch, user, pid]);

  const updateList = (method: string, data: Product) => {
    switch (method) {
      case "POST":
        {
          setProducts((o) => [{ ...data, images: [] }, ...o]);
        }
        break;
      case "PUT":
        {
          const temp = [...products];
          let found: boolean = false;

          for (let c = 0; c < products.length; c++) {
            if (products[c].id === data.id) {
              temp.splice(c, 1, { ...data, images: products[c].images });
              found = true;
              break;
            }
          }

          //  console.log(temp);

          if (found) {
            setProducts(temp);
          }
        }
        break;
      case "DELETE":
        {
          const temp = [...products];
          let found: boolean = false;

          for (let c = 0; c < products.length; c++) {
            if (products[c].id === data.id) {
              temp.splice(c, 1);
              found = true;
              break;
            }
          }

          if (found) {
            setProducts(temp);
          }
        }
        break;
    }
  };

  // const products = useAsyncList({
  //   async load({ signal }) {
  //     const url = `/api/products/${user.isLoggedIn ? user.id : 0}/${pid}`;
  //     const res = await fetch(url, { signal });
  //     const json = await res.json();
  //     return { items: json };
  //   },
  //   getKey: (item: Product) => item.id,
  // });

  if (isLoading) {
    return <WaitMe />;
  }

  const hanldeTerm = (isChecked: boolean, value: number) => {
    if (isChecked) {
      setTerm([...term, value]);
    } else {
      let temp = [...term];
      const i = temp.indexOf(value);
      temp.splice(i, 1);
      setTerm(temp);
    }
    setTxt(undefined);
  };

  return (
    // flex flex-col space-y-0 sm:space-y-4 ipad:flex-row ipad:space-y-0 ipad:space-x-6 justify-center
    <Section title={`Produk ${categoryName}`} first={true}>
      <div className="flex flex-col md:flex-row">
        <PanelLeft subCategories={subCategories} setTerm={hanldeTerm} />
        {subCategories.length > 0 && (
          <PanelRight
            data={products}
            updateList={updateList}
            term={term}
            user={user}
            txtSearch={txt}
            subCategories={subCategories}
          />
        )}
      </div>
    </Section>
  );
};

export default SubProductList;
