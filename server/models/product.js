const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  itemDescription: String,
  itemQuantity: Number,
  itemSize: String,
  itemColor: String,
  itemCategoryID: String,
  itemCategoryName: String,
  subCategory: String,
  primaryImage: String,
  itemImages: [
    {
      imageSrc: String,
      imageName: String,
      imageIndex: String,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
