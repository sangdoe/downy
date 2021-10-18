import { NextPage } from "next";
import Link from "next/link";
import { CategoryType, ProductCategory } from "../../../shared/types";
import Image from "next/image";
import ImageLoader from "../../../shared/ImageLoader";

import style from "../../../styles/category.module.scss";

type CategoryPanelProps = {
  categories: ProductCategory[];
};
const CategoryPanel: NextPage<CategoryPanelProps> = ({ categories }) => {
  const renderCategory = categories.map((x) => {
    return (
      <li key={x.id} className={style["category-item"]}>
        <div className={style["image-container"]}>
          {/* <Image src={x.category_images[0]?.image} alt={x.slug} layout="fill" objectFit="cover" /> */}
          {/* <img src={x.category_images[0]?.image} alt="testing"/> */}
        </div>
        <div className={style["category-text"]}>
          <Link
            passHref
            // as={{ pathname: `/product/${x.id}` }}
            href={{ pathname: `/product`, query: { pid: x.id, name: x.name } }}
          >
            <a className="text-gray-50 no-underline">{x.name}</a>
          </Link>
        </div>
      </li>
    );
  });
  return (
    <div className={style["outer-container"]}>
      <div className={style["inner-container"]}>
        <ul className={style["main-container"]}>
          <li className={style["category-item"]}>
            <div className={style["image-container"]}>
              <Image
                loader={ImageLoader}
                src="/offers.png"
                layout="fill"
                alt="category_image"
              />
            </div>
            <div className={style["category-text"]}>Offers</div>
          </li>
          {renderCategory}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPanel;
