import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { FormatNumber } from "../../lib/format";

import ImageLoader from "../../shared/ImageLoader";
import { Product, ProductImage } from "../../shared/types";

const ProductInfoComponent: NextPage<{ product: Product }> = ({ product }) => {
  const [image, setImage] = useState<ProductImage>();

  React.useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      if (product.images?.length) {
        setImage(product.images[0]);
      }
    }

    return () => {
      isLoaded = false;
    };
  }, [product]);

  return (
    <div className="relative">
      <div className="container">
        <div className="flex flex-col md:flex-row my-8 gap-4">
          <div className="flex-1">
            {image && (
              <Image
                loader={ImageLoader}
                src={image ? image.url : ""}
                width={480}
                height={500}
                alt={product.name}
                quality={100}
                className="rounded-lg"
                objectFit={"cover"}
              />
            )}
            <div className="flex flex-row gap-2">
              {product &&
                product.images &&
                product.images.map((o) => (
                  <div
                    key={o.id}
                    className={`flex w-auto rounded-md cursor-pointer border-2 ${
                      image?.id === o.id ? "border-green-500" : "border-gray-50"
                    }`}
                  >
                    <Image
                      loader={ImageLoader}
                      src={o.url}
                      width={100}
                      height={100}
                      alt={`${product.name} - ${o.id}`}
                      objectFit={"cover"}
                      className="rounded-md"
                      onClick={() => setImage(o)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="font-medium text-2xl mb-2">{product.name}</div>
            <div className="text-gray-700 text-xl">
              <pre>Rp{FormatNumber(product.retailPrice)}</pre>
            </div>
            <div className="text-gray-700">
              <pre>Disc. Rp{FormatNumber(product.discount)} / 2 pcs</pre>
            </div>
            <div className="text-gray-600 mt-2">{product.descriptions}</div>
            <div className="text-gray-600">
              <pre>{product.spec}</pre>
            </div>
            <div className="text-gray-700 mt-2">
              Penjual:{" "}
              <Link
                href={`/product/owner/${product.user?.name}/${product.user?.id}`}
                passHref
              >
                <a className="hover:underline">{product.user?.name}</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoComponent;
