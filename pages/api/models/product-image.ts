import { ProductImage } from '../../../shared/types'
import db, { nestQuery, nestQuerySingle, sql } from "../../../shared/config";


type apiReturn = Promise<any[] | (readonly ProductImage[] | undefined)[]>;

interface apiFunction {
  get: (id: number) => apiReturn;
  delete: (id: number) => apiReturn;
  update: (id: number, data: ProductImage) => apiReturn;
  insert: (data: ProductImage) => apiReturn;
}

const apiProductImage: apiFunction = {

  get: async (id: number) => {

    const qImage = sql`select 
    i.id, i.url, i.product_id, i.is_primary 
    from product_images as i 
    where i.product_id = ${id}`;

    console.log(qImage.sql)

    return await db
      .query(qImage)
      .then((data) => [data, undefined])
      .catch((error) => [undefined, error]);
  },

  delete: async (id: number) => {
    const query = sql<ProductImage>`DELETE
    FROM product_images
    WHERE id = ${id}
    RETURNING id`;
    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  update: async (id: number, p: ProductImage) => {

    // console.log({
    //   data: p,
    //   sql: `update product_images set
    //   url = ${p.url},
    //   product_id = ${p.productId},
    //   is_primary = ${p.isPrimary}
    //   where id = ${id}
    //   returning *`
    // })

    const query = sql`update product_images set
      url = ${p.url},
      product_id = ${p.productId},
      is_primary = ${p.isPrimary}
      where id = ${id}
      returning *`;


    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insert: async (p: ProductImage) => {


    const query = sql`insert into product_images (
        url, product_id, is_primary
      ) values (
        ${p.url}, ${p.productId}, ${p.isPrimary}
      )
      returning id`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
};

export default apiProductImage;
