import { NextPage } from "next";
import HeadMeta from "../components/common/Head";
import SecondaryLayout from "../components/common/SecondaryLayout";
import SignupMain from "../components/Signup";

const Signup: NextPage = () => {
  const description: string =
    "DOWNY adalah e-commerce yang merupakan solusi belanja online anda.";
  return (
    <>
      <HeadMeta
        title="signup"
        description={description}
        currentUrl="/signup/"
        keywords="ecommerce, opensource, django, django rest framework, redis, postgresql, nextjs, typescript, tailwing, best, ecommerce, platform, india, 2021, fullstack"
      />
      <SecondaryLayout>
        <SignupMain />
      </SecondaryLayout>
    </>
  );
};

export default Signup;
