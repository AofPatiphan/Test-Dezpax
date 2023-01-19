import express from "express";
const productRoute = require("./routes/productRoute");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Hello Krubbb");
});

app.use("/product", productRoute);

module.exports = app;
