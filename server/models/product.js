const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  itemName: String,
  itemPrice: String,
  itemDescription: String,
  itemQuantity: String,
  itemSize: [
    {
      size: String,
    },
  ],
  itemColor: [
    {
      color: String,
    },
  ],
  itemCategoryID: String,
  itemCategoryName: String,
  subCategory: String,
  primaryImage: String,
  itemImages: [
    {
      thumbnail: String,
      imageName: String,
      imageUrl: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
