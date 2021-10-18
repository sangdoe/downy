import { NextPage } from "next";
import { Dispatch, ReactNode, SetStateAction } from "react";
import Header from "../shared/Header";
import SearchBar from "../shared/Header/SearchBar";
import Footer from "../shared/Footer";
import { FooterProps } from "../../shared/types";
type MainLayoutProps = {
  metaData: FooterProps;
  children: ReactNode;
};

const MainLayout: NextPage<MainLayoutProps> = ({ metaData, children }) => {
  return (
    <>
      <header className="py-3 bg-white relative z-30">
        <Header />
        <div className="block md:hidden container">
          <SearchBar />
        </div>
      </header>
      <main className="">{children}</main>
      <Footer {...metaData} />
    </>
  );
};

export default MainLayout;
