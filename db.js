const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

function createDb() {
  const adapter = new FileSync("movies.json");
  const db = low(adapter);

  db.defaults({ movies: [] }).write();

  return db;
}