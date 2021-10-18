import { NextPage } from "next";
import MetaHead from "../../components/common/Head";
import MainLayout from "../../components/common/MainLayout";
import FarmPanel from "../../components/product/panel";
import ProductInfoComponent from "../../components/product/product-info";

import {
  CategoryType,
  FeaturedProductType,
  FooterProps,
  Product,
  ProductCategory,
  SubcategoryOfferType,
} from "../../shared/types";
import apiCategory from "../api/models/categories";
import apiProduct from "../api/models/products";
import { useState } from "react";
import { FormatNumber } from "../../lib/format";

type HomeProps = {
  categories: ProductCategory[];
  product: Product;
};

const ProductPage: NextPage<HomeProps> = ({ categories, product }) => {
  //  const description: string = ;

  const metaData: FooterProps = {
    title: product.name,
    description: `Rp${FormatNumber(product.retailPrice)} - ${
      product.descriptions || product.name
    }`,
    currentUrl: `https://downy.vercel.app/product/${product.id}`,
    keywords: "ecommerce, product",
    imageUrl: `https://ik.imagekit.io/aug9rawt76d/tr:w-1200${
      product.images
        ? product.images[0].url
        : "https://ik.imagekit.io/aug9rawt76d/logo.svg?updatedAt=1633770309986"
    }`,
  };

  return (
    <>
      <MetaHead
        title={metaData.title}
        description={metaData.description}
        currentUrl={metaData.currentUrl}
        keywords={metaData.keywords}
        imageUrl={metaData.imageUrl}
      />
      <MainLayout metaData={metaData}>
        <FarmPanel categories={categories} />
        <ProductInfoComponent product={product} />
      </MainLayout>
    </>
  );
};

export async function getServerSideProps(context: any) {
  // const categories = await axios.get(BACKEND_URL + "/api/categories/");
  // const featuredProducts = await axios.get(BACKEND_URL + "/api/products/featured/");
  // const subcategoryOffers = await axios.get(BACKEND_URL + "/api/subcategory/offers/");

  //console.log(context)
  const { id } = context.params;
  //console.log(id)

  const res = await apiCategory.list();
  const [data, error] = res;

  const resProduct = await apiProduct.get(id);
  const [product] = resProduct;

  return {
    props: {
      categories: data,
      product: product,
    },
  };
}

export default ProductPage;
