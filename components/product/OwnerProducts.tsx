import { NextPage } from "next";
import { useRouter } from "next/router";

import React, { useState } from "react";

import { Product, UserLogin } from "../../shared/types";
import Section from "../common/Section";
import { PanelInfo } from "./PanelInfo";

type OwnerProductsProps = {
  user: UserLogin;
};

const OwnerProducts: NextPage<OwnerProductsProps> = ({ user }) => {
  const router = useRouter();
  const { id: userId, name: userName } = router.query;

  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    let isLoaded = true;

    const LoadData = async () => {
      const url = `/api/products/owner/${userId}`;
      const res = await fetch(url);
      const json = await res.json();
      setProducts(json);
    };

    if (isLoaded) {
      LoadData();
    }

    return () => {
      isLoaded = false;
    };
  }, [userId]);

  return (
    <Section title={`Produk ${userName}`} first={true}>
      <hr />
      <PanelInfo data={products} user={user} />
    </Section>
  );
};

export default OwnerProducts;
