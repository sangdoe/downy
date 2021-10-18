import { NextPage } from "next";

const WaitMe: NextPage = () => {
  return (
    <div className="bg-gray-50 h-72 mobile-bg:h-96 ipad:h-hero-mobile-sm desktop:h-hero-mobile-bg sm:space-y-4">
      <div className="py-2 ipad:py-2 desktop:py-2 ipad:space-y-0 px-2 md:px-20 items-center justify-center">
        <div className="flex">Please wait...</div>
      </div>
    </div>
  );
};

export default WaitMe;
