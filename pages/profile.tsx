import { NextPage } from "next";
import MetaHead from "../components/common/Head";
import ProfileMain from "../components/profile";
import MainLayout from "../components/common/MainLayout";
import useUser from "../lib/useUser";
import { FooterProps } from "../shared/types";

const Contact: NextPage = () => {
  const description: string = "User profile page.";
  const { user } = useUser({ redirectTo: "/signup", redirectIfFound: false });
  const metaData: FooterProps = {
    title: "Home",
    description: description,
    currentUrl: `https://downy.vercel.app/profile/`,
    keywords:
      "ecommerce, opensource, postgresql, nextjs, typescript, tailwind, ecommerce, fullstack, serverless, profile",
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
      />
      <MainLayout metaData={metaData}>
        <ProfileMain user={user} />
      </MainLayout>
    </>
  );
};

export default Contact;
