const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const connect = require("@databases/sqlite");
const { sql } = require("@databases/sqlite");

const dbPath = path.join(__dirname, "../db/database.db");

const db = connect(dbPath);

/* 
  setup database if not created 
*/
async function prepare() {
  await db.query(sql`
      CREATE TABLE IF NOT EXISTS business (
        yelpId VARCHAR NOT NULL PRIMARY KEY,
        name VARCHAR NOT NULL,
        photo VARCHAR,
        city VARCHAR NOT NULL,
        state VARCHAR NOT NULL,
        price VARCHAR,
        rating VARCHAR,
        category TEXT NOT NULL
      );
    `);
}

async function upsert(rowData) {
  const { yelpId, name, photo, city, state, price, rating, category } = rowData;
  await db.query(sql`
      INSERT OR REPLACE INTO business (yelpId, name, photo, city, state, price, rating, category)
        VALUES (${yelpId}, ${name}, ${photo}, ${city}, ${state}, ${price}, ${rating}, ${category})
      ON CONFLICT (yelpId) DO UPDATE
      SET name = ${name}, photo = ${photo}, price = ${price}, rating = ${rating}, category = ${category};
    `);
}

/*
  with created database, upsert multiple records and resolve on conflict
*/
async function upsertMultiple(rows) {
  await prepare();
  for (let row of rows) {
    await upsert(extractDetails(row));
  }
}

/*
  helper method for updating GraphQL notation to json format
  to prepare for insertion into database
*/
function extractDetails(row) {
  category = (row.categories ?? []).map((e) => e.title).join("|");
  return {
    yelpId: row.id,
    name: row.name,
    city: row.location.city,
    state: row.location.state,
    price: row.price ?? null,
    rating: row.rating ?? null,
    photos: row.photos?.length > 0 ? row.photos[0] : null,
    category: category,
  };
}

module.exports = {
  prepare,
  upsert,
  upsertMultiple,
};
