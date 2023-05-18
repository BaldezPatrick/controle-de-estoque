require("dotenv").config();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const createDatabase = () => {
  return new Promise((resolve, reject) => {
    db.query("CREATE DATABASE IF NOT EXISTS estoque", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    db.changeUser({ database: "estoque" }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const createTable = () => {
  return new Promise((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_produto VARCHAR(255),
        preco DECIMAL(10, 2),
        quantidade INT
      )
    `;
    db.query(createTableQuery, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

createDatabase()
  .then(() => {
    console.log("Base de dados criada com sucesso.");
    return connectToDatabase();
  })
  .then(() => {
    console.log("Conexão estabelecida com a base de dados.");
    return createTable();
  })
  .then(() => {
    console.log("Tabela criada com sucesso.");
  })
  .catch((err) => {
    console.error("Erro:", err);
  });

module.exports = db;
