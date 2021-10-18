import { NextPage } from "next";
import { todaysDeal } from "./data";
import Image from "next/image";
import Section from "../../common/Section";
import OfferCounter from "./OfferCounter";
import ExtraButton from "../../common/buttons/ExtraButton";
import ImageLoader from "../../../shared/ImageLoader";
import { FormatNumber } from "../../../lib/format";
const TodaysDeal: NextPage = () => {
  return (
    <Section title="KESEMPATAN DISCOUNT HARI INI" first={true}>
      <div className="flex flex-col space-y-0 sm:space-y-4 ipad:flex-row ipad:space-y-0 ipad:space-x-6 justify-center">
        <div className="w-full h-full md:w-1/2">
          <Image
            loader={ImageLoader}
            src={todaysDeal.image}
            alt="todays_deal"
            // placeholder="blur"
            width={750}
            quality={100}
            height={737}
            layout="responsive"

            //sizes="(min-width: 1199px) 40vw, (min-width: 992px) 50vw, 90vw"
          />
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-text text-xl font-semibold sm:text-2xl desktop:text-3xl desktop-big:text-4xl mt-4 md:mt-0">
            {todaysDeal.name}
          </p>
          <div className="space-x-3 font-roboto mt-2 ipad:mt-4">
            <span className="text-xl desktop:2xl: desktop-big:text-3xl">
              Rp{FormatNumber(todaysDeal.price)}
            </span>
            <span className="text-yellow-600 text-md desktop-big:text-xl line-through">
              Rp{FormatNumber(todaysDeal.mrp)}
            </span>
            <span className="text-green-600 text-md desktop-big:text-xl">
              {todaysDeal.off}
            </span>
          </div>
          <p className="text-red-500 text-xs desktop:text-sm font-semibold mt-2 ipad:mt-4 mb-1">
            Discount berakhir pada
          </p>
          <div className="flex flex-row items-center space-x-3 ipad:space-x-0 ipad:items-start ipad:flex-col">
            <div className="">
              <OfferCounter offerEndDate={todaysDeal.offer_ends} />
            </div>
            <div className="ipad:mt-10">
              <ExtraButton text="Beli sekarang" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default TodaysDeal;
