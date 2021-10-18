import { Product } from '../../../shared/types'
import db, { nestQuery, nestQuerySingle, sql } from "../../../shared/config";


type apiReturn = Promise<any[] | (readonly Product[] | undefined)[]>;

interface apiFunction {
  get: (id: number) => apiReturn;
  list: (userId: number, categoryId: number) => apiReturn;
  listByOwner: (id: number) => apiReturn;
  search: (userId: number, name: string | string[]) => apiReturn;
  delete: (id: number) => apiReturn;
  update: (id: number, data: Product) => apiReturn;
  insert: (data: Product) => apiReturn;
}

const apiProduct: apiFunction = {

  listByOwner: async (id: number) => {

    const qUser = sql`select
    u.id, u.name
    from users u
    where u.id = t.user_id`

    const qImage = sql`select 
    i.id, i.url, i.product_id "productId", i.is_primary "isPrimary"
    from product_images as i 
    where i.product_id = t.id`;

    const query = sql<Product>`select
    t.id, t.code, t.name, t.unit, t.spec, t.descriptions, t.buy_price, t.price,
    t.retail_price, t.discount, t.stock, t.size, t.sub_category_id, t.user_id,
    ${nestQuerySingle(qUser)} as "user",
    ${nestQuery(qImage)} as "images"
    from products as t
    join sub_categories as s on s.id = t.sub_category_id
    where t.user_id = ${id}
    order by t.name`;

    //console.log(query.sql, query.values)

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },
  get: async (id: number) => {

    const qUser = sql`select
    u.id, u.name
    from users u
    where u.id = t.user_id`

    const qImage = sql`select 
    i.id, i.url, i.product_id "productId", i.is_primary "isPrimary"
    from product_images as i 
    where i.product_id = t.id`;

    const query = sql<Product>`select
      t.id, t.code, t.name, t.unit, t.spec, t.descriptions,
      -- t.buy_price,
      t.price,
      t.retail_price, t.discount, t.stock, t.size, t.sub_category_id, t.user_id,
      ${nestQuery(qImage)} as "images",
      ${nestQuerySingle(qUser)} as "user"
      from products as t
      where t.id = ${id}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  search: async (userId: number, name: string | string[]) => {

    const qUser = sql`select
    u.id, u.name
    from users u
    where u.id = t.user_id`

    const qImage = sql`select 
    i.id, i.url, i.product_id "productId", i.is_primary "isPrimary"
    from product_images as i 
    where i.product_id = t.id`;

    const query = sql<Product>`select
    t.id, t.code, t.name, t.unit, t.spec, t.descriptions, t.buy_price, t.price,
    t.retail_price, t.discount, t.stock, t.size, t.sub_category_id, t.user_id,
    ${nestQuerySingle(qUser)} as "user",
    ${nestQuery(qImage)} as "images"
    from products as t
    join sub_categories as s on s.id = t.sub_category_id
    where (${userId} = 0 or t.user_id = ${userId}) and position(${name} IN lower(t.name)) > 0
    order by t.name`;

    //console.log(query.sql, query.values)

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  list: async (userId: number, categoryId: number) => {

    const qUser = sql`select
    u.id, u.name
    from users u
    where u.id = t.user_id`

    const qImage = sql`select 
    i.id, i.url, i.product_id "productId", i.is_primary "isPrimary"
    from product_images as i 
    where i.product_id = t.id`;

    const query = sql<Product>`select
    t.id, t.code, t.name, t.unit, t.spec, t.descriptions, t.buy_price, t.price,
    t.retail_price, t.discount, t.stock, t.size, t.sub_category_id, t.user_id,
    ${nestQuerySingle(qUser)} as "user",
    ${nestQuery(qImage)} as "images"
    from products as t
    join sub_categories as s on s.id = t.sub_category_id
    where (${userId} = 0 or t.user_id = ${userId}) and s.category_id = ${categoryId}
    order by t.id desc`;

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  delete: async (id: number) => {
    const query = sql<Product>`DELETE
    FROM products
    WHERE id = ${id}
    RETURNING id
    `;
    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  update: async (id: number, p: Product) => {

    const query = sql<Product>`UPDATE products SET
      code = ${p.code},
      name = ${p.name},
      unit = ${p.unit},
      spec = ${p.spec || null},
      descriptions = ${p.descriptions || null}, 
      buy_price = ${p.buyPrice},
      price = ${p.price},
      retail_price = ${p.retailPrice}, 
      discount = ${p.discount},
      stock = ${p.stock},
      size = ${p.size},
      sub_category_id = ${p.subCategoryId}
      WHERE id = ${id}
      RETURNING *
    `;

    //console.log(query.sql, query.values)

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insert: async (p: Product) => {

    const query = sql`insert into products (
        code, name, unit, spec, descriptions, buy_price, price,
        retail_price, discount, stock, size, sub_category_id, user_id
      ) values (
        ${p.code}, ${p.name}, ${p.unit}, ${p.spec || null}, ${p.descriptions || null}, ${p.buyPrice}, ${p.price},
        ${p.retailPrice}, ${p.discount}, ${p.stock}, ${p.size}, ${p.subCategoryId}, ${p.userId}
      )
      returning id`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
};

export default apiProduct;
