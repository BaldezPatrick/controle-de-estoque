const db = require("../conn.js");

const addProduto = (req, res) => {
  const sql =
    "INSERT INTO produtos (nome_produto, preco, quantidade) VALUES(?)";
  const values = [req.body.nome_produto, req.body.preco, req.body.quantidade];

  db.query(sql, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto cadastrado no estoque");
  });
};

const deleteProduto = (req, res) => {
  const sql = "DELETE FROM produtos WHERE id = ?";

  db.query(sql, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado do estoque.");
  });
};

const getProduto = (_, res) => {
  const sql = "SELECT * from produtos";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

const updateProduto = (req, res) => {
  const sql =
    "UPDATE produtos SET nome_produto = ?,preco = ?, quantidade =? WHERE id = ?";

  const values = [req.body.nome_produto, req.body.preco, req.body.quantidade];

  db.query(sql, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado.");
  });
};

module.exports = {
  addProduto,
  deleteProduto,
  getProduto,
  updateProduto,
};
