import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import ImageLoader from "../../shared/ImageLoader";
import { FormatNumber } from "../../lib/format";
import { Product, UserLogin } from "../../shared/types";

export type PanelRightProps = {
  data: Product[];
  user: UserLogin;
};

export const PanelInfo: NextPage<PanelRightProps> = ({
  data: producList,
  user,
}) => {
  return (
    <div className="py-4 -mx-2 flex md:flex-row flex-wrap">
      {producList.map((x) => (
        <div key={x.id} className="w-1/2 md:w-1/5 lg:w-1/6 p-2">
          <div className="rounded-lg bg-gray-50 w-full h-full shadow-lg border border-gray-200">
            <Link href={`/product/${x.id}`}>
              <a>
                <Image
                  loader={ImageLoader}
                  src={x.images ? x.images[0].url : ""}
                  width={256}
                  height={300}
                  alt="default-picture"
                  quality={100}
                  className="rounded-t-lg w-full"
                  objectFit={"cover"}
                />
              </a>
            </Link>
            <div className="w-full p-2">
              <Link href={`/product/${x.id}`}>
                <a className="font-bold hover:underline">{x.name}</a>
              </Link>
              <div className="text-gray-700 font-semibold text-sm my-3">
                Rp{FormatNumber(x.retailPrice)}
              </div>
              <div className="text-gray-600 text-xs font-light">{x.spec}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
