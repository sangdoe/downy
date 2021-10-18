import { SubCategory } from '../../../shared/types'
import db, { nestQuerySingle, sql } from "../../../shared/config";


type apiReturn = Promise<any[] | (readonly SubCategory[] | undefined)[]>;

interface apiFunction {
  get: (id: number) => apiReturn;
  list: () => apiReturn;
  listByCategory: (id: number) => apiReturn;
  delete: (id: number) => apiReturn;
  update: (id: number, data: SubCategory) => apiReturn;
  insert: (data: SubCategory) => apiReturn;
}

const apiSubCategory: apiFunction = {
  get: async (id: number) => {

    const query = sql<SubCategory>`select
      id, name, category_id
      FROM sub_categories
      WHERE id = ${id}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  listByCategory: async (id: number) => {

    const query = sql<SubCategory>`select
    id, name, category_id
    from sub_categories
    where category_id = ${id} or ${id} = 0
    order by name`;

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  list: async () => {

    const query = sql<SubCategory>`select
    id, name, category_id
    from sub_categories
    order by id`;

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  delete: async (id: number) => {
    const query = sql<SubCategory>`delete from sub_categories
    where id = ${id}
    returning *
    `;
    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  update: async (id: number, p: SubCategory) => {

    const query = sql<SubCategory>`update
      sub_categories set
      name = ${p.name},
      category_id = ${p.categoryId}
      where id = ${id}
      returning *
    `;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insert: async (p: SubCategory) => {
    const query = sql<SubCategory>`insert into
    sub_categories (
        name, category_id
      ) values (
        ${p.name},
        ${p.categoryId}
      )
      returning *
    `;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
};

export default apiSubCategory;
