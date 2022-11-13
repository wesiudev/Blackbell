const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, default: "" },
  price: { type: String, default: "" },
  description: { type: String, default: "" },
  quantity: { type: Number, default: 0 },
  size: { type: String, default: "" },
  color: { type: String, default: "" },
  category: { type: String, default: "" },
  images: { type: Array, default: [] },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
