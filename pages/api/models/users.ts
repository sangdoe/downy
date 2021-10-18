import { User, GoogleUser } from '../../../shared/types'
import db, { nestQuerySingle, sql } from "../../../shared/config";


type apiReturn = Promise<any[] | (readonly User[] | undefined)[]>;

interface apiFunction {
  get: (id: number) => apiReturn;
  insertGoogle: (p: GoogleUser) => apiReturn;
  getUser: (email: string, password: string) => apiReturn;
  getProfile: (id: number) => apiReturn;
  list: () => apiReturn;
  delete: (id: number) => apiReturn;
  update: (id: number, data: User) => apiReturn;
  insert: (data: User) => apiReturn;
}

const apiUser: apiFunction = {
  getProfile: async (id: number) => {

    const qAddress = sql`select
      a.id, a.user_id userId, a.street, a.city, a.region, a.state, a.phone,
      a.fb_link "fbLink", a.tw_link "twLink", a.account_number "accountNumber"
      from addresses a
      where a.user_id = t.id`;

    const query = sql<User>`select
      t.id, t.name, t.email, t.role, t.photo, t.wall,
      ${nestQuerySingle(qAddress)} as "address"
      FROM users t
      WHERE t.id = ${id}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
  getUser: async (email: string, password: string) => {
    const query = sql<User>`select id, name, email, password, role, photo, wall
      FROM users
      WHERE email = ${email} AND password = ${password}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
  get: async (id: number) => {

    const query = sql<User>`select id, name, email, password, role, photo, wall
      FROM users
      WHERE id = ${id}`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  list: async () => {

    const query = sql<User>`select
    id, name, email, role, photo, wall
    from users
    order by name`;

    return await db
      .query(query)
      .then((data) => [data.rows, undefined])
      .catch((error) => [undefined, error]);
  },

  delete: async (id: number) => {
    const query = sql<User>`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING id`;
    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  update: async (id: number, p: User) => {

    const query = sql<User>`
      UPDATE users SET
      name = ${p.name},
      email = ${p.email},
      password = ${p.password},
      role = ${p.role},
      photo = ${p.photo || null},
      wall = ${p.wall || null}
      WHERE id = ${id}
      on conflict (email) do nothing
      RETURNING *`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insert: async (p: User) => {
    const query = sql<User>`
      INSERT INTO users (
        name, email, password, role
      ) VALUES (
        ${p.name},
        ${p.email},
        ${p.password},
        ${p.role}
      )
      on conflict (email) do nothing
      returning id`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },

  insertGoogle: async (p: GoogleUser) => {
    const query = sql<User>`
      INSERT INTO users (
        name, email, photo, password
      ) VALUES (
        ${p.name},
        ${p.email},
        ${p.imageUrl},
        ${'8x1sm3k4l51'}
      )
      on conflict (email) do nothing
      returning id`;

    return await db
      .query(query)
      .then((data) => [data.rows[0], undefined])
      .catch((error) => [undefined, error]);
  },
};

export default apiUser;
