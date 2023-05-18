const express = require("express");
const {
  getProduto,
  updateProduto,
  addProduto,
  deleteProduto,
} = require("../controllers/produto.js");

const router = express.Router();

router.delete("/:id", deleteProduto);

router.get("/", getProduto);

router.post("/", addProduto);

router.put("/:id", updateProduto);

module.exports = router;
