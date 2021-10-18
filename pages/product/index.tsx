import { NextPage } from "next";
import MetaHead from "../../components/common/Head";
import MainLayout from "../../components/common/MainLayout";
import FarmPanel from "../../components/product/panel";
import FarmComponent from "../../components/product";
import { FooterProps, ProductCategory } from "../../shared/types";
import apiCategory from "../api/models/categories";

type HomeProps = {
  categories: ProductCategory[];
};

const Contact: NextPage<HomeProps> = ({ categories }) => {
  const description: string =
    "Halaman web yang menampilkan produk-produk pertanian, berupa metan (media tanam), pupuk (kimia/organik), tanaman hias, tanaman buah, tabulampot.";
  const metaData: FooterProps = {
    title: "Product Index",
    description: description,
    currentUrl: "https://downy.vercel.app/", // `/product/${product.id}`,
    keywords: "ecommerce, product",
    imageUrl:
      "https://ik.imagekit.io/aug9rawt76d/logo.svg?updatedAt=1633770309986",
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
        <FarmComponent />
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

export default Contact;
