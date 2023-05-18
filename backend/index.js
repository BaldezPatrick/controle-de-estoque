const routeProduto = require("./routes/produtos");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routeProduto);

app.listen(5000);
