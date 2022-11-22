import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../common/redux/actions/categories";
import { fetchProducts } from "../../common/redux/actions/product";
import { ICategory, Image, IProduct } from "../../common/types/types";

const Shop = () => {
  const dispatch: any = useDispatch();

  const { categories } = useSelector((state: any) => state.categories);
  const { products } = useSelector((state: any) => state.products);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(fetchProducts());
  }, []);

  const singleItemFromTheShopCount = categories?.data?.map(
    (item: ICategory) => ({
      categoryName: item.categoryName,
      categoryItems: products.filter((product:any) => product.categ)
    })
  );
  console.log(singleItemFromTheShopCount)
  const allItemsFromTheShopCount = singleItemFromTheShopCount?.reduce(
    (
      accumulator: number,
      current: { categoryName: string; numberOfItems: number }
    ) => accumulator + current.numberOfItems,
    0
  );
  console.log(allItemsFromTheShopCount);
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
