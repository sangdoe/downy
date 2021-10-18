import MainLayout from "../components/common/MainLayout";
import MetaHead from "../components/common/Head";
import { NextPage } from "next";
import Hero from "../components/Home/HeroSection/Hero";
//import { BACKEND_URL } from "../utils";
//import axios from "axios";
import {
  FooterProps,
  //CategoryType,
  //FeaturedProductType,
  ProductCategory,
  //SubcategoryOfferType,
} from "../shared/types";
import TodaysDeal from "../components/Home/TodeysDeal";
// import FeaturedProducts from "../components/Home/FeaturedProducts";
// import SubcategoryOffer from "../components/Home/SubcategoryOffer";
// import ProductHistory from "../components/Home/ProductHistory";
import apiCategory from "../pages/api/models/categories";

type HomeProps = {
  categories: ProductCategory[];
};

const Home: NextPage<HomeProps> = ({ categories }) => {
  const description: string =
    "DOWNY adalah e-commerce yang merupakan solusi belanja online anda.";
  const metaData: FooterProps = {
    title: "Home",
    description: description,
    currentUrl: "https://downy.vercel.app/",
    keywords:
      "ecommerce, opensource, django, django rest framework, redis, postgresql, nextjs, typescript, tailwing, best, ecommerce, platform, india, 2021, fullstack",
    imageUrl:
      "https://ik.imagekit.io/aug9rawt76d/logo.svg?updatedAt=1633770309986",
  };

  return (
    <>
      <MetaHead
        title={metaData.title}
        description={description}
        currentUrl={metaData.currentUrl}
        keywords={metaData.keywords}
        imageUrl={metaData.imageUrl}
      />
      <MainLayout metaData={metaData}>
        <Hero categories={categories} />
        <TodaysDeal />
        {/* <FeaturedProducts featuredProducts={featuredProducts} />
                <SubcategoryOffer subcategoryOffers={subcategoryOffers} /> */}
        {/* TODO : Change feature product to ProductHistory with the help of cookies and api */}
        {/* <ProductHistory historyProducts={featuredProducts} /> */}
      </MainLayout>
    </>
  );
};

export async function getServerSideProps() {
  // const categories = await axios.get(BACKEND_URL + "/api/categories/");
  // const featuredProducts = await axios.get(BACKEND_URL + "/api/products/featured/");
  // const subcategoryOffers = await axios.get(BACKEND_URL + "/api/subcategory/offers/");

  const res = await apiCategory.list();

  const [data, error] = res;

  return {
    props: {
      categories: data,
    },
  };
}
export default Home;
