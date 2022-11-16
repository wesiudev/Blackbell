import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../common/redux/actions/categories";
import { ICategory, Image, IProduct } from "../../common/types/types";

const Shop = () => {
    const dispatch: any = useDispatch()

    const { categories } = useSelector((state: any) => state.categories);
    useEffect(() => {
        dispatch(getCategories())
    }, [])

      const categoryListItemCount = categories?.data?.map((item: any) => ({categoryName: item.categoryName, numberOfItems: item.categoryItems.length}))
      console.log(categoryListItemCount)
    return(
        <div className="shop">
            <div className="shop__search">
                <div className="shop__search__categories">
                    <h1>Kategorie</h1>
                </div>
                <div className="shop__search__list">
                {categoryListItemCount?.map((category: any, idx: number) => (
                <div key={idx} className="shop__search__list__item">
                    <h2>{category.categoryName} <span>{`(${category.numberOfItems})`}</span></h2>
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
                                {category?.categoryItems.map((item:IProduct, idx:number) => (
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
            </div>
        </div>
    )
}

export default Shop