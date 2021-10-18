import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubCategory, Product, UserLogin, Roles } from "../../shared/types";
import WaitMe from "../WaitMe";
import Section from "../common/Section";
import { useSubCategory } from "../../lib/UseSubCategory";
import ImageLoader from "../../shared/ImageLoader";
import { FormatNumber } from "../../lib/format";

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
  term: number[];
  user: UserLogin;
};

const PanelRight: NextPage<PanelRightProps> = ({ data, term, user }) => {
  const [producList, setProductList] = useState<Product[]>([]);

  React.useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      setProductList(
        term.length === 0
          ? data
          : data.filter((o) => term.indexOf(o.subCategoryId) !== -1)
      );
    }

    return () => {
      isLoaded = false;
    };
  }, [term, data]);

  return (
    <div className="w-full h-full">
      <h4>Daftar Produk</h4>

      <div className="py-4">
        <hr />
        {producList.map((x) => (
          <div key={x.id}>
            <div className="py-4 flex flex-row gap-x-4">
              <div className="w-1/2 md:w-1/4">
                <Link href={`/product/${x.id}`}>
                  <a>
                    <Image
                      loader={ImageLoader}
                      src={x.images ? x.images[0].url : ""}
                      width={160}
                      height={200}
                      alt="default-picture"
                      quality={100}
                      className="rounded-lg px-4"
                      objectFit={"cover"}
                    />
                  </a>
                </Link>
              </div>
              <div className="w-full">
                <Link href={`/product/${x.id}`}>
                  <a className="font-medium text-2xl mb-2 hover:underline">
                    {x.name}
                  </a>
                </Link>
                <div className="text-gray-700 text-xl">
                  <pre>Rp{FormatNumber(x.retailPrice)}</pre>
                </div>
                <div className="text-gray-700">
                  <pre>Disc. Rp{FormatNumber(x.discount)} / 2 pcs</pre>
                </div>
                {/* <div className="text-gray-600 mt-2">{x.descriptions}</div>
                <div className="text-gray-600">
                  <pre>{x.spec}</pre>
                </div> */}
                <div className="text-gray-700 mt-2">
                  Penjual:{" "}
                  <Link
                    href={`/product/owner/${x.user?.name}/${x.user?.id}`}
                    passHref
                  >
                    <a className="hover:underline">{x.user?.name}</a>
                  </Link>
                </div>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

type SubCategoryListProps = {
  user: UserLogin;
  txtSearch?: string | undefined;
};

const SubCategoryList: NextPage<SubCategoryListProps> = ({
  user,
  txtSearch,
}) => {
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

  React.useEffect(() => {
    let isLoaded = true;

    const LoadData = async () => {
      const url = `/api/products/0/${pid}`;
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
          <PanelRight data={products} term={term} user={user} />
        )}
      </div>
    </Section>
  );
};

export default SubCategoryList;
