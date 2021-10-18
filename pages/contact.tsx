import { NextPage } from "next";
import MetaHead from "../components/common/Head";
import ContactMain from "../components/contact";
import MainLayout from "../components/common/MainLayout";
import { FooterProps } from "../shared/types";

const Contact: NextPage = () => {
  const description: string =
    "DOWNY adalah e-commerce yang merupakan solusi belanja online anda.";
  const metaData: FooterProps = {
    title: "Home",
    description: description,
    currentUrl: "https://downy.vercel.app/contact",
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
        <ContactMain />
      </MainLayout>
    </>
  );
};

export default Contact;
