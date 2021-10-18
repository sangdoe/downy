import { ProductCategory } from '../../../shared/types'
import db, { nestQuerySingle, sql } from "../../../shared/config";


type apiReturn = Promise<any[] | (readonly ProductCategory[] | undefined)[]>;

interface apiFunction {
  get: (id: number) => apiReturn;
  list: () => apiReturn;
  delete: (id: number) => apiReturn;
  update: (id: number, data: ProductCategory) => apiReturn;
  insert: (data: ProductCategory) => apiReturn;
}

const apiCategory: apiFunction = {
  get: async (id: number) => {

    const query = sql<ProductCategory>`select id, name
      FROM categories
      WHERE id = ${id}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  list: async () => {

    const query = sql<ProductCategory>`select id, name
    from categories
    order by id`;

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  delete: async (id: number) => {
    const query = sql<ProductCategory>`DELETE
    FROM categories
    WHERE id = ${id}
    RETURNING *
    `;
    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  update: async (id: number, p: ProductCategory) => {

    const query = sql<ProductCategory>`UPDATE
      categories SET
      name = ${p.name}
      WHERE id = ${id}
      RETURNING *
    `;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insert: async (p: ProductCategory) => {
    const query = sql<ProductCategory>`
      INSERT INTO categories (
        name
      ) VALUES (
        ${p.name}
      )
      RETURNING *
    `;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
};

export default apiCategory;
