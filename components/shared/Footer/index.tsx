import { NextPage } from "next";
import Link from "next/link";
import { FooterProps } from "../../../shared/types";
import FooterBottom from "./FooterBottom";
import Social from "./Social";

const Footer: NextPage<FooterProps> = (metaData: FooterProps) => {
  const footerData = [
    {
      id: 1,
      name: "Login",
      link: "/login/",
    },
    {
      id: 2,
      name: "Signup",
      link: "/signup/",
    },
    {
      id: 3,
      name: "Become a seller",
      link: "/become-a-seller/",
    },
    {
      id: 4,
      name: "Blog",
      link: "/blog/",
    },
    {
      id: 5,
      name: "Featured Products",
      link: "/featured/",
    },
    {
      id: 6,
      name: "Careers",
      link: "/careers/",
    },
    {
      id: 7,
      name: "About",
      link: "/about/",
    },
    {
      id: 8,
      name: "Contact",
      link: "/contact/",
    },
    {
      id: 9,
      name: "Privacy",
      link: "/privacy/",
    },
    {
      id: 10,
      name: "Terms",
      link: "/terms/",
    },
  ];

  const renderFooterData = footerData.map((x) => {
    return (
      <li key={x.id} className="">
        <Link href={x.link}>
          <a className="text-white hover:text-blue-200 font-semibold whitespace-nowrap">
            {x.name}
          </a>
        </Link>
      </li>
    );
  });

  return (
    <footer className="bg-main py-1 mt-auto">
      <div className="container">
        <div className="py-8">
          <h1 className="text-center">
            <span className="text-white">DO</span>
            <span className="text-gray-400">W</span>
            <span className="text-white">NY</span>
          </h1>
        </div>
        <div>
          <ul className="text-center flex flex-wrap justify-center space-x-6 sm:space-x-10 md:space-x-12">
            {renderFooterData}
          </ul>
        </div>
        <Social {...metaData} />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;
