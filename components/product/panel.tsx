import { NextPage } from "next";
import { CategoryType, ProductCategory } from "../../shared/types";
import CategoryPanel from "../Home/HeroSection/CategortPanerNew";

type FarmPanelProps = {
  categories: ProductCategory[];
};
const FarmPanel: NextPage<FarmPanelProps> = ({ categories }) => {
  return (
    <div
      //    className="bg-gray-50 relative w-full h-hero-mobile-sm mobile-bg:h-hero-mobile-bg ipad:h-hero-ipad desktop:h-hero-desktop desktop-big:h-hero-desktop-lg bg-no-repeat bg-cover bg-clip-content bg-center flex justify-center items-center z-0"
      className="bg-gray-50 relative w-full h-24 flex justify-center items-center z-0"
    >
      <CategoryPanel categories={categories} />
    </div>
  );
};

export default FarmPanel;

// py-10 px-14
