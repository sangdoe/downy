import { NextPage } from "next";
import MetaHead from "../../components/common/Head";
import MainLayout from "../../components/common/MainLayout";
import FarmPanel from "../../components/product/panel";
import { FooterProps, Product, ProductCategory } from "../../shared/types";
import apiCategory from "../api/models/categories";
import AdminProductSearch from "../../components/product/AdminSearchProduct";
import CustomerProductSearch from "../../components/product/CustomerSearchProduct";
import useUser from "../../lib/useUser";
import WaitMe from "../../components/WaitMe";

type HomeProps = {
  categories: ProductCategory[];
  products: Product[];
};

const Contact: NextPage<HomeProps> = ({ categories, products }) => {
  const { user } = useUser();
  const description: string = "Search product.";
  const metaData: FooterProps = {
    title: "Product Index",
    description: description,
    currentUrl: "https://downy.vercel.app/search",
    keywords: "ecommerce, product",
    imageUrl:
      "https://ik.imagekit.io/aug9rawt76d/logo.svg?updatedAt=1633770309986",
  };

  if (!user) return <WaitMe />;

  return (
    <>
      <MetaHead
        title={metaData.title}
        description={metaData.description}
        currentUrl={metaData.currentUrl}
        keywords={metaData.keywords}
        imageUrl={metaData.imageUrl}
      />
      <MainLayout
        metaData={{ ...metaData, currentUrl: "https://downy.vercel.app/" }}
      >
        <FarmPanel categories={categories} />
        <div className="relative">
          {user.isLoggedIn &&
          (user.role === "Admin" || user.role === "Owner") ? (
            <AdminProductSearch user={user} />
          ) : (
            <CustomerProductSearch user={user} />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps() {
  // const categories = await axios.get(BACKEND_URL + "/api/categories/");
  // const featuredProducts = await axios.get(BACKEND_URL + "/api/products/featured/");
  // const subcategoryOffers = await axios.get(BACKEND_URL + "/api/subcategory/offers/");

  //const {uid, s} = context.query;
  const res = await apiCategory.list();
  const [data, error] = res;

  //  const resProduct = await apiProduct.search(uid, s);
  //  const [products] = resProduct;

  return {
    props: {
      categories: data,
      //      products: products
    },
  };
}

export default Contact;
