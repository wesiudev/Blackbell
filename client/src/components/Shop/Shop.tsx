import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../common/redux/actions/categories";
import { fetchProducts } from "../../common/redux/actions/product";
import { getSubCategories } from "../../common/redux/actions/subCategories";
import {
  ICategory,
  Image,
  IProduct,
  ISubCategory,
} from "../../common/types/types";

const Shop = () => {
  const dispatch: any = useDispatch();

  const { categories } = useSelector((state: any) => state.categories);
  const { subCategories } = useSelector((state: any) => state.subCategories);
  const { products } = useSelector((state: any) => state.products);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(fetchProducts());
  }, []);

  const array = {
    categories: categories?.data?.map((category: ICategory) => ({
      categoryName: category.categoryName,
      products: products?.data?.filter(
        (product: IProduct) =>
          product.itemCategoryName === category.categoryName
      ),
      subCategories: category.subCategories.map(
        (subCategory: ISubCategory) => ({
          subCategoryName: subCategory.subCategoryName,
          products: products?.data?.filter(
            (product: IProduct) =>
              product.subCategory === subCategory.subCategoryName
          ),
        })
      ),
    })),
  };
  const navMenuContent = array?.categories?.map((array: any) => ({
    category: array.categoryName,
    categoryLength: array.products.length,
    subCategories: array.subCategories.map((item: any) => ({
      subCategoryItems: item,
      subCategoryLength: item.products.length
    }))

  }));
  console.log(array)
  console.log(navMenuContent)
  return (
    <div className="shop">
      {/* <div className="shop__search">
        <div className="shop__search__categories">
          <h1>Kategorie</h1>
        </div>
        <div className="shop__search__list">
            <h3>Pokaż wszystkie <span className="greyish">{`(${allItemsFromTheShopCount})`}</span></h3>
          {singleItemFromTheShopCount?.map((category: any, idx: number) => (
            <div
              style={{borderTop: `1px solid #b4b4b4`}}
              key={idx}
              className="shop__search__list__item"
            >
              <h3>
                {category.categoryName}{" "}
                <span className="greyish">{`(${category.numberOfItems})`}</span>
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="shop__feed">
        {categories?.data?.map((category: ICategory, idx: number) => (
          <div key={idx} className="category">
            <div className="category__title">
              <h1>{category.categoryName}</h1>
            </div>
            <div className="category__items">
              {category?.categoryItems?.map((item: IProduct, idx: number) => (
                <div key={idx} className="category__items__item">
                  Nazwa: {item.itemName} <br />
                  Cena: {item.itemPrice}PLN <br />
                  Kolor: {item.itemColor} <br />
                  Ilość produktu: {item.itemQuantity} <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Shop;
