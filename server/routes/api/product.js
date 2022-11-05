const express = require("express");
const mongoose = require("mongoose");
const Product = require("../../models/product");
const router = express.Router();

//get products
router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    res.json({ data });
    if (!data) throw Error("No items");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//create product
router.post("/", async (req, res) => {
  const product = req.body;
  const newProduct = new Product({
    ...product,
    createdAt: new Date().toISOString(),
  });
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});
//delete product
router.post("/", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No product with id: ${id}`);

  await Product.findByIdAndRemove(id);

  res.json({ message: "Product deleted successfully." });
});

// localhost:5000/products

module.exports = router;
