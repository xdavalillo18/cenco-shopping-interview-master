const express = require("express");
const bodyParser = require("body-parser");
const { getAllProduct, getProductByCode } = require("./product-service");

const app = express();
app.use(bodyParser.json());

app.get("/product", (req, res) => {
  res.json(getAllProduct());
});

app.get("/product/:code", (req, res) => {
  const product = getProductByCode(req.params.code);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

//Need to calculate total and discount
app.post("/checkout", (req, res) => {
  const products = getAllProduct();
  const result = {
    total: 0,
    totalDiscount: 0,
    totalToPay: 0,
    product: [],
  };
  products.forEach(element => {
    result.total = result.total + element.price;
    result.totalDiscount = result.totalDiscount + element.discount;
    result.product.push(element.code);
  });
  result.totalToPay = result.total - result.totalDiscount;
  res.json(result);
});

app.listen(3000);
console.log("Express started on port 3000");
