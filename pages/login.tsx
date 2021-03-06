import { NextPage } from "next";
import HeadMeta from "../components/common/Head";
import SecondaryLayout from "../components/common/SecondaryLayout";
import LoginMain from "../components/Login";

const Login: NextPage = () => {
    const description: string = "DOWNY adalah e-commerce yang merupakan solusi belanja online anda.";
    return (
        <>
            <HeadMeta
                title="login"
                description={description}
                currentUrl="login/"
                keywords="ecommerce, opensource, django, django rest framework, redis, postgresql, nextjs, typescript, tailwing, best, ecommerce, platform, india, 2021, fullstack"
            />
            <SecondaryLayout>
                <LoginMain />
            </SecondaryLayout>
        </>
    );
};

export default Login;
