import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Product, UserLogin } from "../../shared/types";
import WaitMe from "../WaitMe";
import Section from "../common/Section";
import { useSubCategory } from "../../lib/UseSubCategory";
import { PanelInfo } from "./PanelInfo";

type CustomerProductSearchProps = {
  user: UserLogin;
};

const CustomerProductSearch: NextPage<CustomerProductSearchProps> = ({
  user,
}) => {
  const router = useRouter();
  const { s: txtSearch } = router.query;

  const [products, setProducts] = useState<Product[]>([]);
  const {
    data: subCategories,
    mutate: mutateCategories,
    isLoading,
    error,
  } = useSubCategory(0);

  const [term, setTerm] = useState<number[]>([]);

  React.useEffect(() => {
    let isLoaded = true;

    const LoadData = async () => {
      const url = `/api/products/search/0/${("" + txtSearch).toLowerCase()}`;
      const res = await fetch(url);
      const json = await res.json();
      setProducts(json);
    };

    if (isLoaded) {
      setTerm([]);
      LoadData();
    }

    return () => {
      isLoaded = false;
    };
  }, [user, txtSearch]);

  if (isLoading) {
    return <WaitMe />;
  }

  return (
    // flex flex-col space-y-0 sm:space-y-4 ipad:flex-row ipad:space-y-0 ipad:space-x-6 justify-center
    <Section title={`Cari Produk '${txtSearch}'`} first={true}>
      <hr />
      <PanelInfo data={products} user={user} />
    </Section>
  );
};

export default CustomerProductSearch;
